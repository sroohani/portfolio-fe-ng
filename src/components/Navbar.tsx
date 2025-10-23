"use client";

import { type NavbarItemData } from "./types";
import Link from "next/link";
import { usePathStore } from "./store";

interface NavbarProps {
  id: number;
  notFound: boolean;
  items: NavbarItemData[];
  vertical?: boolean;
  classes?: string;
  onClick?: (navbarId: number, navbarItemId: number) => void;
}

const Navbar = ({
  id,
  notFound,
  items,
  vertical = false,
  classes = "",
  onClick = undefined,
}: NavbarProps) => {
  const { path } = usePathStore();

  const comparablePath = (path: string): string => {
    if (path === "~") {
      return "/";
    }

    if (path.startsWith("~")) {
      return path.substring(1);
    }

    return "";
  };

  return (
    <nav
      className={`sm:flex justify-around gap-8 mt-1 ${
        vertical ? "flex-col items-start w-full" : "hidden items-center"
      } ${classes}`}
    >
      {items.map((item) => (
        <Link
          className={`group w-full h-full no-underline flex flex-col justify-around gap-1 ${
            vertical ? "items-stetch" : "items-center"
          } text-inherit bg-inherit`}
          href={item.altHref || item.href}
          onClick={() => onClick && onClick(id, item.id)}
          key={item.id}
        >
          <div className="flex justify-start items-center">
            {item.icon && <item.icon className="mr-2" />}
            <span className="flex w-full justify-start items-center h-full">
              {item.title}
            </span>
          </div>
          <div
            className={`h-[0.1rem] ${
              notFound
                ? "w-0"
                : item.href === comparablePath(path)
                ? vertical
                  ? "w-[85%] place-self-center"
                  : "w-full"
                : "w-0"
            } bg-foreground group-hover:transition-[width] group-hover:w-full`}
          ></div>
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
