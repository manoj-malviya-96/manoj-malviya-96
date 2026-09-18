import type { ProjectTag } from "@/lib/data/projects";
import type { ExternalURL } from "@/lib/types";

export type BlogId = "vectorized-python";

export type Blog = {
	title: string;
	summary: string;
	dates: string;
	tags: readonly ProjectTag[];
	href: ExternalURL;
};

// NOTE: hand-maintained. Add a post here and it shows up on /work automatically.
export const Blogs: Record<BlogId, Blog> = {
	"vectorized-python": {
		title: "Vectorized Python: A Step Towards Speed",
		summary:
			"What actually got faster when I rewrote DTU's 99-line topology optimizer in NumPy — and which parts refused to.",
		dates: "2021",
		tags: ["python", "high-performance", "optimization"],
		href: "https://medium.com/@manoj-malviya/vectorized-python-a-step-towards-speed-305f8aa708a2",
	},
};
