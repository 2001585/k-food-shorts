# ⚙️ 백엔드 개발 계획

## 🎯 개발 목표
- 확장 가능한 마이크로서비스 아키텍처
- 높은 동시성 처리 능력
- 실시간 데이터 업데이트
- 효율적인 공공데이터 처리 파이프라인

## 🏗️ 프로젝트 구조

### NestJS 기반 구조
```
backend/
├── src/
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.module.ts
│   │   │   ├── strategies/
│   │   │   └── guards/
│   │   │
│   │   ├── restaurants/
│   │   │   ├── restaurants.controller.ts
│   │   │   ├── restaurants.service.ts
│   │   │   ├── restaurants.module.ts
│   │   │   └── dto/
│   │   │
│   │   ├── users/
│   │   ├── media/
│   │   ├── reviews/
│   │   └── feeds/
│   │
│   ├── common/
│   │   ├── decorators/
│   │   ├── filters/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   └── pipes/
│   │
│   ├── database/
│   │   ├── prisma/
│   │   └── redis/
│   │
│   ├── jobs/
│   │   ├── data-sync/
│   │   └── media-processing/
│   │
│   └── main.ts
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
└── test/
```

## 📦 핵심 모듈 구현

### 1. 인증 모듈 (Auth Module)

#### JWT 전략 구현
```typescript
// auth/strategies/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    return { 
      userId: payload.sub, 
      email: payload.email,
      role: payload.role 
    };
  }
}
```

#### 인증 서비스
```typescript
// auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@/database/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        username: dto.username,
      },
    });

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    
    return tokens;
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatches = await bcrypt.compare(
      dto.password,
      user.password,
    );

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    
    return tokens;
  }

  async getTokens(userId: string, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email },
        { expiresIn: '15m' },
      ),
      this.jwtService.signAsync(
        { sub: userId, email },
        { expiresIn: '7d' },
      ),
    ]);

    return { accessToken, refreshToken };
  }
}
```

### 2. 음식점 모듈 (Restaurant Module)

#### 음식점 서비스
```typescript
// restaurants/restaurants.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/database/prisma/prisma.service';
import { RedisService } from '@/database/redis/redis.service';

@Injectable()
export class RestaurantsService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService,
  ) {}

  async getFeed(userId: string, params: FeedParams) {
    const cacheKey = `feed:${userId}:${JSON.stringify(params)}`;
    
    // 캐시 확인
    const cached = await this.redis.get(cacheKey);
    if (cached) return JSON.parse(cached);

    // 위치 기반 쿼리
    const restaurants = await this.prisma.$queryRaw`
      SELECT 
        r.*,
        ST_Distance(
          ST_MakePoint(${params.lng}, ${params.lat}),
          ST_MakePoint(r.longitude, r.latitude)
        ) as distance,
        (
          SELECT json_agg(c.*)
          FROM contents c
          WHERE c.restaurant_id = r.id
          ORDER BY c.display_order
          LIMIT 5
        ) as media
      FROM restaurants r
      WHERE 
        r.status = 'active'
        ${params.category ? `AND r.category = ${params.category}` : ''}
      ORDER BY 
        ${params.sort === 'distance' ? 'distance' : 'r.popularity_score DESC'}
      LIMIT ${params.limit}
      OFFSET ${(params.page - 1) * params.limit}
    `;

    // 사용자 선호도 반영
    const personalizedFeed = await this.personalizeResults(
      restaurants,
      userId,
    );

    // 캐시 저장 (5분)
    await this.redis.setex(
      cacheKey,
      300,
      JSON.stringify(personalizedFeed),
    );

    return personalizedFeed;
  }

  async personalizeResults(restaurants: any[], userId: string) {
    const userPreferences = await this.getUserPreferences(userId);
    
    return restaurants.map(restaurant => ({
      ...restaurant,
      score: this.calculateScore(restaurant, userPreferences),
    })).sort((a, b) => b.score - a.score);
  }

  private calculateScore(restaurant: any, preferences: any) {
    let score = restaurant.popularity_score;
    
    // 카테고리 매칭
    if (preferences.categories?.includes(restaurant.category)) {
      score += 10;
    }
    
    // 가격대 매칭
    if (restaurant.price_range === preferences.pricePreference) {
      score += 5;
    }
    
    // 거리 가중치
    if (restaurant.distance < 1000) { // 1km 이내
      score += 15;
    }
    
    return score;
  }

  async trackView(restaurantId: string, userId: string, duration: number) {
    // 조회수 증가
    await this.prisma.restaurant.update({
      where: { id: restaurantId },
      data: { view_count: { increment: 1 } },
    });

    // 사용자 상호작용 기록
    await this.prisma.userInteraction.create({
      data: {
        userId,
        restaurantId,
        type: 'view',
        duration,
      },
    });

    // 실시간 통계 업데이트
    await this.redis.hincrby(`stats:${restaurantId}`, 'views', 1);
  }
}
```

