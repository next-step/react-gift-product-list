import { useState, useCallback, useEffect } from "react";

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

    const request = useCallback(
        async (requestBody?: Req) => {
            setIsPending(true);
            setError(null);

            try {
                const result = await apiFunction(requestBody);
                setData(result);
                return result;
            } catch (err) {
                setError(err);

                if (!onError) throw err;
                else onError(err);
                return null;
            } finally {
                setIsPending(false);
            }
        },
        [apiFunction, onError],
    );

    useEffect(() => {
        if (requestOnMount) {
            request();
        }
    }, [requestOnMount, request]);

    return { isPending, data, error, request };
};
