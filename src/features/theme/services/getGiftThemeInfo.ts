import { useNavigate } from "react-router-dom";

import { isAxiosError } from "axios";

import { api } from "@/app/lib/api";

import { useHTTP } from "@/shared/hooks/useHTTP";

export interface GetTHemeInfoResponseBody {
    themeId: number;
    name: string;
    title: string;
    description: string;
    backgroundColor: string;
}

export async function getGiftThemeInfo(themeId?: number) {
    const { data: response } = await api<BaseResponse<GetTHemeInfoResponseBody>>(
        `/themes/${themeId}/info`,
    );
    return response.data;
}

export const useGetGiftThemeInfo = (themeId: number) => {
    const navigate = useNavigate();

    return useHTTP({
        apiFunction: () => getGiftThemeInfo(themeId),
        requestOnMount: true,
        onError: (error) => {
            if (!isAxiosError(error)) throw error;
            if (error.response?.status === 404) {
                navigate("/");
            }
        },
    });
};
