import {assertNever, Badge, Flex, Grid, Image, List, Text, Video,} from "@manoj-malviya-96/atom";
import {IconGithub, IconLink, IconMedium, IconPlay,} from "@manoj-malviya-96/atom/icons";
import NextImage from "next/image";
import {
    getBody,
    getLinks,
    getMedia,
    getMeta,
    type ProjectBody,
    type ProjectId,
    type ProjectLink,
    type ProjectMedia,
    type ProjectMeta,
} from "@/lib/data";
import {Link} from "@/lib/ui";

export default function ProjectCard({project}: { project: ProjectId }) {
    const {title, hook, tags} = getMeta(project);

    return (
        <Grid
            columns={2}
            gap="lg"
            className="case-grid"
            bg="surface"
            padding="lg"
            radius="lg"
        >
            <Flex direction="col" gap="md" vAlign="center">
                <ProjectCover media={getMedia(project)}/>
                <ProjectLinks project={project}/>
            </Flex>
            <Flex direction="col" gap="sm">
                <Text variant="title">{title}</Text>
                <ProjectTags tags={tags}/>
                <Text variant="body" muted>
                    {hook}
                </Text>
                <ProjectBodyView body={getBody(project)}/>
            </Flex>
        </Grid>
    );
}

export function ProjectTags({tags}: { tags: ProjectMeta["tags"] }) {
    return (
        <List direction="row" gap="sm">
            {tags.map((tag) => (
                <Badge as="li" key={tag} color="blue">
                    {tag}
                </Badge>
            ))}
        </List>
    );
}

function ProjectCover({media}: { media: ProjectMedia }) {
    if (media.kind === "video") {
        return (
            <Video
                src={media.src}
                aria-label={media.alt}
                fit="cover"
                ratio="video"
                radius="md"
                autoPlay
                muted
                loop
                playsInline
            />
        );
    }
    return (
        <Image
            {...(typeof media.src === "string" ? {} : {as: NextImage})}
            src={media.src}
            alt={media.alt}
            fit="cover"
            ratio="video"
            radius="md"
        />
    );
}

function ProjectBodyView({body}: { body: ProjectBody }) {
    switch (body.kind) {
        case "steps":
            return (
                <Grid columns={3} gap="md" className="case-steps">
                    <Step label="Problem" body={body.problem}/>
                    <Step label="Approach" body={body.approach}/>
                    <Step label="Outcome" body={body.outcome}/>
                </Grid>
            );
        case "narrative":
            return (
                <Flex direction="col" gap="sm">
                    {body.paragraphs.map((paragraph, index) => (
                        // biome-ignore lint/suspicious/noArrayIndexKey: paragraphs are a fixed, order-authored list — index is stable.
                        <Text key={index} variant="body">
                            {paragraph}
                        </Text>
                    ))}
                </Flex>
            );
        default:
            return assertNever(body);
    }
}

function Step({label, body}: { label: string; body: string }) {
    return (
        <Flex direction="col" gap="xs">
            <Text variant="caption" className="font-mono" muted>
                {label}
            </Text>
            <Text variant="body">{body}</Text>
        </Flex>
    );
}

function ProjectLinks({project}: { project: ProjectId }) {
    const links = getLinks(project);

    return (
        <Flex direction="row" gap="md" wrap>
            {links.map((link) => {
                const LinkIcon = linkIcon(link);
                const label = linkLabel(link);
                return (
                    <Link
                        key={link.href}
                        url={link.href}
                        openNewTab
                        variant="button"
                        buttonVariant="plain"
                        label={label}
                        size="sm"
                        icon={<LinkIcon size="sm"/>}
                    />
                );
            })}
        </Flex>
    );
}

function linkLabel(link: ProjectLink) {
    switch (link.kind) {
        case "github":
            return "GitHub";
        case "medium":
            return "Blog";
        case "demo":
            return link.label ?? "Demo";
        case "external":
            return link.label;
        default:
            return assertNever(link);
    }
}

function linkIcon(link: ProjectLink) {
    switch (link.kind) {
        case "github":
            return IconGithub;
        case "medium":
            return IconMedium;
        case "demo":
            return IconPlay;
        case "external":
            return IconLink;
        default:
            return assertNever(link);
    }
}
