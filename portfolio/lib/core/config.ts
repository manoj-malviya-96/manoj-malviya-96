interface Config {
  githubUserName: string;
  githubContributionsApi: string;
  scholarUser: string;
  scholarTargetUrl: string;
}

let _config: Config | null = null; // Singleton for config.
export default function getConfig(): Config {
  if (_config) {
    return _config;
  }
  _config = {
    githubUserName: process.env.NEXT_PUBLIC_GITHUB_USER!,
    githubContributionsApi: process.env.NEXT_PUBLIC_GITHUB_API!,
    scholarUser: process.env.NEXT_PUBLIC_SCHOLAR_USER!,
    scholarTargetUrl: process.env.NEXT_PUBLIC_SCHOLAR_API!,
  } as const;
  return _config;
}
