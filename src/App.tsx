import { AppWrapper } from '@/styles/App.styles';
import { Routes, Route } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import WithHeaderLayout from '@/Layout/WithHeaderLayout';
import ResetStyles from '@/styles/ResetStyles';
import MainLayout from '@/Layout/MainLayout';
import Login from '@/pages/Login';
import Mypage from '@/pages/Mypage';
import Order from '@/pages/Order/Order';
import NotFound from '@/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { LoginInfoContext } from '@/contexts/LoginInfoContext';
import ThemeDetail from './pages/ThemeDetail';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo } = useContext(LoginInfoContext);

  function handleBackClick() {
    if (location.pathname !== '/') navigate(-1);
  }

  function HandleLoginClick() {
    if (userInfo.authToken) navigate('/my');
    else navigate('/login');
  }

  return (
    <AppWrapper>
      <ToastContainer autoClose={2000} />
      <ResetStyles />
      <Routes>
        <Route
          element={
            <WithHeaderLayout
              handleBackClick={handleBackClick}
              handleLoginClick={HandleLoginClick}
            />
          }
        >
          <Route path="/" element={<MainLayout />} />
          <Route path="/login" element={<Login onLogin={handleBackClick} />} />
          <Route path="/my" element={<Mypage onLogin={handleBackClick} />} />
          <Route path="/order/:orderId" element={<Order />} />
          <Route path="/themes/:themeId" element={<ThemeDetail />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppWrapper>
  );
}

export default App;
