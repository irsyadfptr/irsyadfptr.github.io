import type { Metadata, Viewport } from 'next';
import { Archivo, Archivo_Black, Bangers } from 'next/font/google';
import { site } from '@/lib/site';
import './globals.css';
import { asset } from '@/lib/asset';

const archivo = Archivo({ subsets: ['latin'], variable: '--font-archivo' });
const archivoBlack = Archivo_Black({ subsets: ['latin'], variable: '--font-archivo-black', weight: '400' });
const bangers = Bangers({ subsets: ['latin'], variable: '--font-bangers', weight: '400' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: `${site.short} portfolio`,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    site.name, 'Putranto', 'senior frontend engineer', 'frontend developer', 'React developer', 'Next.js developer',
    'TypeScript', 'frontend engineer Jakarta', 'frontend developer Indonesia', 'remote frontend engineer',
    'hire React developer', 'Playwright', 'Cypress', 'Three.js', 'portfolio',
  ],
  alternates: { canonical: '/' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  icons: { icon: asset('/icon.svg') },
  openGraph: {
    type: 'profile',
    url: '/',
    siteName: `${site.short} portfolio`,
    locale: 'en_US',
    title: site.title,
    description: site.description,
    firstName: 'Irsyad Fakhri',
    lastName: 'Putranto',
  },
  twitter: { card: 'summary_large_image', title: site.title, description: site.description, creator: '@insinyuroffun' },
  category: 'technology',
};

export const viewport: Viewport = { themeColor: '#f4f1ea' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${archivoBlack.variable} ${bangers.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
