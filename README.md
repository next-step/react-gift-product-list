# react-gift-product-list

## 구현할 기능 목록

### 로그인 기능

- /login api 를 사용하여 로그인 기능을 완성
- 로그인 성공 시 내려오는 authToken과 email, name을 userInfo storage(Session storage)에 저장하고 활용
- 4XX 에러가 발생하면 Toast를 통해 에러메시지를 출력 (react-toastify 라이브러리 사용)

### 주문하기 기능

- /products/:productId/summary api를 사용하여 제품 정보를 받기
- 만약 제품 정보 API에서 4XX 에러가 발생하면 Toast를 통해 에러메시지를 보여주고, 선물하기 홈으로 연결
- 보내는 사람 Input Field에 userInfo의 name을 defaultValue로 채움
- /order api를 사용하여 주문하기 기능을 완성
- 주문하기 API의 경우 Authorization헤더에 로그인 응답에서 전달 받은 authToken을 넣어야만 동작
- 주문하기 API에서 401 에러가 발생하면 로그인 페이지로 연결

## 구현한 기능

### 로그인 기능

#### api로 로그인 기능 구현

- api를 사용하여 session storage에 authToken과 email, name 저장

#### toast를 이용하여 400번대 에러 처리

- 로그인 성공시 성공 메시지 출력
- 에러 발생시 에러 상황 출력

#### Login 리팩토링

- zod와 react-hook-form 이용하여 리팩토링

## 리뷰 반영
