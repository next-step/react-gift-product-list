import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from '@/pages/Home';
import Login from '@/pages/Login';
import My from '@/pages/My';
import NotFound from '@/pages/NotFound';
import Order from '@/pages/Order';
import Theme from '@/pages/Theme';
import { AuthProvider } from '@/context/AuthContext';

export const Router = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my" element={<My />} />
          <Route path="/order" element={<Order />} />
          <Route path="/theme/:themeId" element={<Theme />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer position="top-center" autoClose={2000} />
      </BrowserRouter>
    </AuthProvider>
  );
};
