"use client";

import React from "react";
import Button from "@/components/Button";
import { IoMdArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  return (
    <div className="flex justify-start items-center h-12 mb-4">
      <Button
        icon={IoMdArrowBack}
        title="Back to projects"
        onClick={() => router.back()}
        classes="btn-nav w-[20ch]"
      />
    </div>
  );
};

export default Header;
