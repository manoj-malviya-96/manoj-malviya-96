import { WorkExperience } from "@/lib/about_me/profile";
import { calculateDuration, formatDate } from "@/lib/utils";
import Image from "next/image";
import { Typography } from "@/components/ui/text";
import Badge from "@/components/ui/badge";

function WorkExpCard({ experience }: { experience: WorkExperience }) {
  return (
    <div className="flex gap-6 flex-1 w-full">
      {/* Content */}
      <div className="flex-1 pt-1">
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-14 h-14 rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden flex-shrink-0">
              <Image src={experience.logo} alt={`${experience.company} logo`} />
            </div>

            <div className="flex-1 min-w-0">
              <Typography variant="title">{experience.position}</Typography>
              <a
                href={experience.companyURL}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-80 hover:opacity-100 cursor-pointer"
              >
                {experience.company}
              </a>
            </div>
            <Badge>{experience.type}</Badge>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-subtle mb-4">
            <div className="flex items-center gap-1.5">
              <i className="far fa-calendar text-xs"></i>
              <span>
                {formatDate(experience.startDate)} -{" "}
                {experience.endDate
                  ? formatDate(experience.endDate)
                  : "Present"}
                <span className="text-gray-400 ml-1">
                  ·{" "}
                  {calculateDuration(experience.startDate, experience.endDate)}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <i className="fas fa-map-marker-alt text-xs"></i>
              <span>{experience.location}</span>
            </div>
          </div>

          {experience.role && experience.role.length > 0 && (
            <ul className="space-y-2">
              {experience.role.map((item, idx) => (
                <li key={idx} className="text-subtle flex gap-2 text-sm">
                  <span className="text-front">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default function WorkHistory({
  experiences,
}: {
  experiences: WorkExperience[];
}) {
  return (
    <div className="flex flex-col gap-0">
      {experiences.map((exp, idx) => (
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
