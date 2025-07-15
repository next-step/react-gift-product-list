import { api } from "@/api/api";
import ApiErrorHandler from "@/api/ErrorHandler";

interface SignInRequestBody {
  email: string;
  password: string;
}

interface SignInResponseBody {
  email: string;
  name: string;
  authToken: string;
}

export const signin = async (
  requestBody: SignInRequestBody,
): Promise<SignInResponseBody> => {
  return ApiErrorHandler.executeApi(async () => {
    const { data: response } = await api.post<BaseResponse<SignInResponseBody>>(
      "/login",
      requestBody,
    );
    return response.data;
  }, "로그인 중 오류가 발생했습니다.");
};
