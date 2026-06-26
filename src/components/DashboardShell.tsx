"use client";

import React from "react";
import { useDashboard } from "@/hooks/useDashboard";
import SearchInput from "./SearchInput";
import ProfileCard from "./ProfileCard";
import StatsCard from "./StatsCard";
import LanguageBreakdown from "./LanguageBreakdown";
import ActivityTimeline from "./ActivityTimeline";
import { Terminal, AlertCircle, Code2, Globe } from "lucide-react";

interface DashboardShellProps {
  initialUsername?: string;
}

export default function DashboardShell({ initialUsername = "" }: DashboardShellProps) {
  const { data, loading, error, fetchStats } = useDashboard(initialUsername);

  return (
    <div className="min-h-screen bg-[#faf9f7] text-neutral-900 flex flex-col selection:bg-violet-200">
      {/* Editorial Navigation Banner */}
      <header className="sticky top-0 z-30 bg-[#faf9f7]/95 backdrop-blur-sm border-b border-neutral-200/50 py-4 px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-violet-600" />
          <span className="font-mono font-bold tracking-tight text-sm">DEV_STATS.IO</span>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono text-neutral-500">
          <Globe className="w-3.5 h-3.5" />
          <span>GitHub Public API Feed</span>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 md:px-8 py-10 md:py-16">
        {/* Title Block */}
        <div className="text-center md:text-left mb-12">
          <span className="text-[11px] font-mono uppercase tracking-wider text-violet-600 font-bold bg-violet-50 px-3 py-1 rounded-full border border-violet-100/50 inline-block mb-3">
            Realtime Analytics
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-neutral-900 leading-none">
            Developer Footprint
          </h1>
          <p className="mt-4 text-neutral-500 text-sm md:text-base max-w-xl font-mono">
            Analyze repositories, public events, commit streams, and programming language distributions instantly.
          </p>
        </div>

        {/* Dynamic Search Controller */}
        <SearchInput onSearch={fetchStats} isLoading={loading} defaultValue={initialUsername} />

        {/* State Machine UI */}
        {loading && <LoadingSkeleton />}

        {!loading && error && (
          <div className="mt-8 bg-red-50 border border-red-200 rounded-2xl p-6 text-center max-w-xl mx-auto hover:shadow-sm transition-all duration-200">
            <div className="p-3 bg-red-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 border border-red-200">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-red-900 font-bold text-base mb-2">Retrieval Failed</h3>
            <p className="text-red-700 text-sm font-mono leading-relaxed mb-4">
              {error.message}
            </p>
            <div className="text-xs text-neutral-400 font-mono">
              Status Code: {error.status || "Unknown"} | Make sure the spelling is correct.
            </div>
          </div>
        )}

        {!loading && !error && !data && (
          <div className="mt-8 bg-white border border-neutral-100 rounded-2xl p-8 text-center max-w-xl mx-auto hover:translate-y-[-2px] hover:shadow-md transition-all duration-200">
            <div className="p-3 bg-violet-50 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 border border-violet-100/50">
              <Terminal className="w-6 h-6 text-violet-600" />
            </div>
            <h3 className="text-neutral-900 font-bold text-base mb-2">Ready to Analyze</h3>
            <p className="text-neutral-500 text-sm font-mono leading-relaxed mb-4">
              Enter any public GitHub username above, or click one of the suggestions to generate the real-time activity and language dashboard.
            </p>
          </div>
        )}

        {!loading && !error && data && (
          <div className="space-y-6 reveal">
            {/* Row 1: Profile Profile Header */}
            <ProfileCard profile={data.profile} />

            {/* Row 2: Aggregated Key Stats */}
            <StatsCard profile={data.profile} />

            {/* Row 3: Grid split language & events */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-5">
                <LanguageBreakdown languages={data.languages} />
              </div>
              <div className="md:col-span-7">
                <ActivityTimeline activities={data.activities} />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Editorial Footer */}
      <footer className="mt-auto border-t border-neutral-200/50 py-8 px-6 md:px-12 bg-white text-center sm:flex sm:justify-between sm:items-center font-mono text-xs text-neutral-400">
        <div>
          © {new Date().getFullYear()} DEV_STATS.IO.
        </div>
        <div className="mt-2 sm:mt-0 flex justify-center gap-4">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-violet-600 underline">
            GitHub API
          </a>
          <span>•</span>
          <span className="text-neutral-300">Technical Precision Register</span>
        </div>
      </footer>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Profile Header Skeleton */}
      <div className="bg-white border border-neutral-100 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start">
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl bg-neutral-200 shrink-0" />
        <div className="flex-1 w-full space-y-4">
          <div className="h-8 bg-neutral-200 rounded-md w-1/3" />
          <div className="h-4 bg-neutral-200 rounded-md w-1/4" />
          <div className="space-y-2 pt-2">
            <div className="h-4 bg-neutral-200 rounded-md w-full" />
            <div className="h-4 bg-neutral-200 rounded-md w-5/6" />
          </div>
        </div>
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white border border-neutral-100 rounded-2xl p-5 md:p-6 space-y-4">
            <div className="flex justify-between items-center">
              <div className="h-3 bg-neutral-200 rounded w-1/2" />
              <div className="w-8 h-8 bg-neutral-100 rounded" />
            </div>
            <div className="h-8 bg-neutral-200 rounded w-2/3" />
          </div>
        ))}
      </div>

      {/* Language / Activity Split Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-5 bg-white border border-neutral-100 rounded-2xl p-6 space-y-6">
          <div className="h-5 bg-neutral-200 rounded w-1/2" />
          <div className="h-4 bg-neutral-200 rounded-full w-full" />
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex justify-between">
                <div className="h-4 bg-neutral-200 rounded w-1/3" />
                <div className="h-4 bg-neutral-200 rounded w-1/6" />
              </div>
            ))}
          </div>
        </div>
        <div className="md:col-span-7 bg-white border border-neutral-100 rounded-2xl p-6 space-y-6">
          <div className="h-5 bg-neutral-200 rounded w-1/3" />
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-8 h-8 bg-neutral-200 rounded shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-neutral-200 rounded w-1/4" />
                  <div className="h-4 bg-neutral-200 rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
