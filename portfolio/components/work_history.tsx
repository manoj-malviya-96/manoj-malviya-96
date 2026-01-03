import React, { ReactNode, useMemo } from "react";
import Image from "next/image";
import { MonthAndYear } from "@/lib/types";
import { WORK_EXPERIENCE } from "@/lib/profile";

export interface TimelineItem {
  startDate: MonthAndYear;
  title: string;
  description?: ReactNode;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

function Timeline({ items, className }: TimelineProps) {
  const sortedItems = useMemo(
    () => [...items].sort((a, b) => (a.startDate < b.startDate ? 1 : -1)),
    [items],
  );

  return (
    <ul className={`timeline ${className ?? ""}`}>
      {sortedItems.map((item, index) => (
        <li
          key={`${item.startDate}-${item.title}-${index}`}
          className="cursor-pointer"
        >
          {index > 0 && <hr />}
          <div className="timeline-start text-sm opacity-70">
            {item.startDate}
          </div>
          <Image
            src="https://cdn.brandfetch.io/idvuv9RVT0/w/400/h/400/theme/dark/icon.png?c=1bxid64Mup7aczewSAYMX&t=1668795429164"
            alt="Timeline Point"
            width={32}
            height={32}
            className="timeline-middle rounded-full overflow-clip z-1"
          />
          <div className="timeline-end">
            <h2 className="font-semibold">{item.title}</h2>
            {item.description}
          </div>
          {index < sortedItems.length - 1 && <hr />}
        </li>
      ))}
    </ul>
  );
}

export default function WorkHistory() {
  const workHistoryItems: TimelineItem[] = WORK_EXPERIENCE.map((exp) => ({
    startDate: exp.startDate,
    title: `${exp.position} @ ${exp.company}`,
    description: exp.role ? (
      <ul className="list-disc list-inside text-sm opacity-80 mt-2">
        {exp.role.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    ) : undefined,
  }));

  return <Timeline items={workHistoryItems} />;
}
