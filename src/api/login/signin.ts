import { api } from "@/api/api";
import { executeApi } from "@/api/ErrorHandler";
import { API_ERROR_MESSAGE } from "@/constants";

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
  return executeApi(async () => {
    const { data: response } = await api.post<BaseResponse<SignInResponseBody>>(
      "/login",
      requestBody,
    );
    return response.data;
  }, API_ERROR_MESSAGE.LOGIN);
};
