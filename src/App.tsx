import { ThemeProvider } from '@emotion/react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from '@/router/Router';
import { Global } from '@emotion/react';
import reset from '@/styles/reset';
import { theme } from '@/styles/theme';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <Global styles={reset} />
          <Router />
          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
              className: '',
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
                borderRadius: '8px',
                padding: '16px',
                fontSize: '14px',
              },
              success: {
                duration: 3000,
                style: {
                  background: '#4caf50',
                },
              },
              error: {
                duration: 5000,
                style: {
                  background: '#f44336',
                },
              },
            }}
          />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
