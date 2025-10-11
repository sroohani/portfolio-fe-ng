"use client";

import { ReactNode } from "react";
import { CircleX } from "lucide-react";
import { useClose } from "./hooks";
import IconButton from "./IconButton";

export type BackgroundOpacity = "transparent" | "opaque" | "semi";

interface Props {
  backgroundOpacity?: BackgroundOpacity;
  closeOnOutsideClick?: boolean;
  closeMe: () => void;
  children: ReactNode;
  title: string;
}

const Modal = ({
  backgroundOpacity = "semi",
  closeOnOutsideClick = true,
  closeMe,
  children,
  title,
}: Props) => {
  const frameRef = useClose(() => {
    if (closeOnOutsideClick) {
      closeMe();
    }
  });

  return (
    <div
      className={`w-dvw h-dvh fixed flex justify-center items-center top-0 left-0 ${
        backgroundOpacity === "semi"
          ? "bg-background/50"
          : backgroundOpacity === "transparent"
          ? "bg-transparent"
          : "bg-background"
      } z-10`}
    >
      <div
        ref={frameRef}
        className="flex flex-col justify-center items-center px-4 py-2 border-[1px] bg-background w-fit max-w-[80%] shadow-[0_0_6px_2px]"
      >
        <div className="flex justify-between items-center pb-2 border-b-[1px] mb-4 h-6 w-full">
          <span>{title}</span>
          <IconButton
            icon={CircleX}
            title="Close"
            id={0}
            onClick={() => closeMe()}
          />
        </div>
        {children}
      </div>
    </div>
  );
};
export default Modal;
