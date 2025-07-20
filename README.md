# react-gift-product-list

## Step 0. 프로젝트 세팅

- [x] 상품 목록 저장소 포크, 클론
- [x] 실습 환경 구축

## Step 1. 선물하기 메인 API 구현하기

### 선물하기 홈 > 선물 테마 섹션

- [x] /api/themes API 사용해 테마 목록 완성
- [x] 데이터 불러오는 동안 로딩 화면 만들기
- [x] 데이터가 없거나, 에러가 발생하면 선물 테마 섹션이 보여지지 않게 구현

### 선물하기 홈 > 실시간 급상승 선물랭킹 섹션

- [x] /api/products/ranking API 사용해 실시간 급상승 선물 랭킹 섹션 만들기
- [x] API 명세를 살펴보고 각 필터 선택 시 해당 필터에 맞는 API 요청
- [x] 데이터를 불러오는 동안 로딩 화면 만들기
- [x] 보여 줄 상품 목록이 없을경우 상품 목록이 없다는 문구 출력

## Step2. 로그인, 주문하기 API 구현하기

### 로그인 기능

- [x] /login api 를 사용하여 로그인 기능 완성
- [x] 로그인 성공 시 내려오는 authToken과 email, name을 userInfo storage 저장 및 활용
- [x] 4XX 에러가 발생하면 Toast를 통해 에러메시지 표시

### 주문하기 기능

- [x] /products/:productId/summary api를 사용하여 제품 정보 가져오기
- [x] 만약 제품 정보 API에서 4XX 에러가 발생하면 Toast를 통해 에러메시지 표시 후 선물하기 홈으로 연결
- [x] 보내는 사람 Input Field에 userInfo의 name을 defaultValue로 채우기
- [x] /order api를 사용하여 주문하기 기능 완성
- [x] 주문하기 API의 경우 Authorization헤더에 로그인 응답에서 전달 받은 authToken 넣어야 동작
- [x] 주문하기 API에서 401 에러가 발생하면 로그인 페이지로 연결

## Step3. 테마 상품 목록 페이지 구현하기

### 테마 상품 목록 페이지

- [x] 선물하기 홈 > 선물 테마 섹션의 아이템을 클릭 시 테마 상품 목록 페이지로 연결
- [x] /api/themes/:themeId/info API 사용해 선물 테마 섹션의 히어로 영역 구현
- [x] 테마 정보를 가져오는 API가 404 에러 발생 시 선물하기 홈 페이지로 연결
- [x] /api/themes/:themeId/products API 사용해 상품 리스트 구현
- [x] 무한 스크롤 기능 구현
- [x] 상품 리스트가 없으면 빈 페이지
