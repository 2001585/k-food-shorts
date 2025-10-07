# 🎨 UI/UX 디자인 가이드

## 🎯 디자인 컨셉

### 핵심 가치
- **Instant Discovery**: 즉각적인 음식점 발견
- **Visual First**: 시각적 콘텐츠 중심
- **Smooth Experience**: 부드러운 전환과 애니메이션
- **Addictive Interaction**: 중독성 있는 인터랙션

## 📱 숏폼 UI 구조

### 메인 화면 레이아웃
```
┌─────────────────────────┐
│     Status Bar          │ ← 시간, 배터리 등
├─────────────────────────┤
│                         │
│                         │
│      Food Image/        │ ← 풀스크린 이미지/영상
│        Video            │   (9:16 비율)
│                         │
│                         │
├─────────────────────────┤
│ ❤️ 💬 ↗️ 🔖            │ ← 액션 버튼 (우측)
├─────────────────────────┤
│ 🏪 음식점명              │
│ 📍 강남구 · 한식         │ ← 정보 오버레이 (하단)
│ ⭐ 4.5 · 💰 15,000원    │
│ 📝 시그니처 메뉴는...    │
└─────────────────────────┘
│     Navigation Bar      │ ← 홈/탐색/프로필
└─────────────────────────┘
```

### 제스처 인터랙션
| 제스처 | 동작 | 피드백 |
|--------|------|--------|
| 스와이프 업 ↑ | 다음 음식점 | 슬라이드 전환 |
| 스와이프 다운 ↓ | 이전 음식점 | 슬라이드 전환 |
| 더블 탭 | 좋아요 | 하트 애니메이션 |
| 좌우 스와이프 | 이미지 전환 | 페이지 인디케이터 |
| 길게 누르기 | 일시정지/메뉴 | 오버레이 표시 |
| 핀치 줌 | 이미지 확대 | 줌 인/아웃 |

## 🎨 디자인 시스템

### 컬러 팔레트
```scss
// Primary Colors
$primary-red: #FF3B30;      // 메인 강조색 (좋아요, CTA)
$primary-orange: #FF9500;   // 보조 강조색 (별점, 뱃지)

// Neutral Colors
$black: #1C1C1E;           // 메인 텍스트
$gray-900: #2C2C2E;        // 서브 텍스트
$gray-500: #8E8E93;        // 비활성 요소
$gray-100: #F2F2F7;        // 배경
$white: #FFFFFF;           // 카드 배경

// Semantic Colors
$success: #34C759;         // 영업중
$warning: #FF9500;         // 곧 마감
$error: #FF3B30;           // 영업종료
$info: #007AFF;            // 정보

// Dark Mode
$dark-bg: #000000;
$dark-surface: #1C1C1E;
$dark-text: #FFFFFF;
```

### 타이포그래피
```css
/* Display - 음식점명 */
.display {
  font-size: 24px;
  font-weight: 700;
  line-height: 1.2;
}

/* Title - 섹션 제목 */
.title {
  font-size: 20px;
  font-weight: 600;
  line-height: 1.3;
}

/* Body - 본문 */
.body {
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
}

/* Caption - 부가 정보 */
.caption {
  font-size: 14px;
  font-weight: 400;
  line-height: 1.4;
}

/* Label - 태그, 라벨 */
.label {
  font-size: 12px;
  font-weight: 500;
  line-height: 1.3;
}
```

### 아이콘 시스템
- **Style**: Filled + Outline 혼용
- **Size**: 24px (기본), 32px (액션 버튼)
- **Library**: React Native Vector Icons / Heroicons

## 📐 컴포넌트 디자인

### 1. 음식점 카드 (메인 콘텐츠)
```jsx
<FoodCard>
  <MediaContent>
    - 이미지/비디오 (풀스크린)
    - 자동 재생 (음소거)
    - 3-5초 자동 전환
  </MediaContent>
  
  <ActionButtons>
    - 좋아요 (하트)
    - 댓글
    - 공유
    - 저장
  </ActionButtons>
  
  <InfoOverlay>
    - 음식점명
    - 카테고리/위치
    - 평점/가격대
    - 짧은 설명 (2줄)
  </InfoOverlay>
</FoodCard>
```

### 2. 상세 정보 시트 (Bottom Sheet)
```jsx
<DetailSheet>
  <Handle />
  <RestaurantInfo>
    - 전체 메뉴
    - 영업시간
    - 전화/예약
    - 상세 주소
    - 리뷰
  </RestaurantInfo>
</DetailSheet>
```

### 3. 필터/카테고리 선택
```jsx
<FilterBar>
  <CategoryChips>
    - 전체
    - 한식
    - 중식
    - 일식
    - 양식
    - 카페/디저트
  </CategoryChips>
  
  <SortOptions>
    - 거리순
    - 인기순
    - 평점순
    - 가격순
  </SortOptions>
</FilterBar>
```

## 🎬 애니메이션 & 트랜지션

### 페이지 전환
- **Duration**: 300ms
- **Easing**: cubic-bezier(0.4, 0, 0.2, 1)
- **Type**: Vertical slide (메인 피드)

### 마이크로 인터랙션
```javascript
// 좋아요 애니메이션
const likeAnimation = {
  scale: [1, 1.2, 0.9, 1],
  duration: 400,
  haptic: 'impact-light'
};

// 스크롤 physics
const scrollConfig = {
  snapToInterval: screenHeight,
  decelerationRate: 'fast',
  showsVerticalScrollIndicator: false,
  pagingEnabled: true
};
```

## 📱 반응형 디자인

### 브레이크포인트
```scss
$mobile-sm: 360px;   // 소형 모바일
$mobile-md: 390px;   // 일반 모바일
$mobile-lg: 428px;   // 대형 모바일
$tablet: 768px;      // 태블릿
$desktop: 1024px;    // 데스크톱
```

### 적응형 레이아웃
- **Mobile**: 풀스크린 세로 모드
- **Tablet**: 2-3 컬럼 그리드
- **Desktop**: 중앙 정렬 + 사이드바

## 🌗 다크모드 지원

### 자동 전환
- 시스템 설정 따름
- 수동 토글 옵션
- 부드러운 전환 애니메이션

## ♿ 접근성 고려사항

### WCAG 2.1 Level AA 준수
- 색상 대비율 4.5:1 이상
- 터치 타겟 44x44px 이상
- 스크린 리더 지원
- 키보드 네비게이션
- 모션 감소 옵션

### 접근성 라벨
```jsx
<TouchableOpacity
  accessible={true}
  accessibilityLabel="좋아요"
  accessibilityRole="button"
  accessibilityState={{ selected: isLiked }}
>
  <HeartIcon />
</TouchableOpacity>
```

## 🔄 상태별 UI

### 로딩 상태
- Skeleton Screen
- Progressive Loading
- Shimmer Effect

### 빈 상태
- 일러스트레이션
- 안내 메시지
- CTA 버튼

### 에러 상태
- 에러 메시지
- 재시도 버튼
- 대체 콘텐츠

## 📏 디자인 가이드라인

### Do's ✅
- 시각적 계층 구조 명확히
- 일관된 여백과 정렬
- 직관적인 제스처 사용
- 즉각적인 피드백 제공

### Don'ts ❌
- 과도한 애니메이션
- 작은 터치 영역
- 복잡한 네비게이션
- 느린 로딩 시간