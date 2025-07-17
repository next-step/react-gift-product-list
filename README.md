# react-gift-product-list

## 구현할 기능 목록

### 선물하기 홈 > 선물 테마 섹션

- /api/themes API를 사용하여 테마 목록을 완성
- 데이터를 불러오는 동안 보여줄 로딩 화면 구현
- 데이터가 없거나, 에러가 발생하면 선물 테마 섹션이 보여지지 않게 처리

### 선물하기 홈 > 실시간 급상승 선물랭킹 섹션

- /api/products/ranking API를 사용하여 실시간 급상승 선물 랭킹 섹션을 구현
- 각 필터 선택 시 해당 필터에 맞는 API를 재 요청
- 데이터를 불러오는 동안 로딩 화면 구현
- 보여 줄 상품 목록이 없을경우 상품 목록이 없다는 문구 출력

## 구현한 기능

### 선물하기 홈 > 선물 테마 섹션

#### axios 인스턴스 설정

- API 호출 시 .env를 사용
  - .env 환경 변수로 VITE_API_BASE_URL 설정
  - 자동완성을 위해 vite-env.d에 내용 추가
  - 환경 분리는 하지 않았으나 필요하다면 추후 할 계획(env.production)
- 재사용성을 위해 API 유틸 구성
  - api 폴더 만들고 axiosInstance.ts 파일 작성
  - 기본 설정을 포함한 Axios 인스턴스 생성

#### theme(카테고리) API 섹션 구현

- 가독성 위해 스타일드 컴포넌트 위치 이동
- apis 경로를 못찾는 오류가 생겨 alias 추가
- useState로 필요한 상태 정의 (로딩 제외)
- useEffect로 API 요청 로직 구현

#### 로딩 구현

- 로딩 컴포넌트 구현
- 카테고리 섹션에 로딩 로직 및 상태 추가
- UI 요소 개선

#### 랭킹 섹션 API 요청 및 상태 처리 구현

- Product, RankedProduct interface 설정
- mockData에서 실제 데이터로 변경
  - addRanking 메서드 구현
- useSearchParams에서 rawExpanded 제거하고 state로 관리
- styled-component 위치 변경
- API 요청 로직 추가 (theme과 동일)
- LoadingSpinner 리팩토링

#### API 요청 함수 리팩토링

- theme 요청 리팩토링
- ranking 요청 리팩토링
