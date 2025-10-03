import { useEffect, useRef, useReducer } from "react";
import {
  CopyModalState,
  CopyModdalAction,
  Position,
  ToastAction,
  ToastState,
  ToastType,
} from "./types";

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

export const useToastReducer = () => {
  const reducer = (state: ToastState, action: ToastAction): ToastState => {
    switch (action.type) {
      case "visibility":
        return { ...state, visibility: action.payload as boolean };

      case "message":
        return { ...state, message: action.payload as string };

      case "type":
        return { ...state, type: action.payload as ToastType };

      case "position":
        return { ...state, position: { ...(action.payload as Position) } };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    visibility: false,
    message: "",
    type: "info",
    position: { top: 0 },
  });

  const setVisibility = (show: boolean) => {
    dispatch({ type: "visibility", payload: show });
  };

  const setMessage = (message: string) => {
    dispatch({ type: "message", payload: message });
  };

  const setType = (type: ToastType) => {
    dispatch({ type: "type", payload: type });
  };

  const setPosition = (position: Position) => {
    dispatch({ type: "position", payload: position });
  };

  return { state, setVisibility, setMessage, setType, setPosition };
};

export const useCopyModalReducer = () => {
  const reducer = (
    state: CopyModalState,
    action: CopyModdalAction
  ): CopyModalState => {
    switch (action.type) {
      case "id":
        return { ...state, id: action.payload as number };

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
    id: -1,
    visibility: false,
    title: "",
    prompt: "",
    textToCopy: "",
  });

  const setId = (id: number) => {
    dispatch({ type: "id", payload: id });
  };

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

  return { state, setId, setVisibility, setTitle, setPrompt, setTextToCopy };
};
