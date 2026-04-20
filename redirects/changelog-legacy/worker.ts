// @ts-ignore — bundled at build time by wrangler
import slugMap from "./slug-map.json";

const NEW_HOST = "https://docs.nextcommerce.com/changelog";
const MAP = slugMap as Record<string, string>;

/**
 * Redirect changelog.nextcommerce.com/* → docs.nextcommerce.com/changelog/*.
 *
 * The legacy site exposed individual entries under /blog/detail/{old_slug}/
 * (where old_slug was an inconsistent date stamp like "20201019", "2021118",
 * "11423", etc). Each has been mapped to a new slug on the fumadocs-powered
 * changelog in docs/. The root and list page both collapse onto the new index.
 */
export default {
  fetch(request: Request): Response {
    const url = new URL(request.url);
    const path = url.pathname;

    // /blog/detail/{old_slug}/  → /changelog/{new_slug}
    const detailMatch = path.match(/^\/blog\/detail\/([^\/]+)\/?$/);
    if (detailMatch) {
      const oldSlug = detailMatch[1];
      const newSlug = MAP[oldSlug];
      if (newSlug) {
        return Response.redirect(`${NEW_HOST}/${newSlug}${url.search}`, 301);
      }
    }

    // Everything else (index, /blog/, unknown detail) → new index.
    return Response.redirect(`${NEW_HOST}${url.search}`, 301);
  },
};
