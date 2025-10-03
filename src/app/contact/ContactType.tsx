import { useState } from "react";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";
import { CircleOff, Mail } from "lucide-react";
import { IconType } from "react-icons";

export const CONTACT_TYPE_NONE = 0;
export const CONTACT_TYPE_EMAIL = 1;
export const CONTACT_TYPE_WHATSAPP = 2;

export const contactTypes: { id: number; name: string; icon: IconType }[] = [
  { id: CONTACT_TYPE_NONE, name: "None", icon: CircleOff },
  { id: CONTACT_TYPE_EMAIL, name: "Email", icon: Mail },
  { id: CONTACT_TYPE_WHATSAPP, name: "WhatsApp", icon: SiWhatsapp },
];

interface Props {
  onChange: (id: number) => void;
}

const ContactType = ({ onChange }: Props) => {
  const [contactType, setContactType] = useState(CONTACT_TYPE_NONE);

  return (
    <div className="flex justify-start items-center gap-1 w-[80%]">
      <span className="text-center sm:mr-2">Contact method:&nbsp;</span>
      {contactTypes.map(
        ({
          id,
          name,
          icon: Icon,
        }: {
          id: number;
          name: string;
          icon: IconType;
        }) => (
          <div
            className={`relative flex justify-start items-center bg-transparent border-0 m-0 p-0 w-8 h-8 gap[0.3rem] mb-[0.3rem]`}
            key={id}
          >
            <input
              type="radio"
              className="absolute top-0 left-0 w-full h-full appearance-none m-0 p-0 cursor-pointer outline-0"
              name="contact"
              value={name.toLowerCase()}
              checked={id === contactType}
              title={name}
              onChange={() => {
                setContactType(id);
                onChange(id);
              }}
            />
            <div
              className={`flex justify-center items-center w-8 h-8 ${
                id === contactType ? "pb-2 border-b" : ""
              }`}
            >
              <Icon />
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ContactType;
