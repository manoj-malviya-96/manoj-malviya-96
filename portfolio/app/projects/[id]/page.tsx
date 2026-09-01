import {Flex, Typography} from "@manoj-malviya-96/atom";
import {project as BlackholeProject} from "@/lib/projects/list/blackhole";
import {caseStudy, GITHUB_URL, MEDIUM_URL, project as TopOptProject,} from "@/lib/projects/list/topopt";
import {Link} from "@/lib/ui";

export const dynamicParams = false;

export function generateStaticParams() {
    return [{id: TopOptProject.id}];
}

const BLACKHOLE_GITHUB_URL = "https://github.com/manoj-malviya-96/blackhole";

export default function CaseStudyPage() {
    const {title, eyebrow, description} = TopOptProject.metadata;

    return (
        <>
            <Link url="/projects" muted className="font-mono">
                ← All work
            </Link>
            <Flex as="header" direction="col" gap="sm">
                {eyebrow && (
                    <Typography variant="overline" className="font-mono">
                        {eyebrow}
                    </Typography>
                )}
                <Typography variant="heading">{title}</Typography>
                <Typography variant="subtitle">{description}</Typography>
                <Flex direction="row" gap="md" wrap>
                    <Link
                        url={GITHUB_URL}
                        openNewTab
                        padding="sm"
                        radius="full"
                        backgroundColor="brand"
                    >
                        View on GitHub ↗
                    </Link>
                    <Link
                        url={MEDIUM_URL}
                        openNewTab
                        padding="sm"
                        radius="full"
                        backgroundColor="surface"
                    >
                        Read on Medium ↗
                    </Link>
                </Flex>
            </Flex>
            <Flex
                direction="row"
                vAlign="center"
                gap="lg"
                padding="lg"
                radius="lg"
                backgroundColor="chrome"
            >
                <Typography variant="hero">2×</Typography>
                <Flex direction="col">
                    <Typography variant="body" bold>
                        Faster than the original solver
                    </Typography>
                    <Typography variant="body" muted>
                        Same language, no C++ required.
                    </Typography>
                </Flex>
            </Flex>
            <Flex direction="col" gap="lg">
                <Section title="The problem">{caseStudy.problem}</Section>
                <Section title="What I did">{caseStudy.approach}</Section>
                <Section title="The result">{caseStudy.result}</Section>
            </Flex>
            <Link
                url={BLACKHOLE_GITHUB_URL}
                openNewTab
                padding="lg"
                radius="lg"
                backgroundColor="surface"
            >
                <Flex direction="row" hAlign="between" vAlign="center" gap="md">
                    <Flex direction="col" gap="xs">
                        <Typography variant="overline" className="font-mono">
                            Next up
                        </Typography>
                        <Typography variant="title">
                            {BlackholeProject.metadata.title} — real-time gravitational
                            lensing
                        </Typography>
                    </Flex>
                    <Typography variant="heading">→</Typography>
                </Flex>
            </Link>
        </>
    );
}

function Section({title, children}: { title: string; children: string }) {
    return (
        <Flex
            direction="col"
            gap="sm"
            padding="lg"
            radius="md"
            backgroundColor="surface"
        >
            <Typography variant="title">{title}</Typography>
            <Typography variant="body">{children}</Typography>
        </Flex>
    );
}
