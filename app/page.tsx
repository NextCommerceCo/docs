import Link from 'next/link';
import {
  ArrowRight,
  ClipboardList,
  CreditCard,
  ExternalLink,
  Search,
  Settings2,
} from 'lucide-react';
import { FullSearchTrigger } from 'fumadocs-ui/layouts/shared/slots/search-trigger';

const quickLinks = [
  {
    title: 'Set up your store',
    description: 'Branding, domains, payments, and fulfillment.',
    href: '/docs/start-here/get-started',
    icon: Settings2,
  },
  {
    title: 'Manage orders',
    description: 'Customers, subscriptions, refunds, and support.',
    href: '/docs/manage/orders',
    icon: ClipboardList,
  },
  {
    title: 'Payments and offers',
    description: 'Gateways, routing, promotions, and checkout controls.',
    href: '/docs/features/payments',
    icon: CreditCard,
  },
];

const browseSections = [
  {
    title: 'Start',
    description: 'The first-stop guides for getting a store ready.',
    links: [
      { label: 'Getting Started', href: '/docs/start-here/get-started' },
      {
        label: 'General Settings and Branding',
        href: '/docs/start-here/get-started/general-settings-and-branding',
      },
      { label: 'Add Payment Providers', href: '/docs/start-here/get-started/add-payment-providers' },
    ],
  },
  {
    title: 'Build',
    description: 'Catalog, storefront, and technical setup.',
    links: [
      { label: 'Products Catalogue', href: '/docs/build-a-store/catalogue' },
      { label: 'Storefront', href: '/docs/build-a-store/storefront' },
      { label: 'Technical Settings', href: '/docs/build-a-store/technical-settings' },
    ],
  },
  {
    title: 'Operate',
    description: 'Day-to-day workflows for orders and customers.',
    links: [
      { label: 'Orders', href: '/docs/manage/orders' },
      { label: 'Customers', href: '/docs/manage/customers' },
      { label: 'Subscriptions Guide', href: '/docs/manage/subscriptions-guide' },
    ],
  },
  {
    title: 'Optimize',
    description: 'Payments, fulfillment, and conversion tools.',
    links: [
      { label: 'Payments Guide', href: '/docs/features/payments' },
      { label: 'Fulfillment Guide', href: '/docs/features/fulfillment-guide' },
      { label: 'Offers', href: '/docs/features/offers' },
    ],
  },
];

