"use client";

import { FaQuestion } from "react-icons/fa";
import { NavbarItemData, TabbarItemData } from "./types";
import { Contact, FileUser, FolderCode, House, Info, User } from "lucide-react";

export const LS_ITEM_THEME = "theme";

export const MAIN_NAV_ID = 0;
export const MAIN_NAV_ITEM_ID_HOME = 0;
export const MAIN_NAV_ITEM_ID_PROJECTS = 1;
export const MAIN_NAV_ITEM_ID_ABOUT = 2;
export const MAIN_NAV_ITEM_ID_CONTACT = 3;

export const navbarItemsData: NavbarItemData[] = [
  {
    id: MAIN_NAV_ITEM_ID_HOME,
    title: "Home",
    href: "/",
    icon: House,
  },
  {
    id: MAIN_NAV_ITEM_ID_PROJECTS,
    title: "Projects",
    href: "/projects",
    icon: FolderCode,
  },
  {
    id: MAIN_NAV_ITEM_ID_ABOUT,
    title: "About",
    href: "/about",
    altHref: "/resume",
    icon: Info,
  },
  {
    id: MAIN_NAV_ITEM_ID_CONTACT,
    title: "Contact",
    href: "/contact",
    icon: Contact,
  },
];

export const tabbarItemsData: TabbarItemData[] = [
  {
    id: 0,
    title: "Resume",
    href: "/resume",
    icon: FileUser,
  },
  {
    id: 1,
    title: "Credits",
    href: "/credits",
    icon: User,
  },
  {
    id: 2,
    title: "FAQ",
    href: "/faq",
    icon: FaQuestion,
  },
];

export const ADMIN_ICON_BUTTON_ID = 0;
export const THEME_ICON_BUTTON_ID = 1;
export const MENU_ICON_BUTTON_ID = 2;
