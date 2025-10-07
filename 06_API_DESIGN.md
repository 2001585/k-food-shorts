# 🔌 API 설계

## 🏗️ API 아키텍처

### RESTful API 원칙
- Resource 중심 설계
- HTTP 메소드 활용 (GET, POST, PUT, DELETE)
- 상태 코드 표준 준수
- JSON 응답 형식
- API 버전 관리 (/api/v1)

## 📍 API Endpoints

### 인증 관련 API

#### 회원가입
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "phone": "010-1234-5678",
  "password": "securePassword123!",
  "username": "foodlover",
  "displayName": "음식 좋아해"
}

Response: 201 Created
{
  "success": true,
  "data": {
    "user": { ... },
    "tokens": {
      "accessToken": "jwt_token_here",
      "refreshToken": "refresh_token_here"
    }
  }
}
```

#### 로그인
```http
POST /api/v1/auth/login
{
  "email": "user@example.com",
  "password": "securePassword123!"
}

Response: 200 OK
{
  "success": true,
  "data": {
    "user": { ... },
    "tokens": { ... }
  }
}
```

### 음식점 관련 API

#### 음식점 피드 조회 (메인 숏폼)
```http
GET /api/v1/restaurants/feed
Authorization: Bearer {token}

Query Parameters:
- page (default: 1)
- limit (default: 10)
- category (optional)
- lat (optional) - 현재 위도
- lng (optional) - 현재 경도
- radius (optional) - 반경 (km)

Response: 200 OK
{
  "success": true,
  "data": {
    "restaurants": [
      {
        "id": "uuid",
        "name": "맛있는 식당",
        "category": "한식",
        "subCategory": "찌개",
        "media": [
          {
            "type": "image",
            "url": "https://cdn.../image1.jpg",
            "thumbnail": "https://cdn.../thumb1.jpg"
          }
        ],
        "location": {
          "address": "서울시 강남구...",
          "lat": 37.123456,
          "lng": 127.123456,
          "distance": 1.2  // km
        },
        "rating": {
          "average": 4.5,
          "count": 234
        },
        "priceRange": 2,
        "tags": ["인기", "주차가능"],
        "businessHours": {
          "today": "11:00-22:00",
          "status": "open"
        }
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 50,
      "totalItems": 500,
      "hasNext": true
    }
  }
}
```

#### 음식점 상세 정보
```http
GET /api/v1/restaurants/{id}

Response: 200 OK
{
  "success": true,
  "data": {
    "restaurant": {
      "id": "uuid",
      "name": "맛있는 식당",
      "description": "30년 전통의...",
      "category": "한식",
      "media": [...],
      "menus": [
        {
          "id": "menu_id",
          "name": "김치찌개",
          "price": 8000,
          "description": "직접 담근 김치로...",
          "imageUrl": "...",
          "isPopular": true
        }
      ],
      "reviews": {
        "average": 4.5,
        "count": 234,
        "recent": [...]
      },
      "businessHours": {...},
      "contact": {...},
      "facilities": ["주차", "단체석", "와이파이"]
    }
  }
}
```

#### 음식점 검색
```http
GET /api/v1/restaurants/search
Query Parameters:
- q (검색어)
- category
- minRating
- maxPrice
- sort (distance|rating|price|popularity)

Response: 200 OK
{
  "success": true,
  "data": {
    "results": [...],
    "totalCount": 150
  }
}
```

### 메뉴 관련 API

#### 메뉴 목록 조회
```http
GET /api/v1/restaurants/{restaurantId}/menus

Response: 200 OK
{
  "success": true,
  "data": {
    "menus": [
      {
        "category": "메인 요리",
        "items": [...]
      }
    ]
  }
}
```

### 사용자 상호작용 API

#### 좋아요
```http
POST /api/v1/restaurants/{id}/like
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "data": {
    "liked": true,
    "likeCount": 235
  }
}
```

#### 북마크
```http
POST /api/v1/restaurants/{id}/bookmark
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "data": {
    "bookmarked": true,
    "bookmarkCount": 89
  }
}
```

#### 조회 기록
```http
POST /api/v1/restaurants/{id}/view
Authorization: Bearer {token}

{
  "duration": 15,  // 초 단위
  "source": "feed"
}

Response: 200 OK
{
  "success": true,
  "data": {
    "viewCount": 1234
  }
}
```

### 리뷰 관련 API

#### 리뷰 작성
```http
POST /api/v1/restaurants/{id}/reviews
Authorization: Bearer {token}

