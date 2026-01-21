import { NextResponse } from "next/server";
import getConfig from "@/lib/core/config";
import { SocialUsersID } from "@/lib/about_me/profile";

export async function GET() {
  const { githubContributionsApi } = getConfig();

  try {
    const response = await fetch(
      `${githubContributionsApi}/${SocialUsersID.Github}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "User-Agent": "Mozilla/5.0 (compatible; Next.js Portfolio)",
        },
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        {
          error: `Failed to fetch GitHub contributions: ${response.status} ${response.statusText}`,
        },
        { status: response.status },
      );
    }

    const isJson = response.headers
      .get("Content-Type")
      ?.includes("application/json");

    if (!isJson) {
      return NextResponse.json(
        { error: "No JSON response from GitHub API" },
        { status: 500 },
      );
    }

    const data = await response.json();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error fetching GitHub contributions:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
        details: "Unable to connect to GitHub API",
      },
      { status: 500 },
    );
  }
}
