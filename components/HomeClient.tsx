'use client';

import { motion } from 'framer-motion';
import styles from '../app/[lang]/page.module.css';
import VarietiesMap from './VarietiesMap';
import ContactForm from './ContactForm';

export default function HomeClient({ homeData, navData, products, sorten, lang }: { homeData: any, navData: any, products: any[], sorten: any[], lang: string }) {
  // Use data from markdown
  const heroText = homeData.heroTexts || [];
  const subTexts = homeData.heroSubtexts || [];

  return (
    <main className={styles.main}>
      <section className={styles.heroSection}>
        <h1 className={styles.heroHeading}>
          {heroText.map((text: string, idx: number) => (
            <div key={idx} className={styles.lineWrap}>
              <motion.div
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.1 * (idx + 1), ease: [0.16, 1, 0.3, 1] }}
                className={styles.word}
              >
                {text}
              </motion.div>
            </div>
          ))}
        </h1>
        <h2 className={styles.heroSubheading}>
          {subTexts.map((text: string, idx: number) => (
            <div key={idx} className={styles.subWrap}>
              <motion.div
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.4 + (0.1 * idx), ease: [0.16, 1, 0.3, 1] }}
              >
                {text}
              </motion.div>
            </div>
          ))}
        </h2>
      </section>

      <section className={styles.caseStudiesSection}>
        <header className={styles.caseHeader}>
          <h2>{lang === 'de' ? 'Unsere Produkte.' : 'Our Products.'}</h2>
        </header>
        <div className={styles.productRows}>
          {products.map((product, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={product.slug} className={`${styles.productRow} ${isEven ? styles.rowEven : styles.rowOdd}`}>
                <div className={styles.productImageCol}>
                  <div className={`${styles.imgWrap} zoom-container`}>
                    <img src={product.image} alt={product.title} className="zoom-on-hover" />
                  </div>
                </div>
                
                <div className={styles.productTextCol}>
                  <h3 className={styles.productTitle}>{product.title}</h3>
                  <p className={styles.productSummary}>{product.summary}</p>
                  <a href={`/${lang}/produkte/${product.slug}`} className={styles.btnContainer}>
                    <span className={styles.btnText}>{lang === 'de' ? 'Mehr erfahren' : 'Learn more'}</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <VarietiesMap sorten={sorten} lang={lang} />

      <section className={styles.aboutSection}>
        <div className={styles.aboutGrid}>
          <h2>{homeData.aboutTitle}</h2>
          <h3>{homeData.aboutSubtitle}</h3>
          <div className={styles.aboutContent}>
            <p>{homeData.aboutDescription}</p>
            <a href={`/${lang}/ueber-uns`} className={styles.btnContainer}>
              <span className={styles.btnText}>{lang === 'de' ? 'Mehr erfahren' : 'Learn more'}</span>
            </a>
          </div>
        </div>
      </section>

      <ContactForm navData={navData} lang={lang} />
    </main>
  );
}
