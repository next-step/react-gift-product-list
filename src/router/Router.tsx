import { Route, Routes } from 'react-router-dom';
import GiftHome from '@/pages/GiftHome';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import MyPage from '@/pages/MyPage';
import PrivateRoute from '@/router/PrivateRoute';
import ProductOrder from '@/pages/ProductOrder';
import Theme from '@/pages/Theme';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<GiftHome />} />
      <Route path="/login" element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route path="/my" element={<MyPage />} />
        <Route path="/order/:productId" element={<ProductOrder />} />
        <Route path="/themes/:themeId" element={<Theme />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
