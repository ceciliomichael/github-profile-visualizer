import { NextResponse } from "next/server";
import { fetchGitHubStats } from "@/services/githubService";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username || username.trim() === "") {
    return NextResponse.json(
      { message: "Username query parameter is required." },
      { status: 400 }
    );
  }

  try {
    const data = await fetchGitHubStats(username.trim());
    return NextResponse.json(data);
  } catch (err: any) {
    const status = err.status || 500;
    const message = err.message || "An error occurred while fetching developer data.";
    return NextResponse.json({ message }, { status });
  }
}
