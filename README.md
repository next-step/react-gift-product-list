# react-gift-product-list

## 0단계

- [x] 불필요한 import 구문 삭제

## 1단계

### 중요!

프로젝트 루트에 .env 파일을 구성해주세요

```
VITE_REACT_GIFT_MOCK_SERVER_ENDPOINT=서버 엔드포인트(프로토콜 제외)

e.g.
localhost:3000(o)
http://localhost:3000(x)
```

해당 프로젝트는 백엔드 mock 서버를 submodule로 포함하고 있습니다. git clone 후 아래 명령어를 실행해 주세요.

```
git submodule update --init --recursive
```

concurrently 라이브러리를 사용해 BE, FE 서버를 동시에 실행 하려면 다음 명령어를 사용하세요

```
npm run dev:all
```

- [BE Mock 서버](https://github.com/next-step/react-gift-mock-server)
- [x] Mock 서버 하위 디렉토리에 submodule로 추가
- [x] mock data 사용하던 컴포넌트들 api 연결
