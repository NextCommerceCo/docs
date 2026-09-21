import { RootProvider } from 'fumadocs-ui/provider/next';
import { GoogleTagManager } from '@next/third-parties/google';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { siteConfig } from '@/lib/config';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

// Set only in the production build env, so local dev and previews send nothing.
const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

export const metadata: Metadata = {
  // Required for Open Graph: without it Next emits relative image URLs, which
  // scrapers reject. Every route inherits the card below.
  metadataBase: new URL(siteConfig.url),
  title: {
    template: `%s | Docs | ${siteConfig.companyName}`,
    default: `Docs | ${siteConfig.companyName}`,
  },
  description: 'User documentation for Next Commerce.',
  openGraph: {
    type: 'website',
    siteName: `Docs | ${siteConfig.companyName}`,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: `${siteConfig.companyName} documentation` }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og.png'],
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      {gtmId && <GoogleTagManager gtmId={gtmId} />}
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
