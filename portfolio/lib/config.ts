type Config = {
	githubContributionsApi: string;
	scholarTargetUrl: string;
};

let cached: Config | null = null;

export default function getConfig(): Config {
	cached ??= {
		githubContributionsApi: required(
			"NEXT_PUBLIC_GITHUB_API",
			process.env.NEXT_PUBLIC_GITHUB_API,
		),
		scholarTargetUrl: required(
			"NEXT_PUBLIC_SCHOLAR_API",
			process.env.NEXT_PUBLIC_SCHOLAR_API,
		),
	};
	return cached;
}

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
