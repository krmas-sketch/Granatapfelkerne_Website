import { getMarkdownContent } from '@/lib/markdown';
import ContactClient from './ContactClient';

export default async function KontaktPage({ params }: { params: { lang: string } }) {
  const navData = await getMarkdownContent(['global', 'navigation'], params.lang);

  return (
    <main>
      <ContactClient navData={navData} lang={params.lang} />
    </main>
  );
}
