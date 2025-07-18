# react-gift-product-list

## 0단계

- [x] 불필요한 import 구문 삭제

## 1단계

- [BE Mock 서버](https://github.com/next-step/react-gift-mock-server)
- [x] Mock 서버 하위 디렉토리에 submodule로 추가
- [x] mock data 사용하던 컴포넌트들 api 연결

## 2단계

### 로그인 기능

- [x] /login api 를 사용하여 로그인 기능을 완성.
- [x] 로그인 성공 시 내려오는 authToken과 email, name을 storage에 저장하고 활용.
- [x] 4XX 에러가 발생시 Toast를 통해 에러 표시.

### 주문하기 기능

- [x] /products/:productId/summary api를 사용해 제품 정보 fetch.
- [x] 제품 정보 API에서 4XX 에러가 발생시 Toast를 통해 에러 표시 및 선물하기 홈으로 navigate.
- [x] 보내는 사람 Input Field에 userInfo의 name을 defaultValue로 세팅.
- [x] /order api를 사용한 주문하기 기능 완성.
- [x] 주문하기 API에서 401 에러 발생시 로그인 페이지로 navigate.

## 실행 가이드

1. 프론트엔드 프로젝트 루트에 .env 파일을 구성해주세요

```
VITE_REACT_GIFT_MOCK_SERVER_ENDPOINT=서버 엔드포인트(프로토콜 제외)

e.g.
localhost:3000(o)
http://localhost:3000(x)
```

2. 해당 프로젝트는 백엔드 mock 서버를 submodule로 포함하고 있습니다. git clone 후 아래 명령어를 실행해 주세요.

```
git submodule update --init --recursive
```

3. 프로젝트 실행에 필요한 패키지를 설치해주세요.
   **백엔드 mock 서버에 필요한 패키지는 postinstall 스크립트로 자동 설치됩니다.**

```
npm install
```

4. concurrently 라이브러리를 사용해 BE, FE 서버를 동시에 실행 하려면 다음 명령어를 사용하세요

```
npm run dev:all
```
