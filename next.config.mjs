import { createMDX } from 'fumadocs-mdx/next';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  outputFileTracingRoot: repoRoot,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

const withMDX = createMDX();

export default withMDX(config);
