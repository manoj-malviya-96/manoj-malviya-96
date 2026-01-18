import { NextResponse } from "next/server";

const USER = process.env.NEXT_PUBLIC_SCHOLAR_USER!;
const TARGET_URL = process.env.NEXT_PUBLIC_SCHOLAR_API!;

if (!USER || !TARGET_URL) {
  throw new Error(
    "Missing environment variables: ensure NEXT_PUBLIC_SCHOLAR_USER and NEXT_PUBLIC_SCHOLAR_API are set",
  );
}

export async function GET() {
  try {
    const targetUrl = new URL(TARGET_URL);
    targetUrl.searchParams.set("user", USER);

    const response = await fetch(targetUrl.toString(), {
      method: "GET",
      headers: {
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0 (compatible; Next.js Portfolio)",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          error: `Failed to fetch Google Scholar data: ${response.status} ${response.statusText}`,
        },
        { status: response.status },
      );
    }

    const isJson = response.headers
      .get("Content-Type")
      ?.includes("application/json");

    if (!isJson) {
      return NextResponse.json(
        { error: "No JSON response from Google Scholar API" },
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
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
        details: "Unable to connect to Google Scholar API",
      },
      { status: 500 },
    );
  }
}
