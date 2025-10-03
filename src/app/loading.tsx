import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col justify-end items-center">
      <div className="flex justify-center items-end h-10 w-10 gap-2">
        {[0, 1, 2].map((i) => (
          <div key={`loader-bar-${i}`} className="loader-bar"></div>
        ))}
      </div>
      <span>Loading, please wait...</span>
    </div>
  );
};

export default Loading;
