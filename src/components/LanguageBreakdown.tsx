import React from "react";
import type { LanguageMetric } from "@/types/github";
import { Code } from "lucide-react";

interface LanguageBreakdownProps {
  languages: LanguageMetric[];
}

export default function LanguageBreakdown({ languages }: LanguageBreakdownProps) {
  if (languages.length === 0) {
    return (
      <div className="bg-white border border-neutral-100 rounded-2xl p-6 h-full flex flex-col items-center justify-center text-center">
        <Code className="w-10 h-10 text-neutral-300 mb-3" />
        <h3 className="text-neutral-900 font-bold mb-1">No languages detected</h3>
        <p className="text-neutral-400 text-xs font-mono">This user has no public, language-attributed repos.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-neutral-100 rounded-2xl p-6 h-full flex flex-col justify-between hover:translate-y-[-2px] hover:shadow-md transition-all duration-200">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base font-extrabold text-neutral-900 tracking-tight">
            Top Programming Languages
          </h3>
          <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
            Primary usage
          </span>
        </div>

        {/* Combined Progress Bar */}
        <div className="w-full h-4 bg-neutral-100 rounded-full overflow-hidden flex mb-8">
          {languages.map((lang) => (
            <div
              key={lang.name}
              style={{
                width: `${lang.percentage}%`,
                backgroundColor: lang.color,
              }}
              className="h-full first:rounded-l-full last:rounded-r-full transition-all duration-300"
              title={`${lang.name}: ${lang.percentage}%`}
            />
          ))}
        </div>

        {/* Language Details List */}
        <div className="space-y-4">
          {languages.map((lang) => (
            <div key={lang.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span
                  style={{ backgroundColor: lang.color }}
                  className="w-3 h-3 rounded-full shrink-0 border border-neutral-200/55"
                />
                <span className="text-sm font-semibold text-neutral-800">{lang.name}</span>
              </div>
              <div className="flex items-center gap-3 font-mono text-xs text-neutral-500">
                <span className="bg-neutral-50 px-2 py-0.5 rounded border border-neutral-100">
                  {lang.value} {lang.value === 1 ? "repo" : "repos"}
                </span>
                <span className="font-bold text-neutral-800 w-12 text-right">
                  {lang.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-neutral-100 text-[10px] font-mono text-neutral-400">
        Aggregated from the developer's 100 most recently updated repositories.
      </div>
    </div>
  );
}
