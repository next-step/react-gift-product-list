import LoginFormContainer from '@components/Login/LoginFormContainer';
import NavigationBar from '@components/Common/NavigationBar';
import StyledTopestDiv from '@src/styles/StyledTopesDiv';
import styled from '@emotion/styled';

export const StyledLoginComponentContainerDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
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
