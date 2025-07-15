import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "react-router-dom";
import { setUserInfo } from "@/utils/storage";
import { useRouter } from "@/hooks/common/useRouter";
import { loginSchema, type LoginFormData } from "@/utils";
import { useState } from "react";
import { signin } from "@/api/login/signin";

export const useLoginForm = () => {
  const { navigate, location } = useRouter();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

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
    setIsLoading(true);
    setLoginError(null);
    try {
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
    } catch (error) {
      if (error instanceof Error) {
        setLoginError(error.message);
      } else {
        setLoginError("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } finally {
      setIsLoading(false);
    }
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
