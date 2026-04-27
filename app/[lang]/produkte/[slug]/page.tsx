import { getMarkdownContent } from '../../../../lib/markdown';

export default async function ProductPage({ params }: { params: { lang: string, slug: string } }) {
  const product = await getMarkdownContent(['produkte', params.slug], params.lang);
  
  if (!product) return <div style={{ padding: '15rem 4rem' }}>Product not found</div>;
  
  return (
    <main style={{ padding: '15rem 4rem', minHeight: '100vh' }}>
      <h1>{product.title}</h1>
      <p style={{ color: 'var(--grey)', marginBottom: '2rem' }}>Brix: {product.brix}</p>
      
      {product.image && (
        <div style={{ marginBottom: '2rem', maxWidth: '400px' }}>
          <img src={product.image} alt={product.title} style={{ width: '100%', height: 'auto', borderRadius: '4px' }} />
        </div>
      )}
      
      <div 
        dangerouslySetInnerHTML={{ __html: product.contentHtml }} 
        style={{ lineHeight: 1.6 }}
      />
    </main>
  );
}
