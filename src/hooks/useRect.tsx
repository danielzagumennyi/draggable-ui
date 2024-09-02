import { useState, useEffect, useCallback, useRef, RefObject } from "react";

export const useRect = <T extends HTMLElement>(): [
  RefObject<T>,
  DOMRect | null
] => {
  const [rect, setRect] = useState<DOMRect | null>(null);
  const ref = useRef<T>(null);

  const updateRect = useCallback(() => {
    if (ref.current) {
      const domRect = ref.current.getBoundingClientRect();
      setRect(domRect);
    }
  }, []);

  useEffect(() => {
    updateRect();

    window.addEventListener("resize", updateRect);
    window.addEventListener("scroll", updateRect);

    return () => {
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect);
    };
  }, [updateRect]);

  useEffect(() => {
    const element = ref.current;
    const observer = new ResizeObserver(updateRect);

    if (element) observer.observe(element);
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [updateRect]);

  return [ref, rect];
};
