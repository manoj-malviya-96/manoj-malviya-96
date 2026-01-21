import { WorkExperience } from "@/lib/about_me/work_experience";
import { calculateDuration, formatDate, mergeCls } from "@/lib/utils";
import Image from "next/image";
import { Typography } from "@/lib/ui/text";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Badge, Icon } from "@/lib/ui";
import Link from "@/lib/ui/link";

function WorkExpCard({
  startDate,
  endDate,
  type,
  position,
  company,
  logo,
  role,
  location,
  companyURL,
}: WorkExperience) {
  const duration = calculateDuration(startDate, endDate);
  const timeString = `${formatDate(startDate)} - ${endDate ? formatDate(endDate) : "Present"} • ${duration}`;

  return (
    <div className="flex-1 w-full card flex flex-col gap-4">
      <div className="flex flex-row items-center gap-4 w-full">
        <Image
          src={logo}
          alt={`${company} logo`}
          className="w-10 h-10 object-contain rounded-2xl"
        />
        <span className="flex flex-col gap-0 flex-1">
          {/* Name, position and date Row */}
          <span className="flex flex-row flex-wrap gap-1 items-center justify-between">
            <span className="flex flex-row gap-2 items-center">
              <Typography variant="title">{position}</Typography>
              <Badge className="hidden lg:block h-fit">{type}</Badge>
            </span>
            <Typography variant="caption">{timeString}</Typography>
          </span>
          {/* Location and Company*/}
          <span className="flex flex-row items-center gap-1">
            <Link url={companyURL} newTab className="text-sm">
              {company}
            </Link>
            <Typography variant="caption">
              <Icon icon={faLocationDot} aria-label="Location" />
              {location}
            </Typography>
          </span>
        </span>
      </div>
      {role && (
        <Typography variant="body" className="p-2">
          {role}
        </Typography>
      )}
    </div>
  );
}

export default function WorkHistory({
  experiences,
  className,
}: {
  experiences: WorkExperience[];
  className?: string;
}) {
  const sortedExperiences = experiences.sort((a, b) => {
    if (a.endDate && b.endDate) {
      return a.endDate < b.endDate ? 1 : -1;
    }
    if (!a.endDate && !b.endDate) {
      return a.startDate < b.startDate ? 1 : -1;
    }
    if (!a.endDate) return -1;
    if (!b.endDate) return 1;
    return 0;
  });

  return (
    <div className={mergeCls("flex flex-col", className)}>
      {sortedExperiences.map((exp, idx) => (
        <span key={exp.startDate} className="flex flex-col gap-0 items-center">
          <WorkExpCard {...exp} />
          {idx !== experiences.length - 1 && (
            <span className="bg-subtle/20 w-0.5 h-8 mr-auto ml-8" /> // ml-8 is to match icon but its hacky. Todo fix it.
          )}
        </span>
      ))}
    </div>
  );
}
