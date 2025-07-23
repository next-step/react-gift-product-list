import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@styles/tokens.ts';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
      <ToastContainer position="top-center" autoClose={3000} />
    </ThemeProvider>
  </StrictMode>
);
