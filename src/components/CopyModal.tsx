import Modal from "@/components/Modal";
import React, { useEffect, useRef, useState } from "react";

interface Props {
  id: number;
  title: string;
  prompt: string;
  textToCopy: string;
  copyOccurred: (id: number) => void;
  closeMe: () => void;
}
const CopyModal = ({
  id,
  title,
  prompt,
  textToCopy,
  copyOccurred,
  closeMe,
}: Props) => {
  const textRef = useRef<HTMLInputElement>(null);
  const [didCopy, setDidCopy] = useState(false);

  const handleCopy = () => {
    setDidCopy(true);
  };

  const handleClose = () => {
    if (didCopy) {
      copyOccurred(id);
    }
    closeMe();
  };

  useEffect(() => {
    if (textRef.current) {
      textRef.current.select();
    }
  });

  return (
    <Modal title={title} closeMe={handleClose}>
      <span className="mb-2">{prompt}</span>
      <input
        ref={textRef}
        type="text"
        value={textToCopy}
        readOnly
        className="text-center outline-none"
        onCopy={() => handleCopy()}
      />
    </Modal>
  );
};

export default CopyModal;
