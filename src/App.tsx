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

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  function handleBackClick() {
    if (location.pathname !== '/') navigate(-1);
  }

  function handleLoginClick() {
    const userInfoStr = localStorage.getItem('userInfo');
    let isLoggedIn = false;

    if (userInfoStr) {
      try {
        const userInfo = JSON.parse(userInfoStr);
        if (userInfo.authToken) {
          isLoggedIn = true;
        }
      } catch (e) {
        console.error('Login Error', e);
        isLoggedIn = false;
      }
    }

    if (isLoggedIn) navigate('/my');
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
              handleLoginClick={handleLoginClick}
            />
          }
        >
          <Route path="/" element={<MainLayout />} />
          <Route path="/login" element={<Login onLogin={handleBackClick} />} />
          <Route path="/my" element={<Mypage onLogin={handleBackClick} />} />
          <Route path="/order/:orderId" element={<Order />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppWrapper>
  );
}

export default App;
