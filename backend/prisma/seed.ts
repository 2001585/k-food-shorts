import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data
  await prisma.userInteraction.deleteMany();
  await prisma.review.deleteMany();
  await prisma.content.deleteMany();
  await prisma.menu.deleteMany();
  await prisma.user.deleteMany();
  await prisma.restaurant.deleteMany();

  // Create users
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'user1@example.com',
        password: hashedPassword,
        username: 'foodlover1',
        displayName: '음식 좋아해',
        preferredCategories: '한식,일식',
        pricePreference: 2,
      },
    }),
    prisma.user.create({
      data: {
        email: 'user2@example.com',
        password: hashedPassword,
        username: 'foodie2',
        displayName: '맛집헌터',
        preferredCategories: '양식,중식',
        pricePreference: 3,
      },
    }),
  ]);

  // Create restaurants with realistic Korean food data
  const restaurants = await Promise.all([
    prisma.restaurant.create({
      data: {
        businessId: 'BIZ001',
        name: '할머니의 손맛',
        category: '한식',
        subCategory: '한정식',
        description: '3대째 이어온 전통 한정식 전문점입니다. 정성으로 만든 반찬과 정갈한 한상차림을 맛보세요.',
        addressFull: '서울특별시 강남구 테헤란로 123',
        addressCity: '서울특별시',
        addressDistrict: '강남구',
        addressStreet: '테헤란로 123',
        zipCode: '06158',
        latitude: 37.5665,
        longitude: 127.0780,
        phone: '02-1234-5678',
        businessHours: JSON.stringify({
          mon: '11:00-21:00',
          tue: '11:00-21:00',
          wed: '11:00-21:00',
          thu: '11:00-21:00',
          fri: '11:00-21:00',
          sat: '11:00-21:00',
          sun: '휴무',
        }),
        parkingAvailable: true,
        ratingAvg: 4.5,
        ratingCount: 234,
        reviewCount: 189,
        priceRange: 2,
        avgPrice: 25000,
        viewCount: 1250,
        likeCount: 89,
        shareCount: 12,
        bookmarkCount: 45,
        popularityScore: 8.5,
        isVerified: true,
      },
    }),
    prisma.restaurant.create({
      data: {
        businessId: 'BIZ002',
        name: '라멘 타로',
        category: '일식',
        subCategory: '라멘',
        description: '진정한 일본식 돈코츠 라멘을 선보입니다. 18시간 우린 진한 국물이 일품입니다.',
        addressFull: '서울특별시 홍대입구 와우산로 29길 45',
        addressCity: '서울특별시',
        addressDistrict: '마포구',
        addressStreet: '와우산로29길 45',
        zipCode: '04048',
        latitude: 37.5563,
        longitude: 126.9226,
        phone: '02-2345-6789',
        businessHours: JSON.stringify({
          mon: '17:00-24:00',
          tue: '17:00-24:00',
          wed: '17:00-24:00',
          thu: '17:00-24:00',
          fri: '17:00-02:00',
          sat: '17:00-02:00',
          sun: '17:00-24:00',
        }),
        parkingAvailable: false,
        ratingAvg: 4.7,
        ratingCount: 456,
        reviewCount: 389,
        priceRange: 1,
        avgPrice: 12000,
        viewCount: 2340,
        likeCount: 156,
        shareCount: 28,
        bookmarkCount: 89,
        popularityScore: 9.2,
        isVerified: true,
      },
    }),
    prisma.restaurant.create({
      data: {
        businessId: 'BIZ003',
        name: 'Pasta Milano',
        category: '양식',
        subCategory: '이탈리안',
        description: '이탈리아에서 직접 공수한 재료로 만드는 정통 이탈리안 레스토랑입니다.',
        addressFull: '서울특별시 강남구 청담동 123-45',
        addressCity: '서울특별시',
        addressDistrict: '강남구',
        addressStreet: '청담동 123-45',
        zipCode: '06015',
        latitude: 37.5226,
        longitude: 127.0587,
        phone: '02-3456-7890',
        businessHours: JSON.stringify({
          mon: '11:30-22:00',
          tue: '11:30-22:00',
          wed: '11:30-22:00',
          thu: '11:30-22:00',
          fri: '11:30-23:00',
          sat: '11:30-23:00',
          sun: '11:30-22:00',
        }),
        parkingAvailable: true,
        ratingAvg: 4.2,
        ratingCount: 189,
        reviewCount: 156,
        priceRange: 3,
        avgPrice: 35000,
        viewCount: 890,
        likeCount: 67,
        shareCount: 15,
        bookmarkCount: 34,
        popularityScore: 7.8,
        isVerified: true,
      },
    }),
    prisma.restaurant.create({
      data: {
        businessId: 'BIZ004',
        name: '마라탕 전문점 얼쑤',
        category: '중식',
        subCategory: '중국요리',
        description: '진짜 사천식 마라탕과 마라샹궈를 맛볼 수 있는 곳입니다. 매운맛 단계 조절 가능!',
        addressFull: '서울특별시 신촌 연세로 12',
        addressCity: '서울특별시',
        addressDistrict: '서대문구',
        addressStreet: '연세로 12',
        zipCode: '03722',
        latitude: 37.5580,
        longitude: 126.9367,
        phone: '02-4567-8901',
        businessHours: JSON.stringify({
          mon: '11:00-23:00',
          tue: '11:00-23:00',
          wed: '11:00-23:00',
          thu: '11:00-23:00',
          fri: '11:00-24:00',
          sat: '11:00-24:00',
          sun: '11:00-23:00',
        }),
        parkingAvailable: false,
        ratingAvg: 4.4,
        ratingCount: 567,
        reviewCount: 445,
        priceRange: 1,
        avgPrice: 15000,
        viewCount: 1890,
        likeCount: 234,
        shareCount: 45,
        bookmarkCount: 123,
        popularityScore: 8.9,
        isVerified: false,
      },
    }),
    prisma.restaurant.create({
      data: {
        businessId: 'BIZ005',
        name: '카페 드 파리',
        category: '카페',
        subCategory: '디저트카페',
        description: '프랑스 정통 디저트와 원두커피를 즐길 수 있는 프리미엄 카페입니다.',
        addressFull: '서울특별시 압구정동 로데오거리 456',
        addressCity: '서울특별시',
        addressDistrict: '강남구',
        addressStreet: '압구정로 456',
        zipCode: '06009',
        latitude: 37.5270,
        longitude: 127.0286,
        phone: '02-5678-9012',
        businessHours: JSON.stringify({
          mon: '08:00-22:00',
          tue: '08:00-22:00',
          wed: '08:00-22:00',
          thu: '08:00-22:00',
          fri: '08:00-23:00',
          sat: '08:00-23:00',
          sun: '09:00-22:00',
        }),
        parkingAvailable: true,
        ratingAvg: 4.3,
        ratingCount: 234,
        reviewCount: 198,
        priceRange: 3,
        avgPrice: 28000,
        viewCount: 1120,
        likeCount: 78,
        shareCount: 23,
        bookmarkCount: 56,
        popularityScore: 7.6,
        isVerified: true,
      },
    }),
  ]);

  // Create menus for each restaurant
  const menus = [
    // 할머니의 손맛 메뉴
    {
      restaurantId: restaurants[0].id,
      items: [
        { name: '전통 한정식', price: 28000, isPopular: true, isRecommended: true },
        { name: '계절 정식', price: 35000, isRecommended: true },
        { name: '갈비탕', price: 15000, isPopular: true },
        { name: '냉면', price: 12000 },
      ]
    },
    // 라멘 타로 메뉴  
    {
      restaurantId: restaurants[1].id,
      items: [
        { name: '돈코츠 라멘', price: 12000, isPopular: true, isRecommended: true },
        { name: '미소 라멘', price: 11000, isPopular: true },
        { name: '챠슈멘', price: 15000, isRecommended: true },
        { name: '교자', price: 8000 },
      ]
    },
    // Pasta Milano 메뉴
    {
      restaurantId: restaurants[2].id,
      items: [
        { name: '크림 파스타', price: 28000, isPopular: true },
        { name: '토마토 파스타', price: 25000, isRecommended: true },
        { name: '피자 마르게리타', price: 32000, isPopular: true },
        { name: '리조또', price: 30000 },
      ]
    },
    // 마라탕 전문점 메뉴
    {
      restaurantId: restaurants[3].id,
      items: [
        { name: '마라탕 (소)', price: 12000, isPopular: true },
        { name: '마라탕 (대)', price: 18000, isRecommended: true },
        { name: '마라샹궈', price: 25000, isPopular: true },
        { name: '꿔바로우', price: 22000 },
      ]
    },
    // 카페 드 파리 메뉴
    {
      restaurantId: restaurants[4].id,
      items: [
        { name: '아메리카노', price: 6000, isPopular: true },
        { name: '카페라떼', price: 7000 },
        { name: '크루아상', price: 8000, isRecommended: true },
        { name: '마카롱 세트', price: 15000, isPopular: true },
      ]
    },
  ];

  for (const menuGroup of menus) {
    for (const item of menuGroup.items) {
      await prisma.menu.create({
        data: {
          restaurantId: menuGroup.restaurantId,
          ...item,
        },
      });
    }
  }

  // Create contents (images/videos) for restaurants
  const contentData = [
    // 할머니의 손맛
    {
      restaurantId: restaurants[0].id,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=400&h=600&fit=crop',
      thumbnailUrl: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=200&h=300&fit=crop',
      title: '전통 한정식',
      caption: '3대째 이어온 할머니의 손맛',
      tags: '한식,전통,정갈한',
    },
    // 라멘 타로
    {
      restaurantId: restaurants[1].id,
      type: 'image', 
      url: 'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=400&h=600&fit=crop',
      thumbnailUrl: 'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=200&h=300&fit=crop',
      title: '돈코츠 라멘',
      caption: '18시간 우린 진한 돈코츠 국물',
      tags: '라멘,일식,진한국물',
    },
    // Pasta Milano
    {
      restaurantId: restaurants[2].id,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=600&fit=crop',
      thumbnailUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=200&h=300&fit=crop',
      title: '정통 이탈리안',
      caption: '이탈리아 직수입 재료로 만든 파스타',
      tags: '파스타,이탈리안,정통',
    },
    // 마라탕 전문점
    {
      restaurantId: restaurants[3].id,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400&h=600&fit=crop',
      thumbnailUrl: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=200&h=300&fit=crop',
      title: '얼얼한 마라탕',
      caption: '진짜 사천식 마라탕의 매운맛',
      tags: '마라탕,중식,매운맛',
    },
    // 카페 드 파리
    {
      restaurantId: restaurants[4].id,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=600&fit=crop',
      thumbnailUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200&h=300&fit=crop',
      title: '프랑스 디저트',
      caption: '프리미엄 원두와 정통 디저트',
      tags: '카페,디저트,프리미엄',
    },
  ];

  for (const content of contentData) {
    await prisma.content.create({
      data: content,
    });
  }

  // Create some reviews
  const reviews = [
    {
      userId: users[0].id,
      restaurantId: restaurants[0].id,
      rating: 5,
      content: '정말 맛있어요! 할머니 손맛 그대로입니다. 반찬도 하나하나 정성이 느껴져요.',
    },
    {
      userId: users[1].id,
      restaurantId: restaurants[1].id,
      rating: 5,
      content: '돈코츠 라멘이 진짜 진하고 맛있어요. 면발도 쫄깃하고 최고!',
    },
    {
      userId: users[0].id,
      restaurantId: restaurants[2].id,
      rating: 4,
      content: '분위기도 좋고 파스타도 맛있었어요. 좀 비싸긴 하지만 데이트하기 좋아요.',
    },
  ];

  for (const review of reviews) {
    await prisma.review.create({
      data: review,
    });
  }

  console.log('✅ Database seeding completed!');
  console.log(`Created ${restaurants.length} restaurants`);
  console.log(`Created ${users.length} users`);
  console.log(`Created menus and content for all restaurants`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });