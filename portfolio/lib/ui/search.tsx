import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Flex, InputField } from "@manoj-malviya-96/atom";
import type { InputHTMLAttributes } from "react";
import { mergeCls } from "@/lib/utils";
import Icon from "./icon";

export type SearchFieldProps = {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	className?: string;
} & Omit<
	InputHTMLAttributes<HTMLInputElement>,
	"value" | "onChange" | "placeholder" | "className" | "type"
>;

export default function Search({
	value,
	onChange,
	placeholder = "Search...",
	className,
	...rest
}: SearchFieldProps) {
	return (
		<Flex
			direction="row"
			gap="md"
			vAlign="center"
			className={mergeCls("search-field", className)}
		>
			<Icon icon={faSearch} className="text-subtle" />
			<InputField
				type="text"
				variant="plain"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder={placeholder}
				{...rest}
			/>
		</Flex>
	);
}
