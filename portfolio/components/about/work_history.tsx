import { WorkExperience } from "@/lib/about_me/profile";
import { calculateDuration, formatDate } from "@/lib/utils";
import Image from "next/image";
import { Typography } from "@/components/ui/text";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Badge, Icon } from "@/components/ui";
import Link from "@/components/ui/link";

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
    <div className="flex-1 w-full bg-muted/40 shadow-sm rounded-xl p-4 flex flex-col gap-4">
      <div className="flex flex-row gap-4 items-start">
        <Image
          src={logo}
          alt={`${company} logo`}
          className="w-13 h-full object-cover"
        />
        <span className="flex flex-col gap-1">
          <span className="flex flex-row flex-wrap gap-2">
            <Typography variant="title" className="font-extrabold text-front">
              {position}
            </Typography>
            <Badge>{type}</Badge>
          </span>
          <Typography variant="caption" className="flex items-center gap-2">
            <Link url={companyURL}>{company}</Link>
            <Icon icon={faLocationDot} aria-label="Location" />
            {location}
          </Typography>
        </span>

        <Typography variant="caption" className="ml-auto">
          {timeString}
        </Typography>
      </div>

      {role && role.length > 0 && (
        <ul className="list-disc list-inside space-y-2">
          {role.map((item, idx) => (
            <Typography variant="body" component="li" key={idx}>
              {item}
            </Typography>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function WorkHistory({
  experiences,
}: {
  experiences: WorkExperience[];
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
    <div className="flex flex-col">
      {sortedExperiences.map((exp, idx) => (
        <div key={idx} className="flex flex-col gap-0 items-center">
          <WorkExpCard {...exp} />
          {idx !== experiences.length - 1 && (
            <span className="bg-subtle/20 w-0.5 h-8 mr-auto ml-8 lg:ml-16" />
          )}
        </div>
      ))}
    </div>
  );
}
