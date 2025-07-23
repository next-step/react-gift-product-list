import type { ApiResponse } from "@/type/GiftAPI/product";
import { getFromUrl } from "@/utils/getFromUrl";
import { useEffect, useState } from "react";

function useFetchFromUrlT<T>(url: string, defaultT: T, infinite : boolean = false) {
    const [item, setItem] = useState<T>(defaultT);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);


    useEffect(() => {
        let isMounted = true;
        if(!infinite) setLoading(true);
        const fetchData = async () => {
            try {
                const newItem = await getFromUrl<ApiResponse<T>>(url);


                if (!isMounted) return;

                setItem(newItem.data);

            } catch (error) {
                setError(error as Error);
                throw new Error(`${url} 데이터 Fetch 실패,  ${(error as Error).message}`);
            } finally {
                setLoading(false);
            }
            

        };

        fetchData();
        return () => {
            isMounted =false;
        }
    }, [url])
    return { item, loading, error }
}

export default useFetchFromUrlT