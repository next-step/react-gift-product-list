# react-gift-product-list

## ✅3번째 미션 0단계

### 요구사항

- [x] 2차 과제 내용 담긴 나의 코드 불러와 업로드하기

## ✅3번째 미션 1단계

### 요구사항

- [x] 본인만의 기준으로 일관된 코드를 작성해주세요.
- [x] 기능 단위로 나누어 커밋을 해주세요.
- [x] 재사용을 고려하여 API를 구현해요.
- [x] 선물하기 홈 > 선물 테마 섹션
  - [x] **`/api/themes`** API를 사용하여 테마 목록을 완성해주세요.
  - [x] 데이터를 불러오는 동안 로딩 화면을 만들어주세요.
  - [x] 데이터가 없거나, 에러가 발생하면 선물 테마 섹션이 보여지지 않게 해주세요.
- [x] 선물하기 홈 > 실시간 급상승 선물랭킹 섹션
  - [x] **`/api/products/ranking`** API를 사용하여 실시간 급상승 선물 랭킹 섹션을 만들어주세요.
  - [x] API 명세를 살펴보고 각 필터 선택 시 해당 필터에 맞는 API를 재 요청 해주세요.
  - [x] 데이터를 불러오는 동안 로딩 화면을 만들어주세요.
  - [x] 보여 줄 상품 목록이 없을경우 상품 목록이 없다는 문구를 보여주세요.

## ✅3번째 미션 2단계

### 요구사항

- [x] 본인만의 기준으로 일관된 코드를 작성해주세요.
- [x] 기능 단위로 나누어 커밋을 해주세요.
- [x] 로그인 기능
  - [x] **`/login`** api 를 사용하여 로그인 기능을 완성해주세요.
  - [x] 로그인 성공 시 내려오는 authToken과 email, name을 userInfo storage에 저장하고 활용해주세요.
  - [x] 4XX 에러가 발생하면 Toast를 통해 에러메시지를 보여주세요. ([react-toastify](https://www.npmjs.com/package/react-toastify) 라이브러리 사용)
- [x] 주문하기 기능
  - [x] **`/products/:productId/summary`** api를 사용하여 제품 정보를 가져와주세요.
  - [x] 만약 제품 정보 API에서 4XX 에러가 발생하면 Toast를 통해 에러메시지를 보여주고, 선물하기 홈으로 연결시켜요.
  - [x] 보내는 사람 Input Field에 userInfo의 name을 defaultValue로 채워놔요.
  - [x] **`/order`** api를 사용하여 주문하기 기능을 완성해주세요.
  - [x] 주문하기 API의 경우 Authorization헤더에 로그인 응답에서 전달 받은 authToken을 넣어야만 동작해요.
  - [x] 주문하기 API에서 401 에러가 발생하면 로그인 페이지로 연결시켜요.

## ✅3번째 미션 3단계

### 요구사항

- [ ] 본인만의 기준으로 일관된 코드를 작성해주세요.
- [ ] 기능 단위로 나누어 커밋을 해주세요.
- [ ] 재사용성을 고려하여 컴포넌트, 비즈니스 로직을 구현해요.
- [ ] 테마 상품 목록 페이지
  - [x] 선물하기 홈 > 선물 테마 섹션의 아이템을 클릭하면 테마 상품 목록 페이지로 연결돼요.
  - [x] **`/api/themes/:themeId/info`** API를 사용하여 선물 테마 섹션의 히어로 영역을 구현해요.
  - [x] 만약 테마 정보를 가져오는 API가 404 에러가 발생하면 선물하기 홈 페이지로 연결해요.
  - [x] **`/api/themes/:themeId/products`** API를 사용하여 상품 리스트를 구현해요.
  - [x] 무한 스크롤 기능을 구현해요.
  - [x] 상품 리스트가 없으면 빈 페이지를 보여줘요.
- [x] 2단계 피드백 반영
  - [x] isErrorWithMessage 유틸 함수로 분리
  - [x] api 관련 하드코딩 부분 상수화 처리
  - [x] useCategoryThemes.ts에서 useFetch() 라는 훅을 정의해서 사용
  - [x] CategoryContent 내부에서 useCategoryThemes를 호출
  - [x] OrderPage 내 로직 hook으로 분리
  - [x] ProductCard에서 호출 방식으로 ...product 활용
  - [x] ProductInfo에서 (product: ProductSummary) 방식 활용
  - [x] is는 변수에만 함수는 has를 사용하도록 변경
