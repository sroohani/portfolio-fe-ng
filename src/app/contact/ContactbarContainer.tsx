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
import { useEffect, useMemo, useState } from "react";

const ContactbarContainer = () => {
  const initialCopyState = useMemo(() => ({ copied: false, id: -1 }), []);
  const [copyOccurred, setCopyOccurred] = useState<{
    copied: boolean;
    id: number;
  }>(initialCopyState);
  const copyModalReducer = useCopyModalReducer();
  const toastReducer = useToastReducer();

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

  const closeToast = () => {
    toastReducer.setVisibility(false);
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
    <>
      <Contactbar
        contactLinks={contactLinks.filter(
          (l) => l.id !== CONTACT_LOCATION_ID && l.id != CONTACT_WEBSITE_ID
        )}
        copyFallback={copyFallback}
        onClick={handleCopy}
      />
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
    </>
  );
};

export default ContactbarContainer;
