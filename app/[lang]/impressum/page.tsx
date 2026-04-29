import { getMarkdownContent } from '../../../lib/markdown';

export default async function ImpressumPage({ params }: { params: { lang: string } }) {
  const data = await getMarkdownContent(['global', 'impressum'], params.lang);

  if (!data) {
    return <main style={{ padding: '15rem 4rem', minHeight: '100vh' }}>Impressum not found</main>;
  }

  return (
    <main style={{ padding: '15rem 4rem', minHeight: '100vh', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '3rem', fontWeight: 500, fontFamily: 'var(--font-display), sans-serif', textTransform: 'uppercase' }}>
        {data.title}
      </h1>
      <div 
        dangerouslySetInnerHTML={{ __html: data.contentHtml }} 
        style={{ fontSize: '1.2rem', lineHeight: 1.8, color: 'var(--foreground)' }}
      />
    </main>
  );
}
