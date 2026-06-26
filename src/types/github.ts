export interface GitHubProfile {
  username: string;
  name: string | null;
  avatarUrl: string;
  bio: string | null;
  location: string | null;
  blog: string | null;
  company: string | null;
  followers: number;
  following: number;
  publicRepos: number;
  htmlUrl: string;
  createdAt: string;
}

export interface LanguageMetric {
  name: string;
  value: number; // bytes of code
  percentage: number;
  color: string;
}

export interface RecentActivity {
  id: string;
  type: string;
  repoName: string;
  repoUrl: string;
  createdAt: string;
  commits: Array<{
    sha: string;
    message: string;
    url: string;
  }>;
}

export interface DashboardStats {
  profile: GitHubProfile;
  languages: LanguageMetric[];
  activities: RecentActivity[];
}

export interface DashboardError {
  message: string;
  status?: number;
}
