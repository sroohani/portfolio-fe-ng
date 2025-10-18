import InProgress from "@/components/InProgress";
import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col justify-end items-center">
      <InProgress />
      <span>Loading, please wait...</span>
    </div>
  );
};

export default Loading;
