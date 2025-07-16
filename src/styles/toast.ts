import { toast } from "react-toastify";

export const showErrorToast = (message: string) => {
  toast.error(message, {
    position: "bottom-center",
    autoClose: 3000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    hideProgressBar: true,
  });
};
