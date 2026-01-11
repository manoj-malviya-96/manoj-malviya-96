import type { ReactNode } from "react";
import { ProjectId } from "@/lib/projects/metadata";

export async function getProjectCardNode(id: ProjectId): Promise<ReactNode> {
  switch (id) {
    case "portfolio": {
      const mod = await import("@/components/projects/cards/portfolio");
      return mod.default();
    }
    case "muviz": {
      const mod = await import("@/components/projects/cards/muviz");
      return mod.default();
    }
    case "honeycomb": {
      const mod = await import("@/components/projects/cards/honeycomb");
      return mod.default();
    }
    case "blackhole": {
      const mod = await import("@/components/projects/cards/blackhole");
      return mod.default();
    }
    default: {
      throw new Error(`Unknown project id: ${String(id)}`);
    }
  }
}

export async function getProjectCardNodes(
  ids: ProjectId[],
): Promise<ReactNode[]> {
  return await Promise.all(ids.map((id) => getProjectCardNode(id)));
}
