import PresentThemeContainer from '@components/Home/PresentTheme/PresentThemeContainer';
import PresentRankingContainer from '@components/Home/PresentRanking/PresentRankingContainer';
import SelectFriendContainer from '@components/Home/SelectFriendContainer';
import NavigationBar from '@components/Common/NavigationBar';
import StyledTopestDiv from '@src/styles/Common/StyledTopesDiv';
import { Spacer } from '@src/styles/Common/Spacer';

function Home() {
  return (
    <StyledTopestDiv>
      <NavigationBar />
      <SelectFriendContainer />
      <PresentThemeContainer />
      <Spacer />
      <PresentRankingContainer />
    </StyledTopestDiv>
  );
}
export default Home;
