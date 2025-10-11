"use client";
import { useState } from "react";
import ContactbarContainer from "./ContactbarContainer";
import ContactForm from "./ContactForm";
import Button from "@/components/Button";

const Content = () => {
  const [showThanks, setShowThanks] = useState(false);
  const onSent = () => {
    setShowThanks(true);
  };

  if (showThanks) {
    return (
      <div className="flex flex-col justify-start align-center w-full h-full gap-16 mt-16">
        <span className="w-full text-center text-4xl sm:text-8xl">
          Thank you!
        </span>
        <span className="w-full text-center text-2xl sm:text-4xl">
          Your message was sent. If you have provided a contact, I will contact
          you as soon as I can.
        </span>
        <div className="w-full flex justify-center items-center mt-4 sm:mt-8">
          <Button
            title="OK"
            classes="w-[16ch]"
            onClick={() => setShowThanks(false)}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="relative flex flex-col justify-start items-start w-full px-8">
        <ContactbarContainer />
        <span className="text-2xl sm:text-4xl w-full text-center mt-4">
          Send me a message
        </span>
        <p className="w-full text-center text-sm sm:text-lg mb-4">
          Fields marked with <span className="text-red-600 text-xl">*</span> are
          required
        </p>
        <ContactForm onSent={onSent} />
      </div>
    );
  }
};

export default Content;
