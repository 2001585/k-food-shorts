import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/database/prisma/prisma.service';
import { GetFeedDto } from './dto/get-feed.dto';

@Injectable()
export class RestaurantsService {
  constructor(private prisma: PrismaService) {}

  async getFeed(userId: string, getFeedDto: GetFeedDto) {
    const { page = 1, limit = 10, category, lat, lng, radius } = getFeedDto;
    const skip = (page - 1) * limit;

    // 기본 검색 조건
    const where: any = {
      status: 'active',
    };

    // 카테고리 필터
    if (category) {
      where.category = category;
    }

    // 위치 기반 필터링 (나중에 PostGIS 확장 사용시 개선)
    if (lat && lng && radius) {
      // 간단한 bounding box 계산 (실제로는 PostGIS 사용 권장)
      const latDelta = radius / 111; // 대략적인 위도 차이
      const lngDelta = radius / (111 * Math.cos((lat * Math.PI) / 180));

      where.latitude = {
        gte: lat - latDelta,
        lte: lat + latDelta,
      };
      where.longitude = {
        gte: lng - lngDelta,
        lte: lng + lngDelta,
      };
    }

    const [restaurants, total] = await Promise.all([
      this.prisma.restaurant.findMany({
        where,
        include: {
          contents: {
            take: 5,
            orderBy: { displayOrder: 'asc' },
          },
          menus: {
            where: { isPopular: true },
            take: 3,
          },
        },
        orderBy: { popularityScore: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.restaurant.count({ where }),
    ]);

    return {
      restaurants,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        hasNext: page * limit < total,
      },
    };
  }

  async getRestaurant(id: string) {
    const restaurant = await this.prisma.restaurant.findUnique({
      where: { id },
      include: {
        contents: {
          orderBy: { displayOrder: 'asc' },
        },
        menus: {
          orderBy: { displayOrder: 'asc' },
        },
        reviews: {
          include: {
            user: {
              select: {
                username: true,
                displayName: true,
                profileImage: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!restaurant) {
      throw new Error('Restaurant not found');
    }

    return restaurant;
  }

  async searchRestaurants(query: string) {
    if (!query || query.length < 2) {
      return { restaurants: [] };
    }

    const restaurants = await this.prisma.restaurant.findMany({
      where: {
        AND: [
          { status: 'active' },
          {
            OR: [
              { name: { contains: query } },
              { category: { contains: query } },
              { addressCity: { contains: query } },
              { addressDistrict: { contains: query } },
            ],
          },
        ],
      },
      include: {
        contents: {
          take: 1,
          orderBy: { displayOrder: 'asc' },
        },
      },
      take: 20,
      orderBy: { popularityScore: 'desc' },
    });

    return { restaurants };
  }
}