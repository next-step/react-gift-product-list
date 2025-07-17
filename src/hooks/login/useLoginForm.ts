import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "react-router-dom";
import { setUserInfo } from "@/utils/storage";
import { useRouter } from "@/hooks/common/useRouter";
import { loginSchema, type LoginFormData } from "@/utils";
import { signin } from "@/api/login/signin";
import { useApiStatus } from "@/hooks/common/useApiStatus";

export const useLoginForm = () => {
  const { navigate, location } = useRouter();
  const [searchParams] = useSearchParams();
  const {
    loading: isLoading,
    error: loginError,
    execute,
  } = useApiStatus({
    showSuccessToast: false,
    showErrorToast: true,
    successMessage: "로그인 성공!",
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      id: "",
      password: "",
    },
  });
  const watchedValues = watch();

  const isFormValid = (() => {
    try {
      loginSchema.parse(watchedValues);
      return true;
    } catch {
      return false;
    }
  })();

  const onSubmit = async (values: LoginFormData) => {
    await execute(async () => {
      const response = await signin({
        email: values.id,
        password: values.password,
      });

      setUserInfo({
        email: response.email,
        authToken: response.authToken,
        name: response.name,
      });

      const previousPage = location.state?.from;
      const redirectPath = previousPage || searchParams.get("redirect") || "/";
      navigate(redirectPath);

      return response;
    });
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isFormValid: isFormValid,
    isLoading,
    loginError,
  };
};
