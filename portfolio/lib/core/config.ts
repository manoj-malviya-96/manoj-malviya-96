interface Config {
	githubContributionsApi: string;
	scholarTargetUrl: string;
}

let _config: Config | null = null; // Singleton for config.
export default function getConfig(): Config {
	if (_config) {
		return _config;
	}
	_config = {
		githubContributionsApi: process.env.NEXT_PUBLIC_GITHUB_API!,
		scholarTargetUrl: process.env.NEXT_PUBLIC_SCHOLAR_API!,
	} as const;
	return _config;
}
