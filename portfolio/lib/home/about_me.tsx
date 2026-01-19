"use client";

import Image from "next/image";
import Link from "@/lib/ui/link";
import { UserAvatar } from "@/lib/assets";
import { Typography } from "@/lib/ui/text";
import { Icon } from "@/lib/ui";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";

export default function AboutMe() {
  return (
    <section
      className={
        "screen flex flex-row flex-wrap justify-center gap-4 lg:gap-16 item-center"
      }
    >
      <Image
        src={UserAvatar}
        alt="Profile"
        className="object-cover rounded-xl flex-1"
      />
      <div className="flex flex-col gap-4 flex-2">
        <Typography variant="heading">Hello! I am Manoj</Typography>
        <Typography variant="body">
          I am Manoj Malviya I build fast, reliable products—from pixel-perfect
          UIs to performance-critical engines (yes, I care about the last
          millisecond). I lead across CAD/CAM, rendering, and optimization in
          hardware–software ecosystems, turning gnarly workflows into intuitive
          experiences and measurable product impact.
          <br /> <br />
        </Typography>
        <Link
          url="/resume"
          className="bg-subtle text-back px-4 py-2 w-fit rounded-full hover:text-back"
        >
          Resume
          <Icon icon={faArrowRight} className="ml-2" />
        </Link>
      </div>
    </section>
  );
}
