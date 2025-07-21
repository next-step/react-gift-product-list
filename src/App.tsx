import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from '@/pages/MainPage';
import LoginPage from '@/pages/LoginPage';
import NotFoundPage from '@/pages/NotFoundPage';
import MyPage from '@/pages/MyPage';
import OrderPage from '@/pages/OrderPage';
import Layout from '@/components/Layout';
import { UserProvider } from '@/contexts/UserContext';
import { ROUTE } from '@/constants/routes';
import AuthRoute from '@/routes/AuthRoute';
import PublicRoute from '@/routes/PublicRoute';
import ThemeProductsPage from '@/pages/ThemeProductsPage';

const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route element={<Layout />}>
            {/* 메인페이지 */}
            <Route path={ROUTE.MAIN} element={<MainPage />} />

            <Route path={ROUTE.THEME()} element={<ThemeProductsPage />} />

            {/* 로그인 안한 유저만 접근 */}
            <Route
              path={ROUTE.LOGIN}
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />

            {/* 로그인 한 유저만 접근 */}
            <Route
              path={ROUTE.MY}
              element={
                <AuthRoute>
                  <MyPage />
                </AuthRoute>
              }
            />
            <Route
              path={ROUTE.ORDER()}
              element={
                <AuthRoute>
                  <OrderPage />
                </AuthRoute>
              }
            />

            {/* 404 */}
            <Route path={ROUTE.NOT_FOUND} element={<NotFoundPage />} />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
