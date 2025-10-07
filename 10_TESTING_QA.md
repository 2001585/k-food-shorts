# 🧪 테스팅 및 품질 관리

## 🎯 테스팅 목표
- 코드 커버리지 80% 이상 유지
- 자동화된 테스트 파이프라인
- 크로스 플랫폼 호환성 보장
- 성능 및 보안 테스트

## 📊 테스트 전략

### 테스트 피라미드
```
          ╱╲
         ╱E2E╲        (10%)
        ╱──────╲      
       ╱ Integr ╲     (30%)
      ╱──────────╲    
     ╱   Unit     ╲   (60%)
    ╱──────────────╲  
```

## 🔬 단위 테스트 (Unit Testing)

### Backend 단위 테스트
```typescript
// restaurants.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantsService } from './restaurants.service';
import { PrismaService } from '../prisma/prisma.service';

describe('RestaurantsService', () => {
  let service: RestaurantsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RestaurantsService,
        {
          provide: PrismaService,
          useValue: {
            restaurant: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<RestaurantsService>(RestaurantsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('getFeed', () => {
    it('should return personalized restaurant feed', async () => {
      const mockRestaurants = [
        { id: '1', name: '맛있는 식당', category: '한식' },
        { id: '2', name: '좋은 식당', category: '중식' },
      ];

      jest.spyOn(prisma.restaurant, 'findMany').mockResolvedValue(mockRestaurants);

      const result = await service.getFeed('user-id', {
        page: 1,
        limit: 10,
        category: '한식',
      });

      expect(result).toHaveLength(2);
      expect(prisma.restaurant.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            category: '한식',
          }),
        })
      );
    });

    it('should handle empty results', async () => {
      jest.spyOn(prisma.restaurant, 'findMany').mockResolvedValue([]);

      const result = await service.getFeed('user-id', {
        page: 1,
        limit: 10,
      });

      expect(result).toEqual([]);
    });
  });
});
```

### Frontend 단위 테스트
```tsx
// RestaurantCard.test.tsx
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { RestaurantCard } from './RestaurantCard';

describe('RestaurantCard', () => {
  const mockRestaurant = {
    id: '1',
    name: '맛있는 식당',
    category: '한식',
    media: [{ url: 'image.jpg', type: 'image' }],
    rating: 4.5,
  };

  it('should render restaurant information', () => {
    const { getByText, getByAltText } = render(
      <RestaurantCard restaurant={mockRestaurant} />
    );

    expect(getByText('맛있는 식당')).toBeInTheDocument();
    expect(getByText('한식')).toBeInTheDocument();
    expect(getByText('4.5')).toBeInTheDocument();
  });

  it('should handle double tap for like', async () => {
    const onLike = jest.fn();
    const { getByTestId } = render(
      <RestaurantCard restaurant={mockRestaurant} onLike={onLike} />
    );

    const card = getByTestId('restaurant-card');
    fireEvent.doubleClick(card);

    await waitFor(() => {
      expect(onLike).toHaveBeenCalledWith('1');
    });
  });

  it('should handle swipe up for next restaurant', () => {
    const onNext = jest.fn();
    const { getByTestId } = render(
      <RestaurantCard restaurant={mockRestaurant} onNext={onNext} />
    );

    const card = getByTestId('restaurant-card');
    
    // Simulate swipe up
    fireEvent.touchStart(card, { touches: [{ clientY: 500 }] });
    fireEvent.touchEnd(card, { touches: [{ clientY: 100 }] });

    expect(onNext).toHaveBeenCalled();
  });
});
```

## 🔄 통합 테스트 (Integration Testing)

### API 통합 테스트
```typescript
// app.e2e-spec.ts
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('Restaurants API', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('GET /api/v1/restaurants/feed', () => {
    it('should return restaurant feed', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/v1/restaurants/feed')
        .set('Authorization', 'Bearer test-token')
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('restaurants');
      expect(Array.isArray(response.body.data.restaurants)).toBe(true);
    });

    it('should filter by category', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/v1/restaurants/feed?category=한식')
        .set('Authorization', 'Bearer test-token')
        .expect(200);

      const restaurants = response.body.data.restaurants;
      expect(restaurants.every(r => r.category === '한식')).toBe(true);
    });

    it('should handle pagination', async () => {
      const page1 = await request(app.getHttpServer())
        .get('/api/v1/restaurants/feed?page=1&limit=5')
        .set('Authorization', 'Bearer test-token');

      const page2 = await request(app.getHttpServer())
        .get('/api/v1/restaurants/feed?page=2&limit=5')
        .set('Authorization', 'Bearer test-token');

      expect(page1.body.data.restaurants).not.toEqual(page2.body.data.restaurants);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
```

