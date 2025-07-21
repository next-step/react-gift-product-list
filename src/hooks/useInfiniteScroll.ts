import { SCROLL_THRESHOLD } from "@/constants/pagination";
import { useEffect, useRef } from "react";

type UseInfiniteScrollProps = {
  onIntersect: () => void;
  enabled: boolean;
  threshold?: number;
};

export const useInfiniteScroll = ({
  onIntersect,
  enabled,
  threshold = SCROLL_THRESHOLD,
}: UseInfiniteScrollProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled || !ref.current) return;

    const element = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      },
      { threshold },
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [enabled, onIntersect, threshold]);

  return ref;
};
