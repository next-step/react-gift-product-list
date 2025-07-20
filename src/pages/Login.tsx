import LoginFormContainer from '@components/Login/LoginFormContainer';
import NavigationBar from '@components/Common/NavigationBar';
import StyledTopestDiv from '@src/styles/StyledTopesDiv';
import { StyledLoginComponentContainerDiv } from '@src/components/Login/StyledLoginFormContainer';

const Login = () => {
  return (
    <StyledTopestDiv>
      <NavigationBar />
      <StyledLoginComponentContainerDiv>
        <LoginFormContainer />
      </StyledLoginComponentContainerDiv>
    </StyledTopestDiv>
  );
};

export default Login;
