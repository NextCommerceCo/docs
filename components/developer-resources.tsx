import capabilityMap from '@/lib/capabilities.snapshot.json';

interface Capability {
  id: string;
  title: string;
  developer_docs: string[];
  api_operations: { id: string; method: string; path: string; url: string | null }[];
  webhooks: { event: string; url: string | null }[];
}

const DEVELOPER_SITE: string = capabilityMap.sources.developer_docs;
const capabilities = capabilityMap.capabilities as Capability[];
const byId = new Map(capabilities.map((c) => [c.id, c]));

/**
 * Developer resources for the capabilities a merchant page declares in
 * `capability_ids`. Driven by the capability map snapshot the developer site
 * publishes, so the links here are the same ones the map and the developer
 * pages carry back to this site.
 */
export function DeveloperResources({ ids }: { ids?: string[] }) {
  const matched = (ids ?? []).map((id) => byId.get(id)).filter((c): c is Capability => Boolean(c));
  if (matched.length === 0) return null;

  return (
    <aside aria-label="Developer resources" className="mt-10 rounded-lg border bg-fd-card p-4 text-sm text-fd-card-foreground">
      <p className="font-medium">
        Developer resources for{' '}
        {matched.map((c, i) => (
          <span key={c.id}>
            {i > 0 && ', '}
            <a href={`${DEVELOPER_SITE}/docs/capabilities#${c.id}`} className="underline underline-offset-4">
              {c.title}
            </a>
          </span>
        ))}
      </p>
      <ul className="mt-2 list-disc pl-5">
        {matched.flatMap((c) =>
          c.developer_docs.map((url) => (
            <li key={url}>
              <a href={url} className="underline underline-offset-4">
                {url.replace(DEVELOPER_SITE, 'developers.nextcommerce.com')}
              </a>
            </li>
          )),
        )}
      </ul>
      {matched.some((c) => c.api_operations.length > 0 || c.webhooks.length > 0) && (
        <p className="mt-2 text-fd-muted-foreground">
          {matched
            .filter((c) => c.api_operations.length > 0 || c.webhooks.length > 0)
            .map((c) => {
              const parts: string[] = [];
              if (c.api_operations.length > 0) parts.push(`${c.api_operations.length} Admin API operations`);
              if (c.webhooks.length > 0) parts.push(`${c.webhooks.length} webhook events`);
              return `${c.title}: ${parts.join(', ')}`;
            })
            .join('. ')}
          . See the capability map for the full lists.
        </p>
      )}
    </aside>
  );
}
