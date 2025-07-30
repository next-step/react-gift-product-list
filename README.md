# react-gift-product-list

카카오테크캠퍼스 2단계 3주차 과정을 공부하고 있습니다.

## 해야 할 일 (1단계)
* 선물하기 홈 > 선물 테마 섹션
  - /api/themes API를 사용하여 테마 목록을 완성하기
  - 데이터를 불러오는 동안 로딩 화면 만들기
  - 데이터가 없거나, 에러가 발생하면 선물 테마 섹션이 보여지지 않도록 하기

* 선물하기 홈 > 실시간 급상승 선물랭킹 섹션
  - /api/products/ranking API를 사용하여 실시간 급상승 선물 랭킹 섹션을 만들기
  - API 명세를 살펴보고 각 필터 선택 시 해당 필터에 맞는 API를 재요청하기
  - 데이터를 불러오는 동안 로딩 화면 만들기
  - 보여 줄 상품 목록이 없을 경우 상품 목록이 없다는 문구 보여주기

## 해야 할 일 (2단계)
* 로그인 기능
  - `/login` api를 사용하여 로그인 기능 완성하기
  - 로그인 성공 시 내려오는 authToken과 email, name을 userInfo storage에 저장하고 활용하기
  - 4XX 에러가 발생하면 Toast를 통해 에러메시지를 보여주기 (`react-toastify` 라이브러리 사용)
* 주문하기 기능
  - `/products/:productId/summary` api를 사용하여 제품 정보를 가져오기
  - 제품 정보 API에서 4XX 에러가 발생하면 Toast를 통해 에러메시지를 보여주고, 선물하기 홈으로 연결시키기
  - 보내는 사람 Input Field에 userInfo의 name을 defaultValue로 채워놓기
  - `/order` api를 사용하여 주문하기 기능을 완성하기
  - 주문하기 API의 경우 Authorization헤더에 로그인 응답에서 전달 받은 authToken을 넣어야만 동작하도록 하기
  - 주문하기 API에서 401 에러가 발생하면 로그인 페이지로 연결시키기

  ## 해야 할 일 (3단계)
* 목표
  - `Intersection Observer API`를 사용하여 페이지네이션 구현하기
  - axios외에 별도의 fetch 관련 라이브러리를 사용하지 않고 구현하기
  - Suspense, ErrorBoundary도 사용하지 않기

* 테마 상품 목록 페이지 구현
  - 선물하기 홈 > 선물 테마 섹션의 아이템을 클릭하면 테마 상품 목록 페이지로 연결하기
  - `/api/themes/:themeId/info` API를 사용하여 선물 테마 섹션의 히어로 영역을 구현하기
  - 만약 테마 정보를 가져오는 API가 404 에러가 발생하면 선물하기 홈 페이지로 연결하기
  - `/api/themes/:themeId/products` API를 사용하여 상품 리스트를 구현하기
  - 무한 스크롤 기능을 구현하기
  - 상품 리스트가 없으면 빈 페이지를 보여주기