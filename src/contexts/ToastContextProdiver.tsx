import { useState, type ReactNode } from "react";
import ToastContext from "./ToastContext";

const ToastContextProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState<string | null>(null);

  const context = {
    message: { value: message, setValue: setMessage }
  };

  return (
    <ToastContext.Provider value={context}>{children}</ToastContext.Provider>
  );
};

export default ToastContextProvider;
