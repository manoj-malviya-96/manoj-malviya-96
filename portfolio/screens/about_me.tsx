"use client";

import Image from "next/image";
import { useNavigator } from "@/hooks/use-navigator";
import { Icon } from "@/components/ui";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { EDUCATION, PROFILE, WORK_EXPERIENCE } from "@/core/profile";
import { uniqueBy } from "@/core/utils";

type ExternalIconURLProps = {
  image: string;
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
        className="object-cover h-8 w-8 rounded-full"
      />
      <span className="text-md hidden md:inline">{altText}</span>
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
  const navigate = useNavigator();
  return (
    <section
      className={
        "screen flex flex-row flex-wrap justify-center gap-4 lg:gap-16 items-start"
      }
    >
      <Image
        src={PROFILE.profilePicture}
        alt="Profile"
        width={400}
        height={400}
        className="object-cover rounded-lg"
      />
      <div className="flex-1 flex flex-col items-start gap-8">
        <span className="flex flex-row gap-4 items-center">
          <h2 className="text-6xl font-bold">About Me</h2>
          <button
            className="bg-muted px-3 py-2 rounded-full cursor-pointer hover:scale-105 transition-transform duration-300"
            onClick={() => {
              navigate("about");
            }}
            aria-label="Read More About Me"
          >
            <Icon icon={faUpRightFromSquare} />
          </button>
        </span>
        <div className="text-left mt-4 flex flex-col gap-4">
          <h2 className="text-2xl font-bold my-2">{`Hello! I am ${PROFILE.name}`}</h2>
          <p className="text-subtle">
            Currently <strong>{PROFILE.title}</strong> at @ NoahLabs, working on
            cutting-edge technologies and innovative solutions.
          </p>
          <h2 className="text-2xl font-bold mt-6">Past Work</h2>
          <span className="flex flex-row gap-4 items-center">
            {WorkOrganizations.map((item) => (
              <ExternalIconURL key={item.altText} {...item} />
            ))}
          </span>

          <h2 className="text-2xl font-bold mt-6">Education </h2>
          <span className="flex flex-row gap-4 items-center">
            {Educations.map((item) => (
              <ExternalIconURL key={item.altText} {...item} />
            ))}
          </span>
        </div>
      </div>
    </section>
  );
}
