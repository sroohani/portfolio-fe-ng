"use client";

import { useToastStore } from "@/components/store";
import Toast from "@/components/Toast";
import { useEffect } from "react";

interface Props {
  classes?: string;
}

const ToastContainer = ({ classes = "" }: Props) => {
  const toast = useToastStore();

  useEffect(() => {
    const timeoutId = setTimeout(() => toast.setVisible(false), toast.maxAgeMs);

    return () => clearTimeout(timeoutId);
  });

  return (
    <>
      {toast.visible && (
        <Toast message={toast.message} type={toast.type} classes={classes} />
      )}
    </>
  );
};

export default ToastContainer;
