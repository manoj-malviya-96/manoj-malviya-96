import Link from "@/lib/ui/link";
import {Typography} from "@/lib/ui/text";

export default function Landing() {
    return (
        <section
            className="flex flex-col gap-32 max-w-[90vw] lg:max-w-[1000px] select-none items-center text-center"
            data-theme="dark"
        >
			<span>
				<Typography variant="largeHeading">
					Building efficient products for a better future
				</Typography>
				<Typography variant="body">
					Hey! I am Manoj Malviya, a software engineer specializing in building
					tools
				</Typography>
			</span>
            <span className="flex flex-row flex-wrap gap-4">
				<Link url="/projects" asControl className="control-primary">
					View my projects
				</Link>
				<Link url="/resume" asControl className="control-secondary">
					Resume
				</Link>
			</span>
        </section>
    );
}
