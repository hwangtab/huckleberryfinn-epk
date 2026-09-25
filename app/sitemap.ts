import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://huckleberryfinn.vercel.app/', changeFrequency: 'weekly', priority: 1 },
    { url: 'https://huckleberryfinn.vercel.app/teaser/', changeFrequency: 'monthly', priority: 0.6 },
  ];
}
