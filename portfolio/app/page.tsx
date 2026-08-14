import { Flex } from "@manoj-malviya-96/atom";
import Landing from "@/lib/home/landing";
import { NeuralCanvas } from "@/lib/ui";

export default function App() {
	return (
		<Flex
			as="main"
			direction="row"
			hAlign="center"
			vAlign="center"
			className="home-main bg-back text-front"
			data-theme="dark"
		>
			<Landing />
			<NeuralCanvas className="home-neural-canvas" followScroll />
		</Flex>
	);
}
