import Link from 'next/link';
import { changelogSource } from '@/lib/source';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Changelog',
  description: 'Platform updates, new features, and bug fixes across Next Commerce.',
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function ChangelogIndex() {
  const entries = changelogSource
    .getPages()
    .slice()
    .sort((a, b) => (a.data.publishedAt < b.data.publishedAt ? 1 : -1));

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12 md:py-16">
      <header className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-fd-primary">
          Next Commerce
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-fd-foreground md:text-5xl">
          Changelog
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-fd-muted-foreground">
          Platform updates, new features, and bug fixes. Entries are published as Markdown in the
          docs repo.
        </p>
      </header>

      <ol className="flex flex-col gap-10">
        {entries.map((entry) => (
          <li key={entry.url} className="border-b border-fd-border pb-10 last:border-b-0">
            <div className="flex flex-wrap items-center gap-3 text-xs text-fd-muted-foreground">
              <time dateTime={entry.data.publishedAt}>{formatDate(entry.data.publishedAt)}</time>
              {entry.data.tags.length > 0 && (
                <span className="flex flex-wrap gap-1.5">
                  {entry.data.tags.map((tag) => (
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
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
              <Link href={entry.url} className="transition-colors hover:text-fd-primary">
                {entry.data.title}
              </Link>
            </h2>
            <p className="mt-2 text-base leading-7 text-fd-muted-foreground">
              {entry.data.summary}
            </p>
            <Link
              href={entry.url}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-fd-foreground transition-colors hover:text-fd-primary"
            >
              Read the full entry →
            </Link>
          </li>
        ))}
      </ol>
    </main>
  );
}
