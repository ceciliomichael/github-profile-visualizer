import { useState, useCallback, useEffect } from "react";
import type { DashboardStats, DashboardError } from "@/types/github";

export function useDashboard(initialUsername?: string) {
  const [data, setData] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<DashboardError | null>(null);
  const [currentUsername, setCurrentUsername] = useState(initialUsername || "");

  const fetchStats = useCallback(async (username: string) => {
    const trimmed = username.trim();
    if (!trimmed) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch(`/api/github?username=${encodeURIComponent(trimmed)}`);
      const json = await res.json();
      
      if (!res.ok) {
        throw {
          message: json.message || "Failed to fetch profile stats from backend.",
          status: res.status,
        };
      }
      
      setData(json);
      setCurrentUsername(trimmed);
      if (typeof window !== "undefined") {
        window.history.pushState(null, "", `/${trimmed}`);
      }
    } catch (err: any) {
      setError({
        message: err.message || "An unexpected error occurred. Please try again later.",
        status: err.status,
      });
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch initial profile if provided
  useEffect(() => {
    if (initialUsername) {
      fetchStats(initialUsername);
    }
  }, [initialUsername, fetchStats]);

  return {
    data,
    loading,
    error,
    currentUsername,
    fetchStats,
  };
}
