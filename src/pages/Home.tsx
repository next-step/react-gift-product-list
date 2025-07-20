import PresentThemeContainer from '@src/components/Home/PresentTheme/Container/PresentThemeContainer';
import PresentRankingContainer from '@src/components/Home/PresentRanking/Cotainer/PresentRankingContainer';
import SelectFriendContainer from '@src/components/Home/SelectFriend/SelectFriendContainer';
import NavigationBar from '@components/Common/NavigationBar';
import StyledTopestDiv from '@src/styles/StyledTopesDiv';
import { Spacer } from '@src/styles/Spacer';
import { ToastContainer } from 'react-toastify';

function Home() {
  return (
    <StyledTopestDiv>
      <ToastContainer />
      <NavigationBar />
      <SelectFriendContainer />
      <PresentThemeContainer />
      <Spacer />
      <PresentRankingContainer />
    </StyledTopestDiv>
  );
}
export default Home;
