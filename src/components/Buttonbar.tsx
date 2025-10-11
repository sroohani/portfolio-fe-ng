import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  classes?: string;
}

const Buttonbar = ({ children, classes = "" }: Props) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 ${classes}`}>
      {children}
    </div>
  );
};

export default Buttonbar;
