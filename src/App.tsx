import "@src/App.css";
import Router from "@src/router/Router";
import UserContextProvider from "./contexts/UserContextProdiver";
import AliveCheckPanel from "./apis/AliveCheckPanel"; // for testing
import ToastContextProvider from "./contexts/ToastContextProdiver";

function App() {
  return (
    <ToastContextProvider>
      <UserContextProvider>
        <AliveCheckPanel /> {/* for testing */}
        <Router />
      </UserContextProvider>
    </ToastContextProvider>
  );
}

export default App;
