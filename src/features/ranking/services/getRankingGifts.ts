import { useCallback, useEffect } from "react";

import { api } from "@/app/lib/api";

import type { RankTypeQuery } from "@/entities/gift/constants/rankType";
import type { TargetGroupQuery } from "@/entities/gift/constants/targetType";

import { useHTTP } from "@/shared/hooks/useHTTP";
import { useQueryParamState } from "@/shared/hooks/useQueryParamState";

export type GetRankingGiftsResponseBody = Array<{
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
}>;

export const getRankingGifts = async (targetType: TargetGroupQuery, rankType: RankTypeQuery) => {
    const { data: response } = await api.get<BaseResponse<GetRankingGiftsResponseBody>>(
        "/products/ranking",
        { params: { targetType, rankType } },
    );
    return response.data;
};

export const useRankingGifts = () => {
    const [targetType] = useQueryParamState<TargetGroupQuery>("targetType", "ALL");
    const [rankType] = useQueryParamState<RankTypeQuery>("rankType", "MANY_WISH");

    const apiFunction = useCallback(() => {
        if (!targetType || !rankType) {
            return getRankingGifts("ALL", "MANY_WISH");
        }
        return getRankingGifts(targetType, rankType);
    }, [targetType, rankType]);

    const { isPending, data, error, request } = useHTTP<void, GetRankingGiftsResponseBody>({
        apiFunction,
    });

    useEffect(() => {
        if (targetType && rankType) request();
    }, [targetType, rankType, request]);

    return { isPending, data, error, request };
};
