import Router from "@/router";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <Router />
      <ToastContainer
        position="bottom-center"
        autoClose={1500}
        hideProgressBar={true}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </>
  );
};

export default App;
