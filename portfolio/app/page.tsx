import {Atom, Badge, Flex, Grid, Text} from "@manoj-malviya-96/atom";
import {IconLink} from "@manoj-malviya-96/atom/icons";
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
import {Eyebrow, Link, MeshCanvas, Section, SectionHeader} from "@/lib/ui";
import {uniqueBy} from "@/lib/utils";

export default function Landing() {
    return (
        <>
            <MeshCanvas/>
            <Hero/>
            <Loop/>
            <FeaturedWork/>
        </>
    );
}

function Hero() {
    return (
        <Section
            id="home-hero"
            as="header"
            direction="col"
            gap="xl"
            width={{
                max: "lg",
            }}
            height={{
                min: "xl"
            }}
            padding="lg"
            radius="lg"
            bg="surface"
            shadow
            vAlign="between"
        >
            <Eyebrow>Senior product engineer 📍 Berlin, DE</Eyebrow>
            <Text variant="hero">
                I start with the problem. The stack comes second.
            </Text>
            <Text variant="subtitle">
                Seven years turning ambiguous problems into shipped products:
                patient-monitoring platforms, CAD tools thousands of engineers rely
                on, real-time rendering and audio systems. I own it end to end: system
                design, the algorithm underneath, and the interface someone actually
                has to use.
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
        </Section>
    );
}

function Loop() {
    return (
        <Section id="home-loop">
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
            <StatGrid/>
            <WorkExHistory/>
        </Section>
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
            radius="lg"
            bg="surface"
            blur
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

const TRACK = uniqueBy(
    [...EXPERIENCE_BY_RECENCY],
    (experience) => getExperience(experience).organization,
).slice(0, 3);
