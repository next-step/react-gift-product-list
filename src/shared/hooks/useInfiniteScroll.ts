import { useCallback, useEffect, useRef, useState } from "react";

import { useInView } from "@/shared/hooks/useInView";
import { cursorGenerator, type CursorPaginateApiFunction } from "@/shared/utils/cursorGenerator";

export interface UseInfiniteScrollOptions<T, K extends string> {
    apiFunction: CursorPaginateApiFunction<T, K>;
    limit?: number;
    enabled?: boolean;
    threshold?: number;
    rootMargin?: string;
}

export function useInfiniteScroll<T, K extends string>({
    apiFunction,
    limit = 10,
    enabled = true,
    threshold = 0.1,
    rootMargin = "100px",
}: UseInfiniteScrollOptions<T, K>) {
    const [items, setItems] = useState<T[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<unknown>(null);

    const generatorRef = useRef<AsyncGenerator<
        BasePaginatedResponse<T, K>["data"],
        void,
        unknown
    > | null>(null);

    const initGenerator = useCallback(() => {
        if (!enabled) return;
        generatorRef.current = cursorGenerator<T, K>(0, limit, apiFunction);
    }, [apiFunction, limit, enabled]);

    const loadMore = useCallback(async () => {
        if (isPending || !enabled || !hasMore) return;
        setIsPending(true);
        setError(null);

        try {
            if (!generatorRef.current) initGenerator();
            if (!generatorRef.current) return;

            const { value, done } = await generatorRef.current.next();

            if (done || !value) {
                setHasMore(false);
                return;
            }

            const listKey = Object.keys(value).find(
                (key) =>
                    key !== "hasMoreList" &&
                    key !== "cursor" &&
                    Array.isArray(value[key as keyof typeof value]),
            ) as K;

            if (!listKey) {
                setHasMore(false);
                return;
            }

            const newItems = value[listKey] as T[];
            setItems((prev) => [...prev, ...newItems]);
            setHasMore(value.hasMoreList);
        } catch (err) {
            setError(err);
        } finally {
            setIsPending(false);
        }
    }, [enabled, isPending, hasMore, initGenerator]);

    const { ref: loadMoreRef } = useInView({
        onInView: loadMore,
        threshold,
        rootMargin,
    });

    const reset = useCallback(() => {
        generatorRef.current = null;
        setItems([]);
        setHasMore(true);
        setError(null);
        setIsPending(false);
    }, []);

    useEffect(() => {
        reset();

        if (enabled) {
            loadMore();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [enabled]);

    return {
        items,
        isPending,
        error,
        hasMore,
        loadMore,
        loadMoreRef,
        reset,
    };
}
