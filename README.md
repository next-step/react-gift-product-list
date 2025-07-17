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

- 로그인 기능
  - [x] `/login api` 를 사용하여 로그인 기능을 완성하기
  - [x] 로그인 성공 시 내려오는 authToken과 email, name을 userInfo storage에 저장하고 활용하기
  - [x] 4XX 에러가 발생하면 Toast를 통해 에러메시지를 보여주기. ( [react-toastify](https://www.npmjs.com/package/react-toastify) 라이브러리 사용)

- 주문하기 기능
  - [x] `/products/:productId/summary` api를 사용하여 제품 정보를 가져오기
  - [x] 만약 제품 정보 API에서 4XX 에러가 발생하면 Toast를 통해 에러메시지를 보여주고, 선물하기 홈으로 연결시키기
  - [ ] 보내는 사람 Input Field에 userInfo의 name을 defaultValue로 채우기
  - [ ] `/order` api를 사용하여 주문하기 기능을 완성하기
  - [x] 주문하기 API의 경우 Authorization헤더에 로그인 응답에서 전달 받은 authToken을 넣어야만 동작하도록 구현하기
  - [ ] 주문하기 API에서 401 에러가 발생하면 로그인 페이지로 연결시키기

- [ ] 본인만의 기준으로 일관된 코드 작성
- [ ] 기능 단위로 나누어 커밋
- [ ] 재사용을 고려하여 API 구현
