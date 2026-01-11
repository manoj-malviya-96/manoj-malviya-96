import { InputHTMLAttributes, useEffect } from "react";
import Icon from "./icon";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { mergeCls } from "@/lib/utils";

export type SearchFieldProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "placeholder" | "className"
>;

export default function Search({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
  ...rest
}: SearchFieldProps) {
  useEffect(() => {
    console.log(value);
  }, [value]);
  return (
    <div className="relative">
      <Icon
        icon={faSearch}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-subtle"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={mergeCls(
          "pl-10 bg-muted border-0 rounded-lg h-10 text-sm w-full",
          "focus:outline-none focus:ring-2 focus:ring-front/30",
          className,
        )}
        {...rest}
      />
    </div>
  );
}
