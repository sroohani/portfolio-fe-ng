"use client";

import { useState, useRef } from "react";
import PhoneInput, { type Value } from "react-phone-number-input";
import iran from "@/assets/images/Flag_of_Iran_simplified.svg";
import Image from "next/image";

interface Props {
  id: string;
  title: string;
  maxLen: number;
  required?: boolean;
}

const TelInput = ({ id, title, maxLen, required = false }: Props) => {
  const [value, setValue] = useState("");
  const lenRef = useRef<HTMLSpanElement>(null);

  const handleTextChange = (val: string) => {
    if (val.length <= maxLen) {
      setValue(val);
      if (lenRef.current) {
        lenRef.current.textContent = `${val.length} / ${maxLen}`;
      }
    }
  };

  return (
    <div className="flex flex-col justify-start items-start gap-1 w-[80%] [&_input]:border-none [&_input]:outline-none [&_input]:placeholder:opacity-0">
      <label
        className="group relative flex justify-center items-center border-b-[1px] w-full"
        htmlFor={id}
      >
        <PhoneInput
          className="w-full [&_input]:autofill:no-browser-autofill-style [&_input]:hover:autofill:no-browser-autofill-style [&_input]:focus:autofill:no-browser-autofill-style peer"
          flags={{
            IR: () => (
              <Image
                width={20}
                height={10}
                src={iran}
                alt="Lion and Sun Flag"
              />
            ),
          }}
          placeholder="WhatsApp number"
          name="whatsapp"
          value={value}
          onChange={(val: Value) =>
            handleTextChange((val && val.toString()) || "")
          }
          required
        />
        <span className="absolute tel-normal-label group-focus-within:tel-elevated-label peer-has-[.PhoneInputInput:not(:placeholder-shown)]:tel-elevated-label transition-all duration-300">
          {title}
        </span>
        {required && <span className="text-red-600 text-xl">*</span>}
      </label>
    </div>
  );
};

export default TelInput;
