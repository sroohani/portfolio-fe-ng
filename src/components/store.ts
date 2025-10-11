import { LS_ITEM_THEME } from "@/components/client-constants";
import { create } from "zustand";
import { Project, ToastType } from "./types";
import prj from "@/assets/json/projects.json";

interface ThemeStore {
  theme: string;
  selectorVisibility: boolean;
  selectorTop: number;
  selectorRight: number;
  outsideClickHappened: boolean;
  setTheme: (theme: string) => void;
  setSelectorVisibility: (visible: boolean) => void;
  setSelectorTop: (top: number) => void;
  setSelectorRight: (right: number) => void;
  setOutsideClickHappened: (happened: boolean) => void;
}

let theme = "";

if (typeof localStorage === "undefined") {
  theme = "p-white";
} else {
  theme = localStorage.getItem(LS_ITEM_THEME) || "p-white";
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme,
  selectorVisibility: false,
  selectorTop: 0,
  selectorRight: 0,
  outsideClickHappened: false,
  setTheme: (theme) =>
    set(() => {
      localStorage.setItem(LS_ITEM_THEME, theme);
      return { theme };
    }),
  setSelectorVisibility: (visible) =>
    set(() => ({ selectorVisibility: visible })),
  setSelectorTop: (top) => set(() => ({ selectorTop: top })),
  setSelectorRight: (right) => set(() => ({ selectorRight: right })),
  setOutsideClickHappened: (happened) =>
    set(() => ({ outsideClickHappened: happened })),
}));

interface PathStore {
  path: string;
  notFound: boolean;
  navItemId: number;
  setPath: (path: string) => void;
  setNotFound: (notFound: boolean) => void;
  setNavItemId: (navItemId: number) => void;
}

const normalizedPathname = (path: string): string =>
  path === "/" ? "~" : `~${path}`;

export const usePathStore = create<PathStore>((set) => ({
  path: "~",
  notFound: false,
  navItemId: 0,
  setPath: (path) => set(() => ({ path: normalizedPathname(path) })),
  setNotFound: (notFound) => set(() => ({ notFound })),
  setNavItemId: (navItemId) => set(() => ({ navItemId })),
}));

interface SideMenuStore {
  top: number;
  right: number;
  visibility: boolean;
  outsideClickHappened: boolean;
  setTop: (top: number) => void;
  setRight: (right: number) => void;
  setVisibility: (visibility: boolean) => void;
  setOutsideClickHappened: (happened: boolean) => void;
}

export const useSideMenuStore = create<SideMenuStore>((set) => ({
  top: 0,
  right: 0,
  visibility: false,
  outsideClickHappened: false,
  setTop: (top) => set(() => ({ top })),
  setRight: (right) => set(() => ({ right })),
  setVisibility: (visibility) => set(() => ({ visibility })),
  setOutsideClickHappened: (happened) =>
    set(() => ({ outsideClickHappened: happened })),
}));

interface ProjectsStore {
  projects: Project[];
}

export const useProjectsStore = create<ProjectsStore>(() => ({
  projects: JSON.parse(JSON.stringify(prj)),
}));

interface ToastStore {
  message: string;
  type?: ToastType;
  maxAgeMs?: number;
  visible: boolean;
  setMessage: (message: string) => void;
  setType: (type: ToastType) => void;
  setMaxAgeMs: (maxAgeMs: number) => void;
  setVisible: (visible: boolean) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  message: "",
  type: "success",
  maxAgeMs: 3000,
  visible: false,
  setMessage: (message) => set({ message }),
  setType: (type) => set({ type }),
  setMaxAgeMs: (maxAgeMs) => set({ maxAgeMs }),
  setVisible: (visible) => set({ visible }),
}));