## 🎭 E2E 테스트 (End-to-End Testing)

### Mobile E2E 테스트 (Detox)
```javascript
// e2e/feed-flow.spec.js
describe('Feed Flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should show feed screen on launch', async () => {
    await expect(element(by.id('feed-screen'))).toBeVisible();
  });

  it('should scroll through restaurants', async () => {
    const firstRestaurant = await element(by.id('restaurant-0')).getAttributes();
    
    await element(by.id('feed-list')).swipe('up', 'slow');
    await waitFor(element(by.id('restaurant-1'))).toBeVisible().withTimeout(3000);
    
    const secondRestaurant = await element(by.id('restaurant-1')).getAttributes();
    expect(firstRestaurant.text).not.toBe(secondRestaurant.text);
  });

  it('should like restaurant on double tap', async () => {
    await element(by.id('restaurant-card')).multiTap(2);
    await expect(element(by.id('like-animation'))).toBeVisible();
    await waitFor(element(by.id('like-count'))).toHaveText('1').withTimeout(2000);
  });

  it('should open detail sheet on info tap', async () => {
    await element(by.id('info-button')).tap();
    await expect(element(by.id('detail-sheet'))).toBeVisible();
    await expect(element(by.id('menu-list'))).toBeVisible();
  });

  it('should bookmark restaurant', async () => {
    await element(by.id('bookmark-button')).tap();
    await expect(element(by.id('bookmark-icon'))).toHaveLabel('bookmarked');
  });
});
```

### Web E2E 테스트 (Playwright)
```typescript
// e2e/web-feed.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Restaurant Feed', () => {
  test('should navigate through restaurants', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // 첫 번째 레스토랑 확인
    const firstTitle = await page.locator('[data-testid="restaurant-name"]').first().textContent();
    
    // 스크롤하여 다음 레스토랑으로
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(500);
    
    const secondTitle = await page.locator('[data-testid="restaurant-name"]').first().textContent();
    expect(firstTitle).not.toBe(secondTitle);
  });

  test('should filter by category', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // 카테고리 필터 선택
    await page.click('[data-testid="category-filter"]');
    await page.click('[data-testid="category-한식"]');
    
    // 필터링된 결과 확인
    const restaurants = await page.locator('[data-testid="restaurant-category"]').allTextContents();
    expect(restaurants.every(cat => cat === '한식')).toBeTruthy();
  });

  test('should handle like interaction', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    const likeButton = page.locator('[data-testid="like-button"]').first();
    const likeCount = page.locator('[data-testid="like-count"]').first();
    
    const initialCount = await likeCount.textContent();
    await likeButton.dblclick();
    
    await expect(likeCount).not.toHaveText(initialCount);
  });
});
```

## 🚀 성능 테스트

### Load Testing (K6)
```javascript
// load-test.js
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

const errorRate = new Rate('errors');

export const options = {
  stages: [
    { duration: '2m', target: 100 },  // Ramp up
    { duration: '5m', target: 100 },  // Stay at 100 users
    { duration: '2m', target: 200 },  // Ramp up
    { duration: '5m', target: 200 },  // Stay at 200 users
    { duration: '2m', target: 0 },    // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],  // 95% of requests under 500ms
    errors: ['rate<0.01'],              // Error rate under 1%
  },
};

export default function () {
  const params = {
    headers: {
      'Authorization': 'Bearer ' + __ENV.API_TOKEN,
      'Content-Type': 'application/json',
    },
  };

  // Test feed endpoint
  const feedRes = http.get('https://api.kfoodshorts.com/api/v1/restaurants/feed', params);
  check(feedRes, {
    'feed status is 200': (r) => r.status === 200,
    'feed response time < 500ms': (r) => r.timings.duration < 500,
  });
  errorRate.add(feedRes.status !== 200);

  sleep(1);

  // Test like endpoint
  const likeRes = http.post(
    'https://api.kfoodshorts.com/api/v1/restaurants/1/like',
    null,
    params
  );
  check(likeRes, {
    'like status is 200': (r) => r.status === 200,
  });

  sleep(1);
}
```

