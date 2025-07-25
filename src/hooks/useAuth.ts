import { useState } from "react";
import { toast } from "react-toastify";
import { login as loginAPI } from "@/api/auth/auth";
import { userStorage } from "@/storage/localStorage";
import type { LoginRequestDto, LoginResponseDto } from "@/types/DTO/authDTO";

export const useAuth = () => {
  const [user, setUser] = useState<LoginResponseDto | null>(userStorage.get());

  const login = async (data: LoginRequestDto) => {
    try {
      const response = await loginAPI(data);
      userStorage.set(response);
      setUser(response);
    } catch (error: any) {
      handleLoginError(error);
      throw error;
    }
  };

  const logout = () => {
    userStorage.clear();
    setUser(null);
  };

  return { user, login, logout };
};

const handleLoginError = (error: any) => {
  if (error.response) {
    const status = error.response.status;
    const message = error.response.data?.data?.message || "";

    if (status >= 400 && status < 500) {
      if (message.includes("email") || message.includes("kakao")) {
        toast.error("@kakao.com 이메일 주소만 가능합니다.");
      } else {
        toast.error(error.response.data.message || "잘못된 요청입니다.");
      }
    } else if (status >= 500) {
      toast.error("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } else {
      toast.error("알 수 없는 오류가 발생했습니다.");
    }
  } else {
    toast.error("네트워크 오류가 발생했습니다.");
  }
};
