"use client";

import { ContactLink } from "./types";
import { useToastStore } from "./store";
import CopyModal from "@/components/CopyModal";
import { useCopyModalReducer } from "@/components/hooks";

interface Props {
  contactLinks: ContactLink[];
}

const Contactbar = ({ contactLinks }: Props) => {
  const toast = useToastStore();
  const copyModalReducer = useCopyModalReducer();

  const closeCopyModal = () => {
    copyModalReducer.setVisibility(false);
  };
  // const canCopy = false;
  const canCopy =
    navigator.clipboard !== undefined &&
    navigator.clipboard.writeText !== undefined;

  const handleCopy = async (title: string, textToCopy: string) => {
    if (canCopy) {
      await navigator.clipboard.writeText(textToCopy);
      toast.setMessage("Copied!");
      toast.setVisible(true);
    } else {
      copyModalReducer.setTitle(title);
      copyModalReducer.setTextToCopy(textToCopy);
      copyModalReducer.setPrompt("Please copy the contact information:");
      copyModalReducer.setVisibility(true);
    }
  };

  return (
    <div className="flex justify-start items-center w-full gap-3 sm:gap-4 py-4 border-b">
      {contactLinks.map(
        ({ id, icon: Icon, title, href, withCopy, textToCopy }) => (
          <a
            href={href}
            target="_blank"
            onClick={() =>
              withCopy ? handleCopy(title, textToCopy ?? "") : undefined
            }
            key={id}
          >
            <Icon
              title={title}
              className={`h-5 w-5 sm:h-8 sm:w-8 ${
                withCopy ? "cursor-pointer" : ""
              }`}
            />
          </a>
        )
      )}
      {copyModalReducer.state.visibility && (
        <CopyModal
          title={copyModalReducer.state.title}
          prompt={copyModalReducer.state.prompt}
          textToCopy={copyModalReducer.state.textToCopy}
          closeMe={closeCopyModal}
        />
      )}
    </div>
  );
};

export default Contactbar;
