import { toast, type ToastOptions } from 'react-toastify';

const options: ToastOptions = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
};

export const toastError = (message: string) => {
  toast.error(message, options);
};

export const toastSuccess = (message: string) => {
  toast.success(message, options);
};