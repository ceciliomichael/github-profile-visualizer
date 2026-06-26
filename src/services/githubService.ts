import type { DashboardStats, GitHubProfile, LanguageMetric, RecentActivity } from "@/types/github";

const GITHUB_API_URL = "https://api.github.com";

// High-fidelity language color palette matching GitHub's defaults
const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Python: "#3572A5",
  Go: "#00ADD8",
  Rust: "#dea584",
  Ruby: "#701516",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  PHP: "#4F5D95",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Shell: "#89e051",
  Vue: "#41b883",
  Svelte: "#ff3e00",
};

function getLanguageColor(lang: string): string {
  return LANGUAGE_COLORS[lang] || "#7c3aed"; // Default to violet
}

export async function fetchGitHubStats(username: string): Promise<DashboardStats> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
  }

  // Helper fetcher to parse response & handle error codes
  const githubFetch = async (endpoint: string) => {
    const res = await fetch(`${GITHUB_API_URL}${endpoint}`, {
      headers,
      next: { revalidate: 300 }, // Cache response for 5 minutes
    });

    if (res.status === 404) {
      throw { message: `User "${username}" was not found. Check the username and try again.`, status: 404 };
    }

    if (res.status === 403) {
      const rateLimitReset = res.headers.get("x-ratelimit-reset");
      let resetMsg = "";
      if (rateLimitReset) {
        const resetDate = new Date(parseInt(rateLimitReset) * 1000);
        resetMsg = ` Resets at ${resetDate.toLocaleTimeString()}.`;
      }
      throw {
        message: `GitHub API Rate Limit exceeded. Please try again later.${resetMsg}`,
        status: 403,
      };
    }

    if (!res.ok) {
      throw { message: `Failed to fetch GitHub data. Status code: ${res.status}`, status: res.status };
    }

    return res.json();
  };

  // Fetch all endpoints concurrently
  const [profileData, reposData, eventsData] = await Promise.all([
    githubFetch(`/users/${username}`),
    githubFetch(`/users/${username}/repos?per_page=100&sort=updated`),
    githubFetch(`/users/${username}/events/public?per_page=30`),
  ]);

  // 1. Process Profile
  const profile: GitHubProfile = {
    username: profileData.login,
    name: profileData.name,
    avatarUrl: profileData.avatar_url,
    bio: profileData.bio,
    location: profileData.location,
    blog: profileData.blog,
    company: profileData.company,
    followers: profileData.followers,
    following: profileData.following,
    publicRepos: profileData.public_repos,
    htmlUrl: profileData.html_url,
    createdAt: profileData.created_at,
  };

  // 2. Process Languages (Aggregate primary language from repos)
  const languageCounts: Record<string, number> = {};
  let totalValidRepos = 0;

  for (const repo of reposData) {
    if (repo.language) {
      languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
      totalValidRepos++;
    }
  }

  const languages: LanguageMetric[] = Object.entries(languageCounts)
    .map(([name, count]) => ({
      name,
      value: count,
      percentage: totalValidRepos > 0 ? parseFloat(((count / totalValidRepos) * 100).toFixed(1)) : 0,
      color: getLanguageColor(name),
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5); // Keep top 5 languages

  // 3. Process Activities (Extract push and pull request activities with commits)
  const activities: RecentActivity[] = [];
  const MAX_EVENTS = 6;

  for (const event of eventsData) {
    if (activities.length >= MAX_EVENTS) break;

    // Filter to Pushes and PullRequests
    if (event.type === "PushEvent" && event.payload?.commits) {
      const commits = (event.payload.commits || []).map((c: any) => ({
        sha: c.sha.substring(0, 7),
        message: c.message,
        url: `https://github.com/${event.repo.name}/commit/${c.sha}`,
      }));

      activities.push({
        id: event.id,
        type: "Push",
        repoName: event.repo.name,
        repoUrl: `https://github.com/${event.repo.name}`,
        createdAt: event.created_at,
        commits,
      });
    } else if (event.type === "PullRequestEvent" && event.payload?.action) {
      activities.push({
        id: event.id,
        type: `PR_${event.payload.action.toUpperCase()}`,
        repoName: event.repo.name,
        repoUrl: `https://github.com/${event.repo.name}`,
        createdAt: event.created_at,
        commits: [],
      });
    } else if (event.type === "CreateEvent") {
      activities.push({
        id: event.id,
        type: `CREATE_${event.payload.ref_type?.toUpperCase() || "REPO"}`,
        repoName: event.repo.name,
        repoUrl: `https://github.com/${event.repo.name}`,
        createdAt: event.created_at,
        commits: [],
      });
    }
  }

  return {
    profile,
    languages,
    activities,
  };
}
