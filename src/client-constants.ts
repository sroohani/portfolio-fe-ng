import { ResumeData, ContactLink } from "@/components/types";
import resume from "@/assets/json/resume.json";
import { CiLinkedin, CiLocationOn } from "react-icons/ci";
import { MdOutlineMail } from "react-icons/md";
import { RiCellphoneLine } from "react-icons/ri";
import { TfiWorld } from "react-icons/tfi";
import { SiGithub } from "@icons-pack/react-simple-icons";

export const resData: ResumeData = JSON.parse(JSON.stringify(resume));

export const CONTACT_LOCATION_ID = 0;
export const CONTACT_EMAIL_ID = 1;
export const CONTACT_CELLPHONE_ID = 2;
export const CONTACT_WEBSITE_ID = 3;
export const CONTACT_GITHUB_ID = 4;
export const CONTACT_LINKEDIN_ID = 5;

export const contactLinks: ContactLink[] = [
  {
    id: CONTACT_LOCATION_ID,
    icon: CiLocationOn,
    title: resData.header.location,
    href: resData.header.map,
  },
  {
    id: CONTACT_EMAIL_ID,
    icon: MdOutlineMail,
    title: "Email",
    withCopy: true,
    textToCopy: resData.header.email,
  },
  {
    id: CONTACT_CELLPHONE_ID,
    icon: RiCellphoneLine,
    title: "Cell Phone",
    withCopy: true,
    textToCopy: resData.header.cellphone,
  },
  {
    id: CONTACT_WEBSITE_ID,
    icon: TfiWorld,
    title: "Website",
    href: resData.header.website,
  },
  {
    id: CONTACT_GITHUB_ID,
    icon: SiGithub,
    title: "GitHub",
    href: resData.header.github,
  },
  {
    id: CONTACT_LINKEDIN_ID,
    icon: CiLinkedin,
    title: "LinkedIn",
    href: resData.header.linkedin,
  },
];
