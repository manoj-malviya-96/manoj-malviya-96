"use client";

import FlipWords from "@/components/ui/flip_words";
import NeuralCanvas from "@/components/ui/neural_bg";

function LandingContent() {
  const words = ["modern", "efficient", "correct", "scalable"];
  return (
    <div className="flex flex-col items-center text-left gap-4 w-fit self-center">
      <span className="text-4xl font-normal mx-auto">
        Build
        <FlipWords words={words} className="font-bold" /> <br />
        digital products fast <br />
      </span>
      <span className="ml-auto">Manoj Malviya</span>
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
