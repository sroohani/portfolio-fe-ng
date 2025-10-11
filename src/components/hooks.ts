import { useEffect, useRef, useReducer } from "react";
import { CopyModalState, CopyModalAction } from "./types";

export const useClose = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        callback();
      }
    };

    document.addEventListener("mouseup", handleClickOutside);
    document.addEventListener("touchend", handleClickOutside);
    document.addEventListener("keyup", handleEscKey);

    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
      document.removeEventListener("touchend", handleClickOutside);
      document.addEventListener("keyup", handleEscKey);
    };
  }, [callback]);

  return ref;
};

export const useCopyModalReducer = () => {
  const reducer = (
    state: CopyModalState,
    action: CopyModalAction
  ): CopyModalState => {
    switch (action.type) {
      case "visibility":
        return { ...state, visibility: action.payload as boolean };

      case "title":
        return { ...state, title: action.payload as string };

      case "prompt":
        return { ...state, prompt: action.payload as string };

      case "text-to-copy":
        return { ...state, textToCopy: action.payload as string };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    visibility: false,
    title: "",
    prompt: "",
    textToCopy: "",
  });

  const setVisibility = (show: boolean) => {
    dispatch({ type: "visibility", payload: show });
  };

  const setTitle = (title: string) => {
    dispatch({ type: "title", payload: title });
  };

  const setPrompt = (prompt: string) => {
    dispatch({ type: "prompt", payload: prompt });
  };

  const setTextToCopy = (textToCopy: string) => {
    dispatch({ type: "text-to-copy", payload: textToCopy });
  };

  return { state, setVisibility, setTitle, setPrompt, setTextToCopy };
};
