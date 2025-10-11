"use client";

import React from "react";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import Buttonbar from "@/components/Buttonbar";

const HomeButtonbar = () => {
  const router = useRouter();
  return (
    <Buttonbar>
      <Button
        title="View or download my resume"
        onClick={() => router.push("/resume")}
      />
      <Button
        title="Send me a message"
        onClick={() => router.push("/contact")}
      />
    </Buttonbar>
  );
};

export default HomeButtonbar;
