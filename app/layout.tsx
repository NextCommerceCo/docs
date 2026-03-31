import { RootProvider } from 'fumadocs-ui/provider/next';
import { Inter } from 'next/font/google';
import { siteConfig } from '@/lib/config';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: {
    template: `%s | Docs | ${siteConfig.companyName}`,
    default: `Docs | ${siteConfig.companyName}`,
  },
  description: 'User documentation for Next Commerce.',
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col font-sans bg-fd-background text-fd-foreground">
        <RootProvider
          search={{
            options: {
              type: 'static',
              links: [
                ['Browse all docs', '/docs'],
                ['Developer docs', 'https://developers.nextcommerce.com'],
              ],
            },
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
