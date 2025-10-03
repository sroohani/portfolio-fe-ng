"use client";

import React, { useEffect } from "react";
import { themeInfo } from "./types";
import { Palette } from "lucide-react";
import { useThemeStore } from "./store";
import { useClose } from "./hooks";

interface Props {
  standalone?: boolean;
  classes?: string;
}

const ThemeSelector = ({ standalone = true, classes }: Props) => {
  const {
    theme,
    setTheme,
    selectorVisibility,
    setSelectorVisibility,
    selectorTop,
    selectorRight,
    setOutsideClickHappened,
  } = useThemeStore();
  const themeSelectorRef = useClose(() => {
    if (standalone) {
      setOutsideClickHappened(true);
      setTimeout(() => setOutsideClickHappened(false), 100);
      setSelectorVisibility(false);
    }
  });

  useEffect(() => {
    if (themeSelectorRef.current && standalone) {
      themeSelectorRef.current.style.top = `${selectorTop}px`;
      themeSelectorRef.current.style.right = `${selectorRight}px`;
    }
  }, [selectorTop, selectorRight, themeSelectorRef, standalone]);
  return selectorVisibility || !standalone ? (
    <div
      ref={themeSelectorRef}
      data-marker
      className={`${theme} ${
        standalone ? "fixed border drop-down" : ""
      } flex gap-2 justify-between items-center px-2 py-1 bg-background ${classes}`}
    >
      {themeInfo.map((info) => (
        <div
          className={`${info.name} relative flex flex-col justify-start items-center bg-transparent border-0 m-0 p-0 w-full h-full gap[0.3rem] mb-[0.3rem]`}
          key={info.id}
        >
          <input
            type="radio"
            className="absolute top-0 left-0 w-full h-full appearance-none m-0 p-0 cursor-pointer outline-0"
            checked={theme === info.name}
            title={info.title}
            onChange={() => setTheme(info.name)}
          />
          <Palette
            color={`rgb(${info.foregroundColor})`}
            className={`${theme === info.name ? "border-b" : ""} pb-1`}
          />
        </div>
      ))}
    </div>
  ) : (
    <div className="hidden"></div>
  );
};

export default ThemeSelector;
