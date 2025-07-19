import { api } from "@/app/lib/api";

import { useHTTP } from "@/shared/hooks/useHTTP";

export type GetThemesResponseBody = Array<{
    themeId: number;
    name: string;
    image: string;
}>;

export async function getGiftThemes() {
    const { data: response } = await api.get<BaseResponse<GetThemesResponseBody>>("/themes");
    return response.data;
}

export const useGiftThemes = () => {
    return useHTTP<void, GetThemesResponseBody>({
        apiFunction: getGiftThemes,
        requestOnMount: true,
    });
};
