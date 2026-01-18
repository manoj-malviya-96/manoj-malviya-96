import { NextResponse } from "next/server";

const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USER!;
const GITHUB_CONTRIBUTIONS_API = process.env.NEXT_PUBLIC_GITHUB_API!;

if (!GITHUB_USERNAME || !GITHUB_CONTRIBUTIONS_API) {
  throw new Error(
    "Missing environment variables: ensure NEXT_PUBLIC_GITHUB_USER and NEXT_PUBLIC_GITHUB_API are set",
  );
}

export async function GET() {
  try {
    const response = await fetch(
      `${GITHUB_CONTRIBUTIONS_API}/${GITHUB_USERNAME}`,
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
