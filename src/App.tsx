import { Routes, Route } from 'react-router-dom'
import { LoginPage } from '@/pages/LoginPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { Home } from '@/pages/Home'
import { MyPage } from '@/pages/MyPage'
import { RequireAuth } from '@/routes/RequireAuth'
import { OrderPage } from '@/pages/OrderPage/OrderPage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ThemePage } from '@/pages/ThemePage'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<RequireAuth />}>
          <Route path="/my" element={<MyPage />} />
          <Route path="/order/:id" element={<OrderPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/themes/:themeId" element={<ThemePage />} />
      </Routes>
      <ToastContainer position="bottom-center" hideProgressBar />
    </>
  )
}

export default App
