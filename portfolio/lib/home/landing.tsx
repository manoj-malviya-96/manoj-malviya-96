import { Flex, Typography } from "@manoj-malviya-96/atom";
import { Link, NeuralCanvas } from "@/lib/ui";

export default function Landing() {
	return (
		<Flex
			as="section"
			direction="col"
			gap="xl"
			hAlign="center"
			vAlign="center"
			className="landing-hero"
		>
			<Flex direction="col" gap="lg" hAlign="center">
				<Typography variant="overline" align="center">
					Product builder & tinkerer
				</Typography>
				<Typography variant="hero" align="center">
					Building efficient products for a better future
				</Typography>
				<Typography variant="subtitle" align="center">
					Hey! I am Manoj Malviya, a software engineer specializing in building
					tools.
				</Typography>
			</Flex>
			<Flex
				direction="row"
				gap="md"
				hAlign="center"
				vAlign="center"
				style={{ flexWrap: "wrap" }}
			>
				<Link url="/projects" padding="sm" radius="md" backgroundColor="brand">
					View my projects
				</Link>
				<Link
					url="/resume"
					padding="sm"
					radius="md"
					backgroundColor="surface"
					className="frosted"
				>
					Resume
				</Link>
			</Flex>
			<NeuralCanvas hue={255} saturation={0.5} chroma={0.8} followScroll />
		</Flex>
	);
}
