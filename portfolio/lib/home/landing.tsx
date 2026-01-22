"use client";

import { FlipWords } from "@/lib/ui";
import { Typography } from "@/lib/ui/text";

const words: readonly string[] = [
  "modern",
  "efficient",
  "reliable",
  "scalable",
] as const;

function HeroText() {
  return (
    <span className="flex flex-col items-center text-left gap-8 w-fit self-center">
      <Typography variant="heading" className="font-light text-wrap">
        Building
        <FlipWords words={words} className="font-bold uppercase" /> <br />
        digital products quick <br />
      </Typography>
    </span>
  );
}

export default function Landing() {
  return (
    <section id="home" data-theme="dark">
      <HeroText />
    </section>
  );
}
