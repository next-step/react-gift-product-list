import LoginPage from '@/page/Login';
import MyPage from '@/page/My';
import OrderPage from '@/page/Order';
import NotFound from '@/page/NotFound';
import { Route, Routes } from 'react-router-dom';
import { ROUTES } from './Routes';
import RequireAuth from './RequireAuth';
import HOME from '@/page/Home';
import ThemesPage from '@/page/Themes';

const AppRouter = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HOME />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route
        path={ROUTES.MY}
        element={
          <RequireAuth>
            <MyPage />
          </RequireAuth>
        }
      />
      <Route
        path={ROUTES.ORDER}
        element={
          <RequireAuth>
            <OrderPage />
          </RequireAuth>
        }
      />
       <Route path={ROUTES.THEMES} element={<ThemesPage />} />
      <Route path={ROUTES.NOTFOUND} element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
