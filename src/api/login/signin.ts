import { api } from "@/api/api";

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
  const { data: response } = await api.post<BaseResponse<SignInResponseBody>>(
    "/login",
    requestBody,
  );
  return response.data;
};
