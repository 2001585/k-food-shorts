# 📱 프론트엔드 개발 계획

## 🎯 개발 목표
- 네이티브 앱 수준의 성능과 UX
- 크로스 플랫폼 코드 재사용 극대화
- 숏폼 콘텐츠에 최적화된 인터페이스
- 오프라인 지원 및 PWA 기능

## 🏗️ 프로젝트 구조

### 모노레포 구조 (Turborepo/Nx)
```
k-food-shorts/
├── apps/
│   ├── mobile/           # React Native + Expo 앱
│   │   ├── src/
│   │   │   ├── screens/
│   │   │   ├── components/
│   │   │   ├── navigation/
│   │   │   └── services/
│   │   └── app.json
│   │
│   └── web/             # Next.js 웹 앱
│       ├── src/
│       │   ├── app/     # App Router
│       │   ├── components/
│       │   └── lib/
│       └── next.config.js
│
├── packages/
│   ├── shared/          # 공유 로직
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── constants/
│   │
│   ├── ui/              # 공유 UI 컴포넌트
│   │   ├── primitives/
│   │   └── theme/
│   │
│   └── api-client/      # API 클라이언트
│       ├── services/
│       └── types/
│
└── package.json
```

## 📱 모바일 앱 개발 (React Native + Expo)

### 핵심 스크린

#### 1. Feed Screen (메인 피드)
```tsx
// screens/FeedScreen.tsx
import { FlatList, Dimensions } from 'react-native';
import { RestaurantCard } from '@/components/RestaurantCard';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export function FeedScreen() {
  return (
    <FlatList
      data={restaurants}
      renderItem={({ item }) => (
        <RestaurantCard restaurant={item} />
      )}
      pagingEnabled
      snapToInterval={SCREEN_HEIGHT}
      decelerationRate="fast"
      showsVerticalScrollIndicator={false}
      onEndReached={loadMore}
      onEndReachedThreshold={3}
    />
  );
}
```

#### 2. Restaurant Card Component
```tsx
// components/RestaurantCard.tsx
import { Video } from 'expo-av';
import { GestureDetector } from 'react-native-gesture-handler';

export function RestaurantCard({ restaurant }) {
  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => handleLike());

  return (
    <GestureDetector gesture={doubleTap}>
      <View style={styles.container}>
        {/* 비디오/이미지 콘텐츠 */}
        <MediaPlayer source={restaurant.media} />
        
        {/* 액션 버튼 */}
        <ActionButtons>
          <LikeButton />
          <CommentButton />
          <ShareButton />
          <BookmarkButton />
        </ActionButtons>
        
        {/* 정보 오버레이 */}
        <InfoOverlay>
          <RestaurantName>{restaurant.name}</RestaurantName>
          <Location>{restaurant.location}</Location>
          <Description>{restaurant.description}</Description>
        </InfoOverlay>
      </View>
    </GestureDetector>
  );
}
```

### 네비게이션 구조
```tsx
// navigation/AppNavigator.tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Bookmarks" component={BookmarksScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={MainTabs} />
      <Stack.Screen name="RestaurantDetail" component={DetailScreen} />
      <Stack.Screen name="MenuDetail" component={MenuScreen} />
    </Stack.Navigator>
  );
}
```

### 상태 관리 (Zustand)
```typescript
// stores/useRestaurantStore.ts
import { create } from 'zustand';

interface RestaurantStore {
  restaurants: Restaurant[];
  currentIndex: number;
  loading: boolean;
  
  fetchRestaurants: () => Promise<void>;
  likeRestaurant: (id: string) => void;
  bookmarkRestaurant: (id: string) => void;
}

export const useRestaurantStore = create<RestaurantStore>((set, get) => ({
  restaurants: [],
  currentIndex: 0,
  loading: false,
  
  fetchRestaurants: async () => {
    set({ loading: true });
    const data = await api.getRestaurants();
    set({ restaurants: data, loading: false });
  },
  
  likeRestaurant: async (id) => {
    await api.likeRestaurant(id);
    // Update local state
  }
}));
```

## 💻 웹 앱 개발 (Next.js)

### 앱 라우터 구조
```
app/
├── (main)/
│   ├── page.tsx           # 메인 피드
│   ├── search/
│   │   └── page.tsx       # 검색
│   └── restaurant/
│       └── [id]/
│           └── page.tsx   # 상세 페이지
│
├── (auth)/
│   ├── login/
│   └── register/
│
└── layout.tsx             # 루트 레이아웃
```

### 메인 피드 페이지
```tsx
// app/(main)/page.tsx
'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { RestaurantFeed } from '@/components/RestaurantFeed';

export default function HomePage() {
  const { ref, inView } = useInView();
  
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ['restaurants'],
    queryFn: fetchRestaurants,
    getNextPageParam: (lastPage) => lastPage.nextCursor
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
      {data?.pages.map((page) =>
        page.restaurants.map((restaurant) => (
          <RestaurantFeed
            key={restaurant.id}
            restaurant={restaurant}
          />
        ))
      )}
      <div ref={ref} />
    </div>
  );
}
```

