"use client";

import type { IconType } from "react-icons";

interface Props {
  title: string;
  icon?: IconType;
  iconPosition?: "before" | "after";
  onClick?: () => void;
  classes?: string;
}

const Button = ({
  title,
  icon: Icon,
  iconPosition = "before",
  onClick,
  classes,
}: Props) => {
  return (
    <button
      className={`flex justify-center items-center gap-4 bg-background text-foreground outline-0 cursor-pointer p-2 border-[1px] whitespace-normal wrap-break-word transition-shadow hover:transition-shadow hover:shadow-[0_0_6px_2px] duration-300 ${classes}`}
      onClick={() => onClick && onClick()}
    >
      {Icon && iconPosition === "before" && <Icon />}
      {title}
      {Icon && iconPosition === "after" && <Icon />}
    </button>
  );
};

export default Button;
