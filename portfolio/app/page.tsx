import { Flex } from "@manoj-malviya-96/atom";
import Landing from "@/lib/home/landing";

export default function App() {
	return (
		<Flex
			as="main"
			direction="row"
			hAlign="center"
			vAlign="center"
			className="home-screen theme-dark"
		>
			<Landing />
		</Flex>
	);
}
