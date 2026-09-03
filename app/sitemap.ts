import { source, changelogSource } from '@/lib/source';
import { siteConfig } from '@/lib/config';
import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const BASE_URL = siteConfig.url;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE_URL, lastModified: new Date(), priority: 1.0 },
    ...source.getPages().map((page) => ({
      url: `${BASE_URL}${page.url}`,
      lastModified: new Date(),
      priority: 0.7,
    })),
    ...changelogSource.getPages().map((page) => ({
      url: `${BASE_URL}${page.url}`,
      lastModified: new Date(),
      priority: 0.5,
    })),
  ];
}
