import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/contexts/AuthContext";
import { getUserInfo } from "@/data/api";
import { AxiosError } from "axios";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API_LOGIN_ERROR_MESSAGES } from "../constants/apiMessage";
import type { User } from "@/types/User";
import { useFetch } from "@/hooks/useFetch";

interface UseLoginSubmitProps {
  email: string;
  password: string;
}

function useLoginSubmit({ email, password }: UseLoginSubmitProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const { data, executeFetch } = useFetch<User>({
    fetchFn: () => getUserInfo(email, password),
    errorHandler: (error) => {
      if (error instanceof AxiosError) {
        const errorStatus = error.response?.status;

        if (errorStatus && errorStatus >= 400 && errorStatus < 500) {
          toast.error(API_LOGIN_ERROR_MESSAGES.EMAIL_FORMAT_INVALID);
        }
      }
    },
    enabled: false,
  });

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await executeFetch();

    if (data) {
      login(data.email, data.name, data.authToken);

      const redirectPath = searchParams.get("redirect");
      const from = redirectPath || location.state?.from || ROUTES.HOME;

      navigate(from, { replace: true });
    }
  };

  return { handleSubmit };
}

export default useLoginSubmit;
