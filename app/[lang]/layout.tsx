import '../globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SmoothScroll from '../../components/SmoothScroll';
import JsonLd from '../../components/SEO/JsonLd';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Granatapfelkerne | FrischFrucht',
  description: 'Hochwertige Granatapfelkerne und FrischFrucht Produkte für B2B.',
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={params.lang}>
      <head>
        <JsonLd />
      </head>
      <body className={inter.className}>
        <SmoothScroll>
          <Header lang={params.lang} />
          {children}
          <Footer lang={params.lang} />
        </SmoothScroll>
      </body>
    </html>
  );
}