### 3. 공공데이터 동기화 모듈

#### 데이터 수집 작업
```typescript
// jobs/data-sync/public-data.processor.ts
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import axios from 'axios';

@Processor('data-sync')
export class PublicDataProcessor {
  constructor(
    private prisma: PrismaService,
    private logger: Logger,
  ) {}

  @Process('sync-restaurants')
  async syncRestaurants(job: Job) {
    this.logger.log('Starting restaurant data sync...');
    
    try {
      // 공공데이터 API 호출
      const response = await axios.get(
        `${process.env.PUBLIC_DATA_API_URL}/restaurants`,
        {
          params: {
            serviceKey: process.env.PUBLIC_DATA_SERVICE_KEY,
            pageNo: job.data.page,
            numOfRows: 100,
            type: 'json',
          },
        },
      );

      const restaurants = response.data.items;
      
      // 데이터 변환 및 저장
      for (const item of restaurants) {
        await this.processRestaurant(item);
      }

      // 다음 페이지 처리
      if (response.data.totalCount > job.data.page * 100) {
        await job.queue.add('sync-restaurants', {
          page: job.data.page + 1,
        });
      }

      return { processed: restaurants.length };
    } catch (error) {
      this.logger.error(`Sync failed: ${error.message}`);
      throw error;
    }
  }

  private async processRestaurant(data: any) {
    const transformed = this.transformData(data);
    
    await this.prisma.restaurant.upsert({
      where: { business_id: transformed.businessId },
      update: transformed,
      create: transformed,
    });

    // 이미지 다운로드 작업 추가
    if (data.imageUrl) {
      await this.downloadAndProcessImage(data.imageUrl);
    }
  }

  private transformData(raw: any) {
    return {
      businessId: raw.bizesId,
      name: raw.bizesNm,
      category: this.mapCategory(raw.indsLclsCd),
      addressFull: raw.rdnWhlAddr,
      latitude: parseFloat(raw.lat),
      longitude: parseFloat(raw.lon),
      phone: raw.telNo,
      // ... 추가 필드 매핑
    };
  }
}
```

### 4. 미디어 처리 모듈

#### 이미지 최적화 서비스
```typescript
// media/media-processing.service.ts
import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';
import { S3Service } from './s3.service';

@Injectable()
export class MediaProcessingService {
  constructor(private s3Service: S3Service) {}

  async processImage(file: Express.Multer.File) {
    const sizes = [
      { name: 'thumbnail', width: 150, height: 150 },
      { name: 'small', width: 400, height: 400 },
      { name: 'medium', width: 800, height: 800 },
      { name: 'large', width: 1920, height: 1080 },
    ];

    const results = await Promise.all(
      sizes.map(async (size) => {
        const buffer = await sharp(file.buffer)
          .resize(size.width, size.height, {
            fit: 'cover',
            position: 'center',
          })
          .webp({ quality: 85 })
          .toBuffer();

        const key = `images/${size.name}/${Date.now()}.webp`;
        const url = await this.s3Service.upload(buffer, key);
        
        return { size: size.name, url };
      }),
    );

    // Generate blur hash for placeholder
    const blurHash = await this.generateBlurHash(file.buffer);

    return {
      original: await this.s3Service.upload(file.buffer, `images/original/${Date.now()}.jpg`),
      variants: results,
      blurHash,
    };
  }

  async processVideo(file: Express.Multer.File) {
    // FFmpeg를 사용한 비디오 처리
    // - 압축
    // - 썸네일 생성
    // - HLS 스트리밍 변환
  }
}
```

### 5. 실시간 기능 (WebSocket)

