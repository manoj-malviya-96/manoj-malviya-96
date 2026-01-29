import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { mergeCls } from "@/lib/utils";

interface IconProps {
	icon: IconDefinition;
	size?: "md" | "lg";
	className?: string;
	"aria-label"?: string;
}

export default function Icon({
	icon,
	className,
	size = "md",
	"aria-label": ariaLabel,
}: IconProps) {
	return (
		<FontAwesomeIcon
			icon={icon}
			className={mergeCls(className)}
			size={size === "md" ? "1x" : "2x"}
			aria-label={ariaLabel}
		/>
	);
}
