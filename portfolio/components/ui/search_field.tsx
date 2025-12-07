import { InputHTMLAttributes } from "react";
import Icon from "./icon";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export type SearchFieldProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "placeholder" | "className"
>;

export function Search_field({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
  ...rest
}: SearchFieldProps) {
  return (
    <div className="relative">
      <Icon
        icon={faSearch}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
      />
      <input
        {...rest}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`pl-10 bg-muted border-0 rounded-lg h-10 text-sm w-full focus:outline-none focus:ring-2 focus:ring-border ${className}`}
      />
    </div>
  );
}

export default Search_field;
