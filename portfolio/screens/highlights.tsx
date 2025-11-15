import React, { useCallback, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faCalendar,
  faLocation,
} from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import Badge from "@/components/badge";
import Card from "@/components/card";
import Timeline from "@/components/timeline";
import {
  METRICS,
  TECH_STACK,
  WORK_EXPERIENCES,
  type WorkExperience,
} from "@/core/data";
import Image from "next/image";

// Metric Grid Component

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div key={label}>
      <div className="text-2xl">{value}</div>
      <div className="text-xs ">{label}</div>
    </div>
  );
}

// Metrics Section Component
function MetricsSection() {
  return (
    <div className="space-y-4">
      {METRICS.map((m) => (
        <Card key={m.title} icon={m.icon} title={m.title}>
          {m.highlightStat && (
            <div className="flex flex-row items-center gap-4 mb-4 border-b border-muted pb-4">
              <span className="text-6xl font-bold">
                {m.highlightStat.value}
              </span>
              <span className="text-sm ">{m.highlightStat.label}</span>
            </div>
          )}
          <div className="grid grid-cols-4 gap-3">
            {m.stats.map((s) => (
              <Stat key={s.label} value={s.value} label={s.label} />
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

// TechBadge component
function TechBadge({ name }: { name: string }) {
  const icon = TECH_STACK[name] as IconDefinition | undefined;
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg glow-subtle card-glow">
      {icon && <FontAwesomeIcon icon={icon} className="w-4 h-4 icon-glow" />}
      <span className="text-sm">{name}</span>
    </div>
  );
}

// Tech Stack Component
function TechStackList() {
  const names = useMemo(() => Object.keys(TECH_STACK), []);
  return (
    <div className="mt-8">
      <h3 className="text-2xl mb-4">Tech Stack</h3>
      <div className="flex flex-wrap gap-3">
        {names.map((name) => (
          <TechBadge key={name} name={name} />
        ))}
      </div>
    </div>
  );
}

const CompanyLogo = ({
  src,
  alt,
  size,
}: {
  src: string;
  alt: string;
  size: number;
}) => {
  return (
    <Image
      src={src}
      alt={alt}
      className="object-cover rounded-full overflow-hidden"
      width={size}
      height={size}
    />
  );
};

const WorkExperienceCard = ({ experience }: { experience: WorkExperience }) => {
  const {
    title,
    company,
    location,
    period,
    current,
    description,
    technologies,
  } = experience;

  const renderTitleAndBadge = useCallback(() => {
    return (
      <span className="flex items-center gap-2">
        <h3 className="text-xl font-bold ">{title}</h3>
        {current && <Badge className="bg-success">Current</Badge>}
      </span>
    );
  }, [title, current]);

  const renderTechnologies = useCallback(() => {
    return (
      <div className="flex flex-wrap gap-2 ">
        {technologies.map((tech, i) => (
          <Badge key={i}>
            {tech in TECH_STACK ? (
              <FontAwesomeIcon icon={TECH_STACK[tech]} />
            ) : (
              tech
            )}
          </Badge>
        ))}
      </div>
    );
  }, [technologies]);

  return (
    <div className="p-6 flex flex-col cursor-pointer gap-4 bg-light rounded-3xl">
      <div className="flex flex-row justify-between items-center">
        {renderTitleAndBadge()}
        <span className="col-span-1 align-right text-sm opacity-70 text-ellipsis">
          <FontAwesomeIcon icon={faCalendar} />
          {period}
        </span>
      </div>
      <div className="text-sm opacity-70 flex flex-row gap-4 text-ellipsis">
        <span>
          <FontAwesomeIcon icon={faBriefcase} /> {company}
        </span>
        <span>
          <FontAwesomeIcon icon={faLocation} /> {location}
        </span>
      </div>
      <span className="flex flex-col gap-2 ">
        <p className="text-sm leading-relaxed text-ellipsis">{description}</p>
        {renderTechnologies()}
      </span>
    </div>
  );
};

// Entry Component
export default function Highlights() {
  // const router = useRouter();
  return (
    <>
      <h3 className="text-2xl py-4">Work History</h3>

      <div className="grid lg:grid-cols-3 gap-8">
        <Timeline
          items={WORK_EXPERIENCES}
          isToday={(exp) => exp.isCurrent}
          renderLogo={(exp) => (
            <CompanyLogo src={exp.logo} alt={exp.company} size={56} />
          )}
          className="col-span-3"
          renderCard={(exp) => <WorkExperienceCard experience={exp} />}
        />
        <MetricsSection />
        <TechStackList />
      </div>
    </>
  );
}
