"use client";

import React, { ReactNode, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

interface Props {
  title?: string;
  children: ReactNode;
  collapsible?: boolean;
  contentHeight?: number;
  containerClasses?: string;
  titleClasses?: string;
}

const Card = ({
  title,
  children,
  collapsible = false,
  contentHeight = 200,
  containerClasses = "",
  titleClasses = "",
}: Props) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className={`flex flex-col ${containerClasses}`}>
      <div
        className={`flex justify-start items-center gap-4 px-2 h-8 border ${
          collapsible ? "cursor-pointer" : ""
        } ${titleClasses}`}
        onClick={() => collapsible && setCollapsed(!collapsed)}
      >
        {collapsible && (
          <div className="w-4 h-4">
            <IoIosArrowForward
              className={`transition${
                collapsed ? " " : " rotate-90 "
              } duration-300`}
            />
          </div>
        )}
        {title}
      </div>
      <div
        className={`overflow-hidden overflow-y-auto scrollbar-themed transition-all duration-300`}
        style={{
          height: collapsible && collapsed ? "0" : `${contentHeight}px`,
          borderWidth: `0 ${collapsible && collapsed ? "0" : "1px"} ${
            collapsible && collapsed ? "0" : "1px"
          }`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Card;
