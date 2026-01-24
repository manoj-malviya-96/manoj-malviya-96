"use client";

import { FlipWords, Icon } from "@/lib/ui";
import { Typography } from "@/lib/ui/text";
import Link from "@/lib/ui/link";
import {
  faCodeBranch,
  faContactCard,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const words: readonly string[] = [
  "modern",
  "efficient",
  "reliable",
  "scalable",
] as const;

function HeroText() {
  return (
    <span className="flex flex-col items-center gap-8 w-fit">
      <Typography variant="heading" className="font-light text-wrap">
        Building
        <FlipWords words={words} className="font-bold uppercase" /> <br />
        digital products quickly <br />
      </Typography>
    </span>
  );
}

export default function Landing() {
  return (
    <section
      className="flex flex-col gap-8 max-w-[90vw] lg:max-w-[600px] backdrop-blur-md bg-radial from-transparent to-muted/80 p-8 rounded-lg select-none  "
      data-theme="dark"
    >
      <HeroText />
      <Typography variant="body">
        Hey! I am Manoj Malviya, a mechanical engineer turned SOFTWARE ENGINEER
        with knack of making music and solving problems.
      </Typography>
      <span className="flex flex-row flex-wrap gap-4">
        <Link url="/projects" asControl className="control-primary">
          <Icon icon={faCodeBranch} className="mr-2" />
          View my projects
        </Link>
        <Link url="/resume" asControl className="control-secondary">
          <Icon icon={faUser} className="mr-2" />
          Resume
        </Link>
        <Link
          url="mailto:malviyamanoj1896@gmail.com"
          asControl
          className="control-secondary"
        >
          <Icon icon={faContactCard} className="mr-2" />
          Contact Me
        </Link>
      </span>
    </section>
  );
}