### Performance Metrics
```typescript
// performance.test.ts
import { performance } from 'perf_hooks';

describe('Performance Tests', () => {
  it('should load feed within 2 seconds', async () => {
    const start = performance.now();
    
    const response = await fetch('/api/v1/restaurants/feed');
    const data = await response.json();
    
    const end = performance.now();
    const duration = end - start;
    
    expect(duration).toBeLessThan(2000);
    expect(data.restaurants).toHaveLength(10);
  });

  it('should handle 100 concurrent requests', async () => {
    const requests = Array(100).fill(null).map(() => 
      fetch('/api/v1/restaurants/feed')
    );
    
    const start = performance.now();
    const responses = await Promise.all(requests);
    const end = performance.now();
    
    expect(end - start).toBeLessThan(5000);
    expect(responses.every(r => r.ok)).toBe(true);
  });
});
```

## 🔐 보안 테스트

### Security Testing
```typescript
// security.test.ts
describe('Security Tests', () => {
  it('should prevent SQL injection', async () => {
    const maliciousInput = "'; DROP TABLE restaurants; --";
    
    const response = await request(app)
      .get(`/api/v1/restaurants/search?q=${maliciousInput}`)
      .expect(400);
    
    expect(response.body.error).toBeDefined();
  });

  it('should enforce rate limiting', async () => {
    const requests = Array(100).fill(null).map(() =>
      request(app).get('/api/v1/restaurants/feed')
    );
    
    const responses = await Promise.all(requests);
    const rateLimited = responses.some(r => r.status === 429);
    
    expect(rateLimited).toBe(true);
  });

  it('should require authentication', async () => {
    await request(app)
      .post('/api/v1/restaurants/1/like')
      .expect(401);
  });

  it('should validate input data', async () => {
    await request(app)
      .post('/api/v1/auth/register')
      .send({
        email: 'invalid-email',
        password: '123',  // Too short
      })
      .expect(400);
  });
});
```

## 📱 Cross-Platform Testing

### Device Testing Matrix
```yaml
# test-matrix.yml
devices:
  ios:
    - device: iPhone 14 Pro
      os: iOS 16
    - device: iPhone 12
      os: iOS 15
    - device: iPad Pro
      os: iPadOS 16
      
  android:
    - device: Pixel 7
      os: Android 13
    - device: Samsung Galaxy S23
      os: Android 13
    - device: OnePlus 11
      os: Android 13
      
  web:
    - browser: Chrome
      versions: [latest, latest-1]
    - browser: Safari
      versions: [latest]
    - browser: Firefox
      versions: [latest]
```

## 📈 테스트 커버리지

### Coverage Report
```bash
# Jest 커버리지 설정
{
  "jest": {
    "collectCoverage": true,
    "coverageThreshold": {
      "global": {
        "branches": 80,
        "functions": 80,
        "lines": 80,
        "statements": 80
      }
    },
    "coverageReporters": ["json", "lcov", "text", "html"],
    "collectCoverageFrom": [
      "src/**/*.{ts,tsx}",
      "!src/**/*.d.ts",
      "!src/**/*.spec.ts",
      "!src/**/*.test.ts"
    ]
  }
}
```

## 🔄 지속적 테스팅

### CI/CD 테스트 파이프라인
```yaml
# .github/workflows/test.yml
name: Test Pipeline

on: [push, pull_request]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: pnpm install
      - run: pnpm test:unit
      - uses: codecov/codecov-action@v3
        
  integration-tests:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
    steps:
      - uses: actions/checkout@v3
      - run: pnpm install
      - run: pnpm test:integration
      
  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: pnpm install
      - run: pnpm build
      - run: pnpm test:e2e
```

## 🐛 버그 트래킹

### Bug Report Template
```markdown
## Bug Report

**Description:**
[간단한 버그 설명]

**Steps to Reproduce:**
1. 
2. 
3. 

**Expected Behavior:**
[예상되는 동작]

**Actual Behavior:**
[실제 발생한 동작]

**Environment:**
- OS: 
- Browser/Device: 
- Version: 

**Screenshots:**
[스크린샷 첨부]

**Priority:** [Critical/High/Medium/Low]
```

## 📋 QA 체크리스트

### Release QA Checklist
- [ ] 모든 유닛 테스트 통과
- [ ] 통합 테스트 통과
- [ ] E2E 테스트 통과
- [ ] 성능 기준 충족
- [ ] 보안 스캔 통과
- [ ] 크로스 브라우저 테스트
- [ ] 모바일 디바이스 테스트
- [ ] 접근성 테스트
- [ ] 로컬라이제이션 테스트
- [ ] 회귀 테스트