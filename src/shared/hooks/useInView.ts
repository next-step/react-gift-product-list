import { useCallback, useEffect, useRef, useState } from "react";

type UseInViewOptions = {
    onInView?: () => void;
    threshold?: number;
    rootMargin?: string;
};

export const useInView = ({ onInView, threshold = 0.1, rootMargin = "50px" }: UseInViewOptions) => {
    const [isInView, setIsInView] = useState<boolean>(false);
    const elementRef = useRef<HTMLDivElement>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);

    const handleIntersection = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const entry = entries[0];
            const isIntersecting = entry.isIntersecting;

            setIsInView(isIntersecting);

            if (isIntersecting) onInView?.();
        },
        [onInView],
    );

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        observerRef.current = new IntersectionObserver(handleIntersection, {
            threshold,
            rootMargin,
        });

        observerRef.current.observe(element);

        return () => observerRef.current?.disconnect();
    }, [handleIntersection, threshold, rootMargin]);

    return {
        ref: elementRef,
        isInView,
    };
};
