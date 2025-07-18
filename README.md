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

## step3

- step2 피드백 반영
  - api의 요청타입과 응답타입을 모두 타입으로 관리
  - 인증토큰을 인터셉터에서 처리
  - LoginForm 내부 useApiRequest 훅을 타입 추론으로 동작하도록 수정
  - LoginForm useEffect 없이 값을 처리하도록 변경
  - useSessionStorage 키 상수로 관리
  - 인증 에러 공통 레벨에서 처리
- 테마 상품 목록 패이지
  - 선물 테마 섹션의 아이템을 클릭하면 테마 상품 목록 페이지로 이동
  - `/api/themes/:themeId/info` api를 통해 선물 테마 섹션의 히어로 영역을 구현
  - 404 에러 발생시 선물하기 홈 페이지로 이동
  - `/api/themes/:themeId/products` api를 통해 상품 리스트 구현
  - 무한 스크롤 기능 구현
  - 상품 리스트가 없으면 빈 페이지를 보여줌
