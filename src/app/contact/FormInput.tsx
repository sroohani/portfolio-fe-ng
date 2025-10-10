import { useRef, useState } from "react";

interface Props {
  type: "text" | "email" | "textarea";
  id: string;
  title: string;
  maxLen: number;
  rows?: number;
  cols?: number;
  required?: boolean;
}

const FormInput = ({
  type,
  id,
  title,
  maxLen,
  rows = 5,
  cols = 33,
  required = false,
}: Props) => {
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
    <div className="flex flex-col justify-start items-start gap-1 w-[80%] [&_input,textarea]:border-none [&_input,textarea]:outline-none [&_input,textarea]:placeholder:opacity-0 [&_input[type=tel]:not-placeholder-shown_]">
      <label
        className="group relative flex justify-center items-center border-b-[1px] w-full"
        htmlFor={id}
      >
        {(type === "text" || type === "email") && (
          <input
            type={type}
            id={id}
            name={id}
            placeholder={title}
            className="w-full px-2 h-8 autofill:no-browser-autofill-style hover:autofill:no-browser-autofill-style focus:autofill:no-browser-autofill-style peer/input"
            required={required}
            value={value}
            onChange={(e) => handleTextChange(e.target.value)}
          />
        )}
        {type === "textarea" && (
          <textarea
            id={id}
            name={id}
            rows={rows}
            cols={cols}
            placeholder={title}
            className="w-full px-2 peer/input"
            required={required}
            value={value}
            onChange={(e) => handleTextChange(e.target.value)}
          ></textarea>
        )}
        <span
          data-label
          className="absolute placeholder opacity-60 left-2 top-0 group-focus-within:-translate-y-6 peer-not-placeholder-shown/input:-translate-y-6 transform group-focus-within:opacity-100 peer-has-[input]:not-placeholder-shown/input:opacity-100 transition-all duration-300"
        >
          {title}
        </span>
        {required && <span className="text-red-600 text-xl">*</span>}
      </label>
      <span ref={lenRef} className="justify-start pl-2">
        0 / {maxLen}
      </span>
    </div>
  );
};

export default FormInput;
