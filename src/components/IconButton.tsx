import React, { forwardRef } from "react";
import { IconType } from "react-icons";

interface Props {
  id: number;
  icon: IconType;
  disabled?: boolean;
  title?: string;
  classes?: string;
  onClick?: (id: number) => void;
}

const IconButton = forwardRef<HTMLButtonElement, Props>(
  (
    { id, icon: Icon, disabled = false, title, classes = "", onClick }: Props,
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`cursor-pointer ${classes}`}
        title={title}
        onClick={() => onClick && onClick(id)}
      >
        <Icon />
      </button>
    );
  }
);

IconButton.displayName = "IconButton";

export default IconButton;
