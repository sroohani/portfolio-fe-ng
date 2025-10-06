import React from "react";
import ContactItem from "./ContactItem";

interface ItemProps {
  image: string;
  text: string;
  isLink?: boolean;
  isEmail?: boolean;
}

interface Props {
  item0?: ItemProps;
  item1?: ItemProps;
}

const ContactRow = ({ item0, item1 }: Props) => {
  return (
    <div className="w-full flex justify-start items-center">
      {item0 ? <ContactItem {...item0} /> : null}
      {item1 ? <ContactItem {...item1} /> : null}
    </div>
  );
};

export default ContactRow;
