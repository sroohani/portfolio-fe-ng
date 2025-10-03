"use client";

import React from "react";
import { ContactLink } from "./types";

interface Props {
  contactLinks: ContactLink[];
  copyFallback?: (id: number) => boolean;
  onClick?: (id: number) => void;
  onCopy?: (id: number) => void;
}

const Contactbar = ({ contactLinks, copyFallback, onClick, onCopy }: Props) => {
  const canCopy = false;
  // const canCopy =
  //   navigator.clipboard !== undefined &&
  //   navigator.clipboard.writeText !== undefined;

  const handleClickCopy = async (id: number, textToCopy: string) => {
    if (canCopy) {
      await navigator.clipboard.writeText(textToCopy);
      if (onCopy) {
        onCopy(id);
      }

      if (onClick) {
        onClick(id);
      }
    } else {
      if (copyFallback && copyFallback(id) && onClick) {
        onClick(id);
      }
    }
  };

  return (
    <div className="flex justify-start items-center w-full gap-3 sm:gap-4 py-4 border-b">
      {contactLinks.map(
        ({ id, icon: Icon, title, href, withCopy, textToCopy }) => (
          <a
            href={href}
            target="_blank"
            onClick={() =>
              withCopy
                ? textToCopy && handleClickCopy(id, textToCopy)
                : onClick && onClick(id)
            }
            key={id}
          >
            <Icon
              title={title}
              className={`h-5 w-5 sm:h-8 sm:w-8 ${
                withCopy ? "cursor-pointer" : ""
              }`}
            />
          </a>
        )
      )}
    </div>
  );
};

export default Contactbar;
