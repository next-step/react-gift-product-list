// 페이지가 맨 아래까지 스크롤했는지 검사 
import { useEffect, useRef } from 'react';

interface UseIntersectionObserverProps {
  threshold?: number;
  onIntersect: () => void;
  enabled?: boolean; 
}

export const useIntersectionObserver = ({ threshold = 0, onIntersect }: UseIntersectionObserverProps) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if( !targetRef.current) return; 
    const observer = new IntersectionObserver(
      (entries)=>{
        if(entries[0].isIntersecting) {
          onIntersect();
        } 
      }, {threshold}
    );
    observer.observe(targetRef.current);
    observerRef.current = observer;

    return ()=>{
      observer.disconnect();
    };
  },[onIntersect, threshold]);
  return { targetRef };
};

export default useIntersectionObserver;