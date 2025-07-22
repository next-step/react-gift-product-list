import { createBrowserRouter } from 'react-router-dom';
import Home from '@pages/Home';
import Login from '@pages/Login';
import NotFound from '@pages/NotFound';
import { URLS } from '@assets/urls';
import MyPage from '@pages/MyPage';
import Order from '@pages/Order';
import ThemesProduct from '@src/pages/ThemesProduct';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: URLS.login,
    element: <Login />,
  },
  {
    path: URLS.mypage,
    element: <MyPage />,
  },
  {
    path: URLS.themes,
    element: <ThemesProduct />,
  },
  { path: URLS.order, element: <Order /> },
  {
    path: '*',
    element: <NotFound />,
  },
]);
export default Router;