{
  "rating": 5,
  "content": "정말 맛있었어요!",
  "images": ["image_url1", "image_url2"]
}

Response: 201 Created
{
  "success": true,
  "data": {
    "review": {...}
  }
}
```

### 사용자 관련 API

#### 프로필 조회
```http
GET /api/v1/users/profile
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "username": "foodlover",
      "displayName": "음식 좋아해",
      "profileImage": "...",
      "stats": {
        "totalViews": 150,
        "totalLikes": 45,
        "totalBookmarks": 23
      }
    }
  }
}
```

#### 선호도 설정
```http
PUT /api/v1/users/preferences
Authorization: Bearer {token}

{
  "categories": ["한식", "일식"],
  "pricePreference": 2,
  "dietaryRestrictions": ["채식"]
}

Response: 200 OK
```

### 파일 업로드 API

#### 이미지 업로드
```http
POST /api/v1/upload/image
Content-Type: multipart/form-data
Authorization: Bearer {token}

FormData:
- file: image file
- type: "profile" | "review" | "content"

Response: 200 OK
{
  "success": true,
  "data": {
    "url": "https://cdn.../uploaded_image.jpg",
    "thumbnail": "https://cdn.../thumb.jpg"
  }
}
```

## 🔒 API 보안

### 인증 방식
```javascript
// JWT Token Structure
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "userId": "uuid",
    "email": "user@example.com",
    "role": "user",
    "iat": 1234567890,
    "exp": 1234567890
  }
}

// Token Refresh Flow
POST /api/v1/auth/refresh
{
  "refreshToken": "refresh_token_here"
}
```

### Rate Limiting
```javascript
// 레이트 리미트 설정
const rateLimits = {
  general: "100 requests per 15 minutes",
  auth: "5 requests per 15 minutes",
  upload: "10 requests per hour"
};

// Response Headers
{
  "X-RateLimit-Limit": "100",
  "X-RateLimit-Remaining": "95",
  "X-RateLimit-Reset": "1234567890"
}
```

## 📝 API 응답 형식

### 성공 응답
```json
{
  "success": true,
  "data": {
    // response data
  },
  "meta": {
    "timestamp": "2024-01-01T12:00:00Z",
    "version": "v1"
  }
}
```

### 에러 응답
```json
{
  "success": false,
  "error": {
    "code": "INVALID_REQUEST",
    "message": "요청이 올바르지 않습니다",
    "details": {
      "field": "email",
      "reason": "이메일 형식이 올바르지 않습니다"
    }
  },
  "meta": {
    "timestamp": "2024-01-01T12:00:00Z",
    "requestId": "req_123456"
  }
}
```

## 📊 에러 코드

| Code | HTTP Status | Description |
|------|-------------|-------------|
| UNAUTHORIZED | 401 | 인증 필요 |
| FORBIDDEN | 403 | 권한 없음 |
| NOT_FOUND | 404 | 리소스 없음 |
| VALIDATION_ERROR | 400 | 유효성 검사 실패 |
| RATE_LIMIT_EXCEEDED | 429 | 요청 한도 초과 |
| INTERNAL_ERROR | 500 | 서버 오류 |

## 🔄 API 버전 관리

### 버전 전략
- URL 경로에 버전 포함: `/api/v1/`, `/api/v2/`
- Deprecation 정책: 6개월 전 공지
- Backward compatibility 유지

### Migration Guide
```javascript
// v1 → v2 변경사항
{
  "deprecated": {
    "/api/v1/restaurants/list": "Use /api/v2/restaurants/feed"
  },
  "breaking_changes": [
    "Response structure changed",
    "New required parameters"
  ]
}
```

## 📚 API 문서화

### Swagger/OpenAPI
```yaml
openapi: 3.0.0
info:
  title: K-Food Shorts API
  version: 1.0.0
  description: 음식점 숏폼 플랫폼 API

paths:
  /api/v1/restaurants/feed:
    get:
      summary: 음식점 피드 조회
      parameters:
        - name: page
          in: query
          schema:
            type: integer
      responses:
        200:
          description: Success
```

## 🧪 API 테스팅

### 테스트 시나리오
1. **Unit Tests**: 개별 엔드포인트 테스트
2. **Integration Tests**: 전체 플로우 테스트
3. **Load Tests**: 부하 테스트
4. **Security Tests**: 보안 취약점 테스트

### 테스트 도구
- Postman Collection
- Jest + Supertest
- K6 (부하 테스트)
- OWASP ZAP (보안 테스트)