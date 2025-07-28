// // src/App.tsx
// import { ThemeProvider } from '@emotion/react';
// import { theme } from './styles/theme';
// import { BaseLayout } from './components/Layout/BaseLayout';
// import { Navigation } from './components/Layout/Navigation';
// import { Routes, Route } from 'react-router-dom';
// import HomePage from '@/pages/Home/Page';
// import LoginPage from '@/pages/Login/LoginPage';
// import OrderPage from '@/pages/Home/OrderPage';
// import MyPage from '@/pages/MyPage/MyPage';
// import NotFound from '@/pages/NotFound/Page';
// import { RequireAuth } from '@/components/RequireAuth';
// import 'react-toastify/dist/ReactToastify.css'
// import { ToastContainer } from 'react-toastify'

// const App = () => {
//   return (
//     <ThemeProvider theme={theme}>
//       <BaseLayout header={<Navigation />}>
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/order/:id" element={<OrderPage />} />

//           {/* 여기! /my 경로를 RequireAuth로 감싸서 로그인된 사용자만 접근하도록 */}
//           <Route 
//             path="/my" 
//             element={
//               <RequireAuth>
//                 <MyPage />
//               </RequireAuth>
//             } 
//           />

//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </BaseLayout>
//     </ThemeProvider>
//   );
// };

// export default App;
// src/App.tsx
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProductsPage } from '@/pages/ThemeProductsPage';
import { ThemeProvider } from '@emotion/react'
import { theme } from './styles/theme'
import { BaseLayout } from './components/Layout/BaseLayout'
import { Navigation } from './components/Layout/Navigation'
import HomePage from '@/pages/Home/Page'
import LoginPage from '@/pages/Login/LoginPage'
import OrderPage from '@/pages/Home/OrderPage'
import MyPage from '@/pages/MyPage/MyPage'
import NotFound from '@/pages/NotFound/Page'
import { RequireAuth } from '@/components/RequireAuth'

// React Toastify 스타일 & 컨테이너
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <BaseLayout header={<Navigation />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="themes/:themeId/products" element={<ThemeProductsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/order/:id" element={<OrderPage />} />
          <Route
            path="/my"
            element={
              <RequireAuth>
                <MyPage />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BaseLayout>

      {/* 전역 Toast 컨테이너 */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </ThemeProvider>
  )
}

export default App
