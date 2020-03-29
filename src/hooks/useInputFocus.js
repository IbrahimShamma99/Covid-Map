import { useRef, useEffect } from 'react';

export default function useInputFocus(active) {
  const inputRef = useRef();

  useEffect(() => {
    if (inputRef.current && active) {
      inputRef.current.focus();
    }
  }, [active]);

  return { ref: inputRef };
}
