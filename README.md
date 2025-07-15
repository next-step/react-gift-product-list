# Step1 - 메인페이지 API 구현하기

- fix: 파일구조 이상 발견, 원상태로 복귀
- refactor: giftTheme mockData 삭제 & axios 이용 api로 데이터 받아오기
- refactor: 실시간 급상승 선물랭킹 섹션 MockData삭제 &  API 사용
- refactor: 상품목록 없을 시, 상품이 없습니다 표시

주의
- step0때 파일을 public안에 복붙해버려서 일단 원상태로 복귀하는 과정을 commit했습니다. 죄송합니다.
- mockData를 주문하기 페이지에서도 타입같은 것들을 사용하고 있어서 일단 OrderPage에서 mockData를 따로 만들어두었습니다.
- vite.config.ts에 proxy 설정을 통해 /api에 대해 자동으로 localhost:3000으로 이동하게 하였습니다.

질문
- 현재 필터를 클릭할때마다 화면 최상단으로 이동하는 이슈가 발생하고 있습니다.
- button의 기본값이 submit이라서 발생한 문제인가 해서 각 필터의 버튼들에 type="button"을 붙여주었으나, 여전히 문제가 발생했습니다
- React Router의 ScrollRestoration컴포넌트를 가져와 PageLayout과 함께 렌더링 되도록 router에 element로도 넣어보고, Outlet과 함께 렌더링 되도록 아예 PageLayout파일안에 넣어보기도 했으나 다 실패했습니다..
- 아마 필터 버튼을 누를때마다, useEffect가 실행되게 해놓아서, 기존 GiftRankingGrind가 언마운트 되고, 새로운 GiftRankingGrid가 마운트 되면서 어떤 리렌더링 이슈로 스크롤 위치가 초기화되는 것 같습니다.
- 근데 이에대해 서칭결과 react-query를 사용하여 데이터 캐싱 및 상태관리를 개선하는 방법이 있음을 알았는데, 이 방법만이 정답인 것인지, 어떻게 해결하는 것을 추천하시는지 궁금합니다..
