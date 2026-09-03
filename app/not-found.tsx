import Link from 'next/link';

const recoveryLinks = [
  { label: 'Browse all docs', href: '/docs' },
  { label: 'Changelog', href: '/changelog' },
  { label: 'Developer docs', href: 'https://developers.nextcommerce.com' },
  { label: 'Capability map', href: 'https://developers.nextcommerce.com/docs/capabilities' },
  { label: 'Agent index (llms.txt)', href: '/llms.txt' },
];

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-fd-background px-6 py-16 text-fd-foreground">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-semibold">Page not found</h1>
        <p className="mt-2 text-fd-muted-foreground">
          The page you asked for does not exist or has moved. Try one of these, or press ⌘K to search.
        </p>
        <nav aria-label="Recovery links" className="mt-6">
          <ul className="space-y-2">
            {recoveryLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="underline underline-offset-4 hover:text-fd-muted-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </main>
  );
}
