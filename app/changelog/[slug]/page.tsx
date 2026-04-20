import Link from 'next/link';
import { notFound } from 'next/navigation';
import { changelogSource } from '@/lib/source';
import { getMDXComponents } from '@/components/mdx';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import type { Metadata } from 'next';

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default async function ChangelogEntry(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const page = changelogSource.getPage([slug]);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12 md:py-16">
      <Link
        href="/changelog"
        className="text-sm text-fd-muted-foreground transition-colors hover:text-fd-foreground"
      >
        ← Back to changelog
      </Link>

      <header className="mt-6 border-b border-fd-border pb-8">
        <div className="flex flex-wrap items-center gap-3 text-xs text-fd-muted-foreground">
          <time dateTime={page.data.publishedAt}>{formatDate(page.data.publishedAt)}</time>
          {page.data.tags.length > 0 && (
            <span className="flex flex-wrap gap-1.5">
              {page.data.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-fd-border bg-fd-secondary px-2 py-0.5 text-[11px] font-medium text-fd-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </span>
          )}
        </div>
        <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">{page.data.title}</h1>
        <p className="mt-3 text-base leading-7 text-fd-muted-foreground">{page.data.summary}</p>
      </header>

      <article className="prose prose-neutral mt-8 max-w-none dark:prose-invert">
        <MDX components={getMDXComponents({ a: createRelativeLink(changelogSource, page) })} />
      </article>
    </main>
  );
}

export async function generateStaticParams() {
  return changelogSource.getPages().map((page) => ({
    slug: page.slugs[0],
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const page = changelogSource.getPage([slug]);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.summary,
  };
}
