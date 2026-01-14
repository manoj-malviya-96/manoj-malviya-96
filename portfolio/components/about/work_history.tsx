import { WorkExperience } from "@/lib/about_me/profile";
import { calculateDuration, formatDate } from "@/lib/utils";
import Image from "next/image";
import { Typography } from "@/components/ui/text";
import Badge from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { faCalendar, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Link from "@/components/ui/link";

function WorkExpCard({ experience }: { experience: WorkExperience }) {
  return (
    <div className="flex-1 w-full">
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
        <div className="flex items-start gap-4 mb-4">
          <Image
            src={experience.logo}
            alt={`${experience.company} logo`}
            className="w-14 h-14"
          />

          <div className="flex-1 min-w-0">
            <Typography variant="body" className="font-extrabold text-front">
              {experience.position}
            </Typography>
            <Link url={experience.companyURL}>{experience.company}</Link>
          </div>
          <Badge>{experience.type}</Badge>
        </div>

        <div className="flex flex-wrap gap-4 mb-4">
          <Typography variant="caption" className="flex items-center gap-1.5">
            <Icon icon={faCalendar} aria-label="Duration" />
            {formatDate(experience.startDate)} -{" "}
            {experience.endDate ? formatDate(experience.endDate) : "Present"}
            <span className="text-gray-400">
              · {calculateDuration(experience.startDate, experience.endDate)}
            </span>
          </Typography>
          <Typography variant="caption" className="flex items-center gap-1.5">
            <Icon icon={faLocationDot} aria-label="Location" />
            {experience.location}
          </Typography>
        </div>

        {experience.role && experience.role.length > 0 && (
          <ul className="space-y-2">
            {experience.role.map((item, idx) => (
              <li key={idx} className="flex gap-2">
                <Typography variant="caption" className="text-front">
                  •
                </Typography>
                <Typography variant="caption">{item}</Typography>
              </li>
            ))}
          </ul>
        )}
      </div>
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
    <div className="flex flex-col gap-0">
      {sortedExperiences.map((exp, idx) => (
        <div key={idx} className="flex flex-col gap-0 items-center">
          <WorkExpCard experience={exp} />
          {idx !== experiences.length - 1 && (
            <span className="bg-muted w-1 h-4" />
          )}
        </div>
      ))}
    </div>
  );
}
