"use client";

import { usePathStore } from "@/components/store";
import Link from "next/link";
import { useEffect } from "react";

const NotFound = () => {
  const { setNotFound } = usePathStore();
  useEffect(() => {
    setNotFound(true);

    return () => setNotFound(false);
  }, [setNotFound]);

  return (
    <div className="flex flex-col justify-center items-center h-full text-background bg-[url('/images/jared-evans-Wwg1TzCuV9E-unsplash.jpg')] bg-bottom sm:bg-center">
      <span className="text-6xl sm:text-8xl font-bold border-b-2 mb-4 w-[50%] text-center">
        404
      </span>
      <span className="text-4xl sm:text-6xl text-center px-4">
        What are you doing in the middle of nowhere?
      </span>
      <Link
        href="/"
        replace
        className="w-[20ch] p-4 mt-8 text-center no-underline text-black text-2xl font-semibold cursor-pointer bg-white/20 hover:bg-white transition-colors duration-300"
      >
        Go back home!
      </Link>
    </div>
  );
};

export default NotFound;
