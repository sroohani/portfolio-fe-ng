import Image from "next/image";

interface Props {
  image: string;
  text: string;
  isLink?: boolean;
  isEmail?: boolean;
}
const stripScheme = (text: string) => {
  if (text.includes("://")) {
    return text.substring(text.indexOf("://") + 3);
  }

  return text;
};
const ContactItem = ({
  image,
  text,
  isLink = false,
  isEmail = false,
}: Props) => {
  return (
    <div className="w-[50%] h-3 flex justify-start items-center gap-1 text-[0.5rem]">
      <Image src={image} width={8} height={8} alt="Location" />
      {isLink && (
        <a
          href={text}
          target="_blank"
          className="h-full flex justify-start items-center pb-3"
        >
          {stripScheme(text)}
        </a>
      )}
      {isEmail && (
        <a
          href={`mailto:${text}`}
          className="h-full flex justify-start items-center pb-3"
        >
          {text}
        </a>
      )}
      {!(isLink || isEmail) && (
        <span className="h-full flex justify-start items-center pb-3">
          {text}
        </span>
      )}
    </div>
  );
};

export default ContactItem;
