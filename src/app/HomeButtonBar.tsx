"use client";

import React from "react";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

const HomeButtonBar = () => {
  const router = useRouter();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
      <Button
        title="View or download my resume"
        onClick={() => router.push("/resume")}
      />
      <Button
        title="Send me a message"
        onClick={() => router.push("/contact")}
      />
    </div>
  );
};

export default HomeButtonBar;
