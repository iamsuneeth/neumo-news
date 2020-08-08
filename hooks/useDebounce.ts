import React, { useEffect } from "react";
import { useState } from "react";

export const useDebounce = (value) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDebouncedValue(value);
    }, 700);
    return () => clearTimeout(timeOut);
  }, [value]);

  return debouncedValue;
};
