"use client";

import { FlipWords, NeuralCanvas } from "@/lib/ui";
import { Typography } from "@/lib/ui/text";

function LandingContent() {
  const words = ["modern", "efficient", "correct", "scalable"];
  return (
    <div className="flex flex-col items-center text-left gap-4 w-fit self-center">
      <Typography
        variant="title"
        className="mx-auto lg:text-2xl font-medium select-none"
      >
        Building
        <FlipWords words={words} className="font-extrabold" /> <br />
        digital products fast <br />
      </Typography>
      <Typography variant="label" className="ml-auto select-none">
        Manoj Malviya
      </Typography>
    </div>
  );
}

export default function Landing() {
  return (
    <section
      id="home"
      className="screen relative overflow-hidden z-0 flex items-center justify-center"
      data-theme="dark"
    >
      <LandingContent />
      <NeuralCanvas className="absolute -z-1" followScroll />
    </section>
  );
}
