import { memo } from "react";
import Icon from "@/components/icon";
import { TECH_STACK } from "@/core/techstack";

function TechBadge({ name }: { name: string }) {
  const icon = TECH_STACK[name];
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg glow-subtle card-glow">
      {icon && <Icon icon={icon} className="w-4 h-4 icon-glow" />}
      <span className="text-sm">{name}</span>
    </div>
  );
}

function TechStackList() {
  const names = Object.keys(TECH_STACK);
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

TechStackList.displayName = "TechStackList";
export default memo(TechStackList);
