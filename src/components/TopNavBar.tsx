/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { IoChevronBack } from 'react-icons/io5';
import { FiUser } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@/routes/Router';
import { useUserContext } from '@/contexts/UserContext';

const headerStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  border-bottom: 1px solid #eee;
  background-color: #fff;
  position: relative;
`;

const titleStyle = css`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;

const iconStyle = css`
  font-size: 24px;
  color: #333;
  cursor: pointer;

  &:hover {
    color: #000;
  }
`;

export default function TopNavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUserContext();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(ROUTE_PATH.GIFT);
    }
  };

  const handleGoLogin = () => {
    const targetPath = user ? ROUTE_PATH.MY : ROUTE_PATH.LOGIN;
    if (location.pathname !== targetPath) {
      navigate(targetPath);
    }
  };

  const handleGoHome = () => {
    navigate(ROUTE_PATH.GIFT);
  };

  return (
    <header css={headerStyle}>
      <IoChevronBack
        css={iconStyle}
        onClick={handleGoBack}
        aria-label="뒤로가기"
      />
      <div css={titleStyle} onClick={handleGoHome}>
        선물하기
      </div>
      <FiUser
        css={iconStyle}
        aria-label="유저 아이콘"
        onClick={handleGoLogin}
      />
    </header>
  );
}
