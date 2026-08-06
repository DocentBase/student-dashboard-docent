import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/coaching", destination: "/dashboard/coaching", permanent: true },
      { source: "/attendance", destination: "/dashboard/attendance", permanent: true },
      { source: "/fees", destination: "/dashboard/fees", permanent: true },
      { source: "/notes", destination: "/dashboard/notes", permanent: true },
      { source: "/exams", destination: "/dashboard/exams", permanent: true },
      { source: "/results", destination: "/dashboard/results", permanent: true },
      { source: "/routine", destination: "/dashboard/routine", permanent: true },
      { source: "/notices", destination: "/dashboard/notices", permanent: true },
      { source: "/profile", destination: "/dashboard/profile", permanent: true },
      { source: "/settings", destination: "/dashboard/settings", permanent: true },
    ];
  },
};

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
