# react-gift-product-list

## 1단계 - 선물하기 메인 API 구현하기

### 요구사항

#### 1. 선물 테마 섹션
- [x] /api/themes API를 사용하여 테마 목록을 완성
- [x] 데이터를 불러오는 동안 로딩 화면 만들기
- [x] 데이터가 없거나, 에러 발생 시 선물 테마 섹션이 보여지지 않음

#### 2. 실시간 급상승 선물 랭킹 섹션
- [x] /api/products/ranking API를 사용하여 실시간 급상승 선물 랭킹 섹션 만들기
- [x] API 명세를 살펴보고 각 필터 선택 시 해당 필터에 맞는 API를 재 요청
- [x] 데이터를 불러오는 동안 로딩 화면 만들기
- [x] 보여 줄 상품 목록이 없을경우 상품 목록이 없다는 문구 표시

## 2단계 - 로그인, 주문하기 API 구현하기

### 요구사항

#### 1. 로그인 기능
- [ ] /login api 를 사용하여 로그인 기능을 완성
- [ ] 로그인 성공 시 내려오는 authToken과 email, name을 userInfo storage에 저장하고 활용
- [ ] 4XX 에러가 발생하면 Toast를 통해 에러메시지 출력

#### 2. 주문하기 기능
- [ ] /products/:productId/summary api를 사용하여 제품 정보 가져오기
- [ ] 제품 정보 API에서 4XX 에러가 발생하면 Toast를 통해 에러메시지를 보여주고, 선물하기 홈으로 연결
- [ ] 보내는 사람 Input Field에 userInfo의 name을 defaultValue로 채우기
- [ ] /order api를 사용하여 주문하기 기능을 완성
- [ ] 주문하기 API의 경우 Authorization헤더에 로그인 응답에서 전달 받은 authToken을 넣어야만 동작
- [ ] 주문하기 API에서 401 에러가 발생하면 로그인 페이지로 연결