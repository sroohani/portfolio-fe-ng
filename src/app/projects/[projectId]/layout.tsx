import React, { ReactNode } from "react";
import Header from "./Header";

interface Props {
  children: ReactNode;
}

const ProjectLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col w-full">
      <Header />
      {children}
    </div>
  );
};

export default ProjectLayout;
