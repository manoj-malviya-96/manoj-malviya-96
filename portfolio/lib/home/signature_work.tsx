import { Badge, Flex, Grid, Text } from "@manoj-malviya-96/atom";
import { Link } from "@/lib/shared";

type SignatureItem = {
	title: string;
	hook: string;
	metric: string;
	url: string;
};

const SIGNATURE_WORK: readonly SignatureItem[] = [
	{
		title: "Atom",
		hook: "Design tokens without runtime overhead",
		metric: "20 KB gzipped · Type-safe tokens",
		url: "/projects#atom",
	},
	{
		title: "Muviz",
		hook: "Real-time music visualization in the browser",
		metric: "C++ DSP → WASM → Three.js",
		url: "/projects#muviz",
	},
	{
		title: "PreForm",
		hook: "Making professional CAD software dramatically faster",
		metric: "60% faster large-scene rendering · ~95% CSAT",
		url: "/resume",
	},
];

export default function SignatureWork() {
	return (
		<Grid columns={3} gap="md">
			{SIGNATURE_WORK.map(({ title, hook, metric, url }) => (
				<Flex
					key={title}
					direction="col"
					gap="sm"
					padding="lg"
					radius="lg"
					bg="surface"
					hAlign="start"
					width="full"
				>
					<Text variant="title">{title}</Text>
					<Text variant="body" muted>
						{hook}
					</Text>
					<Badge color="green">{metric}</Badge>
					<Link url={url}>View</Link>
				</Flex>
			))}
		</Grid>
	);
}
