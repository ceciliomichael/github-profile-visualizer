import React from "react";
import type { RecentActivity } from "@/types/github";
import { GitCommit, GitPullRequest, PlusCircle, ExternalLink, Activity } from "lucide-react";

interface ActivityTimelineProps {
  activities: RecentActivity[];
}

export default function ActivityTimeline({ activities }: ActivityTimelineProps) {
  if (activities.length === 0) {
    return (
      <div className="bg-white border border-neutral-100 rounded-2xl p-6 h-full flex flex-col items-center justify-center text-center">
        <Activity className="w-10 h-10 text-neutral-300 mb-3" />
        <h3 className="text-neutral-900 font-bold mb-1">No recent activity</h3>
        <p className="text-neutral-400 text-xs font-mono">This user hasn't performed public actions recently.</p>
      </div>
    );
  }

  const getEventMeta = (type: string) => {
    switch (true) {
      case type === "Push":
        return {
          icon: GitCommit,
          color: "text-emerald-600",
          bg: "bg-emerald-50/50",
          label: "Pushed Commits",
        };
      case type.startsWith("PR_"):
        return {
          icon: GitPullRequest,
          color: "text-blue-600",
          bg: "bg-blue-50/50",
          label: `Pull Request (${type.replace("PR_", "")})`,
        };
      case type.startsWith("CREATE_"):
        return {
          icon: PlusCircle,
          color: "text-violet-600",
          bg: "bg-violet-50/50",
          label: `Created ${type.replace("CREATE_", "")}`,
        };
      default:
        return {
          icon: Activity,
          color: "text-neutral-600",
          bg: "bg-neutral-50/50",
          label: "Repository Event",
        };
    }
  };

  return (
    <div className="bg-white border border-neutral-100 rounded-2xl p-6 h-full hover:translate-y-[-2px] hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base font-extrabold text-neutral-900 tracking-tight">
          Recent Public Activity
        </h3>
        <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
          Live stream
        </span>
      </div>

      <div className="space-y-6 max-h-[460px] overflow-y-auto pr-1">
        {activities.map((activity) => {
          const meta = getEventMeta(activity.type);
          const dateLabel = new Date(activity.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <div key={activity.id} className="flex gap-4 items-start relative group/item">
              {/* Vertical line indicator between elements */}
              <div className="absolute left-4 top-8 bottom-[-24px] w-[1px] bg-neutral-100 group-last/item:hidden" />

              {/* Icon Bubble */}
              <div className={`p-2 rounded-lg shrink-0 ${meta.bg} border border-neutral-100`}>
                <meta.icon className={`w-4 h-4 ${meta.color}`} />
              </div>

              {/* Detail Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1.5">
                  <span className="text-xs font-bold text-neutral-800">{meta.label}</span>
                  <span className="font-mono text-[10px] text-neutral-400">{dateLabel}</span>
                </div>

                <div className="mb-2">
                  <a
                    href={activity.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-xs text-neutral-500 hover:text-violet-600 hover:underline break-all"
                  >
                    <span>{activity.repoName}</span>
                    <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                  </a>
                </div>

                {/* Sub-commits list */}
                {activity.commits && activity.commits.length > 0 && (
                  <ul className="space-y-1.5 bg-neutral-50 p-3 rounded-lg border border-neutral-100/60 font-mono text-[11px] text-neutral-600">
                    {activity.commits.slice(0, 3).map((commit) => (
                      <li key={commit.sha} className="flex items-start gap-2">
                        <a
                          href={commit.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-violet-600 hover:underline shrink-0 font-bold"
                        >
                          {commit.sha}
                        </a>
                        <span className="line-clamp-2 leading-relaxed" title={commit.message}>
                          {commit.message}
                        </span>
                      </li>
                    ))}
                    {activity.commits.length > 3 && (
                      <li className="text-[10px] text-neutral-400 italic">
                        + {activity.commits.length - 3} more commits
                      </li>
                    )}
                  </ul>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
