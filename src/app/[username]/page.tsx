import React from "react";
import DashboardShell from "@/components/DashboardShell";

interface PageProps {
  params: Promise<{ username: string }>;
}

export default async function Page({ params }: PageProps) {
  const { username } = await params;
  const decodedUsername = decodeURIComponent(username);

  return <DashboardShell initialUsername={decodedUsername} />;
}
