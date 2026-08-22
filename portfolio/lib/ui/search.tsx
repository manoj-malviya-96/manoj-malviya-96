import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Flex, InputField } from "@manoj-malviya-96/atom";
import Icon from "./icon";

type SearchProps = {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
};

export default function Search({
	value,
	onChange,
	placeholder = "Search...",
}: SearchProps) {
	return (
		<Flex
			direction="row"
			gap="sm"
			vAlign="center"
			padding="sm"
			radius="md"
			backgroundColor="surface"
			className="frosted"
		>
			<Icon icon={faSearch} />
			<InputField
				type="search"
				variant="plain"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder={placeholder}
			/>
		</Flex>
	);
}
