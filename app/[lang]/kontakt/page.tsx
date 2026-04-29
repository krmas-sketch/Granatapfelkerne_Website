import { getMarkdownContent } from '@/lib/markdown';
import ContactForm from '@/components/ContactForm';

export default async function KontaktPage({ params }: { params: { lang: string } }) {
  const navData = await getMarkdownContent(['global', 'navigation'], params.lang);

  return (
    <main style={{ paddingTop: '8rem' }}>
      <ContactForm navData={navData} lang={params.lang} />
    </main>
  );
}
