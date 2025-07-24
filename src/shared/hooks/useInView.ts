import { useCallback, useEffect, useRef, useState } from "react";

type UseInViewOptions = {
    onInView?: () => void;
    threshold?: number;
    rootMargin?: string;
};

export const useInView = ({ onInView, threshold = 0.1, rootMargin = "50px" }: UseInViewOptions) => {
    const [isInView, setIsInView] = useState<boolean>(false);
    const elementRef = useRef<HTMLDivElement>(null);

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

        const intersectionObserver = new IntersectionObserver(handleIntersection, {
            threshold,
            rootMargin,
        });

        intersectionObserver.observe(element);

        return () => intersectionObserver?.disconnect();
    }, [handleIntersection, threshold, rootMargin]);

    return {
        ref: elementRef,
        isInView,
    };
};
