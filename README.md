# react-gift-product-list

## 3. 상품 목록 - API 연동 기초

### 0단계 미션 :

- [x] 상품 목록 저장소 포크, 클론
- [x] step0를 위한 브랜치 생성
- [x] 요구사항 기록을 위한 requirements.md 파일 준비, .gitignore로 등록
- [x] '2. 주문 폼' 미션의 코드 가져오기 → 테스트

### 1단계 미션 :
- [x] 선물하기 홈 > 선물 테마 섹션 
  - [x] /api/themes API를 사용하여 테마 목록 완성
  - [x] 데이터를 불러오는 동안 로딩 화면 구현
  - [x] 데이터가 없거나, 에러가 발생하면 선물 테마 섹션이 보여지지 않도록 구현
- [x] 선물하기 홈 > 실시간 급상승 선물랭킹 섹션 
  - [x] /api/products/ranking API를 사용하여 실시간 급상승 선물 랭킹 섹션 완성 
  - [x] API 명세를 살펴보고 각 필터 선택 시 해당 필터에 맞는 API를 재 요청
  - [x] 데이터를 불러오는 동안 로딩 화면 구현
  - [x] 보여 줄 상품 목록이 없을경우 상품 목록이 없다는 문구 표시
- [x] axios외에 별도의 fetch 관련 라이브러리를 사용하지 않고 구현
- [x] Suspense, ErrorBoundary도 사용 금지

### 2단계 미션 :
- [ ] 로그인 기능 
  - [ ] /login api 를 사용하여 로그인 기능을 완성해주세요.
  - [ ] 로그인 성공 시 내려오는 authToken과 email, name을 userInfo storage에 저장하고 활용해주세요.
  - [ ] 4XX 에러가 발생하면 Toast를 통해 에러메시지를 보여주세요. (react-toastify 라이브러리 사용)
- [ ] 주문하기 기능 
  - [ ] /products/:productId/summary api를 사용하여 제품 정보를 가져와주세요. 
  - [ ] 만약 제품 정보 API에서 4XX 에러가 발생하면 Toast를 통해 에러메시지를 보여주고, 선물하기 홈으로 연결시켜요. 
  - [ ] 보내는 사람 Input Field에 userInfo의 name을 defaultValue로 채워놔요. 
  - [ ] /order api를 사용하여 주문하기 기능을 완성해주세요. 
  - [ ] 주문하기 API의 경우 Authorization헤더에 로그인 응답에서 전달 받은 authToken을 넣어야만 동작해요. 
  - [ ] 주문하기 API에서 401 에러가 발생하면 로그인 페이지로 연결시켜요.
- [ ] axios외에 별도의 fetch 관련 라이브러리를 사용하지 않고 구현
- [ ] Suspense, ErrorBoundary도 사용 금지