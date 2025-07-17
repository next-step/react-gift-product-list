# react-gift-order

## step1

- 선물하기 페이지 테마 목록 api 연결
  - 데이터를 불러오는 동안 로딩 화면 제작
  - 데이터가 없거나 에러가 발생하면 선물 테마 섹션이 보이지 않도록 설정
- 선물하기 페이지 실시간 급상승 선물랭킹 섹션 api 연결
  - 필터 변경 시 필터에 맞는 api 요청
  - 데이터를 불러오는 동안 로딩 화면 제작
  - 보여줄 상품 목록이 없을 경우 상품 목록이 없다는 문구 표시

## step2

- step1 피드백 반영
  - 전역 린트 룰 수정
  - 인터셉터를 통해 응답 형태를 구현
- 로그인 기능
  - /login api 를 사용하여 로그인 기능 구현
  - 로그인 성공 시 내려오는 authToken과 email, name을 userInfo storage에 저장하여 사용
  - 4XX 에러가 발생하면 Toast를 통해 에러메시지 출력 (react-toastify 라이브러리 사용)
- 주문하기 기능
  - /products/:productId/summary api를 사용하여 제품 정보를 가져오기
  - 제품 정보 API에서 4XX 에러가 발생하면 Toast를 통해 에러메시지 출력 후 선물하기 홈으로 연결
  - 보내는 사람 Input Field에 userInfo의 name을 defaultValue로 입력
  - /order api를 사용하여 주문하기 기능을 완성 (authToken를 넣어야 함)
  - 주문하기 API에서 401 에러가 발생하면 로그인 페이지로 연결
