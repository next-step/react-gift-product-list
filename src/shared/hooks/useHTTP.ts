import { useState, useCallback, useEffect, useRef } from "react";

export type UseHttpOptions<Req, Res> = {
    apiFunction: (requestBody?: Req) => Promise<Res>;
    onError?: (error: unknown) => void;
    requestOnMount?: boolean;
};

export const useHTTP = <Req = unknown, Res = unknown>({
    apiFunction,
    requestOnMount = false,
    onError,
}: UseHttpOptions<Req, Res>) => {
    const [isPending, setIsPending] = useState<boolean>(false);
    const [data, setData] = useState<Res | null>(null);
    const [error, setError] = useState<unknown>(null);

    const onErrorRef = useRef(onError);
    const apiFunctionRef = useRef(apiFunction);

    const request = useCallback(async (requestBody?: Req) => {
        setIsPending(true);
        setError(null);

        try {
            const result = await apiFunctionRef.current(requestBody);
            setData(result);
            return result;
        } catch (err) {
            const onError = onErrorRef.current;
            setError(err);
            if (!onError) throw err;
            else onError(err);
            return null;
        } finally {
            setIsPending(false);
        }
    }, []);

    useEffect(() => {
        if (requestOnMount) {
            request();
        }
    }, [requestOnMount, request]);

    return { isPending, data, error, request };
};
