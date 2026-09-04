import { defineDocs, defineConfig, frontmatterSchema } from 'fumadocs-mdx/config';
import { z } from 'zod';

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: frontmatterSchema.extend({
      title: z.string().optional().default(''),
      description: z.string().optional(),
      // Optional agent-retrieval metadata. Capability relationships are derived
      // from lib/capabilities.snapshot.json instead of duplicated in frontmatter.
      audience: z.array(z.enum(['merchant', 'developer'])).optional(),
      status: z.enum(['available', 'beta', 'deprecated']).optional(),
      last_verified: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'last_verified must be YYYY-MM-DD')
        .refine((v) => !Number.isNaN(Date.parse(v)) && new Date(v).toISOString().startsWith(v), {
          message: 'last_verified must be a real calendar date',
        })
        .optional(),
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
