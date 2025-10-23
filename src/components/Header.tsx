"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import {
  MAIN_NAV_ID,
  MENU_ICON_BUTTON_ID,
  navbarItemsData,
  THEME_ICON_BUTTON_ID,
  ADMIN_ICON_BUTTON_ID,
} from "@/components/client-constants";
import IconButton from "./IconButton";
import { Palette, Menu, ShieldUser } from "lucide-react";
import { usePathStore, useSideMenuStore, useThemeStore } from "./store";
import { getAdminPanelUri } from "@/server-actions";

const Header = () => {
  const pathname = usePathname();
  const themeIconButtonRef = useRef<HTMLButtonElement>(null);
  const sideMenuIconButtonRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const [adminPanelUri, setAdminPanelUri] = useState("");
  const { setPath, notFound, setNotFound } = usePathStore();
  const {
    setSelectorVisibility,
    setSelectorTop,
    setSelectorRight,
    outsideClickHappened: outsideClickHappenedTheme,
    setOutsideClickHappened: setOutsideClickHappenedTheme,
  } = useThemeStore();
  const {
    setTop: setTopSideMenu,
    setRight: setRightSideMenu,
    setVisibility: setVisibilitySideMenu,
    outsideClickHappened: outsideClickHappenedSideMenu,
    setOutsideClickHappened: setOutsideClickHappenedSideMenu,
  } = useSideMenuStore();

  const handleNavbarClick = (navbarId: number, navbarItemId: number) => {
    setPath(
      navbarItemsData.find((item) => item.id === navbarItemId)?.href ?? "/"
    );
  };

  const handleThemeButtonClick = () => {
    if (themeIconButtonRef.current && headerRef.current) {
      if (outsideClickHappenedTheme) {
        setOutsideClickHappenedTheme(false);
      } else {
        const docRect = document.documentElement.getBoundingClientRect();
        const themeBtnRect = themeIconButtonRef.current.getBoundingClientRect();
        const headerRect = headerRef.current.getBoundingClientRect();
        setSelectorTop(headerRect.bottom + 2);
        setSelectorRight(docRect.right - themeBtnRect.right);
        setSelectorVisibility(true);
      }
    }
  };
  const handleMenuButtonClick = () => {
    if (sideMenuIconButtonRef.current && headerRef.current) {
      if (outsideClickHappenedSideMenu) {
        setOutsideClickHappenedSideMenu(false);
      } else {
        const docRect = document.documentElement.getBoundingClientRect();
        const sideMenuBtnRect =
          sideMenuIconButtonRef.current.getBoundingClientRect();
        const headerRect = headerRef.current.getBoundingClientRect();
        setTopSideMenu(headerRect.bottom + 2);
        setRightSideMenu(docRect.right - sideMenuBtnRect.right);
        setVisibilitySideMenu(true);
      }
    }
  };

  useEffect(() => {
    (async () =>
      setAdminPanelUri(
        await getAdminPanelUri(
          `${window.location.protocol}//${window.location.hostname}`
        )
      ))();
  }, []);

  useEffect(() => {
    let path = "";

    if (pathname === "/" || pathname === "/contact") {
      path = pathname;
    } else if (pathname.startsWith("/projects")) {
      path = "/projects";
    } else if (
      pathname === "/resume" ||
      pathname === "/credits" ||
      pathname === "/faq"
    ) {
      path = "/about";
    } else {
      path = "";
      setNotFound(true);
    }
    setPath(path);
  }, [setPath, pathname, setNotFound]);

  return (
    <header
      ref={headerRef}
      className="h-header w-full flex justify-between items-center gap-2"
    >
      <div className="w-full"></div>
      <Navbar
        items={navbarItemsData}
        notFound={notFound}
        id={MAIN_NAV_ID}
        onClick={handleNavbarClick}
      />
      <div className="w-full"></div>
      <a
        href={adminPanelUri}
        target="_blank"
        className="hidden sm:inline-block sm:w-8 sm:h-8 mt-2"
      >
        <IconButton
          id={ADMIN_ICON_BUTTON_ID}
          icon={ShieldUser}
          title={"Admin panel"}
        />
      </a>
      <IconButton
        ref={themeIconButtonRef}
        id={THEME_ICON_BUTTON_ID}
        icon={Palette}
        title="Change theme"
        onClick={handleThemeButtonClick}
        classes="hidden sm:inline-block"
      />
      <IconButton
        ref={sideMenuIconButtonRef}
        id={MENU_ICON_BUTTON_ID}
        icon={Menu}
        title="Open menu"
        onClick={handleMenuButtonClick}
        classes="sm:hidden"
      />
    </header>
  );
};

export default Header;
