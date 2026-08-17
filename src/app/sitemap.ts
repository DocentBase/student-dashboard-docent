import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://docent-base-students.conversora-tech.workers.dev';
  const currentDate = new Date();

  const routes = [
    { path: '', changeFreq: 'daily' as const, priority: 1.0 },
    { path: '/sign-in', changeFreq: 'monthly' as const, priority: 0.8 },
    { path: '/sign-up', changeFreq: 'monthly' as const, priority: 0.8 },
    { path: '/dashboard', changeFreq: 'hourly' as const, priority: 0.9 },
    { path: '/dashboard/coaching', changeFreq: 'daily' as const, priority: 0.85 },
    { path: '/dashboard/routine', changeFreq: 'daily' as const, priority: 0.85 },
    { path: '/dashboard/notes', changeFreq: 'daily' as const, priority: 0.85 },
    { path: '/dashboard/exams', changeFreq: 'daily' as const, priority: 0.85 },
    { path: '/dashboard/results', changeFreq: 'daily' as const, priority: 0.85 },
    { path: '/dashboard/attendance', changeFreq: 'daily' as const, priority: 0.8 },
    { path: '/dashboard/fees', changeFreq: 'weekly' as const, priority: 0.8 },
    { path: '/dashboard/notices', changeFreq: 'daily' as const, priority: 0.8 },
    { path: '/dashboard/profile', changeFreq: 'monthly' as const, priority: 0.5 },
    { path: '/dashboard/settings', changeFreq: 'monthly' as const, priority: 0.5 },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: currentDate,
    changeFrequency: route.changeFreq,
    priority: route.priority,
  }));
}
