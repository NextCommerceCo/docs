import { defineDocs, defineConfig, frontmatterSchema } from 'fumadocs-mdx/config';
import { z } from 'zod';

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: frontmatterSchema.extend({
      title: z.string().optional().default(''),
      description: z.string().optional(),
    }),
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
});

export const changelog = defineDocs({
  dir: 'content/changelog',
  docs: {
    schema: frontmatterSchema.extend({
      title: z.string(),
      publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'publishedAt must be YYYY-MM-DD'),
      tags: z.array(z.string()).default([]),
      summary: z.string(),
      authors: z.array(z.string()).optional(),
    }),
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
});

export default defineConfig({
  mdxOptions: {
    providerImportSource: '@/components/mdx',
  },
});
