"use client";

import { useRef } from "react";
import { usePathStore } from "./store";

interface Props {
  username: string;
  hostname: string;
  classes?: string;
}

const Prompt = ({ username, hostname, classes }: Props) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const { path } = usePathStore();

  return (
    <div
      className={`w-full flex justify-start items-center gap-2 ml-1 ${classes}`}
    >
      <span className="font-mono flex justify-start items-center h-full">
        [{username}@{hostname} {path}]$
      </span>
      <div ref={cursorRef} className="w-[1px] bg-primary soft-blink"></div>
    </div>
  );
};

export default Prompt;
