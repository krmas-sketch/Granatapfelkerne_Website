import { getAllProducts } from '../../../lib/markdown';
import Link from 'next/link';

export default function ProduktePage({ params }: { params: { lang: string } }) {
  const products = getAllProducts(params.lang);
  
  return (
    <main style={{ padding: '15rem 4rem', minHeight: '100vh' }}>
      <h1>{params.lang === 'de' ? 'Unsere Produkte' : 'Our Products'}</h1>
      <ul style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {products.map(p => (
          <li key={p.slug}>
            <Link href={`/${params.lang}/produkte/${p.slug}`} style={{ textDecoration: 'underline' }}>
              {p.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
