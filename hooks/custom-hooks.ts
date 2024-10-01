import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, defValue: T) {
  const [value, setValue] = useState<T>(defValue);

  useEffect(() => {
    const saved = localStorage.getItem(key);
    setValue(saved ? JSON.parse(saved) : defValue);
  }, [key, defValue]);

  // on value update
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return { value, setValue };
}
