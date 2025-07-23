import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/index.css';
import App from '@/App.tsx';
import GlobalStyle from '@/styles/global';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/theme';
import { Bounce, ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick={false}
        pauseOnHover={true}
        draggable={true}
        theme="dark"
        transition={Bounce}
        style={{
          width: '25rem',
          color: 'black',
          backgroundColor: 'white',
        }}
      />
    </ThemeProvider>
  </StrictMode>
);
