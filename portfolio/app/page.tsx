import Landing from "@/lib/home/landing";
import { NeuralCanvas } from "@/lib/ui";

export default function App() {
	return (
		<main
			className="w-full min-h-dvh bg-back text-front relative overflow-hidden z-0 flex items-center justify-center"
			data-theme="dark"
		>
			<Landing />
			<NeuralCanvas className="absolute -z-1" followScroll />
		</main>
	);
}
