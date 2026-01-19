import React, { memo } from "react";
import { Typography } from "@/lib/ui/text";
import { mergeCls } from "@/lib/utils";

type Stat = {
  label: string;
  value?: string | number;
};

export interface CardProps {
  title: string;
  description?: string;
  stats: Stat[];
  className?: string;
}

const StatCard = memo(({ title, description, stats }: CardProps) => {
  return (
    <div className="flex flex-col gap-4 p-6 bg-muted/40 rounded-xl">
      <span>
        <Typography variant="title">{title}</Typography>
        <Typography variant="body">{description}</Typography>
      </span>

      <ul className="grid grid-cols-2 gap-0">
        {stats.slice(0, 4).map((stat, i) => (
          <li
            key={i}
            className={mergeCls("flex flex-col items-center justify-start p-4")}
          >
            <Typography variant="heading" component="span">
              {stat.value ?? "-"}
            </Typography>
            <Typography variant="caption">{stat.label}</Typography>
          </li>
        ))}
      </ul>
    </div>
  );
});

StatCard.displayName = "StatCard";
export default StatCard;
