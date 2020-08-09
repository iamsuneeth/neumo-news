import { useEffect, useRef } from "react";

export const useIntersection = <RefType extends Element = any>(
  callback: IntersectionObserverCallback
) => {
  const target = useRef<RefType>(null);
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.25,
    };
    const observer = new IntersectionObserver(callback, options);
    if (target.current) {
      observer.observe(target.current);
    }
    return () => observer.unobserve(target.current);
  }, [target, callback]);

  return { target };
};
