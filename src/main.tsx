import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/styles/theme';
import { GlobalStyles } from '@/styles/global';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <RouterProvider router={router} />
      <ToastContainer />
    </ThemeProvider>
  </StrictMode>
);
