import { getFromUrl } from "@/utils/getFromUrl";
import { useEffect, useState } from "react";

function useFetchFromUrlT<T>(url: string, defaultT : T) {
    const [item, setItem] = useState<T>(defaultT);
    const [loding, setLoding] = useState(true);
    const [error, setError] = useState<Error | null>(null);


    useEffect(() => {
        const fetchTheme = async () => {
            try {
                const Ranking = await getFromUrl(url);
                setItem(Ranking.data);
            }catch (error){
                setError(error as Error);
                throw new Error(`${url} 데이터 Fetch 실패,  ${(error as Error).message}`);
            } finally {
                setLoding(false);
            }
            
        };

        fetchTheme();
    }, [url])
    return {item,loding,error}
}

export default useFetchFromUrlT