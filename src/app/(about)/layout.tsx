import React, { ReactNode } from "react";
import { Metadata } from "next";
import Tabbar from "@/components/Tabbar";
import { tabbarItemsData } from "@/components/client-constants";

export const metadata: Metadata = {
  title: "About",
};

interface Props {
  children: ReactNode;
}
const AboutLayout = ({ children }: Props) => {
  return (
    <>
      <Tabbar items={tabbarItemsData} /> {children}
    </>
  );
};

export default AboutLayout;
