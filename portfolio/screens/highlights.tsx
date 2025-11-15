import Image from "next/image";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import Icon from "@/components/icon";
import Timeline from "@/components/timeline";
import MetricsSection from "@/components/metrics_section";
import TechStackList from "@/components/techstack_list";
import WorkExperienceCard from "@/components/work_experience_card";
import { WORK_EXPERIENCES } from "@/core/work";

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

export default function Highlights() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <h3 className="text-2xl py-4">
        <Icon icon={faBriefcase} />
        Work History
      </h3>
      <Timeline
        items={WORK_EXPERIENCES}
        isToday={(exp) => exp.isCurrent}
        renderLogo={(exp) => (
          <CompanyLogo src={exp.logo} alt={exp.company} size={56} />
        )}
        className="lg:col-span-3"
        renderCard={(exp) => <WorkExperienceCard experience={exp} />}
      />
      <MetricsSection />
      <TechStackList />
    </div>
  );
}
