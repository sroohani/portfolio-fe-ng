/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { ContactType } from "@/components/types";
interface Props {
  image: string;
  text: string;
  type?: ContactType;
  href?: string;
}
const stripScheme = (text: string) => {
  if (text.includes("://")) {
    return text.substring(text.indexOf("://") + 3);
  }

  return text;
};
const ContactItem = ({ image, text, type = "text", href = text }: Props) => {
  return (
    <div className="w-[50%] flex justify-start items-center gap-1">
      <img src={image} className="w-3 h-3" />
      {type === "link" && (
        <a
          href={href}
          target="_blank"
          className="h-full flex justify-start items-center text-blue-300"
        >
          {stripScheme(text)}
        </a>
      )}
      {type === "email" && (
        <a
          href={`mailto:${text}`}
          className="h-full flex justify-start items-center text-blue-300"
        >
          {text}
        </a>
      )}
      {type === "tel" && (
        <a
          href={`tel:${text}`}
          className="h-full flex justify-start items-center text-blue-300"
        >
          {text}
        </a>
      )}
      {type === "text" && (
        <span className="h-full flex justify-start items-center">{text}</span>
      )}
    </div>
  );
};

export default ContactItem;
