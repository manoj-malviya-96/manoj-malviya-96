import type {ColorToken} from "@manoj-malviya-96/atom";
import {Badge, Flex, Grid, Typography} from "@manoj-malviya-96/atom";
import {WORK_EXPERIENCE_BY_RECENCY} from "@/lib/about_me/work_experience";
import {project as BlackholeProject} from "@/lib/projects/list/blackhole";
import {project as TopOptProject} from "@/lib/projects/list/topopt";
import {Link, MeshCanvas} from "@/lib/ui";
import {uniqueBy, yearsSince} from "@/lib/utils";

const LOOP: ReadonlyArray<{
    color: ColorToken;
    stage: string;
    copy: string;
}> = [
    {
        color: "blue",
        stage: "Discover",
        copy: "Before I open Figma or an editor, I want to know what's actually broken — for the user, not just the backlog.",
    },
    {
        color: "indigo",
        stage: "Design",
        copy: "A user flow and a database schema are just two ways of drawing the same decision. I try to get both right the first time. I don't always.",
    },
    {
        color: "green",
        stage: "Build",
        copy: "Correct, fast, maintainable — validated at the edges, profiled before optimized, built so future-me doesn't curse present-me.",
    },
    {
        color: "orange",
        stage: "Measure",
        copy: "Ship it, then actually look. About half of what I've built worked as planned. The other half taught me something more useful.",
    },
];

const FEATURED_WORK = [
    {
        title: TopOptProject.metadata.title,
        blurb:
            "Made a 40-year-old optimization algorithm fast again, out of pure spite for slow for-loops.",
        href: `/projects/${TopOptProject.id}`,
        cta: "Read the case study →",
    },
    {
        title: BlackholeProject.metadata.title,
        blurb:
            "Built a real-time gravitational lensing simulator, because pre-rendered gravity felt like cheating.",
        href: "https://github.com/manoj-malviya-96/blackhole",
        cta: "View on GitHub ↗",
    },
] as const;

const STACK = ["C++", "Swift", "TypeScript", "Python", "OpenGL"] as const;

const TRACK = uniqueBy(
    WORK_EXPERIENCE_BY_RECENCY,
    (entry) => entry.company,
).slice(0, 3);

const EXPERIENCE_START = WORK_EXPERIENCE_BY_RECENCY.reduce(
    (earliest, entry) =>
        entry.startDate < earliest ? entry.startDate : earliest,
    WORK_EXPERIENCE_BY_RECENCY[0].startDate,
);
const YEARS_EXPERIENCE = yearsSince(EXPERIENCE_START);

export default function Landing() {
    return (
        <Flex direction="col" gap="xl">
            <MeshCanvas/>
            <Hero/>
            <Loop/>
            <FeaturedWork/>
            <TrackStrip/>
        </Flex>
    );
}

function Hero() {
    return (
        <Flex direction="col" vAlign="end" gap="lg" className="hero-panel">
            <Flex
                as="header"
                direction="col"
                gap="md"
                padding="xl"
                radius="lg"
                backgroundColor="chrome"
                className="landing-hero"
            >
                <Typography variant="overline" className="font-mono">
                    Software engineer, product-brained — Berlin, DE
                </Typography>
                <Typography variant="hero">
                    I care about your users
                    <span className="hero-soft">as much as your query plans.</span>
                </Typography>
                <Typography variant="subtitle">
                    Seven years across hardware, creative tools, and ML — turning
                    &quot;wouldn&apos;t it be nice if—&quot; into things that ship, and
                    keep working.
                </Typography>
                <Typography variant="caption" style={{fontStyle: "italic"}}>
                    Mechanical engineer by degree, software engineer by trade, product
                    person by compulsion.
                </Typography>
                <Flex direction="row" gap="md" wrap>
                    <Link url="#loop" padding="sm" radius="full" backgroundColor="brand">
                        See how I work →
                    </Link>
                    <Link
                        url="/resume"
                        padding="sm"
                        radius="full"
                        backgroundColor="surface"
                    >
                        Résumé
                    </Link>
                </Flex>
            </Flex>
            <Flex
                direction="row"
                hAlign="between"
                vAlign="center"
                gap="md"
                padding="lg"
                radius="full"
                backgroundColor="surface"
                wrap
            >
                <Flex direction="row" gap="sm" vAlign="center" wrap>
                    <Typography variant="body">
                        <strong>{YEARS_EXPERIENCE}+</strong> yrs shaping product & systems
                    </Typography>
                    <Typography variant="body" muted>
                        ·
                    </Typography>
                    <Typography variant="body">
                        <strong>2×</strong> faster — topopt-py, modernized
                    </Typography>
                </Flex>
                <Flex direction="row" gap="sm" wrap>
                    {STACK.map((tech) => (
                        <Badge key={tech}>{tech}</Badge>
                    ))}
                </Flex>
            </Flex>
        </Flex>
    );
}

