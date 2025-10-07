# 🗂️ 공공데이터 연동 계획

## 📊 활용 가능한 공공데이터 소스

### 1. 공공데이터포털 (data.go.kr)

#### 주요 활용 API
| API 명칭 | 제공 정보 | 활용 계획 | 우선순위 |
|---------|---------|---------|---------|
| 소상공인 상가정보 | 음식점 기본정보, 업종, 주소 | 기본 데이터베이스 구축 | ⭐⭐⭐ |
| 한국관광공사 음식점정보 | 관광지 음식점, 메뉴, 이미지 | 콘텐츠 보강 | ⭐⭐⭐ |
| 지역별 맛집정보 | 지자체 추천 맛집 | 큐레이션 콘텐츠 | ⭐⭐ |
| 식품의약품안전처 음식점 위생등급 | 위생등급, 인증정보 | 신뢰도 지표 | ⭐⭐ |
| 행정안전부 영업정지/폐업정보 | 영업 상태 | 데이터 검증 | ⭐ |

### 2. 지자체 열린데이터
- 서울열린데이터광장
- 경기데이터드림
- 부산 공공데이터포털
- 각 시도별 맛집/음식점 정보

### 3. 추가 연동 가능 서비스
- 카카오맵 API (위치, 리뷰)
- 네이버 지역 API (리뷰, 블로그)
- 기상청 날씨 API (날씨별 음식 추천)

## 🔄 데이터 수집 전략

### Phase 1: 기본 데이터 구축 (1-2주차)
```javascript
// 데이터 수집 프로세스
const dataCollection = {
  sources: [
    {
      name: "소상공인 상가정보",
      endpoint: "http://apis.data.go.kr/store",
      frequency: "daily",
      dataPoints: ["name", "address", "category", "tel", "coordinates"]
    }
  ],
  process: [
    "1. API 키 발급",
    "2. 초기 전체 데이터 수집",
    "3. 데이터 정제 및 검증",
    "4. DB 저장"
  ]
};
```

### Phase 2: 데이터 보강 (3-4주차)
- 이미지/영상 수집
- 메뉴 정보 추가
- 영업시간 정보
- 주차/편의시설 정보

### Phase 3: 실시간 업데이트 (5주차~)
- 변경사항 감지 시스템
- 증분 업데이트
- 데이터 버전 관리

## 📝 데이터 스키마 설계

### 음식점 기본 정보
```typescript
interface Restaurant {
  id: string;                    // 고유 ID
  businessId: string;            // 사업자등록번호
  name: string;                  // 음식점명
  category: string;              // 업종 대분류
  subCategory: string;           // 업종 소분류
  address: {
    full: string;               // 전체 주소
    city: string;               // 시도
    district: string;           // 구군
    street: string;             // 도로명
    zipCode: string;            // 우편번호
  };
  coordinates: {
    lat: number;                // 위도
    lng: number;                // 경도
  };
  contact: {
    tel: string;                // 전화번호
    website?: string;           // 웹사이트
  };
  businessHours: {
    [key: string]: string;      // 요일별 영업시간
  };
  status: 'active' | 'inactive' | 'closed';
  createdAt: Date;
  updatedAt: Date;
}
```

### 메뉴 정보
```typescript
interface Menu {
  id: string;
  restaurantId: string;
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
  isPopular: boolean;
  isRecommended: boolean;
  allergyInfo?: string[];
}
```

### 콘텐츠 정보
```typescript
interface Content {
  id: string;
  restaurantId: string;
  type: 'image' | 'video' | 'text';
  url?: string;
  thumbnail?: string;
  caption?: string;
  tags: string[];
  viewCount: number;
  likeCount: number;
  order: number;
}
```

## 🔐 API 키 관리

### 환경 변수 설정
```env
# 공공데이터 API Keys
DATA_GO_KR_API_KEY=your_api_key_here
DATA_GO_KR_SERVICE_KEY=your_service_key_here

# 지도 서비스 API Keys
KAKAO_MAP_API_KEY=your_kakao_key_here
NAVER_MAP_CLIENT_ID=your_naver_id_here
NAVER_MAP_CLIENT_SECRET=your_naver_secret_here

# 기타 서비스
WEATHER_API_KEY=your_weather_key_here
```

## 📈 데이터 품질 관리

### 검증 규칙
1. **필수 필드 확인**
   - 음식점명, 주소, 카테고리
   - 좌표 정보 유효성

2. **중복 제거**
   - 사업자등록번호 기준
   - 이름+주소 조합

3. **정규화**
   - 주소 형식 통일
   - 전화번호 포맷
   - 카테고리 매핑

4. **최신성 유지**
   - 마지막 업데이트 시간 기록
   - 변경 이력 관리
   - 폐업 상태 반영

## 🔄 배치 처리 시스템

### Cron Job 스케줄
```javascript
// 데이터 수집 스케줄
const schedule = {
  "전체 데이터 수집": "0 3 * * 1",      // 매주 월요일 새벽 3시
  "증분 업데이트": "0 */6 * * *",       // 6시간마다
  "이미지 수집": "0 4 * * *",           // 매일 새벽 4시
  "데이터 검증": "0 5 * * *",           // 매일 새벽 5시
  "통계 생성": "0 6 * * *"              // 매일 새벽 6시
};
```

## 📊 모니터링 지표

### 데이터 수집 메트릭
- API 호출 횟수/성공률
- 수집된 데이터 건수
- 처리 시간
- 에러율

### 데이터 품질 메트릭
- 완성도 (필수 필드 충족률)
- 정확도 (검증 통과율)
- 최신성 (업데이트 주기)
- 커버리지 (지역별 분포)

## 🚨 에러 처리

### API 장애 대응
1. Retry 로직 (3회, exponential backoff)
2. Circuit Breaker 패턴
3. Fallback 데이터 사용
4. 알림 시스템

### 데이터 이상 감지
- 급격한 데이터 변화
- 비정상적 패턴
- 무결성 위반
- 자동 복구 시스템