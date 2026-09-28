import { NextResponse } from "next/server";
import { SocialUsersID } from "@/lib/data";

export async function GET() {
	try {
		const targetUrl = `https://github-contributions-api.jogruber.de/v4/${SocialUsersID.Github}?y=last`;

		const response = await fetch(targetUrl, {
			method: "GET",
			headers: {
				Accept: "application/json",
			},
		});

		if (!response.ok) {
			return NextResponse.json(
				{
					error: `Failed to fetch GitHub contributions: ${response.status} ${response.statusText}`,
				},
				{ status: response.status },
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
				details: "Unable to connect to GitHub contributions API",
			},
			{ status: 500 },
		);
	}
}
