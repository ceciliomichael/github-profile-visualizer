import React from "react";
import type { GitHubProfile } from "@/types/github";
import { GitFork, Users, UserCheck, Flame } from "lucide-react";

interface StatsCardProps {
  profile: GitHubProfile;
}

export default function StatsCard({ profile }: StatsCardProps) {
  // Custom developer impact metric
  const impactScore = Math.round(profile.followers * 3 + profile.publicRepos * 1.5 + profile.following * 0.5);

  const stats = [
    {
      label: "Public Repositories",
      value: profile.publicRepos,
      icon: GitFork,
      color: "text-blue-600",
      bg: "bg-blue-50/50",
    },
    {
      label: "Followers",
      value: profile.followers,
      icon: Users,
      color: "text-emerald-600",
      bg: "bg-emerald-50/50",
    },
    {
      label: "Following",
      value: profile.following,
      icon: UserCheck,
      color: "text-amber-600",
      bg: "bg-amber-50/50",
    },
    {
      label: "Developer Impact",
      value: impactScore,
      icon: Flame,
      color: "text-violet-600",
      bg: "bg-violet-50/50",
      description: "Based on followers & repos",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white border border-neutral-100 rounded-2xl p-5 md:p-6 flex flex-col justify-between hover:translate-y-[-2px] hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
              {stat.label}
            </span>
            <div className={`p-2 rounded-lg ${stat.bg}`}>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-extrabold text-neutral-900 tracking-tight font-mono">
              {stat.value.toLocaleString()}
            </div>
            {stat.description && (
              <span className="text-[10px] font-mono text-neutral-400 mt-1 block">
                {stat.description}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
