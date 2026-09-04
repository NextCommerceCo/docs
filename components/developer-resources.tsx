import capabilityMap from '@/lib/capabilities.snapshot.json';

interface Capability {
  id: string;
  title: string;
  operator_docs: string[];
  developer_docs: string[];
}

const MERCHANT_SITE: string = capabilityMap.sources.merchant_docs;
const capabilities = capabilityMap.capabilities as Capability[];

/**
 * A compact developer handoff for merchant pages explicitly cited by the
 * capability map. The first developer_docs entry is the capability's entry
 * page; detailed references remain in the map and domain bundles.
 */
export function DeveloperResources({ pageUrl }: { pageUrl: string }) {
  const canonicalUrl = `${MERCHANT_SITE}${pageUrl}`.replace(/\/$/, '');
  const seen = new Set<string>();
  const resources = capabilities
    .filter((capability) => capability.operator_docs.some((url) => url.replace(/\/$/, '') === canonicalUrl))
    .flatMap((capability) => {
      const url = capability.developer_docs[0];
      if (!url || seen.has(url)) return [];
      seen.add(url);
      return [{ id: capability.id, title: capability.title, url }];
    });

  if (resources.length === 0) return null;

  return (
    <aside aria-label="Developer documentation" className="mt-10 border-t pt-4 text-sm text-fd-muted-foreground">
      <p>
        Developer documentation:{' '}
        {resources.map((resource, i) => (
          <span key={resource.id}>
            {i > 0 && ', '}
            <a href={resource.url} className="text-fd-foreground underline underline-offset-4">
              {resource.title}
            </a>
          </span>
        ))}
      </p>
    </aside>
  );
}
