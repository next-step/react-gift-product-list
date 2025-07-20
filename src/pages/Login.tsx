import LoginFormContainer from '@components/Login/LoginFormContainer';
import NavigationBar from '@components/Common/NavigationBar';
import StyledTopestDiv from '@src/styles/StyledTopesDiv';
import styled from '@emotion/styled';
import { ToastContainer } from 'react-toastify';

export const StyledLoginComponentContainerDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Login = () => {
  return (
    <StyledTopestDiv>
      <ToastContainer />
      <NavigationBar />
      <StyledLoginComponentContainerDiv>
        <LoginFormContainer />
      </StyledLoginComponentContainerDiv>
    </StyledTopestDiv>
  );
};

export default Login;
