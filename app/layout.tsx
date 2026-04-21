import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cursor from '../components/Cursor';
import SmoothScroll from '../components/SmoothScroll';
import JsonLd from '../components/SEO/JsonLd';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Granatapfelkerne | FrischFrucht',
  description: 'Hochwertige Granatapfelkerne und FrischFrucht Produkte für B2B.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <head>
        <JsonLd />
      </head>
      <body className={inter.className}>
        <SmoothScroll>
          <Cursor />
          <Header />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
