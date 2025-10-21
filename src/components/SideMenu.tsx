"use client";

import React, { useEffect, useState } from "react";
import { useClose } from "./hooks";
import { usePathStore, useSideMenuStore } from "./store";
import ThemeSelector from "./ThemeSelector";
import Navbar from "./Navbar";
import {
  ADMIN_ICON_BUTTON_ID,
  MAIN_NAV_ID,
  navbarItemsData,
} from "./client-constants";
import IconButton from "./IconButton";
import { ShieldUser } from "lucide-react";
import { getAdminPanelUri } from "@/server-actions";

const SideMenu = () => {
  const { setOutsideClickHappened, visibility, setVisibility, top, right } =
    useSideMenuStore();
  const [adminPanelUri, setAdminPanelUri] = useState("");
  const sideMenuRef = useClose(() => {
    setOutsideClickHappened(true);
    setTimeout(() => setOutsideClickHappened(false), 100);
    setVisibility(false);
  });
  const { setPath, notFound } = usePathStore();

  useEffect(() => {
    (async () =>
      setAdminPanelUri(
        await getAdminPanelUri(
          `${window.location.protocol}//${window.location.hostname}`
        )
      ))();
  });

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
      <ThemeSelector standalone={false} classes="w-full border-b mb-4" />
      <Navbar
        items={navbarItemsData}
        notFound={notFound}
        id={MAIN_NAV_ID}
        onClick={handleNavbarClick}
        vertical={true}
        classes="pl-2"
      />
      <div className="flex justify-start items-center gap-2 mt-4 mb-2 pt-2 border-t">
        <a
          href={adminPanelUri}
          target="_blank"
          className="flex justify-start items-center"
        >
          <IconButton
            id={ADMIN_ICON_BUTTON_ID}
            icon={ShieldUser}
            title={"Admin panel"}
            classes="w-8 h-8 place-self-center"
          />
          <span>Admin panel</span>
        </a>
      </div>
    </div>
  ) : (
    <div className="hidden"></div>
  );
};

export default SideMenu;
