import styled from '@emotion/styled';
import { colors } from '../styles/tokens/color';

const Banner = styled.div`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw; // 브라우저 전체 너비
  max-width: 690px; // 앱 전체 최대 너비(필요시)
  background: ${colors.primary};
  border-radius: 16px;
  padding: 16px;
  margin: 0;
  box-sizing: border-box;
`;

function NoticeBanner() {
  return (
    <Banner>
      카카오테크 캠퍼스 3기 여러분
      <br />
      프론트엔드 2단계 과제 화이팅! 🎉
    </Banner>
  );
}

export default NoticeBanner;
