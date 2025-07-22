/** @jsxImportSource @emotion/react */
import { Global, ThemeProvider, css } from '@emotion/react';
import { reset } from './styles/reset';
import { theme } from './styles/theme';
import Login from './pages/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NotFoundPage from './pages/NotFoundPage';
import { AuthProvider } from './contexts/AuthContext';
import MyPage from './pages/MyPage';
import Order from './pages/Order';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ROUTES } from './constants/routes';
import ThemeProductListPage from './pages/ThemeProductListPage';

const containerStyle = css`
  max-width: 720px;
  margin: 0 auto;
  background-color: transparent;
  justify-content: center;
  align-items: center;
`;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={reset} />
      <div css={containerStyle}>
        <AuthProvider>
          <BrowserRouter>
            <ToastContainer
              position="top-right"
              autoClose={3 * 1_000}
            />
            <Routes>
              <Route path={ROUTES.HOME} element={<Home />} />
              <Route path={ROUTES.LOGIN} element={<Login />} />
              <Route
                path={ROUTES.NOT_FOUND}
                element={<NotFoundPage />}
              />
              <Route path={ROUTES.MY_PAGE} element={<MyPage />} />
              <Route path={ROUTES.ORDER()} element={<Order />} />
              <Route
                path={ROUTES.THEME()}
                element={<ThemeProductListPage />}
              />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </div>
    </ThemeProvider>
  );
};

export default App;
