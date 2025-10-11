import Modal from "@/components/Modal";
import { useEffect, useRef } from "react";

interface Props {
  title: string;
  prompt: string;
  textToCopy: string;
  closeMe: () => void;
}
const CopyModal = ({ title, prompt, textToCopy, closeMe }: Props) => {
  const textRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (textRef.current) {
      textRef.current.select();
    }
  });

  return (
    <Modal title={title} closeMe={closeMe}>
      <span className="mb-2">{prompt}</span>
      <input
        ref={textRef}
        type="text"
        value={textToCopy}
        readOnly
        className="text-center outline-none"
      />
    </Modal>
  );
};

export default CopyModal;
