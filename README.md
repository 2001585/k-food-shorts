# 🍽️ K-Food Shorts Platform
> 공공데이터 기반 음식점 숏폼 콘텐츠 플랫폼

## 📌 프로젝트 소개
K-Food Shorts는 공공데이터를 활용하여 음식점 정보를 TikTok/Instagram Reels 스타일의 숏폼 콘텐츠로 제공하는 크로스 플랫폼 서비스입니다.

### 주요 특징
- 🎬 세로형 숏폼 인터페이스
- 📱 크로스 플랫폼 지원 (Web + Mobile)
- 🗂️ 공공데이터 활용
- 📍 위치 기반 추천
- ⚡ 실시간 정보 업데이트

## 🚀 시작하기

### 필수 요구사항
- Node.js 20+
- pnpm 8+
- PostgreSQL 15+
- Redis 7+

### 설치 및 실행
```bash
# 저장소 클론
git clone https://github.com/yourusername/k-food-shorts.git
cd k-food-shorts

# 의존성 설치
pnpm install

# 환경 변수 설정
cp .env.example .env

# 데이터베이스 마이그레이션
pnpm db:migrate

# 개발 서버 실행
pnpm dev
```

## 📋 프로젝트 문서

### 개발 계획 문서
1. [프로젝트 개요](./01_PROJECT_OVERVIEW.md) - 프로젝트 목표 및 범위
2. [기술 스택](./02_TECH_STACK.md) - 사용 기술 및 아키텍처
3. [공공데이터 연동](./03_PUBLIC_DATA_INTEGRATION.md) - 데이터 수집 및 처리
4. [UI/UX 디자인](./04_UI_UX_DESIGN.md) - 디자인 시스템 및 가이드
5. [데이터베이스 설계](./05_DATABASE_DESIGN.md) - DB 스키마 및 최적화
6. [API 설계](./06_API_DESIGN.md) - RESTful API 명세
7. [프론트엔드 개발](./07_FRONTEND_DEVELOPMENT.md) - 웹/모바일 앱 개발
8. [백엔드 개발](./08_BACKEND_DEVELOPMENT.md) - 서버 개발 및 구현
9. [배포 및 운영](./09_DEPLOYMENT_OPERATIONS.md) - CI/CD 및 인프라
10. [테스팅 및 QA](./10_TESTING_QA.md) - 품질 관리 전략

## 🏗️ 프로젝트 구조
```
k-food-shorts/
├── 📁 apps/
│   ├── 📱 mobile/        # React Native + Expo
│   └── 💻 web/           # Next.js
├── 📦 packages/
│   ├── 🎨 ui/            # 공유 UI 컴포넌트
│   ├── 🔧 shared/        # 공유 유틸리티
│   └── 🔌 api-client/    # API 클라이언트
├── ⚙️ backend/           # NestJS 백엔드
└── 📝 docs/              # 문서
```

## 🛠️ 기술 스택

### Frontend
- **Mobile**: React Native + Expo
- **Web**: Next.js 14
- **상태관리**: Zustand
- **스타일링**: Tailwind CSS

### Backend
- **Framework**: NestJS
- **Database**: PostgreSQL + Prisma
- **Cache**: Redis
- **Queue**: Bull

### Infrastructure
- **Cloud**: AWS
- **Container**: Docker
- **CI/CD**: GitHub Actions
- **Monitoring**: CloudWatch + Sentry

## 📊 개발 진행 상황

### Phase 1: 프로젝트 설정 ✅
- [x] 프로젝트 구조 설계
- [x] 기술 스택 선정
- [x] 개발 문서 작성
- [x] Git 저장소 초기화

### Phase 2: 공공데이터 연동 (진행중)
- [ ] API 키 발급
- [ ] 데이터 수집 파이프라인 구축
- [ ] 데이터 정제 및 저장

### Phase 3: 백엔드 개발
- [ ] API 서버 구축
- [ ] 데이터베이스 구성
- [ ] 인증 시스템 구현

### Phase 4: 프론트엔드 개발
- [ ] 모바일 앱 개발
- [ ] 웹 애플리케이션 개발
- [ ] UI/UX 구현

### Phase 5: 숏폼 기능 구현
- [ ] 비디오 플레이어 개발
- [ ] 스와이프 인터랙션
- [ ] 실시간 업데이트

### Phase 6: 최적화 및 테스트
- [ ] 성능 최적화
- [ ] 크로스 플랫폼 테스트
- [ ] 보안 점검

### Phase 7: 배포
- [ ] 프로덕션 환경 구성
- [ ] CI/CD 파이프라인 구축
- [ ] 모니터링 시스템 구성

## 🤝 기여하기

프로젝트에 기여하고 싶으시다면:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 라이센스

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 연락처

프로젝트 관련 문의사항은 다음으로 연락주세요:

- Email: your.email@example.com
- GitHub: [@yourusername](https://github.com/yourusername)

## 🙏 감사의 글

- 공공데이터포털 (data.go.kr)
- 한국관광공사
- 오픈소스 커뮤니티

---

<p align="center">Made with ❤️ for Korean Food Lovers</p>