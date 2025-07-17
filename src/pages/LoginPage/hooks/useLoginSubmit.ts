import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/contexts/AuthContext";
import { getUserInfo } from "@/data/api";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";

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
      console.error(error);
    }

    const redirectPath = searchParams.get("redirect");
    const from = redirectPath || location.state?.from || ROUTES.HOME;

    navigate(from, { replace: true });
  };

  return { handleSubmit };
}

export default useLoginSubmit;
