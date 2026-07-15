import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { siteConfig } from '@/lib/config';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <img src="/next-dark.svg" alt={siteConfig.companyName} width={79} height={26} className="dark:hidden" />
          <img src="/next-white.svg" alt={siteConfig.companyName} width={79} height={26} className="hidden dark:block" />
        </>
      ),
      url: '/',
    },
    links: [
      {
        text: 'Docs',
        url: '/docs',
      },
      {
        text: 'Changelog',
        url: '/changelog',
      },
      {
        text: 'Developer Docs',
        url: 'https://developers.nextcommerce.com',
        external: true,
      },
    ],
    githubUrl: siteConfig.githubUrl,
  };
}
