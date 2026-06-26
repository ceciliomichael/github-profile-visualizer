"use client";

import React, { useState } from "react";
import { Search, Sparkles } from "lucide-react";

interface SearchInputProps {
  onSearch: (username: string) => void;
  isLoading: boolean;
  defaultValue?: string;
}

const PRESET_USERS = ["gaearon", "yyx990803", "torvalds", "tj"];

export default function SearchInput({ onSearch, isLoading, defaultValue = "" }: SearchInputProps) {
  const [query, setQuery] = useState(defaultValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-10">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-neutral-400 group-focus-within:text-violet-600 transition-colors">
              <Search className="w-5 h-5" />
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter GitHub username (e.g., torvalds)..."
              className="w-full h-14 pl-12 pr-4 bg-white text-neutral-900 border border-neutral-200 focus:border-violet-600 focus:ring-1 focus:ring-violet-600 outline-none rounded-xl font-mono text-sm transition-all placeholder:text-neutral-400"
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="h-14 px-8 bg-neutral-950 hover:bg-violet-600 text-white rounded-xl font-medium text-sm transition-all duration-150 flex items-center justify-center gap-2 disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed group-hover:scale-[1.01]"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-neutral-400 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Analyze</span>
                <Sparkles className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Preset shortcut chips */}
      <div className="mt-4 flex flex-wrap items-center gap-2 justify-center sm:justify-start">
        <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mr-1">
          Suggestions:
        </span>
        {PRESET_USERS.map((user) => (
          <button
            key={user}
            type="button"
            onClick={() => {
              setQuery(user);
              onSearch(user);
            }}
            disabled={isLoading}
            className="px-3 py-1 bg-white hover:bg-neutral-950 hover:text-white border border-neutral-200 text-neutral-600 font-mono text-[12px] rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {user}
          </button>
        ))}
      </div>
    </div>
  );
}
