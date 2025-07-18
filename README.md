# 미션 3 상품 목록 - API 연동 기초

<br />

## ✅ 0단계 - 기본 코드 준비

- [x] 저장소를 포크하고 클론하기
- [x] 실습 환경을 구축하기
- [x] 기능을 구현하기 전, README에 구현할 기능 목록을 정리해 추가하기
- [x] Git의 커밋 단위는 앞 단계에서 README.md에 정리한 기능 목록 단위로 추가하기
- [x] AngularJS Git Commit Message Conventions을 참고해 커밋 메시지를 작성하기

<br />

---

<br />

## ✅ 1단계 - 선물하기 메인 API 구현하기

- **선물하기 홈 > 선물 테마 섹션**
  - [x] /api/themes API를 사용하여 테마 목록을 완성하기
  - [x] 데이터를 불러오는 동안 로딩 화면 만들기
  - [x] 데이터가 없거나, 에러가 발생하면 선물 테마 섹션이 보여지지 않도록 하기
        <br />
- **선물하기 홈 > 실시간 급상승 선물랭킹 섹션**
  - [x] /api/products/ranking API를 사용하여 실시간 급상승 선물 랭킹 섹션을 만들기
  - [x] API 명세를 살펴보고 각 필터 선택 시 해당 필터에 맞는 API를 재요청하기
  - [x] 데이터를 불러오는 동안 로딩 화면 만들기
  - [x] 보여 줄 상품 목록이 없을 경우 상품 목록이 없다는 문구 보여주기

  <br />

---

<br />

## ✅ 2단계 - 로그인, 주문하기 API 구현하기

- **로그인 기능**
  - [x] /login api 를 사용하여 로그인 기능 완성하기
  - [x] 로그인 성공 시 내려오는 authToken과 email, name을 userInfo storage에 저장하고 활용하기
  - [x] 4XX 에러가 발생하면 Toast를 통해 에러메시지를 보여주기 (react-toastify 라이브러리 사용)
- **주문하기 기능**
  - [x] /products/:productId/summary api를 사용하여 제품 정보를 가져오기
  - [x] 만약 제품 정보 API에서 4XX 에러가 발생하면 Toast를 통해 에러메시지를 보여주고, 선물하기 홈으로 연결시키기
  - [x] 보내는 사람 Input Field에 userInfo의 name을 defaultValue로 채워놓기
  - [x] /order api를 사용하여 주문하기 기능을 완성하기
  - [x] 주문하기 API의 경우 Authorization헤더에 로그인 응답에서 전달 받은 authToken을 넣어야만 동작하도록 하기
  - [x] 주문하기 API에서 401 에러가 발생하면 로그인 페이지로 연결시키기
