import { useId, useState } from "react";
import t from "./theme.module.css";

export function InputField({
  label,
  placeholder,
  type = "text",
  autoComplete,
}: {
  label: string;
  placeholder: string;
  type?: string;
  autoComplete?: string;
}) {
  const id = useId();
  const [val, setVal] = useState("");

  return (
    <div className={t.field}>
      <label htmlFor={id} className={t.label}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={val}
        autoComplete={autoComplete}
        onChange={(e) => setVal(e.target.value)}
        placeholder={placeholder}
        className={t.input}
      />
    </div>
  );
}
