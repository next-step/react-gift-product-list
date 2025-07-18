import type { StateHook } from "@src/hooks/stateHookType";
import { createContext } from "react";

type ToastContextType = {
  message: StateHook<string | null>;
} | null;

const ToastContext = createContext<ToastContextType>(null);

export default ToastContext;
