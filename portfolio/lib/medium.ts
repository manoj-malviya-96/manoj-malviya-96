import { useQuery } from "@tanstack/react-query";
import { ExternalURL } from "@/lib/types";

export type Post = {
  title: string;
  subtitle?: string;
  category?: string[];
  readTime?: string;
  publicationDate?: string;
  link?: ExternalURL;
};

export const useMediumRSS = (search?: string, tag?: string) => {
  return useQuery<Post[]>({
    queryKey: ["mediumRSS", search, tag],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (tag) params.append("tag", tag);

      const url = `/api/medium-rss${params.toString() ? `?${params.toString()}` : ""}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch Medium RSS feed");
      }

      const posts: Post[] = await response.json();
      return posts;
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};
