import { useEffect, useState } from "react";
import { fetchGiftRanking, type GiftProduct } from "@/apis/fetchGiftRanking";

export function useGiftRanking(targetType: string, rankType: string) {
    const [data, setData] = useState<GiftProduct[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchGiftRanking(targetType, rankType)
            .then((res) => {
                setData(res);
                setError(false);
            })
            .catch(() => {
                setError(true);
                setData(null);
            })
            .finally(() => setLoading(false));
    }, [targetType, rankType]);

    return { data, loading, error };
}