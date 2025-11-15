import { memo } from "react";
import Card from "@/components/card";
import { METRICS } from "@/core/metrics";

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div key={label}>
      <div className="text-2xl">{value}</div>
      <div className="text-xs ">{label}</div>
    </div>
  );
}

function MetricsSection() {
  return (
    <div className="space-y-4">
      {METRICS.map((m) => (
        <Card key={m.title} icon={m.icon} title={m.title}>
          {m.highlightStat && (
            <div className="flex flex-row items-center gap-4 mb-4">
              <span className="text-6xl font-bold">
                {m.highlightStat.value}
              </span>
              <span className="text-sm ">{m.highlightStat.label}</span>
            </div>
          )}
          <div className="grid grid-cols-3 lg:grid-cols-4 gap-3">
            {m.stats.map((s) => (
              <Stat key={s.label} value={s.value} label={s.label} />
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

MetricsSection.displayName = "MetricsSection";
export default memo(MetricsSection);
