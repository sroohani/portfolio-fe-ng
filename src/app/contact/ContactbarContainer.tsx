"use client";

import Contactbar from "@/components/Contactbar";
import {
  CONTACT_LOCATION_ID,
  CONTACT_WEBSITE_ID,
  contactLinks,
} from "@/client-constants";

const ContactbarContainer = () => {
  return (
    <>
      <Contactbar
        contactLinks={contactLinks.filter(
          (l) => l.id !== CONTACT_LOCATION_ID && l.id != CONTACT_WEBSITE_ID
        )}
      />
    </>
  );
};

export default ContactbarContainer;
