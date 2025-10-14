import type { IconType } from "react-icons";

export interface NavbarItemData {
  id: number;
  title: string;
  href: string;
  altHref?: string;
  icon?: IconType;
}

export interface TabbarItemData {
  id: number;
  title: string;
  href?: string;
  icon?: IconType;
}

export interface CreditItemData {
  id: number;
  title: string;
  img?: string;
  href?: string;
}

export interface Theme {
  id: number;
  name: string;
  title: string;
  backgroundColor: string;
  foregroundColor: string;
}

export const themeInfo: Theme[] = [
  {
    id: 1,
    name: "p-green",
    title: "Phosphor Green",
    backgroundColor: "0% 0% 0%",
    foregroundColor: "20% 100% 20%",
  },
  {
    id: 2,
    name: "p-amber",
    title: "Phosphor Amber",
    backgroundColor: "0%, 0%, 0%",
    foregroundColor: "100% 80% 0%",
  },
  {
    id: 3,
    name: "p-white",
    title: "Phosphor White",
    backgroundColor: "0% 0% 0%",
    foregroundColor: "86.27% 85.49% 89.02%",
  },
] as const;

export type ThemeInfo = (typeof themeInfo)[number];

interface Reference {
  link: string;
  description: string;
}

export interface Project {
  id: number;
  name: string;
  shortDescription?: string;
  longDescription?: string;
  techStack?: string[];
  img?: string;
  github?: string;
  live?: string;
  npm?: string;
  references?: Reference[];
}

export interface QA {
  id: number;
  question: string;
  answer: string;
}

interface Header {
  name: string;
  location: string;
  map: string;
  website: string;
  github: string;
  linkedin: string;
  email: string;
  cellphone: string;
}

interface Skill {
  title: string;
  skills: string[];
}

interface ProfessionalExperience {
  from: string;
  to: string;
  companies: string[];
  positions: string[];
  projects: string[];
}

interface Language {
  name: string;
  level: string;
}

export interface ResumeData {
  header: Header;
  summary: string;
  domains: string[];
  skills: Skill[];
  professionalExperience: ProfessionalExperience[];
  education: string[];
  languages: Language[];
}

export interface ContactLink {
  id: number;
  icon: IconType;
  title: string;
  href?: string;
  withCopy?: boolean;
  textToCopy?: string;
}

export type ToastType = "success" | "warning" | "error" | "info";

export interface CopyModalState {
  visibility: boolean;
  title: string;
  prompt: string;
  textToCopy: string;
}

export interface CopyModalAction {
  type: "visibility" | "title" | "prompt" | "text-to-copy";
  payload: number | boolean | string;
}
