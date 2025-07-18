import LoginFormContainer from '@components/Login/LoginFormContainer';
import NavigationBar from '@components/Common/NavigationBar';
import { useNavigate } from 'react-router-dom';
import { URLS } from '@assets/urls';
import StyledTopestDiv from '@src/styles/StyledTopesDiv';
import { StyledLoginComponentContainerDiv } from '@src/components/Login/StyledLoginFormContainer';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const handleLoginSuccess = () => {
    navigate(URLS.home);
  };
  return (
    <StyledTopestDiv>
      <NavigationBar />
      <StyledLoginComponentContainerDiv>
        <LoginFormContainer onLoginSuccess={handleLoginSuccess} />
      </StyledLoginComponentContainerDiv>
    </StyledTopestDiv>
  );
};

export default Login;
