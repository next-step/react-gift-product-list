# Step2 - 로그인, 주문하기 API 구현하기

- 기한을 넘겨 제출하여 정말 죄송합니다.. 주문하기 페이지에서 아무 버튼이나 눌러도 주문완료가 되어버리는 이슈를 해결하는데 시간이 너무 걸린 것 같습니다. button의 type을 지정해주지 않으면 자동으로 default값이 submit이 되어 아무 버튼이나 눌러도 submit 함수가 실행되어버리는 것을 알고, 각 button에 타입을 지정해주면서 해결할 수 있었습니다.

- 질문 : 주문하기 페이지에서 다른 id를 url에 입력해서 들어갔을때, 토스트가 두개씩 나오는 현상이 있어 그 문제를 파악하느라 오래 걸렸습니다. 서칭결과 StrictMode로 인해 api호출이 두번씩 되는? 경우가 있다고 하여 AbortController 를 사용하여 해결할 수는 있었는데, 이 문제를 이렇게 해결하는것이 맞는지 궁금합니다. 



commit
fix: 404오류 중복 발생으로 인한 toast 두개씩 나타나는 문제 & AbortController 사용으로 해결
fix: button 기본타입 submit문제로 다른 버튼을 눌러도 주문완료가 되는 issue 발생, type 명시로 해결
refactor: 주문완료 버튼 성공시 홈으로, 401에러시 로그인페이지로 & 상수 파일 분리
주문하기 API 사용하여 주문하기 기능 완성
feat: 주문하기페이지 SenderForm defaultValue로 userInfo.name사용
refactor: 에러메세지 Toast & 문자열 상수파일 분리
refactor: 제품 정보 api 사용하여 주문하기 페이지 제품 정보 가져오기
react-toastify 라이브러리 세팅 및 로그인폼 4XX 에러메세지에 적용
Logincontext UserID->UserInfo 변경에 따른 MyPage 로직 변경
refactor: 로그인 기능 API
