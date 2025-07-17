import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/contexts/AuthContext";
import { getUserInfo } from "@/data/api";
import { AxiosError } from "axios";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API_LOGIN_ERROR_MESSAGES } from "../constants/labels";

function useLoginSubmit() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const { login } = useAuth();

  const handleSubmit = async (
    e: React.FormEvent,
    email: string,
    password: string
  ) => {
    e.preventDefault();

    try {
      const response = await getUserInfo(email, password);
      login(response.email, response.name, response.authToken);
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorStatus = error.response?.status;

        if (errorStatus && errorStatus >= 400 && errorStatus < 500) {
          toast.error(API_LOGIN_ERROR_MESSAGES.EMAIL_FORMAT_INVALID);
        }
      }
      return;
    }

    const redirectPath = searchParams.get("redirect");
    const from = redirectPath || location.state?.from || ROUTES.HOME;

    navigate(from, { replace: true });
  };

  return { handleSubmit };
}

export default useLoginSubmit;
