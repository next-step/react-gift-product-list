import GlobalStyle from "@/styles/global";
import Layout from "./components/Layout";
import Header from "./components/Header";
import CategorySection from "@/sections/CategorySection";
import FriendSelectBanner from "./sections/FriendSelectBanner";
import CampaignBanner from "./sections/CampaignBanner";
import GiftRankingSection from "@/sections/GiftRankingSection";
import { Route, Routes } from "react-router";
import LoginPage from "./LoginPage";
import NotFoundPage from "./NotFoundPage";
import MyPage from "./MyPage";
import OrderPage from "./OrderPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

function App() {
  return (
    <>
      <GlobalStyle />
      <ToastContainer position="bottom-center" autoClose={3000} />
      <Layout>
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <FriendSelectBanner />
              <CategorySection />
              <CampaignBanner />
              <GiftRankingSection />
            </>
          } />
          <Route path="/login" element={
            <LoginPage />
          } />
          <Route path="/my" element={
            <MyPage />
          } />
          <Route path="/order/:id" element={
            <OrderPage />
          } />
          <Route path="/*" element={
            <NotFoundPage />
          } />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
