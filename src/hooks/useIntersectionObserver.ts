import { useEffect } from 'react';

interface Props<T extends Element = HTMLElement> {
  target: React.RefObject<T | null>;
  onIntersect: () => void;
  enabled: boolean;
}

export const useIntersectionObserver = <T extends Element = HTMLElement>({
  target,
  onIntersect,
  enabled,
}: Props<T>) => {
  useEffect(() => {
    if (!enabled || !target.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(target.current);
    return () => observer.disconnect();
  }, [target, onIntersect, enabled]);
};
