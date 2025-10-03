"use client";

import React, { useEffect, useRef, useState } from "react";
import { TabbarItemData } from "./types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import IconButton from "./IconButton";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  items: TabbarItemData[];
}

const CHEVRON_LEFT_ID = 0;
const CHEVRON_RIGHT_ID = 1;

const Tabbar = ({ items }: Props) => {
  const pathname = usePathname();
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const tabbarRef = useRef<HTMLDivElement>(null);
  const [leftChevronDisabled, setLeftChevronDisabled] = useState(false);
  const [rightChevronDisabled, setRightChevronDisabled] = useState(false);

  useEffect(() => {
    let tabsContainerRefCurrent: HTMLDivElement | null;
    let isDragging = false;
    let startX = 0,
      scrollLeft = 0;

    const handleWheelEvent = (e: WheelEvent) => {
      e.preventDefault();
      if (tabsContainerRef.current) {
        tabsContainerRef.current.scrollLeft += e.deltaY;
        updateChevronStates();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (tabsContainerRef.current) {
        isDragging = true;
        startX = e.touches[0].pageX - tabsContainerRef.current.offsetLeft;
        scrollLeft = tabsContainerRef.current.scrollLeft;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) {
        return;
      }
      e.preventDefault();
      if (tabsContainerRef.current) {
        const x = e.touches[0].pageX - tabsContainerRef.current.offsetLeft;
        const walkX = x - startX;
        tabsContainerRef.current.scrollLeft = scrollLeft - walkX;
      }
    };

    const handleTouchEnd = () => {
      isDragging = false;
      updateChevronStates();
    };

    if (tabsContainerRef.current) {
      updateChevronStates();
      tabsContainerRefCurrent = tabsContainerRef.current;
      tabsContainerRef.current.addEventListener("wheel", handleWheelEvent, {
        passive: false,
      });

      tabsContainerRef.current.addEventListener(
        "touchstart",
        handleTouchStart,
        {
          passive: false,
        }
      );
      tabsContainerRef.current.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      tabsContainerRef.current.addEventListener("touchend", handleTouchEnd, {
        passive: false,
      });
    }

    return () => {
      if (tabsContainerRefCurrent) {
        tabsContainerRefCurrent.removeEventListener("wheel", handleWheelEvent);

        tabsContainerRefCurrent.removeEventListener(
          "touchstart",
          handleTouchStart
        );
        tabsContainerRefCurrent.removeEventListener(
          "touchmove",
          handleTouchMove
        );
        tabsContainerRefCurrent.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, []);

  const updateChevronStates = () => {
    setLeftChevronDisabled(tabsContainerRef.current!.scrollLeft === 0);
    setRightChevronDisabled(
      Math.abs(
        tabsContainerRef.current!.scrollLeft -
          (tabsContainerRef.current!.scrollWidth -
            tabsContainerRef.current!.getBoundingClientRect().width)
      ) < 1
    );
  };

  const handleChevronClick = (side: number): void => {
    if (tabsContainerRef.current) {
      switch (side) {
        case CHEVRON_LEFT_ID:
          tabsContainerRef.current.scrollLeft -= 64;
          break;

        case CHEVRON_RIGHT_ID:
          tabsContainerRef.current.scrollLeft += 64;
          break;

        default:
          throw new Error(`Unexpected value: ${side as never}`);
      }

      updateChevronStates();
    }
  };
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div
        ref={tabbarRef}
        className="flex justify-center items-center gap-1 w-full overflow-hidden"
      >
        <IconButton
          id={CHEVRON_LEFT_ID}
          icon={ChevronLeft}
          classes="border bg-transparent h-full cursor-pointer"
          disabled={leftChevronDisabled}
          onClick={() => handleChevronClick(CHEVRON_LEFT_ID)}
        />
        <div
          ref={tabsContainerRef}
          className="flex justify-start items-center w-full overflow-x-hidden"
        >
          {items.map(({ id, href, title, icon: Icon }) => (
            <Link
              href={href!}
              key={id}
              className={`no-underline flex justify-start items-center gap-2 p-2 min-w-[15ch] text-foreground bg-background first:border-l border-r ${
                pathname === href ? "border-t-4" : "border-t-1"
              }`}
            >
              {Icon && <Icon />}
              <span>{title}</span>
            </Link>
          ))}
        </div>
        <IconButton
          id={CHEVRON_RIGHT_ID}
          icon={ChevronRight}
          classes="border bg-transparent h-full cursor-pointer disabled:opacity-50"
          disabled={rightChevronDisabled}
          onClick={() => handleChevronClick(CHEVRON_RIGHT_ID)}
        />
      </div>
      <hr className="w-full h-[1px] border-inherit border-t-[1px]" />
    </div>
  );
};

export default Tabbar;
