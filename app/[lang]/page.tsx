import { getMarkdownContent, getAllProducts, getAllSorten } from '../../lib/markdown';
import HomeClient from '../../components/HomeClient';

export default async function HomePage({ params }: { params: { lang: string } }) {
  const homeData = await getMarkdownContent(['home'], params.lang);
  const products = getAllProducts(params.lang);
  const sorten = getAllSorten(params.lang);

  if (!homeData) {
    return <div>Content not found</div>;
  }

  return <HomeClient homeData={homeData} products={products} sorten={sorten} lang={params.lang} />;
}
