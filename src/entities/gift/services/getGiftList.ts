import { api } from "@/app/lib/api";

import { useInfiniteScroll } from "@/shared/hooks/useInfiniteScroll";
import { type CursorPaginateApiFunction } from "@/shared/utils/cursorGenerator";

export interface GetGiftListResponseBody {
    id: number;
    name: string;
    price: {
        basicPrice: number;
        sellingPrice: number;
        discountRate: number;
    };
    imageURL: string;
    brandInfo: {
        id: number;
        name: string;
        imageURL: string;
    };
}

export async function getGiftList(themeId: number, cursor: number, limit: number) {
    const { data: response } = await api<BasePaginatedResponse<GetGiftListResponseBody, "list">>(
        `/themes/${themeId}/products`,
        { params: { cursor, limit } },
    );
    return response.data;
}

export const useGetGiftListByCursorBasedPagination = (themeId: number, limit = 10) => {
    const apiFunction: CursorPaginateApiFunction<GetGiftListResponseBody, "list"> = async (
        cursor: number,
        limit: number,
    ) => {
        const data = await getGiftList(themeId, cursor, limit);
        return { data };
    };

    return useInfiniteScroll({
        apiFunction,
        limit,
        enabled: Boolean(themeId),
    });
};
