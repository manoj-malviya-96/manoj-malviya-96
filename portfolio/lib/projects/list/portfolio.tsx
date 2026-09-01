import { Typography } from "@manoj-malviya-96/atom";
import type { Project } from "@/lib/projects/list/types";
import ProjectCard from "@/lib/projects/project_card";
import { Link } from "@/lib/ui";

const metadata = {
	title: "Portfolio",
	description:
		"A modern portfolio website to showcase my projects and skills, built with Next.js, TypeScript, and a design system I maintain separately.",
	tags: ["web", "open-source", "nextjs", "typescript", "ui/ux"],
	effort: "medium",
	eyebrow: "Web · Next.js · Meta",
	hook: "The portfolio, describing itself.",
	media: {
		kind: "video",
		src: "https://bpnrfzeuxj6iqkm6.public.blob.vercel-storage.com/portfolio.webm",
		alt: "This portfolio’s interactive landing page in motion.",
	},
} as const;

function PortfolioCard() {
	return (
		<ProjectCard
			{...metadata}
			ctas={[
				{
					kind: "github",
					href: "https://github.com/manoj-malviya-96/manoj-malviya-96/tree/master/portfolio",
				},
			]}
		>
			<Typography variant="body">
				It’s simple, informative, and it works — which is exactly the point. I
				built this site to show what I can do, highlight the projects I’m proud
				of, and keep everything organized as a living project catalog. <br />
				If you haven’t yet, check out the interactive landing page — it’s where
				I let things get a bit more playful.
				<br /> <br /> Curious about the previous iteration? Check it out{" "}
				<strong>
					<Link url="https://manoj-malviya-96.github.io/" openNewTab>
						here
					</Link>
				</strong>
				.
			</Typography>
		</ProjectCard>
	);
}

export const project: Project = {
	id: "portfolio",
	metadata,
	Card: PortfolioCard,
} as const;
