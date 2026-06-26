import React from "react";
import type { GitHubProfile } from "@/types/github";
import { MapPin, Building2, Link2, Calendar, ExternalLink } from "lucide-react";

interface ProfileCardProps {
  profile: GitHubProfile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  const joinDate = new Date(profile.createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-white border border-neutral-100 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-start hover:translate-y-[-2px] hover:shadow-md transition-all duration-200">
      {/* Avatar Container */}
      <div className="relative group self-center md:self-start">
        <img
          src={profile.avatarUrl}
          alt={profile.name || profile.username}
          className="w-24 h-24 md:w-32 md:h-32 rounded-xl object-cover border border-neutral-200 transition-transform duration-250 group-hover:scale-[1.02]"
        />
      </div>

      {/* Profile Details */}
      <div className="flex-1 min-w-0 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-900 tracking-tight">
              {profile.name || profile.username}
            </h2>
            <p className="font-mono text-sm text-violet-600 mt-0.5">@{profile.username}</p>
          </div>
          <a
            href={profile.htmlUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 self-start px-4 py-2 bg-neutral-950 text-white font-mono text-xs rounded-lg hover:bg-violet-600 transition-colors"
          >
            <span>GitHub Profile</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {profile.bio ? (
          <p className="text-neutral-600 text-sm md:text-base leading-relaxed mb-6">
            {profile.bio}
          </p>
        ) : (
          <p className="text-neutral-400 text-sm italic mb-6">
            No bio provided. This developer prefers to let their code speak.
          </p>
        )}

        {/* Metadata Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 border-t border-neutral-100 font-mono text-xs text-neutral-500">
          {profile.company && (
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-neutral-400 shrink-0" />
              <span className="truncate" title={profile.company}>
                {profile.company}
              </span>
            </div>
          )}
          {profile.location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-neutral-400 shrink-0" />
              <span className="truncate" title={profile.location}>
                {profile.location}
              </span>
            </div>
          )}
          {profile.blog && (
            <div className="flex items-center gap-2">
              <Link2 className="w-4 h-4 text-neutral-400 shrink-0" />
              <a
                href={profile.blog.startsWith("http") ? profile.blog : `https://${profile.blog}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-violet-600 underline truncate"
                title={profile.blog}
              >
                {profile.blog}
              </a>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-neutral-400 shrink-0" />
            <span>Joined {joinDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
