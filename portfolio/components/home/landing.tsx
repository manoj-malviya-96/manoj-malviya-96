"use client";

import { FlipWords, NeuralCanvas } from "@/components/ui";
import { Typography } from "@/components/ui/text";

function LandingContent() {
  const words = ["modern", "efficient", "correct", "scalable"];
  return (
    <div className="flex flex-col items-center text-left gap-4 w-fit self-center">
      <Typography variant="largeHeading" className="mx-auto">
        Build
        <FlipWords words={words} className="font-bold" /> <br />
        digital products fast <br />
      </Typography>
      <Typography variant="body" className="ml-auto">
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
