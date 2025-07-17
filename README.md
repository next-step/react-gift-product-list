# react-gift-product-list

## Step1

### 선물하기 홈 > 선물 테마 섹션

- [x] /api/themes/ API 사용하여 테마 목록 완성
- [x] 데이터 불러오는 동안 로딩 화면 구현
- [x] 데이터가 없거나, 에러 발생 시 선물 테마 섹션이 보이지 않게

### 선물하기 홈 > 실시간 급상승 선물랭킹 섹션

- [x] /api/products/ranking API 사용하여 실시간 급상승 선물 랭킹 섹션 구현
- [x] 각 필터 선택 시 해당 필터에 맞는 API 재요청
- [x] 데이터 불러오는 동안 로딩 화면 구현
- [x] 보여 줄 상품 목록이 없을 경우 문구

## Step2

### 로그인 기능

- [x] /login api 사용하여 로그인 기능 완성
- [x] 로그인 성공 시 userInfo storage에 저장 및 활용
- [] 4XX 에러 발생 시 Toast 통해 에러메시지

### 주문하기 기능

- [] /products/:productId/summary api 사용하여 제품 정보 가져오기
- [] 4XX 에러 발생 시 Toast 통해 에러메시지, 홈으로 연결
- [] 보내는 사람 Input Field에 userInfo의 name을 defaultValue로 채우기
- [] /order api 사용하여 주문하기 기능 완성
- [] 주문하기 API는 Authorization 헤더에 로그인 응답에서 전달 받은 authToken을 넣어야만 동작
- [] 주문하기 API에서 401에러 발생 시 로그인 페이지로 연결
