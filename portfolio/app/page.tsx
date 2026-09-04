import {Badge, Flex, Grid, Text} from "@manoj-malviya-96/atom";
import {IconLink} from "@manoj-malviya-96/atom/icons";
import NextLink from "next/link";
import {
    EXPERIENCE_BY_RECENCY,
    getEmployer,
    getExperience,
    getMeta,
    getPhase,
    PHASE_IDS,
    YEARS_EXPERIENCE,
} from "@/lib/data";
import StatGrid from "@/lib/home/stat_grid";
import {Eyebrow, Link, Section, SectionHeader} from "@/lib/ui";
import {uniqueBy} from "@/lib/utils";

export default function Landing() {
    return (
        <>
            {/*<MeshCanvas/>*/}
            <Hero/>
            <Loop/>
            <FeaturedWork/>
        </>
    );
}

function Hero() {
    return (
        <Section id="home-hero">
            <Flex
                as="header"
                direction="col"
                gap="lg"
                width={{
                    max: "lg",
                }}
                padding="xl"
                radius="lg"
                bg="surface"
            >
                <Eyebrow>Software engineer, product-brained 📍 Berlin, DE</Eyebrow>
                <Text variant="hero">
                    I care about your users as much as your query plans
                </Text>
                <Text variant="subtitle">
                    Seven years across hardware, creative tools, and ML — turning
                    &quot;wouldn&apos;t it be nice if—&quot; into things that ship, and
                    keep working. Mechanical engineer by degree, software engineer by
                    trade, product person by compulsion.
                </Text>
                <Flex
                    as="span"
                    direction="row"
                    gap="sm"
                    vAlign="center"
                    hAlign="start"
                    wrap
                >
                    <Link
                        url="#loop"
                        variant="button"
                        buttonVariant="filled"
                        color="secondary"
                        size="sm"
                        label="See how I work"
                    />
                    <Link
                        url="/resume"
                        variant="button"
                        buttonVariant="filled"
                        color="primary"
                        size="sm"
                        label="Past work"
                    />
                </Flex>
            </Flex>
            <Text variant="body">
                <Badge color="green">{YEARS_EXPERIENCE}+</Badge> yrs shaping product &
                systems
            </Text>
        </Section>
    );
}

function Loop() {
    return (
        <Section id="home-loop" gap="xl">
            <SectionHeader
                eyebrow="How I work"
                title="Requirements in. Shipped, measured software out."
                caption="No middle-management jargon required — I just refuse to skip steps."
            />
            <Grid columns={4} gap="md" className="loop-grid">
                {PHASE_IDS.map((id) => (
                    <LoopCard key={id} {...getPhase(id)} />
                ))}
            </Grid>
        </Section>
    );
}

function LoopCard({color, label, copy}: ReturnType<typeof getPhase>) {
    return (
        <Flex direction="col" gap="md" padding="lg" radius="lg" bg="surface" blur>
            <Badge color={color} width="fit">
                {label}
            </Badge>
            <Text variant="body">{copy}</Text>
        </Flex>
    );
}

function FeaturedWork() {
    return (
        <Section id="home-feature" gap="lg">
            <SectionHeader
                eyebrow="A few things I've shipped"
                title="Proof, briefly."
                caption="The rest — plus the messy parts — live on the full work page."
            />
            <Grid columns={2} gap="md" className="mini-work-grid">
                {FEATURED_WORK.map((work) => (
                    <WorkCard key={work.title} {...work} />
                ))}
            </Grid>
            <StatGrid/>
            <WorkExHistory/>
        </Section>
    );
}

function WorkCard({title, blurb, href, cta}: (typeof FEATURED_WORK)[number]) {
    const external = href.startsWith("http");
    return (
        <Flex
            as={external ? "a" : NextLink}
            href={href}
            {...(external ? {target: "_blank", rel: "noopener noreferrer"} : {})}
            direction="col"
            gap="sm"
            padding="lg"
            radius="sm"
            bg="raised"
            hAlign="start"
        >
            <Text variant="title">{title}</Text>
            <Text variant="body" muted grow>
                {blurb}
            </Text>
            <Text variant="label">{cta}</Text>
        </Flex>
    );
}

function WorkExHistory() {
    return (
        <Flex
            direction="row"
            hAlign="between"
            vAlign="center"
            gap="md"
            padding="lg"
        >
            <Flex direction="row" gap="sm" wrap>
                <Text variant="body">
                    Most recently at <strong>{getEmployer(TRACK[0]).name}</strong>
                </Text>
                <Text variant="body" muted>
                    ·
                </Text>
                <Text variant="body">
                    previously <strong>{getEmployer(TRACK[1]).name}</strong>
                </Text>
                <Text variant="body" muted>
                    ·
                </Text>
                <Text variant="body">
                    <strong>{getEmployer(TRACK[2]).name}</strong> before that
                </Text>
            </Flex>
            <Link
                url="/resume"
                icon={<IconLink/>}
                variant="button"
                color="secondary"
                label="Full history"
            />
        </Flex>
    );
}

const FEATURED_WORK = [
    {
        title: getMeta("topopt_py").title,
        blurb:
            "Made a 40-year-old optimization algorithm fast again, out of pure spite for slow for-loops.",
        href: "https://medium.com/@manoj-malviya/vectorized-python-a-step-towards-speed-305f8aa708a2",
        cta: "Read on Medium",
    },
    {
        title: getMeta("blackhole").title,
        blurb:
            "Built a real-time gravitational lensing simulator, because pre-rendered gravity felt like cheating.",
        href: "https://github.com/manoj-malviya-96/blackhole",
        cta: "View on GitHub",
    },
] as const;

const TRACK = uniqueBy(
    [...EXPERIENCE_BY_RECENCY],
    (experience) => getExperience(experience).organization,
).slice(0, 3);
