"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import {
  MAIN_NAV_ID,
  MENU_ICON_BUTTON_ID,
  navbarItemsData,
  THEME_ICON_BUTTON_ID,
} from "@/components/client-constants";
import IconButton from "./IconButton";
import { Palette, Menu } from "lucide-react";
import { usePathStore, useSideMenuStore, useThemeStore } from "./store";

const Header = () => {
  const pathname = usePathname();
  const themeIconButtonRef = useRef<HTMLButtonElement>(null);
  const sideMenuIconButtonRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const { setPath } = usePathStore();
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
      path = "/";
    }
    setPath(path);
  }, [setPath, pathname]);

  return (
    <header
      ref={headerRef}
      className="h-header w-full flex justify-between items-center border-b-[1px]"
    >
      <div></div>
      <Navbar
        items={navbarItemsData}
        id={MAIN_NAV_ID}
        onClick={handleNavbarClick}
      />
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
