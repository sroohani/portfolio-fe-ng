"use client";

import { FormEvent, useRef, useState } from "react";
import ContactType, {
  CONTACT_TYPE_EMAIL,
  CONTACT_TYPE_NONE,
  CONTACT_TYPE_WHATSAPP,
} from "./ContactType";
import FormInput from "./FormInput";
import Button from "@/components/Button";
import { IoMdSend } from "react-icons/io";
import { RiResetLeftFill } from "react-icons/ri";
import { z } from "zod";
import { sendMessage } from "@/server-actions";
import TelInput from "./TelInput";
import { useToastStore } from "@/components/store";
import Buttonbar from "@/components/Buttonbar";

interface Props {
  onSent?: () => void;
}

const ContactForm = ({ onSent }: Props) => {
  const toast = useToastStore();
  const [contactType, setContactType] = useState(CONTACT_TYPE_NONE);
  const formRef = useRef<HTMLFormElement>(null);
  const [formKey, setFormKey] = useState(false);

  const resetForm = () => {
    setContactType(CONTACT_TYPE_NONE);
    setFormKey(!formKey);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(formRef.current!));
    const formSchema = z
      .object({
        name: z.string().optional(),
        subject: z.string().optional(),
        contact: z.union([
          z.literal("none"),
          z.literal("email"),
          z.literal("whatsapp"),
        ]),
        email: z.email().optional(),
        whatsapp: z.string().optional(),
        message: z.string().min(4).max(512),
      })
      .refine((schema) => {
        return (
          (schema.contact === "email" && schema.email !== undefined) ||
          (schema.contact === "whatsapp" &&
            schema.whatsapp !== undefined &&
            schema.whatsapp.length > 0) ||
          schema.contact === "none"
        );
      });

    const result = formSchema.safeParse(formData);
    if (result.error) {
      alert("Please properly fill out the form");
      return;
    }

    sendMessage(
      JSON.stringify({
        name: `${result.data.name}`,
        subject: `${result.data.subject}`,
        contact: `${result.data.contact}`,
        email: `${result.data.email}`,
        whatsapp: `${result.data.whatsapp}`,
        message: `${result.data.message}`,
      })
    );

    resetForm();

    toast.setMessage("Sent!");
    toast.setVisible(true);

    if (onSent) {
      onSent();
    }
  };

  return (
    <form
      key={`${formKey}`}
      ref={formRef}
      onSubmit={(e) => handleSubmit(e)}
      className="flex flex-col justify-center items-center gap-8 w-full sm:w-60%"
    >
      <FormInput type="text" id="name" title="Name" maxLen={128} />
      <FormInput
        type="text"
        id="subject"
        title="Subject"
        maxLen={256}
        required
      />

      <ContactType onChange={(id) => setContactType(id)} />

      {contactType === CONTACT_TYPE_EMAIL && (
        <FormInput
          type="email"
          id="email"
          title="Email"
          maxLen={128}
          required
        />
      )}

      {contactType === CONTACT_TYPE_WHATSAPP && (
        <TelInput id="tel" title="WhatsApp number" maxLen={128} required />
      )}

      {contactType === CONTACT_TYPE_NONE && (
        <p className="">
          Please choose one of the contact methods above if you&apos;d like me
          to contact you back.
        </p>
      )}

      <FormInput
        type="textarea"
        id="message"
        title="Message"
        maxLen={512}
        rows={3}
        cols={33}
        required
      />
      <Buttonbar>
        <Button
          title="Send"
          type="submit"
          classes="min-w-[15ch] m-2 sm:mx-6 sm:mb-2 sm:mt-0"
          icon={IoMdSend}
          iconPosition="after"
        />
        <Button
          title="Reset"
          classes="min-w-[15ch] m-2 sm:mx-6 sm:mb-2 sm:mt-0"
          icon={RiResetLeftFill}
          iconPosition="after"
          onClick={resetForm}
        />
      </Buttonbar>
    </form>
  );
};

export default ContactForm;
