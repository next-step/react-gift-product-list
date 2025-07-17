import { Global } from '@emotion/react'
import { globalStyle } from '@/styles/GlobalStyle'
import { RouterProvider } from 'react-router-dom'
import { UserProvider } from '@/contexts/UserContext'
import Router from '@/routes/Router'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <>
      <Global styles={globalStyle} />
      <UserProvider>
        <RouterProvider router={Router} />
      </UserProvider>

      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
      />
    </>
  )
}

export default App