function BrowseSection({
  section,
}: {
  section: (typeof browseSections)[number];
}) {
  return (
    <section className="rounded-xl border border-fd-border bg-fd-card p-5">
      <div className="max-w-sm">
        <h2 className="text-base font-semibold tracking-tight text-fd-foreground">{section.title}</h2>
        <p className="mt-1 text-sm leading-6 text-fd-muted-foreground">{section.description}</p>
      </div>

      <ul className="mt-4 grid gap-2">
        {section.links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-fd-foreground transition-colors duration-150 hover:bg-fd-accent"
            >
              <span>{link.label}</span>
              <ArrowRight className="size-4 shrink-0 text-fd-muted-foreground transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-fd-primary" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-fd-background">
      <header className="sticky top-0 z-40 border-b border-fd-border bg-fd-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-6">
          <Link href="/" className="flex items-center gap-3">
            <img src="/next-dark.svg" alt="Next Commerce" width={451} height={148} className="h-auto w-24 dark:hidden" />
            <img src="/next-white.svg" alt="Next Commerce" width={451} height={148} className="hidden h-auto w-24 dark:block" />
            <span className="hidden border-l border-fd-border pl-3 text-xs font-medium text-fd-muted-foreground sm:inline">
              Docs
            </span>
          </Link>

          <nav className="flex items-center gap-1">
            <Link
              href="/docs"
              className="hidden px-3 py-1.5 text-sm text-fd-muted-foreground transition-colors duration-150 hover:text-fd-foreground sm:inline-flex"
            >
              Browse docs
            </Link>
            <Link
              href="https://developers.nextcommerce.com"
              className="inline-flex items-center gap-1.5 rounded-md border border-fd-border px-3.5 py-1.5 text-sm font-medium text-fd-foreground transition-colors duration-150 hover:bg-fd-accent"
            >
              Developer docs
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10 md:gap-10 md:py-14">
        <section className="grid gap-6 rounded-2xl border border-fd-border bg-fd-card p-6 md:grid-cols-[minmax(0,1fr)_20rem] md:p-8">
          <div className="flex flex-col gap-5">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-fd-primary">
                Next Commerce User Docs
              </p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-fd-foreground md:text-5xl">
                Guides for setting up, running, and extending your store.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-fd-muted-foreground md:text-lg">
                Start with a common path, browse by area, or search if you already know the
                feature, setting, or workflow you need.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium text-fd-foreground">Know what you need?</p>
              <FullSearchTrigger
                className="w-full justify-between rounded-xl border border-fd-border bg-fd-secondary px-4 py-3 text-left text-sm font-medium text-fd-muted-foreground shadow-none hover:bg-fd-accent md:max-w-xl"
                aria-label="Search docs"
              >
                <span className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-fd-background text-fd-primary">
                    <Search className="size-4" />
                  </span>
                  <span className="flex flex-col items-start">
                    <span className="text-sm font-medium text-fd-foreground">Search docs</span>
                    <span className="text-xs text-fd-muted-foreground">
                      Settings, guides, features, or reports
                    </span>
                  </span>
                </span>
              </FullSearchTrigger>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 font-medium text-fd-foreground transition-colors duration-150 hover:text-fd-primary"
              >
                Browse all docs
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/changelog"
                className="inline-flex items-center gap-1.5 text-fd-muted-foreground transition-colors duration-150 hover:text-fd-foreground"
              >
                Changelog
              </Link>
              <Link
                href="https://developers.nextcommerce.com"
                className="inline-flex items-center gap-1.5 text-fd-muted-foreground transition-colors duration-150 hover:text-fd-foreground"
              >
                Developer docs
                <ExternalLink className="size-3.5" />
              </Link>
            </div>
          </div>

          <aside className="rounded-xl border border-fd-border bg-fd-background p-4 md:p-5">
            <p className="text-sm font-semibold tracking-tight text-fd-foreground">Start here</p>
            <div className="mt-4 grid gap-2.5">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group rounded-lg border border-fd-border bg-fd-card px-4 py-3 transition-colors duration-150 hover:bg-fd-accent/50"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-fd-secondary text-fd-primary">
                        <Icon className="size-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h2 className="text-sm font-semibold tracking-tight text-fd-foreground">
                            {link.title}
                          </h2>
                          <ArrowRight className="size-4 shrink-0 text-fd-muted-foreground transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-fd-primary" />
                        </div>
                        <p className="mt-1 text-sm leading-6 text-fd-muted-foreground">
                          {link.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </aside>
        </section>

        <section className="flex flex-col gap-4">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold tracking-tight text-fd-foreground">Browse by area</p>
            <p className="mt-2 text-base leading-7 text-fd-muted-foreground">
              If you are not looking for one exact page, start with the part of the platform that
              matches the job at hand.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {browseSections.map((section) => (
              <BrowseSection key={section.title} section={section} />
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-fd-border bg-fd-card px-5 py-5 md:px-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold tracking-tight text-fd-foreground">
                Building on top of Next Commerce?
              </p>
              <p className="mt-1 text-sm leading-6 text-fd-muted-foreground">
                Use the developer portal for APIs, themes, apps, and integrations.
              </p>
            </div>
            <Link
              href="https://developers.nextcommerce.com"
              className="inline-flex items-center gap-2 self-start rounded-lg border border-fd-border bg-fd-background px-4 py-2.5 text-sm font-medium text-fd-foreground transition-colors duration-150 hover:bg-fd-accent"
            >
              Open Developer Docs
              <ExternalLink className="size-4" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