### 반응형 컴포넌트
```tsx
// components/RestaurantFeed.tsx
'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function RestaurantFeed({ restaurant }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div 
      className="h-screen snap-start relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* 비디오/이미지 배경 */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          src={restaurant.videoUrl}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      {/* 그라데이션 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />

      {/* 액션 버튼 */}
      <div className="absolute right-4 bottom-20 flex flex-col gap-4">
        <ActionButton icon="heart" onClick={handleLike} active={isLiked} />
        <ActionButton icon="comment" onClick={handleComment} />
        <ActionButton icon="share" onClick={handleShare} />
        <ActionButton icon="bookmark" onClick={handleBookmark} />
      </div>

      {/* 정보 섹션 */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h2 className="text-2xl font-bold">{restaurant.name}</h2>
        <p className="text-sm opacity-90">{restaurant.location}</p>
        <p className="mt-2">{restaurant.description}</p>
      </div>
    </motion.div>
  );
}
```

## 🎨 UI 컴포넌트 라이브러리

### 공유 컴포넌트 (packages/ui)
```typescript
// packages/ui/Button.tsx
import { Platform } from 'react-native';

export function Button({ onPress, children, variant = 'primary' }) {
  if (Platform.OS === 'web') {
    return (
      <button 
        onClick={onPress}
        className={`btn btn-${variant}`}
      >
        {children}
      </button>
    );
  }
  
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{children}</Text>
    </TouchableOpacity>
  );
}
```

## 🔄 데이터 페칭

### API 클라이언트 설정
```typescript
// packages/api-client/client.ts
import axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

const api = setupCache(instance, {
  ttl: 1000 * 60 * 5 // 5분 캐시
});

// 인터셉터 설정
api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### React Query 설정
```typescript
// lib/queryClient.ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5분
      cacheTime: 1000 * 60 * 10, // 10분
      retry: 3,
      refetchOnWindowFocus: false
    }
  }
});
```

## 📦 성능 최적화

### 이미지/비디오 최적화
```typescript
// 이미지 최적화 (Next.js)
import Image from 'next/image';

<Image
  src={restaurant.thumbnail}
  alt={restaurant.name}
  width={1080}
  height={1920}
  priority
  placeholder="blur"
  blurDataURL={restaurant.blurHash}
/>

// 비디오 최적화 (React Native)
import { Video } from 'expo-av';

<Video
  source={{ uri: restaurant.videoUrl }}
  rate={1.0}
  volume={0}
  isMuted={true}
  resizeMode="cover"
  shouldPlay={isVisible}
  isLooping
/>
```

### 무한 스크롤 최적화
```typescript
// 가상화 리스트 사용
import { VirtualizedList } from 'react-native';

<VirtualizedList
  data={restaurants}
  renderItem={renderRestaurant}
  getItemCount={() => restaurants.length}
  getItem={(data, index) => data[index]}
  windowSize={3}
  initialNumToRender={2}
  maxToRenderPerBatch={2}
/>
```

## 🧪 테스팅 전략

### 유닛 테스트
```typescript
// __tests__/RestaurantCard.test.tsx
import { render, fireEvent } from '@testing-library/react-native';

describe('RestaurantCard', () => {
  it('should handle double tap for like', () => {
    const { getByTestId } = render(<RestaurantCard {...props} />);
    const card = getByTestId('restaurant-card');
    
    fireEvent(card, 'doubleTap');
    expect(mockLike).toHaveBeenCalled();
  });
});
```

### E2E 테스트 (Detox)
```javascript
// e2e/feed.test.js
describe('Feed Flow', () => {
  it('should scroll through restaurants', async () => {
    await device.reloadReactNative();
    await expect(element(by.id('feed-screen'))).toBeVisible();
    await element(by.id('feed-list')).swipe('up');
    // Verify next restaurant is visible
  });
});
```

## 📱 PWA 설정

### next.config.js
```javascript
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
});

module.exports = withPWA({
  // Next.js config
});
```

### manifest.json
```json
{
  "name": "K-Food Shorts",
  "short_name": "KFood",
  "theme_color": "#FF3B30",
  "background_color": "#ffffff",
  "display": "standalone",
  "orientation": "portrait",
  "scope": "/",
  "start_url": "/",
  "icons": [
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

## 🚀 배포 준비

### 빌드 최적화
```bash
# Mobile
expo build:android --release-channel production
expo build:ios --release-channel production

# Web
npm run build
npm run export
```

### 환경 변수
```env
# .env.production
NEXT_PUBLIC_API_URL=https://api.kfoodshorts.com
NEXT_PUBLIC_CDN_URL=https://cdn.kfoodshorts.com
SENTRY_DSN=your_sentry_dsn
GA_TRACKING_ID=your_ga_id
```