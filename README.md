# react-gift-product-list

## 구현할 기능 목록

[ ] 상품 목록 - API 연동 기초
[x] 0단계 기본코드 준비
[x] 1단계 선물하기 메인 API 구현하기

      [x] 선물하기 홈 > 선물 테마 섹션 구현하기 - /api/themes API 사용하여 테마 목록 구성하기 - 데이터를 불러오는 동안 로딩 화면 보여주기 - 데이터가 없거나 에러 발생 시 테마 섹션 숨기기

            [x] 선물하기 홈 > 실시간 급상승 선물랭킹 섹션 구현하기
                  - /api/products/ranking API 사용하여 랭킹 섹션 구성하기
                  - 각 필터 선택 시 필터에 맞는 API 재요청하기
                  - 데이터 로딩 중에는 로딩 화면 보여주기
                  - 상품 목록이 없을 경우 "상품 목록이 없습니다." 문구 보여주기

[X] 2단계 로그인, 주문하기 API 구현하기

      [X] 로그인 기능
            - /login api 를 사용하여 로그인 기능을 완성해주세요.
            - 로그인 성공 시 내려오는 authToken과 email, name을 userInfo storage에 저장하고 활용해주세요.
            - 4XX 에러가 발생하면 Toast를 통해 에러메시지를 보여주세요. (react-toastify 라이브러리 사용)

      [X] 주문하기 기능
            - /products/:productId/summary api를 사용하여 제품 정보를 가져와주세요.
            - 만약 제품 정보 API에서 4XX 에러가 발생하면 Toast를 통해 에러메시지를 보여주고, 선물하기 홈으로 연결시켜요.
            - 보내는 사람 Input Field에 userInfo의 name을 defaultValue로 채워놔요.
            - /order api를 사용하여 주문하기 기능을 완성해주세요.
            - 주문하기 API의 경우 Authorization헤더에 로그인 응답에서 전달 받은 authToken을 넣어야만 동작해요.
            - 주문하기 API에서 401 에러가 발생하면 로그인 페이지로 연결시켜요.

[ ] 3단계 테마 상품 목록 페이지 구현하기

      [x] 선물하기 홈 > 선물 테마 아이템 클릭 시 테마 상품 목록 페이지로 이동하기
            - `/api/themes/:themeId/info` API를 사용하여 히어로 영역 구성하기
            - API 호출 실패(404) 시 홈 페이지로 리디렉션 처리하기

      [x] 테마 상품 목록 무한 스크롤 구현하기
            - `/api/themes/:themeId/products` API를 사용하여 상품 리스트 구성하기
            - Intersection Observer API를 사용하여 페이지네이션 처리하기
            - 상품이 없을 경우 빈 화면 처리하기

      [x] 구현 조건
            - axios 외 fetch 관련 라이브러리 사용하지 않기
            - Suspense, ErrorBoundary 사용하지 않기
            - 일관된 코드 스타일 유지하기
            - 기능 단위 커밋 진행하기
            - 재사용성 고려한 컴포넌트 및 로직 구성하기
