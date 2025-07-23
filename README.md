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

### 주문하기 기능

#### GiftOrderPage 리팩토링

- alert 추가(추후 toast로 통일 예정)
- Provider 리팩토링
- 모달과 GiftOrderPage의 응집도 높이기 위해 코드 수정

#### Ranking Section 오류 수정

- key를 잘못 주고 있었던 오류 수정

#### api를 사용하여 제품 정보 fetch

- GiftOrderPage 코드 정리
- api 사용하여 data 가져오기
- mock data로 사용하고 있던 부분을 가져온 데이터로 교체

#### 제품 정보 API 4XX 에러 처리

- useFetch 수정: hasError:boolean -> error: unknown
- toast를 이용하여 에러 메시지 출력

#### 보내는 사람 초기값 설정

- 보내는 사람 Input Field에 userInfo의 name을 defaultValue로 초기화
- 의존성 배열 navigate 누락 수정

#### order API 사용하여 주문하기 기능 구현

- API 이용하여 주문하기 로직 작성
- request를 위해 zod 스키마 및 CardSelector 컴포넌트 수정

#### 에러 처리

- 에러 발생시 toast 표시
- 401 에러시 login 페이지로 이동

#### post API 요청 리팩토링

- postRequest 작성
- post 요청하는 페이지 수정

## 리뷰 반영
