import { Layout } from '@/components/Layout'
import styled from '@emotion/styled'
import GiftFriendSelector from '@/components/GiftFriendSelector'
import { HomeContentCard } from '@/components/HomeContentCard'
import { RankingSection } from '@/components/RankingSection/RankingSection'
import { MotivationBanner } from '@/components/MotivationBanner'
import { CategorySection } from '@/components/CategorySection/CategorySection'
import './App.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AppWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.gray[100]};
  display: flex;
  justify-content: center;
`

function App() {
  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
        pauseOnFocusLoss={false}
      />
      <AppWrapper>
        <Layout>
          <main>
            <GiftFriendSelector />
            <HomeContentCard>
              <CategorySection />
              <MotivationBanner />
              <RankingSection />
            </HomeContentCard>
          </main>
        </Layout>
      </AppWrapper>
    </>
  )
}
export default App
