import Link from 'next/link';
import {
  ArrowRight,
  Blocks,
  ClipboardList,
  CreditCard,
  ExternalLink,
  LineChart,
  Search,
  Settings2,
} from 'lucide-react';
import { FullSearchTrigger } from 'fumadocs-ui/layouts/shared/slots/search-trigger';

const primaryTasks = [
  {
    title: 'Set up my store',
    description: 'Start with branding, domains, payment providers, and fulfillment settings.',
    href: '/docs/start-here/get-started',
    icon: Settings2,
  },
  {
    title: 'Manage orders and subscriptions',
    description: 'Jump into customers, orders, subscriptions, and support workflows.',
    href: '/docs/manage/orders',
    icon: ClipboardList,
  },
  {
    title: 'Configure payments, fulfillment, or offers',
    description: 'Find the guides for gateways, routing, promotions, and operational controls.',
    href: '/docs/features/payments',
    icon: CreditCard,
  },
];

const workflowBuckets = [
  {
    title: 'Set up your store',
    description: 'The essential settings to get a store ready for real customers and real orders.',
    icon: Settings2,
    links: [
      {
        label: 'Getting Started',
        description: 'Core setup checklist for payments, policies, and operational basics.',
        href: '/docs/start-here/get-started',
      },
      {
        label: 'General Settings & Branding',
        description: 'Configure business details, customer-facing branding, and storefront identity.',
        href: '/docs/start-here/get-started/general-settings-and-branding',
      },
      {
        label: 'Add Payment Providers',
        description: 'Connect gateways and payment apps used by your checkout.',
        href: '/docs/start-here/get-started/add-payment-providers',
      },
      {
        label: 'Fulfillment Settings',
        description: 'Set locations, shipping methods, and fulfillment behavior.',
        href: '/docs/start-here/get-started/fulfillment-settings',
      },
    ],
  },
  {
    title: 'Build and customize',
    description: 'Shape the catalogue, storefront, and technical settings that power your store.',
    icon: Blocks,
    links: [
      {
        label: 'Products Catalogue',
        description: 'Create products, variants, categories, pricing, and inventory rules.',
        href: '/docs/build-a-store/catalogue',
      },
      {
        label: 'Storefront',
        description: 'Manage product pages, custom content, redirects, and hosted storefront features.',
        href: '/docs/build-a-store/storefront',
      },
      {
        label: 'Technical Settings',
        description: 'Configure API access, metadata, webhooks, and advanced store capabilities.',
        href: '/docs/build-a-store/technical-settings',
      },
      {
        label: 'Support Content',
        description: 'Create help content and FAQ experiences for customer self-service.',
        href: '/docs/build-a-store/storefront/support-content',
      },
    ],
  },
  {
    title: 'Run orders and subscriptions',
    description: 'The operating guides for day-to-day order management and customer support.',
    icon: ClipboardList,
    links: [
      {
        label: 'Orders',
        description: 'Find, edit, refund, and fulfill orders across every status.',
        href: '/docs/manage/orders',
      },
      {
        label: 'Customers',
        description: 'Review customer history, carts, addresses, and support context.',
        href: '/docs/manage/customers',
      },
      {
        label: 'Subscriptions Guide',
        description: 'Manage renewal behavior, cancellations, salvage, and billing changes.',
        href: '/docs/manage/subscriptions-guide',
      },
      {
        label: 'Support Guide',
        description: 'Use ticketing, macros, and support reporting inside the dashboard.',
        href: '/docs/manage/support',
      },
    ],
  },
  {
    title: 'Payments, fulfillment, and growth',
    description: 'The feature guides that help you tune checkout, shipping, and conversion.',
    icon: CreditCard,
    links: [
      {
        label: 'Payments Guide',
        description: 'Set up gateways, transactions, 3DS2, disputes, and payment controls.',
        href: '/docs/features/payments',
      },
      {
        label: 'Fulfillment Guide',
        description: 'Understand statuses, routing, and advanced fulfillment settings.',
        href: '/docs/features/fulfillment-guide',
      },
      {
        label: 'Offers',
        description: 'Configure coupons, promotions, shareable links, and attribution-friendly growth tools.',
        href: '/docs/features/offers',
      },
      {
        label: 'Orders Reports',
        description: 'Analyze order performance and drill into the operational metrics that matter.',
        href: '/docs/analytics/orders-reports',
      },
    ],
  },
  {
    title: 'Apps and analytics',
    description: 'Connect the broader ecosystem and measure how the business is performing.',
    icon: LineChart,
    links: [
      {
        label: 'Apps',
        description: 'Browse installed integrations for marketing, tax, shipping, and fulfillment.',
        href: '/docs/apps',
      },
      {
        label: 'Dashboards',
        description: 'See the top-level business views across sales, subscriptions, and operations.',
        href: '/docs/analytics/dashboards',
      },
      {
        label: 'Transactions Reports',
        description: 'Inspect payment activity, gateways, and attribution patterns in detail.',
        href: '/docs/analytics/transactions-reports',
      },
      {
        label: 'Partner Marketing Reports',
        description: 'Share limited reporting views with affiliates and external partners.',
        href: '/docs/analytics/partner-marketing-reports',
      },
    ],
  },
];

