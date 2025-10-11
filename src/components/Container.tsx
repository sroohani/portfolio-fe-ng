import React, { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const Container = ({ children }: Props) => {
  return (
    <div className="h-full flex flex-col items-center gap-2">{children}</div>
  );
};

export default Container;
