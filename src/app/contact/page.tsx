"use client";

import Contactbar from "@/components/Contactbar";
import CopyModal from "@/components/CopyModal";
import { useCopyModalReducer, useToastReducer } from "@/components/hooks";
import {
  CONTACT_CELLPHONE_ID,
  CONTACT_EMAIL_ID,
  CONTACT_LOCATION_ID,
  CONTACT_WEBSITE_ID,
  contactLinks,
} from "@/components/server-constants";
import Toast from "@/components/Toast";
import React, { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import ContactType, {
  CONTACT_TYPE_EMAIL,
  CONTACT_TYPE_NONE,
  CONTACT_TYPE_WHATSAPP,
} from "./ContactType";
import FormInput from "./FormInput";
import Button from "@/components/Button";
import { IoMdSend } from "react-icons/io";
import { z } from "zod";
import { sendMessage } from "@/server-actions";

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const toastReducer = useToastReducer();
  const copyModalReducer = useCopyModalReducer();
  const [contactType, setContactType] = useState(CONTACT_TYPE_NONE);
  const initialCopyState = useMemo(() => ({ copied: false, id: -1 }), []);
  const [copyOccurred, setCopyOccurred] = useState<{
    copied: boolean;
    id: number;
  }>(initialCopyState);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(formRef.current!));
    const formSchema = z
      .object({
        name: z.string().optional(),
        subject: z.string().optional(),
        contact: z.union([
          z.literal(""),
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
          schema.contact === ""
        );
      });

    console.log(formData);
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

    formRef.current!.reset();
  };

  const closeToast = () => {
    toastReducer.setVisibility(false);
  };

  const copyOccurredCb = (id: number) => {
    copyModalReducer.setId(id);
    setCopyOccurred({ copied: true, id });
  };

  const closeCopyModal = () => {
    copyModalReducer.setVisibility(false);
  };

  const copyFallback = (id: number): boolean => {
    switch (id) {
      case CONTACT_EMAIL_ID:
        copyModalReducer.setTitle("Email");
        copyModalReducer.setPrompt(
          "Broswer copy API is not available. Please copy the email address manually:"
        );
        copyModalReducer.setTextToCopy(
          contactLinks.find((l) => l.id === id)!.textToCopy ||
            "Email address not available"
        );
        copyModalReducer.setVisibility(true);

        break;

      case CONTACT_CELLPHONE_ID:
        copyModalReducer.setTitle("Cell phone");
        copyModalReducer.setPrompt(
          "Broswer copy API is not available. Please copy the cell phone number manually:"
        );
        copyModalReducer.setTextToCopy(
          contactLinks.find((l) => l.id === id)!.textToCopy ||
            "Cell phone number not available"
        );
        copyModalReducer.setVisibility(true);

        break;

      default:
        break;
    }

    return true;
  };

  const handleCopy = (id: number) => {
    setCopyOccurred({ copied: true, id });
  };

  useEffect(() => {
    if (copyOccurred.copied) {
      const id = copyOccurred.id;
      setCopyOccurred(initialCopyState);

      switch (id) {
        case CONTACT_EMAIL_ID:
          toastReducer.setMessage("Email address copied to clipboard");
          toastReducer.setType("success");
          toastReducer.setVisibility(true);
          break;

        case CONTACT_CELLPHONE_ID:
          toastReducer.setMessage("Cell phone number copied");
          toastReducer.setType("success");
          toastReducer.setVisibility(true);
          break;

        default:
          break;
      }
    }
  }, [copyModalReducer, toastReducer, copyOccurred, initialCopyState]);

  return (
    <div className="relative flex flex-col justify-start items-start w-full px-8">
      <Contactbar
        contactLinks={contactLinks.filter(
          (l) => l.id !== CONTACT_LOCATION_ID && l.id != CONTACT_WEBSITE_ID
        )}
        copyFallback={copyFallback}
        onClick={handleCopy}
      />
      <span className="text-2xl sm:text-4xl w-full text-center mt-4">
        Send me a message
      </span>
      <p className="w-full text-center text-sm sm:text-lg mb-4">
        Fields marked with <span className="text-red-600 text-xl">*</span> are
        required
      </p>
      <form
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
          <FormInput
            type="tel"
            id="tel"
            title="WhatsApp number"
            maxLen={128}
            required
          />
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
          rows={5}
          cols={33}
          required
        />
        <Button
          title="Send"
          classes="w-[15ch]"
          icon={IoMdSend}
          iconPosition="after"
        />
      </form>
      {toastReducer.state.visibility && (
        <Toast
          message={toastReducer.state.message}
          type={toastReducer.state.type}
          closeMe={closeToast}
          position={toastReducer.state.position}
        />
      )}
      {copyModalReducer.state.visibility && (
        <CopyModal
          id={copyModalReducer.state.id}
          title={copyModalReducer.state.title}
          prompt={copyModalReducer.state.prompt}
          textToCopy={copyModalReducer.state.textToCopy}
          copyOccurred={copyOccurredCb}
          closeMe={closeCopyModal}
        />
      )}
    </div>
  );
};

export default Contact;
