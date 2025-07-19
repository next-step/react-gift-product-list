/** @jsxImportSource @emotion/react */
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './pages/Home/components/NavBar';
import FriendSelector from './pages/Home/components/FriendSelector';
import CategorySection from './pages/Home/components/CategorySection';
import Banner from './pages/Home/components/Banner';
import RankingSection from './pages/Home/components/RankingSection/RankingSection';
import LoginPage from './pages/Login/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import MyPage from './pages/MyPage';
import {
  UserManagementProvider,
  UserManagement,
} from './pages/Login/contexts/UserManagement';
import React from 'react';
import OrderPage from './pages/Order/OrderPage';
import ScrollToTop from './pages/Home/ScrollToTop';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ThemeProductPage from './pages/ThemeProductPage';

const Home = () => (
  <main>
    <FriendSelector />
    <CategorySection />
    <Banner />
    <RankingSection />
  </main>
);

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = UserManagement();
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

const RedirectIfLoggedIn = ({ children }: { children: React.ReactNode }) => {
  const { user } = UserManagement();
  return user ? <Navigate to="/my" replace /> : <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <UserManagementProvider>
        <ScrollToTop />
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <RedirectIfLoggedIn>
                <LoginPage />
              </RedirectIfLoggedIn>
            }
          />
          <Route
            path="/my"
            element={
              <ProtectedRoute>
                <MyPage />
              </ProtectedRoute>
            }
          />
          <Route path="/order/:productId" element={<OrderPage />} />
          <Route path="/themes/:themeId" element={<ThemeProductPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={true}
          closeOnClick
          pauseOnHover
          draggable
        />
      </UserManagementProvider>
    </BrowserRouter>
  );
}

export default App;
