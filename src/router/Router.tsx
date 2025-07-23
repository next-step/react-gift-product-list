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
    Component: Home,
  },
  {
    path: URLS.login,
    Component: Login,
  },
  {
    path: URLS.mypage,
    Component: MyPage,
  },
  {
    path: `${URLS.themes}/:themeId`,
    Component: ThemesProduct,
  },
  { path: URLS.order, Component: Order },
  {
    path: '*',
    Component: NotFound,
  },
]);
export default Router;
