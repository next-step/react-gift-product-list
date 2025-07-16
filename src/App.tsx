import GlobalStyle from "@/styles/GlobalStyle";
import { ThemeProvider } from "@emotion/react";
import theme from "@/styles/theme/theme";
import { BrowserRouter } from "react-router-dom";
import Routes from "@/components/routes/Routes";
import { AuthProvider } from "./contexts/authContext";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <AuthProvider>
          <Routes />
          <ToastContainer />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
