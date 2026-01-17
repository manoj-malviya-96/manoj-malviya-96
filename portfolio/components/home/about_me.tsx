"use client";

import Image, { StaticImageData } from "next/image";
import Link from "@/components/ui/link";
import { EDUCATION, WORK_EXPERIENCE } from "@/lib/about_me/profile";
import { uniqueBy } from "@/lib/utils";
import { UserAvatar } from "@/lib/assets";
import { Typography } from "@/components/ui/text";
import { Icon } from "@/components/ui";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";

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
      <Typography variant="caption" className="hidden md:inline">
        {altText}
      </Typography>
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
        "screen flex flex-row flex-wrap justify-center gap-4 lg:gap-16 item-center"
      }
    >
      <Image
        src={UserAvatar}
        alt="Profile"
        width={500}
        height={500}
        className="object-cover rounded-lg flex-1"
      />
      <div className="flex flex-col gap-4 flex-2">
        <Typography variant="heading">About Me</Typography>
        <Typography variant="title" className="my-2">
          Hello! I am Manoj Malviya
        </Typography>
        <Typography variant="body">
          Senior Software Engineer with 7+ years delivering physics simulation
          and CAD software, specializing in turning complex geometry/physics
          problems into fast, reliable user-facing features.
          <br />
          I lead cross-functional initiatives and translate business goals into
          shipped systems with measurable impact.
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
        <Typography
          variant="body"
          className="flex flex-row gap-4 items-center mt-8"
        >
          You can learn more about my work experience and education
          <Link
            url="/about"
            className="bg-subtle text-back px-4 py-2 w-fit rounded-lg"
          >
            Learn more
            <Icon icon={faArrowRight} className="ml-2" />
          </Link>
        </Typography>
      </div>
    </section>
  );
}