#### 실시간 업데이트 게이트웨이
```typescript
// feeds/feeds.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
})
export class FeedsGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket) {
    const userId = await this.getUserFromToken(client.handshake.auth.token);
    
    if (userId) {
      client.join(`user:${userId}`);
      client.join('feed:updates');
    }
  }

  @SubscribeMessage('restaurant:like')
  async handleLike(client: Socket, payload: { restaurantId: string }) {
    const userId = client.data.userId;
    
    // 좋아요 처리
    await this.restaurantsService.toggleLike(
      payload.restaurantId,
      userId,
    );

    // 실시간 업데이트 브로드캐스트
    this.server.to('feed:updates').emit('restaurant:updated', {
      restaurantId: payload.restaurantId,
      likes: await this.getLikeCount(payload.restaurantId),
    });
  }

  @SubscribeMessage('feed:next')
  async handleNextFeed(client: Socket) {
    // 다음 피드 아이템 프리페치
    const nextItems = await this.feedService.prefetchNext(
      client.data.userId,
    );
    
    client.emit('feed:prefetched', nextItems);
  }
}
```

## 🔄 데이터베이스 연동

### Prisma 설정
```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Restaurant {
  id          String   @id @default(uuid())
  businessId  String   @unique @map("business_id")
  name        String
  category    String
  
  // Relations
  menus       Menu[]
  contents    Content[]
  reviews     Review[]
  
  // Indexes
  @@index([category])
  @@index([latitude, longitude])
  @@map("restaurants")
}
```

## 🚀 성능 최적화

### 캐싱 전략
```typescript
// common/decorators/cache.decorator.ts
export function Cacheable(ttl: number = 300) {
  return function (
    target: any,
    propertyName: string,
    descriptor: PropertyDescriptor,
  ) {
    const method = descriptor.value;
    
    descriptor.value = async function (...args: any[]) {
      const cacheKey = `${target.constructor.name}:${propertyName}:${JSON.stringify(args)}`;
      
      const cached = await redis.get(cacheKey);
      if (cached) return JSON.parse(cached);
      
      const result = await method.apply(this, args);
      await redis.setex(cacheKey, ttl, JSON.stringify(result));
      
      return result;
    };
  };
}

// Usage
@Cacheable(600) // 10분 캐시
async getPopularRestaurants() {
  // ...
}
```

### 데이터베이스 쿼리 최적화
```typescript
// 배치 로딩 (DataLoader)
import DataLoader from 'dataloader';

export class RestaurantLoader {
  private loader = new DataLoader(async (ids: string[]) => {
    const restaurants = await this.prisma.restaurant.findMany({
      where: { id: { in: ids } },
    });
    
    return ids.map(id => 
      restaurants.find(r => r.id === id)
    );
  });

  async load(id: string) {
    return this.loader.load(id);
  }
}
```

## 🔐 보안 구현

### Rate Limiting
```typescript
// common/guards/rate-limit.guard.ts
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  protected getTracker(req: Request): string {
    return req.user?.id || req.ip;
  }
}

// Usage in controller
@UseGuards(CustomThrottlerGuard)
@Throttle(10, 60) // 10 requests per minute
```

### Input Validation
```typescript
// dto/create-restaurant.dto.ts
import { IsString, IsNumber, IsArray, ValidateNested } from 'class-validator';

export class CreateRestaurantDto {
  @IsString()
  @Length(1, 100)
  name: string;

  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude: number;

  @IsArray()
  @IsString({ each: true })
  categories: string[];
}
```

## 📊 모니터링 및 로깅

### 로깅 설정
```typescript
// common/logger/logger.service.ts
import { LoggerService } from '@nestjs/common';
import * as winston from 'winston';

export class CustomLogger implements LoggerService {
  private logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.File({ 
        filename: 'error.log', 
        level: 'error' 
      }),
      new winston.transports.File({ 
        filename: 'combined.log' 
      }),
    ],
  });

  log(message: string, context?: string) {
    this.logger.info(message, { context });
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.error(message, { trace, context });
  }
}
```

### 헬스 체크
```typescript
// health/health.controller.ts
import { 
  HealthCheck, 
  HealthCheckService,
  TypeOrmHealthIndicator,
  DiskHealthIndicator 
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.db.pingCheck('database'),
      () => this.disk.checkStorage('storage', {
        path: '/',
        thresholdPercent: 0.9,
      }),
    ]);
  }
}
```

## 🧪 테스팅

### 유닛 테스트
```typescript
// restaurants.service.spec.ts
describe('RestaurantsService', () => {
  let service: RestaurantsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [RestaurantsService, PrismaService],
    }).compile();

    service = module.get<RestaurantsService>(RestaurantsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should return personalized feed', async () => {
    const userId = 'test-user-id';
    const feed = await service.getFeed(userId, {
      page: 1,
      limit: 10,
    });

    expect(feed).toHaveLength(10);
    expect(feed[0]).toHaveProperty('score');
  });
});
```