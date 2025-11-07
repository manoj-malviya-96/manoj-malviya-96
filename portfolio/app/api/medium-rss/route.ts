import { NextResponse } from "next/server";
import Parser from "rss-parser";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const searchQuery = searchParams.get("search")?.toLowerCase() || "";
    const tagFilter = searchParams.get("tag")?.toLowerCase() || "";

    const parser = new Parser();
    const feed = await parser.parseURL(
      "https://medium.com/feed/@manoj-malviya",
    );

    let posts = feed.items.map((item) => {
      const content = item["content:encoded"] || "";

      const subtitleMatch = content.match(/<p>(.*?)<\/p>/i);
      const subtitle = subtitleMatch ? subtitleMatch[1] : undefined;

      // Estimate read time
      const words = content
        .replace(/<[^>]+>/g, "")
        .trim()
        .split(/\s+/).length;
      const readTime = `${Math.ceil(words / 250)} min read`;

      return {
        title: item.title ?? "",
        subtitle,
        category: item.categories ?? [],
        readTime,
        publicationDate: item.pubDate,
        link: item.link,
      };
    });

    // Apply search filter
    if (searchQuery) {
      posts = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery) ||
          post.subtitle?.toLowerCase().includes(searchQuery),
      );
    }

    // Apply tag filter
    if (tagFilter) {
      posts = posts.filter((post) =>
        post.category.some((cat) => cat.toLowerCase().includes(tagFilter)),
      );
    }

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching Medium RSS:", error);
    return NextResponse.json(
      { error: "Failed to fetch Medium RSS feed" },
      { status: 500 },
    );
  }
}
