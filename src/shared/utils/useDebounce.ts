//@ts-nocheck
import { useCallback, useRef } from "react";

export const useDebounce = (func: (...args: any[]) => void, delay: number) => {
  const timeout = useRef<number>();
  return useCallback((...args: any[]) => {
    window.clearTimeout(timeout.current);
    timeout.current = window.setTimeout(() => func(...args), delay);
  }, [func, delay]);
}