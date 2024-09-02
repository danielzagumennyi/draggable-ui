import { useCallback, useLayoutEffect, useRef } from "react";

// eslint-disable-next-line @typescript-eslint/ban-types
export function useEvent<T extends Function>(handler: T | undefined) {
  const handlerRef = useRef<T | undefined>(handler);

  useLayoutEffect(() => {
    handlerRef.current = handler;
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useCallback(function (...args: any) {
    return handlerRef.current?.(...args);
  }, []);
}
