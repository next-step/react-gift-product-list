import { useState, useCallback, useEffect } from "react";

export type UseHttpOptions<Req, Res> = {
    apiFunction: (requestBody?: Req) => Promise<Res>;
    requestOnMount?: boolean;
};

export const useHTTP = <Req = unknown, Res = unknown>({
    apiFunction,
    requestOnMount = false,
}: UseHttpOptions<Req, Res>) => {
    const [isPending, setIsPending] = useState<boolean>(false);
    const [data, setData] = useState<Res | null>(null);
    const [error, setError] = useState<unknown>(null);

    const request = useCallback(
        async (requestBody?: Req) => {
            setIsPending(true);
            setError(null);

            try {
                const result = await apiFunction.call(null, requestBody);
                setData(result);
                return result;
            } catch (err) {
                setError(err);
                throw err;
            } finally {
                setIsPending(false);
            }
        },
        [apiFunction],
    );

    useEffect(() => {
        if (requestOnMount) {
            request();
        }
    }, [requestOnMount, request]);

    return { isPending, data, error, request };
};