function Loop() {
    return (
        <Flex as="section" id="loop" direction="col" gap="lg">
            <Flex direction="col" gap="sm">
                <Typography variant="overline" className="font-mono">
                    How I work
                </Typography>
                <Typography variant="heading">
                    Requirements in. Shipped, measured software out.
                </Typography>
                <Typography variant="body" muted>
                    No middle-management jargon required — I just refuse to skip steps.
                </Typography>
            </Flex>
            <Grid columns={4} gap="md" className="loop-grid">
                {LOOP.map(({color, stage, copy}) => (
                    <Flex
                        key={stage}
                        direction="col"
                        gap="sm"
                        padding="lg"
                        radius="lg"
                        backgroundColor="surface"
                    >
                        <Badge color={color}>{stage}</Badge>
                        <Typography variant="body">{copy}</Typography>
                    </Flex>
                ))}
            </Grid>
        </Flex>
    );
}

function FeaturedWork() {
    return (
        <Flex as="section" direction="col" gap="lg">
            <Flex direction="col" gap="sm">
                <Typography variant="overline" className="font-mono">
                    A few things I&apos;ve shipped
                </Typography>
                <Typography variant="heading">Proof, briefly.</Typography>
                <Typography variant="body" muted>
                    The rest — plus the messy parts — live on the full work page.
                </Typography>
            </Flex>
            <Grid columns={2} gap="md" className="mini-work-grid">
                {FEATURED_WORK.map(({title, blurb, href, cta}) => (
                    <Link
                        key={title}
                        url={href}
                        openNewTab={href.startsWith("http")}
                        padding="lg"
                        radius="lg"
                        backgroundColor="surface"
                    >
                        <Flex direction="col" gap="md">
                            <Typography variant="title">{title}</Typography>
                            <Typography variant="body" muted grow>
                                {blurb}
                            </Typography>
                            <Typography variant="label">{cta}</Typography>
                        </Flex>
                    </Link>
                ))}
            </Grid>
        </Flex>
    );
}

function TrackStrip() {
    return (
        <Flex
            as="section"
            direction="row"
            hAlign="between"
            vAlign="center"
            gap="md"
            padding="lg"
            radius="full"
            backgroundColor="surface"
            wrap
        >
            <Flex direction="row" gap="sm" wrap>
                <Typography variant="body">
                    Most recently at <strong>{TRACK[0].company}</strong>
                </Typography>
                <Typography variant="body" muted>
                    ·
                </Typography>
                <Typography variant="body">
                    previously <strong>{TRACK[1].company}</strong>
                </Typography>
                <Typography variant="body" muted>
                    ·
                </Typography>
                <Typography variant="body">
                    <strong>{TRACK[2].company}</strong> before that
                </Typography>
            </Flex>
            <Link url="/resume" padding="sm" radius="full" backgroundColor="brand">
                Full history →
            </Link>
        </Flex>
    );
}
