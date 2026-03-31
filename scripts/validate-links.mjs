import path from 'node:path';
import { getSlugs } from 'fumadocs-core/source';
import { printErrors, readFiles, scanURLs, validateFiles } from 'next-validate-link';

function stripFrontmatter(content) {
  if (!content.startsWith('---\n')) return content;
  const end = content.indexOf('\n---\n', 4);
  return end === -1 ? content : content.slice(end + 5);
}

function stripHtml(value) {
  return value.replace(/<[^>]+>/g, ' ');
}

function normalizeHeadingText(value) {
  return stripHtml(
    value
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/[*_`~]/g, '')
      .replace(/\\([\\`*_{}[\]()#+\-.!])/g, '$1'),
  )
    .replace(/&(#x[0-9a-fA-F]+|#\d+|[a-zA-Z]+);/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function slugifyHeading(value) {
  return normalizeHeadingText(value)
    .replace(/^[^A-Za-z0-9]+/u, '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function extractHeadingHashes(content) {
  const body = stripFrontmatter(content).replace(/```[\s\S]*?```/g, '');
  const seen = new Map();
  const hashes = [];

  for (const line of body.split('\n')) {
    const match = line.match(/^#{1,6}\s+(.+)$/);
    if (!match) continue;

    const base = slugifyHeading(match[1]);
    if (!base) continue;

    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    hashes.push(count === 0 ? base : `${base}-${count}`);
  }

  return hashes;
}

async function checkLinks() {
  const docsFiles = await readFiles('content/docs/**/*.{md,mdx}');

  const scanned = await scanURLs({
    populate: {
      'docs/[[...slug]]': docsFiles.map((file) => ({
        value: getSlugs(path.relative('content/docs', file.path)),
        hashes: extractHeadingHashes(file.content),
      })),
    },
  });

  printErrors(await validateFiles(docsFiles, { scanned }), true);
}

void checkLinks();
