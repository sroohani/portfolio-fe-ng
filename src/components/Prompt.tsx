"use client";

import { useRef } from "react";
import { usePathStore } from "./store";
import Image from "next/image";
import thinkingFace from "@/assets/images/thinking-face.png";

interface Props {
  username: string;
  hostname: string;
  classes?: string;
}

const Prompt = ({ username, hostname, classes }: Props) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const { path, notFound } = usePathStore();

  return (
    <div
      className={`w-full flex justify-start items-center gap-2 ml-1 ${classes}`}
    >
      <span className="font-mono flex justify-start items-center h-full">
        [{username}@{hostname}&nbsp;
        {notFound ? (
          <Image
            src={thinkingFace}
            width="32"
            height="32"
            alt="Thinking face"
          />
        ) : (
          path
        )}
        ]$
      </span>
      <div ref={cursorRef} className="w-[1px] bg-primary soft-blink"></div>
    </div>
  );
};

export default Prompt;
