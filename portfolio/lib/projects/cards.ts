import type { ComponentType } from "react";
import { ProjectId } from "@/lib/projects/metadata";

export async function getProjectCardNode(
  id: ProjectId,
): Promise<ComponentType> {
  switch (id) {
    case "portfolio": {
      const mod = await import("@/lib/projects/cards/portfolio");
      return mod.default;
    }
    case "muviz": {
      const mod = await import("@/lib/projects/cards/muviz");
      return mod.default;
    }
    case "honeycomb": {
      const mod = await import("@/lib/projects/cards/honeycomb");
      return mod.default;
    }
    case "blackhole": {
      const mod = await import("@/lib/projects/cards/blackhole");
      return mod.default;
    }
    default: {
      throw new Error(`Unknown project id: ${String(id)}`);
    }
  }
}

export async function getProjectCardNodes(
  ids: ProjectId[],
): Promise<ComponentType[]> {
  return await Promise.all(ids.map((id) => getProjectCardNode(id)));
}
