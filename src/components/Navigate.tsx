"use client";

import React from "react";
import { IconType } from "react-icons";
import Button from "./Button";
import { useRouter } from "next/navigation";

interface Props {
  title: string;
  icon?: IconType;
  iconPosition?: "before" | "after";
  classes?: string;
  to: string;
}

const Navigate = (props: Props) => {
  const router = useRouter();

  return (
    <Button
      icon={props.icon}
      title="View details"
      classes="btn-nav"
      onClick={() => router.push(props.to)}
    />
  );
};

export default Navigate;
