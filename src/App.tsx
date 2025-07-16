import "@src/App.css";
import Router from "@src/router/Router";
import UserContextProvider from "./contexts/UserContextProdiver";
import AliveCheckPanel from "./apis/AliveCheckPanel"; // for testing

function App() {
  return (
    <UserContextProvider>
      <AliveCheckPanel /> {/* for testing */}
      <Router />
    </UserContextProvider>
  );
}

export default App;
