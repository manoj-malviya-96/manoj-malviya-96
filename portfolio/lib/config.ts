import { memoizedOnce } from "@/lib/helper";

/**
 * Reads the literal `process.env.NEXT_PUBLIC_*` member at the call site rather
 * than by name — Next only inlines the statically written form.
 */
function required(name: string, value: string | undefined): string {
	if (!value) {
		throw new Error(
			`${name} is unset or empty; set it in portfolio/.env (local) or the deployment's environment`,
		);
	}
	return value;
}

type Config = {
	scholarTargetUrl: string;
};

const getConfig: () => Config = memoizedOnce(() => ({
	scholarTargetUrl: required(
		"NEXT_PUBLIC_SCHOLAR_API",
		process.env.NEXT_PUBLIC_SCHOLAR_API,
	),
}));

export default getConfig;
