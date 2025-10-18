import React from "react";
import ContactItem from "./ContactItem";
import { ContactType } from "@/components/types";

interface ItemProps {
  image: string;
  text: string;
  type: ContactType;
  href?: string;
}

interface Props {
  item0?: ItemProps;
  item1?: ItemProps;
}

const ContactRow = ({ item0, item1 }: Props) => {
  return (
    <div className="w-full flex justify-start items-center mb-1">
      {item0 ? <ContactItem {...item0} /> : null}
      {item1 ? <ContactItem {...item1} /> : null}
    </div>
  );
};

export default ContactRow;
