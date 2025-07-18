import { ThemeProvider } from '@emotion/react'
import { BrowserRouter } from 'react-router-dom'
import Router from '@/Router'
import { AuthProvider } from '@/contexts/auth'
import { GlobalStyles, theme } from '@/styles'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <BrowserRouter>
      {/* emotion 테마 적용 */}
      <ThemeProvider theme={theme}>
        {/* 인증 컨텍스트 적용 */}
        <AuthProvider>
          {/* Global 스타일 적용 */}
          <GlobalStyles />
          {/* 라우터 적용 */}
          <Router />
          {/* 토스트 컨테이너 */}
          <ToastContainer position="top-center" />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
