import { memo } from "react";
import Badge from "@/components/badge";
import Icon from "@/components/icon";
import InfoRow from "@/components/info_row";
import { TECH_STACK } from "@/core/techstack";
import { WorkExperience } from "@/core/work";
import {
  faBriefcase,
  faCalendar,
  faLocation,
} from "@fortawesome/free-solid-svg-icons";

interface WorkExperienceCardProps {
  experience: WorkExperience;
}

function WorkExperienceCard({ experience }: WorkExperienceCardProps) {
  const {
    title,
    company,
    location,
    period,
    current,
    description,
    technologies,
  } = experience;

  return (
    <div className="p-6 flex flex-col cursor-pointer gap-4 bg-light rounded-3xl">
      <div className="flex flex-row justify-between items-center">
        <span className="flex items-center gap-2">
          <h3 className="text-xl font-bold ">{title}</h3>
          {current && <Badge className="bg-success">Current</Badge>}
        </span>
        <InfoRow
          icon={faCalendar}
          className="col-span-1 align-right text-sm opacity-70 text-ellipsis"
        >
          {period}
        </InfoRow>
      </div>
      <div className="text-sm opacity-70 flex flex-row gap-4 text-ellipsis">
        <InfoRow icon={faBriefcase}>{company}</InfoRow>
        <InfoRow icon={faLocation}>{location}</InfoRow>
      </div>
      <span className="flex flex-col gap-2 ">
        <p className="text-sm leading-relaxed text-ellipsis">{description}</p>
        <div className="flex flex-wrap gap-2 ">
          {technologies.map((tech, i) => (
            <Badge key={i}>
              {tech in TECH_STACK ? <Icon icon={TECH_STACK[tech]} /> : tech}
            </Badge>
          ))}
        </div>
      </span>
    </div>
  );
}

WorkExperienceCard.displayName = "WorkExperienceCard";
export default memo(WorkExperienceCard);
