import { useState, useCallback, useEffect } from "react";

export type UseHttpOptions<Req, Res> = {
    apiFunction: (requestBody?: Req) => Promise<Res>;
    sendOnMount?: boolean;
};

export const useHTTP = <Req = unknown, Res = unknown>({
    apiFunction,
    sendOnMount = false,
}: UseHttpOptions<Req, Res>) => {
    const [isPending, setIsPending] = useState<boolean>(false);
    const [data, setData] = useState<Res | null>(null);
    const [error, setError] = useState<unknown>(null);

    const send = useCallback(
        async (requestBody?: Req) => {
            setIsPending(true);
            setError(null);

            try {
                const result = await apiFunction.call(null, requestBody!);
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
        if (sendOnMount) {
            send();
        }
    }, [sendOnMount, send]);

    return { isPending, data, error, send };
};
