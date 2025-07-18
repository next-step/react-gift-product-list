import Banner from '@/component/main/Banner'
import FriendChoise from '@/component/main/FriendChoise'
import GiftRanking from '@/component/main/GiftRanking'
import GiftTheme from '@/component/main/GiftTheme'

import { DefaultDiv } from '../styles/Common.styled'


const Main = () => {
  return (
    <DefaultDiv>
      <FriendChoise/>
      <GiftTheme/>
      <Banner/>
      <GiftRanking/>
    </DefaultDiv>
  )
}

export default Main
