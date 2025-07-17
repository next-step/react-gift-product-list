import { getFromUrl } from "@/utils/getFromUrl";
import { useEffect, useState } from "react";

function useFetchFromUrlT<T>(url: string, defaultT: T) {
    const [item, setItem] = useState<T>(defaultT);
    const [loding, setLoding] = useState(true);
    const [error, setError] = useState<Error | null>(null);


    useEffect(() => {
        let isMounted = true;
        const fetchTheme = async () => {
            try {
                const newItem = await getFromUrl(url);

                if (!isMounted) return;

                if (Array.isArray(defaultT) && Array.isArray(newItem.data)) {
                    setItem(prev => ([...(prev as T[]), ...newItem.data]) as T);
                } else {
                    setItem(newItem.data);
                }
            } catch (error) {
                setError(error as Error);
                throw new Error(`${url} 데이터 Fetch 실패,  ${(error as Error).message}`);
            } finally {
                setLoding(false);
            }
            

        };

        fetchTheme();
        return () => {
            isMounted =false;
        }
    }, [url])
    return { item, loding, error }
}

export default useFetchFromUrlT