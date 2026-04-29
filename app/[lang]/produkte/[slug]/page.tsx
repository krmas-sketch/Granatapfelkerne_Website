import { getMarkdownContent } from '../../../../lib/markdown';
import ContactForm from '../../../../components/ContactForm';

export default async function ProductPage({ params }: { params: { lang: string, slug: string } }) {
  const product = await getMarkdownContent(['produkte', params.slug], params.lang);
  const navData = await getMarkdownContent(['global', 'navigation'], params.lang);
  
  if (!product) return <div style={{ padding: '15rem 4rem' }}>Product not found</div>;
  
  return (
    <main style={{ padding: '15rem 4rem', minHeight: '100vh' }}>
      <h1 style={{ marginBottom: '0.5rem' }}>{product.title}</h1>
      {product.brix && product.brix !== 'N/A' && (
        <p style={{ color: 'var(--grey)', marginBottom: '3rem' }}>Brix: {product.brix}</p>
      )}
      
      <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {product.image && (
          <div className="zoom-container" style={{ flex: '1 1 400px', maxWidth: '500px', aspectRatio: '4/5', borderRadius: '20px', marginBottom: '2rem' }}>
            <img src={product.image} alt={product.title} className="zoom-on-hover" />
          </div>
        )}
        
        <div 
          dangerouslySetInnerHTML={{ __html: product.contentHtml }} 
          style={{ flex: '1 1 500px', lineHeight: 1.8, fontSize: '1.05rem' }}
        />
      </div>

      <ContactForm navData={navData} lang={params.lang} />
    </main>
  );
}
