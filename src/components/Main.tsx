"use client";

import React, { ReactNode, useEffect } from "react";
import { useThemeStore } from "./store";
import { themeInfo } from "./types";

interface Props {
  children: ReactNode;
}

const Main = ({ children }: Props) => {
  const theme = useThemeStore((state) => state.theme);
  useEffect(() => {
    const htmlElem = document.documentElement;
    themeInfo.forEach((th) => htmlElem.classList.remove(th.name));
    htmlElem.classList.add(theme, "flex");
    htmlElem.classList.remove("hidden");
  }, [theme]);

  return (
    <>
      <main className="h-main w-full flex flex-col justify-start items-center scrollbar-themed overflow-y-auto">
        {children}
      </main>
    </>
  );
};

export default Main;