function WorkflowLinks({ links }: { links: (typeof workflowBuckets)[number]['links'] }) {
  return (
    <ul className="grid gap-2.5">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="group flex items-start justify-between gap-4 rounded-lg border border-fd-border bg-fd-background px-4 py-3 transition-colors duration-200 hover:bg-fd-accent/50"
          >
            <div className="min-w-0">
              <p className="text-sm font-semibold tracking-tight text-fd-foreground">{link.label}</p>
              <p className="mt-1 text-sm leading-6 text-fd-muted-foreground">{link.description}</p>
            </div>
            <ArrowRight className="mt-0.5 size-4 shrink-0 text-fd-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-fd-primary" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

function MobileWorkflowSection({
  bucket,
}: {
  bucket: (typeof workflowBuckets)[number];
}) {
  const Icon = bucket.icon;

  return (
    <details className="rounded-xl border border-fd-border bg-fd-card px-4 py-3 md:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-fd-secondary text-fd-primary">
            <Icon className="size-4" />
          </div>
          <div>
            <p className="text-sm font-semibold tracking-tight">{bucket.title}</p>
            <p className="text-xs text-fd-muted-foreground">{bucket.description}</p>
          </div>
        </div>
        <ArrowRight className="size-4 text-fd-muted-foreground" />
      </summary>
      <div className="mt-4">
        <WorkflowLinks links={bucket.links} />
      </div>
    </details>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-fd-background">
      <header className="sticky top-0 z-40 border-b border-fd-border bg-fd-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-6">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo-light.png" alt="Next Commerce" width={105} height={21} className="dark:hidden" />
            <img src="/logo-dark.png" alt="Next Commerce" width={105} height={21} className="hidden dark:block" />
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

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-10 md:gap-12 md:py-14">
        <section className="grid gap-6 rounded-xl border border-fd-border bg-fd-card p-6 md:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] md:p-8">
          <div className="flex flex-col gap-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-fd-primary">
              Next Commerce User Docs
            </p>
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold tracking-tight text-fd-foreground md:text-5xl">
                Find the fastest path to the answer you need.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-fd-muted-foreground md:text-lg">
                Search first, browse by workflow when you need context, and jump to developer docs
                only when the next step truly requires APIs, themes, or integrations.
              </p>
            </div>

            <div className="flex flex-col gap-3 pt-1">
              <FullSearchTrigger
                className="w-full justify-between rounded-lg border border-fd-border bg-fd-secondary px-4 py-3 text-left text-sm font-medium text-fd-muted-foreground shadow-none hover:bg-fd-accent md:max-w-xl"
                aria-label="Search docs"
              >
                <span className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-fd-background text-fd-primary">
                    <Search className="size-4" />
                  </span>
                  <span className="flex flex-col items-start">
                    <span className="text-sm font-medium text-fd-foreground">Search docs</span>
                    <span className="text-xs text-fd-muted-foreground">
                      Look up a task, setting, feature, or report
                    </span>
                  </span>
                </span>
              </FullSearchTrigger>

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
          </div>

          <div className="rounded-xl border border-fd-border bg-fd-background p-4 md:p-5">
            <p className="text-sm font-semibold tracking-tight text-fd-foreground">
              Start with a top task
            </p>
            <p className="mt-1 text-sm leading-6 text-fd-muted-foreground">
              These are the three most common front-door paths for merchants and operators.
            </p>
            <div className="mt-5 grid gap-3">
              {primaryTasks.map((task) => {
                const Icon = task.icon;
                return (
                  <Link
                    key={task.href}
                    href={task.href}
                    className="group flex items-start gap-4 rounded-lg border border-fd-border bg-fd-card px-4 py-4 transition-colors duration-200 hover:bg-fd-accent/50"
                  >
                    <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg bg-fd-secondary text-fd-primary">
                      <Icon className="size-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h2 className="text-sm font-semibold tracking-tight text-fd-foreground md:text-base">
                          {task.title}
                        </h2>
                        <ArrowRight className="size-4 text-fd-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-fd-primary" />
                      </div>
                      <p className="mt-1 text-sm leading-6 text-fd-muted-foreground">
                        {task.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-tight text-fd-foreground">
              Browse by workflow
            </p>
            <p className="mt-2 text-base leading-7 text-fd-muted-foreground">
              If you are not searching for one exact page, start with the workflow that best
              matches the job you are trying to get done.
            </p>
          </div>

          <div className="grid gap-3 md:hidden">
            {workflowBuckets.map((bucket) => (
              <MobileWorkflowSection key={bucket.title} bucket={bucket} />
            ))}
          </div>

          <div className="hidden gap-5 md:grid md:grid-cols-2 xl:grid-cols-3">
            {workflowBuckets.map((bucket) => {
              const Icon = bucket.icon;
              return (
                <section key={bucket.title} className="rounded-xl border border-fd-border bg-fd-card p-5">
                  <div className="mb-4 flex items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-fd-secondary text-fd-primary">
                      <Icon className="size-4" />
                    </div>
                    <div>
                      <h2 className="text-base font-semibold tracking-tight">{bucket.title}</h2>
                      <p className="mt-1 text-sm leading-6 text-fd-muted-foreground">
                        {bucket.description}
                      </p>
                    </div>
                  </div>
                  <WorkflowLinks links={bucket.links} />
                </section>
              );
            })}
          </div>
        </section>

        <section className="rounded-xl border border-fd-border bg-fd-card px-5 py-5 md:px-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold tracking-tight text-fd-foreground">
                Need API, theme, app, or integration help?
              </p>
              <p className="mt-1 text-sm leading-6 text-fd-muted-foreground">
                Continue in the developer portal when the next step moves from using the platform to
                building on top of it.
              </p>
            </div>
            <Link
              href="https://developers.nextcommerce.com"
              className="inline-flex items-center gap-2 self-start rounded-lg border border-fd-border bg-fd-background px-4 py-2.5 text-sm font-medium text-fd-foreground transition-colors duration-150 hover:bg-fd-accent"
            >
              Continue in Developer Docs
              <ExternalLink className="size-4" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
