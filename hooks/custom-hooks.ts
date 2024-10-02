import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, defValue: T) {
  const [value, setValue] = useState<T>(defValue);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(key);
    if (saved) {
      setValue(JSON.parse(saved));
    } else {
      localStorage.setItem("docs", JSON.stringify(defValue));
    }

    setIsReady(true);
  }, [key, defValue]);

  // on value update
  useEffect(() => {
    if (value === defValue) return;
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key, defValue]);

  return { value, setValue, isReady };
}
