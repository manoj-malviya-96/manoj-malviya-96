"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { ExternalURL } from "@/core/types";

const ROUTE_MAP = {
  home: "/",
  about: "/about",
  projects: "/projects",
  /*  "projects.rendering": "/projects/rendering",
  "projects.muviz": "/projects/muviz",
  "projects.blackhole": "/projects/blackhole",
  "projects.honeycomb": "/projects/honeycomb",
  "projects.portfolio": "/projects/portfolio",*/
  blogs: "/blogs",
} as const;

export const AllRoutes = Object.keys(ROUTE_MAP) as Array<
  keyof typeof ROUTE_MAP
>;

export type Route = keyof typeof ROUTE_MAP;

export function useNavigator() {
  const router = useRouter();

  const localNav = useCallback(
    (target: Route) => {
      router.push(ROUTE_MAP[target]);
    },
    [router],
  );

  const externalNav = useCallback((url: ExternalURL) => {
    window.open(url, "_blank", "noopener,noreferrer");
    return;
  }, []);

  return useCallback(
    (target: Route | ExternalURL) => {
      if (typeof target === "string" && target.startsWith("http")) {
        externalNav(target as ExternalURL);
      } else {
        localNav(target as Route);
      }
    },
    [externalNav, localNav],
  );
}

// Todo: Implement nested route mapping if needed in the future
// interface NestedRouteMap {
//   [key: string]: string | NestedRouteMap;
// }
//
// export function nestFlatKeys(
//   flatKeys: Route[],
//   mainKey = "default",
// ): NestedRouteMap {
//   return flatKeys.reduce<NestedRouteMap>((acc, flatKey) => {
//     const parts = flatKey.split(".");
//     let current = acc;
//
//     parts.forEach((part, index) => {
//       const isLast = index === parts.length - 1;
//
//       if (isLast) {
//         const valueToStore = flatKey;
//         if (typeof current[part] === "object" && current[part] !== null) {
//           (current[part] as NestedRouteMap)[mainKey] = valueToStore;
//         } else {
//           current[part] = valueToStore;
//         }
//       } else {
//         if (typeof current[part] === "string") {
//           current[part] = { [mainKey]: current[part] };
//         }
//         current[part] = current[part] || {};
//         current = current[part] as NestedRouteMap;
//       }
//     });
//
//     return acc;
//   }, {});
// }
// const NestedLabelToRouteMap = nestFlatKeys(AllRoutes);
