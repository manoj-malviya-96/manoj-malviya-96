import type { Project } from "@/lib/projects/list/types";
import ProjectCard from "@/lib/projects/project_card";
import Link from "@/lib/ui/link";
import { Typography } from "@/lib/ui/text";

const metadata = {
	title: "Portfolio",
	description: `A modern portfolio website to showcase my projects and skills, 
              built with Next.js, TailwindCSS and TypeScript`,
	tags: ["web", "open-source", "nextjs", "tailwind", "typescript", "ui/ux"],
	effort: "medium",
} as const;

function PortfolioCard() {
	return (
		<ProjectCard
			{...metadata}
			images={[
				"https://bpnrfzeuxj6iqkm6.public.blob.vercel-storage.com/portfolio.webm",
			]}
			ctas={[
				{
					kind: "github",
					href: "https://github.com/manoj-malviya-96/manoj-malviya-96/tree/master/portfolio",
				},
			]}
		>
			<Typography variant="body">
				It’s simple, informative, and it works which is exactly the point. I
				built this site to show what I can do, highlight the projects I’m proud
				of, and keep everything organized as a living project catalog. <br />
				If you haven’t yet, check out the interactive landing page - it’s where
				I let things get a bit more playful
				<br /> <br /> If you want to look at previous iteration - check out{" "}
				<strong>
					<Link url="https://manoj-malviya-96.github.io/" newTab>
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
