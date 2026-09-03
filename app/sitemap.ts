import { source, changelogSource } from '@/lib/source';
import { siteConfig } from '@/lib/config';
import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const BASE_URL = siteConfig.url;

// Docs pages carry no date in frontmatter, so they report build time.
// Changelog entries have a required publishedAt (YYYY-MM-DD) and report that.
export default function sitemap(): MetadataRoute.Sitemap {
  const buildTime = new Date();
  return [
    { url: BASE_URL, lastModified: buildTime, priority: 1.0 },
    ...source.getPages().map((page) => ({
      url: `${BASE_URL}${page.url}`,
      lastModified: buildTime,
      priority: 0.7,
    })),
    ...changelogSource.getPages().map((page) => ({
      url: `${BASE_URL}${page.url}`,
      lastModified: new Date(page.data.publishedAt),
      priority: 0.5,
    })),
  ];
}
