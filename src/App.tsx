import GlobalStyle from '@/styles/GlobalStyle';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import NotFoundPage from '@/pages/NotFoundPage';
import MyPage from './pages/Mypage';
import OrderPage from '@/pages/OrderPage';
import PrivateRoute from '@/routes/PrivateRoute';
import { ROUTES } from '@/constants/routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />

          <Route element={<PrivateRoute />}>
            <Route path={ROUTES.MY} element={<MyPage />} />
            <Route path={ROUTES.ORDER_PATH} element={<OrderPage />} />
          </Route>

          <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="bottom-center" autoClose={2000} />
    </>
  );
}

export default App;
