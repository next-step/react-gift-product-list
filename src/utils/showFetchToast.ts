import { toast, type ToastOptions } from "react-toastify";

const defaultToastOptions: ToastOptions = {
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: false,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  theme: "colored",
  style: {
    whiteSpace: "pre-line",
  },
};

export const showFetchErrorToast = (errorStatusCode: number, message: string, onClose?: () => void) => {
  if (errorStatusCode >= 400 && errorStatusCode < 500) {
    toast.error(message, {
      ...defaultToastOptions,
      onClose: onClose,
    });
  } else if (errorStatusCode >= 500) {
    toast.error(`잠시 후 다시 시도해주세요.\n${message}`, {
      ...defaultToastOptions,
    });
  }
};

export const showFetchSuccessToast = (message: string, onClose?: () => void) => {
  toast.success(message, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "colored",
    onClose: onClose,
  });
};
