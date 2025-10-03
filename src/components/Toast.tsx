import React, { useEffect, useRef } from "react";
import { IconType } from "react-icons";
import { CiCircleCheck } from "react-icons/ci";
import { IoWarningOutline } from "react-icons/io5";
import { MdOutlineDangerous } from "react-icons/md";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { CircleX } from "lucide-react";
import { Position, ToastType } from "./types";

interface Props {
  message: string;
  type?: ToastType;
  position?: Position;
  closeMe: () => void;
  maxAgeMs?: number;
  timerPos?: "top" | "bottom";
}

const messageIcon: Record<ToastType, IconType> = {
  success: CiCircleCheck,
  warning: IoWarningOutline,
  error: MdOutlineDangerous,
  info: IoIosInformationCircleOutline,
};

const Toast = ({
  message,
  type = "info",
  position = { top: 0 },
  closeMe,
  maxAgeMs = 3000,
  timerPos = "top",
}: Props) => {
  const timerRef = useRef<HTMLHRElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const TimerElem = (
    <hr ref={timerRef} className="h-[2px] w-full bg-foreground mb-4" />
  );

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();

      if (position.left !== undefined) {
        containerRef.current.style.left = `${position.left}px`;
      } else {
        const left = (window.innerWidth - rect.width) / 2;
        containerRef.current.style.left = `${left}px`;
      }
      if (position.top !== undefined) {
        containerRef.current.style.top = `${position.top}px`;
      }
      if (position.right !== undefined) {
        containerRef.current.style.right = `${position.right}px`;
      }
      if (position.bottom !== undefined) {
        containerRef.current.style.bottom = `${position.bottom}px`;
      }

      containerRef.current.classList.add("flex");
      containerRef.current.classList.remove("hidden");
    }

    if (timerRef.current) {
      const initialTimerWidth = timerRef.current.getBoundingClientRect().width;
      let remainingAgeMs = maxAgeMs;

      const shortenRemainingAge = () => {
        remainingAgeMs -= 100;
        if (remainingAgeMs <= 0) {
          closeMe();
        }

        timerRef.current!.style.width = `${
          (remainingAgeMs * initialTimerWidth) / maxAgeMs
        }px`;
      };

      const intervalId = setInterval(shortenRemainingAge, 100);

      return () => clearInterval(intervalId);
    }
  }, [timerRef, closeMe, maxAgeMs, position]);

  const Icon = messageIcon[type];

  return (
    <div
      ref={containerRef}
      className="fixed hidden flex-col justify-start items-start ga-2 w-fit max-w-[80%] h-fit max-h-20 py-2 px-4 bg-background border"
    >
      <div className="flex justify-end items-center w-full">
        <div
          className="flex justify-center items-center w-4 h-4 cursor-pointer"
          title="Close"
          onClick={closeMe}
        >
          <CircleX />
        </div>
      </div>
      {timerPos === "top" && TimerElem}
      <div className="flex justify-start items-center gap-4">
        <div className="flex justify-center items-center h-4 w-4">
          <Icon />
        </div>
        <p>{message}</p>
      </div>
      {timerPos === "bottom" && TimerElem}
    </div>
  );
};
Toast.displayName = "Toast";

export default Toast;
