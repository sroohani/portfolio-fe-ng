"use client";

import { useEffect, useRef, useState } from "react";
import { usePathStore } from "./store";

interface Props {
  username: string;
  hostname: string;
  blinkIntervalMs?: number;
  classes?: string;
}

const Prompt = ({
  username,
  hostname,
  blinkIntervalMs = 1000,
  classes,
}: Props) => {
  const intervalRef = useRef<NodeJS.Timeout>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isGrowing, setIsGrowing] = useState(true);
  const { path } = usePathStore();

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      if (cursorRef.current) {
        if (isGrowing) {
          cursorRef.current.classList.remove("h-0", "opacity-0");
          cursorRef.current.classList.add("h-4", "opacity-100");
          setIsGrowing(false);
        } else {
          cursorRef.current.classList.remove("h-4", "opacity-100");
          cursorRef.current.classList.add("h-0", "opacity-0");
          setIsGrowing(true);
        }
      }
    }, blinkIntervalMs);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [blinkIntervalMs, isGrowing]);

  return (
    <div
      className={`w-full flex justify-start items-center gap-2 border-b pb-1 ${classes}`}
    >
      <span className="font-mono">
        [{username}@{hostname} {path}]$
      </span>
      <div
        ref={cursorRef}
        className="w-[0.2] bg-primary transition-all duration-1000"
      ></div>
    </div>
  );
};

export default Prompt;
