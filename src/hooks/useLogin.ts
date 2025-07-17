import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "./useAuth";
import { type LoginRequest, login as loginAPI } from "@/api/auth";
import { ERROR_MESSAGES } from "@/constants/messages";

export const useLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (payload: LoginRequest) => {
    try {
      const res = await loginAPI(payload);

      login({
        id: res.authToken,
        name: res.name,
        email: res.email,
      });

      toast.success(ERROR_MESSAGES.LOGIN.SUCCESS);
      navigate("/");
    } catch (error) {
      toast.error(String(error));
    }
  };

  return { handleLogin };
};
