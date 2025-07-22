import { createBrowserRouter} from 'react-router-dom';
import Layout from '../layout';
import ProtectedRoute from './ProtectedRoute';
import { Home, Login, MyPage, Order, NotFound, Theme } from '@/pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'themes/:themeId',
        element: <Theme />,
      },
      {
        path: 'mypage',
        element: (
          <ProtectedRoute>
            <MyPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'order/:productId?',
        element: (
          <ProtectedRoute>
            <Order />
          </ProtectedRoute>
        ),
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
