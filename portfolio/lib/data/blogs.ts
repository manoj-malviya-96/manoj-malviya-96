import type { ProjectTag } from "@/lib/data/projects";
import type { ExternalURL } from "@/lib/types";

export type BlogId = "qml-property-bindings";

export type Blog = {
	title: string;
	summary: string;
	dates: string;
	tags: readonly ProjectTag[];
	href: ExternalURL;
};

// NOTE: hand-maintained. Add a post here and it shows up on /work automatically.
export const Blogs: Record<BlogId, Blog> = {
	"qml-property-bindings": {
		title: "QML: Learning Property Bindings",
		summary:
			"How QML's declarative bindings keep an interface reactive, and how I kept breaking that reactivity — an overridden binding, a circular dependency — before learning to spot the patterns that cause it.",
		dates: "2024",
		tags: ["qt/qml", "ui-development"],
		href: "https://medium.com/@manoj-malviya/qml-learning-property-bindings-b6b367c40d96",
	},
};
