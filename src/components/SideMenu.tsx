"use client";

import React, { useEffect } from "react";
import { useClose } from "./hooks";
import { usePathStore, useSideMenuStore } from "./store";
import ThemeSelector from "./ThemeSelector";
import Navbar from "./Navbar";
import { MAIN_NAV_ID, navbarItemsData } from "./client-constants";

const SideMenu = () => {
  const { setOutsideClickHappened, visibility, setVisibility, top, right } =
    useSideMenuStore();
  const sideMenuRef = useClose(() => {
    setOutsideClickHappened(true);
    setTimeout(() => setOutsideClickHappened(false), 100);
    setVisibility(false);
  });
  const { setPath } = usePathStore();

  useEffect(() => {
    if (sideMenuRef.current) {
      sideMenuRef.current.style.top = `${top}px`;
      sideMenuRef.current.style.right = `${right}px`;
    }
  }, [top, right, sideMenuRef]);

  const handleNavbarClick = (navbarId: number, navbarItemId: number) => {
    setPath(
      navbarItemsData.find((item) => item.id === navbarItemId)?.href ?? "/"
    );
  };

  return visibility ? (
    <div
      ref={sideMenuRef}
      className="fixed max-w-[70%] w-fit max-h-[80%] h-fit flex flex-col justify-start items-center overflow-auto scrollbar-themed border p-2 gap-2 bg-background drop-down"
    >
      <ThemeSelector standalone={false} />
      <Navbar
        items={navbarItemsData}
        id={MAIN_NAV_ID}
        onClick={handleNavbarClick}
        vertical={true}
      />
    </div>
  ) : (
    <div className="hidden"></div>
  );
};

export default SideMenu;
