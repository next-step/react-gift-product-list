import "@/App.css";
import "@/components/Main";
import { theme } from "@/styles/theme.ts";
import { ThemeProvider } from "@emotion/react";
import { Routes, Route } from "react-router-dom";
import Login from "@/components/login/Login";
import Main from "@/components/Main.tsx";
import NavigationBar from "@/components/NavigationBar";
import NotFound from "@/components/NotFound";
import Layout from "@/styles/Layout.tsx";
import MyPage from "@/components/MyPage.tsx";
import { UserInfoProvider } from "@/context/UserInfoProvider";
import Order from "@/components/order/Order";
import ProtectedRoute from "@/components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Layout>
          <NavigationBar />
          <UserInfoProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Main />} />
              <Route
                path="/my"
                element={
                  <ProtectedRoute>
                    <MyPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order/:productId"
                element={
                  <ProtectedRoute>
                    <Order />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </UserInfoProvider>
        </Layout>
      </ThemeProvider>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
