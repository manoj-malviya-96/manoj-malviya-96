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
    <div className="flex flex-row items-center justify-start gap-4 bg-muted px-4 rounded-lg">
      <Icon icon={faSearch} className="icon text-subtle" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={mergeCls(
          "border-0 rounded-lg h-10 text-sm w-full px-4 focus:outline-none focus:ring-0",
          className,
        )}
        {...rest}
      />
    </div>
  );
}
