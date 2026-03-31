export const siteConfig = {
  companyName: 'Next Commerce',
  githubOrg: 'NextCommerceCo',
  githubRepo: 'docs',
  get githubUrl() {
    return `https://github.com/${this.githubOrg}/${this.githubRepo}`;
  },
};
