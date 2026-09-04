import capabilityMap from '@/lib/capabilities.snapshot.json';

interface Capability {
  id: string;
  title: string;
  audiences: string[];
  operator_docs: string[];
  developer_docs: string[];
}

const MERCHANT_SITE: string = capabilityMap.sources.merchant_docs;
const capabilities = capabilityMap.capabilities as Capability[];

function documentPath(url: string, base?: string) {
  const path = new URL(url, base).pathname.replace(/\/+$/, '');
  return path || '/';
}

/**
 * A compact developer handoff for merchant pages explicitly cited by the
 * capability map. The first developer_docs entry is the capability's entry
 * page; detailed references remain in the map and domain bundles.
 */
export function DeveloperResources({ pageUrl }: { pageUrl: string }) {
  const currentPath = documentPath(pageUrl, `${MERCHANT_SITE}/`);
  const seen = new Set<string>();
  const resources = capabilities
    .flatMap((capability) => {
      if (!Array.isArray(capability.audiences) || !Array.isArray(capability.operator_docs) || !Array.isArray(capability.developer_docs)) {
        throw new Error(`Capability ${capability.id} has invalid documentation links`);
      }
      if (!capability.operator_docs.some((url) => documentPath(url) === currentPath)) return [];

      const entryUrl = capability.developer_docs[0];
      if (!entryUrl) {
        if (capability.audiences.includes('developer')) {
          throw new Error(`Capability ${capability.id} has no developer entry page`);
        }
        return [];
      }
      if (seen.has(entryUrl)) return [];
      seen.add(entryUrl);
      return [{ id: capability.id, title: capability.title, url: entryUrl }];
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
