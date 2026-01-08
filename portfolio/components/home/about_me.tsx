"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { EDUCATION, WORK_EXPERIENCE } from "@/lib/profile";
import { uniqueBy } from "@/lib/utils";
import { UserAvatar } from "@/lib/assets";
import { Typography } from "@/components/ui/text";

type ExternalIconURLProps = {
  image: StaticImageData | string;
  altText: string;
  url: string;
};
function ExternalIconURL({ image, altText, url }: ExternalIconURLProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-row bg-muted px-4 py-2 rounded-lg gap-2 items-center"
    >
      <Image
        src={image}
        alt={altText}
        width={48}
        height={48}
        className="object-cover h-6 w-6 rounded-full"
      />
      <span className="text-sm hidden md:inline">{altText}</span>
    </a>
  );
}

const Educations = uniqueBy(EDUCATION, (edu) => edu.schoolURL).map((edu) => ({
  image: edu.logo,
  altText: edu.school,
  url: edu.schoolURL,
})) as ExternalIconURLProps[];

const WorkOrganizations = uniqueBy(
  WORK_EXPERIENCE,
  (work) => work.companyURL,
).map((work) => ({
  image: work.logo,
  altText: work.company,
  url: work.companyURL,
})) as ExternalIconURLProps[];

export default function AboutMe() {
  return (
    <section
      className={
        "screen flex flex-row flex-wrap justify-center gap-4 lg:gap-16 items-start"
      }
    >
      <Image
        src={UserAvatar}
        alt="Profile"
        width={500}
        height={500}
        className="object-cover rounded-lg"
      />
      <div className="flex-1 flex flex-col items-start gap-8">
        <span className="flex flex-row gap-4 items-center">
          <Typography variant="heading">About Me</Typography>
          <Link
            href="/about"
            className="bg-muted px-3 py-2 rounded-full cursor-pointer hover:scale-105 transition-transform duration-300"
            aria-label="Read More About Me"
          >
            <Icon icon={faUpRightFromSquare} />
          </Link>
        </span>
        <div className="text-left mt-4 flex flex-col gap-4">
          <Typography variant="title" className="my-2">
            Hello! I am Manoj Malviya
          </Typography>
          <Typography variant="body">
            Senior Software Engineer with 7+ years delivering physics simulation
            and CAD software, specializing in turning complex geometry/physics
            problems into fast, reliable user-facing features.
            <br /> <br />
            I lead cross-functional initiatives and translate business goals
            into shipped systems with measurable impact.
            <br /> <br />
            Past associations -
          </Typography>
          <span className="flex flex-row flex-wrap gap-4 items-center">
            {WorkOrganizations.map((item) => (
              <ExternalIconURL key={item.altText} {...item} />
            ))}
            {Educations.map((item) => (
              <ExternalIconURL key={item.altText} {...item} />
            ))}
          </span>
        </div>
      </div>
    </section>
  );
}
