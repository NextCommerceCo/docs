export const siteConfig = {
  companyName: 'Next Commerce',
  // Canonical origin for absolute links in machine-readable outputs (llms.txt).
  // Must match the route in wrangler.jsonc.
  url: 'https://docs.nextcommerce.com',
  githubOrg: 'NextCommerceCo',
  githubRepo: 'docs',
  get githubUrl() {
    return `https://github.com/${this.githubOrg}/${this.githubRepo}`;
  },
};
