# 카카오 선물하기 페이지 클론코딩 프로젝트

# MISSION 1

- 홈과 로그인 구현하기 (https://kakaotech-mission1-home.pages.dev/)

# MISSION 2

- 주문 폼 처리 구현하기 (https://kakaotech-mission2-order-step2.pages.dev/)

# MISSION 3

- 상품 목록 - API 연동 하기 (기초) (https://kakaotech-mission3-api-foundation.pages.dev/)

---

## STEP 1

- 선물하기 홈 > 선물 테마 섹션
- 선물하기 홈 > 실시간 급상승 선물랭킹 섹션

## STEP 2

- 로그인 기능 구현 (API)
- 주문하기 기능 구현 (API)

## STEP 3

### 목표

- `Intersection Observer API`를 사용하여 페이지네이션을 구현
- 참고 URL을 참고하여 테마 상품 목록 페이지를 구현
- axios외에 별도의 fetch 관련 라이브러리를 사용하지 않고 구현
- Suspense, ErrorBoundary 사용하지 않기

### 요구사항

- 테마 상품 목록 페이지
  - [x] 선물하기 홈 > 선물 테마 섹션의 아이템을 클릭하면 테마 상품 목록 페이지로 연결
  - [x] `/api/themes/:themeId/info` API를 사용하여 선물 테마 섹션의 히어로 영역을 구현
  - [ ] 만약 테마 정보를 가져오는 API가 404 에러가 발생하면 선물하기 홈 페이지로 연결
  - [ ] `/api/themes/:themeId/products` API를 사용하여 상품 리스트를 구현
  - [ ] 무한 스크롤 기능을 구현
  - [ ] 상품 리스트가 없으면 빈 페이지를 보여주기

- [ ] 본인만의 기준으로 일관된 코드 작성
- [ ] 기능 단위로 나누어 커밋
- [ ] 재사용을 고려하여 컴포넌트, 비즈니스 로직을 구현
