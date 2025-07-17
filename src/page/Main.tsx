import Banner from '@/component/Banner'
import FriendChoise from '@/component/FriendChoise'
import GiftRanking from '@/component/GiftRanking'
import GiftTheme from '@/component/GiftTheme'

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
