import { IconType } from "react-icons";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import { MdDangerous } from "react-icons/md";
import { IoIosInformationCircle } from "react-icons/io";
import { ToastType } from "./types";

interface Props {
  message: string;
  type?: ToastType;
  classes?: string;
}

const messageIcon: Record<ToastType, IconType> = {
  success: FaCheckCircle,
  warning: IoIosWarning,
  error: MdDangerous,
  info: IoIosInformationCircle,
};

const Toast = ({ message, type = "info", classes = "" }: Props) => {
  const Icon = messageIcon[type];

  return (
    <div
      className={`flex w-fit justify-start items-center gap-1 h-fit max-h-3 px-4 bg-background ${classes}`}
    >
      <Icon />
      <p>{message}</p>
    </div>
  );
};
// Toast.displayName = "Toast";

export default Toast;
