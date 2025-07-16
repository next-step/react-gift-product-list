## ✨ 로그인 기능

- [ ] `/login` API를 사용하여 로그인 기능을 완성해주세요.
- [x] 로그인 성공 시 내려오는 `authToken`, `email`, `name`을 `userInfo` storage에 저장하고 활용해주세요.
- [ ] 4XX 에러가 발생하면 Toast를 통해 에러 메시지를 보여주세요. (`react-toastify` 라이브러리 사용)

---

## ✨ 주문하기 기능

- [ ] `/products/:productId/summary` API를 사용하여 제품 정보를 가져와주세요.
- [ ] 만약 제품 정보 API에서 4XX 에러가 발생하면 Toast를 통해 에러 메시지를 보여주고, 선물하기 홈으로 연결시켜요.
- [ ] 보내는 사람 Input Field에 `userInfo`의 `name`을 `defaultValue`로 채워놔요.
- [ ] `/order` API를 사용하여 주문하기 기능을 완성해주세요.
- [ ] 주문하기 API의 경우 Authorization 헤더에 로그인 응답에서 전달 받은 `authToken`을 넣어야만 동작해요.
- [ ] 주문하기 API에서 401 에러가 발생하면 로그인 페이지로 연결시켜요.
