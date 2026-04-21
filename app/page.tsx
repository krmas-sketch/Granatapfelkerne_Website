'use client';
import { motion } from 'framer-motion';
import styles from './page.module.css';

export default function Home() {
  const heroText = [
    { text: 'Premium', delay: 0.1 },
    { text: 'Granatapfelkerne', delay: 0.2 },
    { text: 'verzehrfertig & frisch', delay: 0.3 },
  ];

  const subTexts = [
    { text: 'Produziert in Hamburg', delay: 0.4 },
    { text: 'Perfekt für B2B', delay: 0.5 }
  ];

  return (
    <main className={styles.main}>
      <section className={styles.heroSection}>
        <h1 className={styles.heroHeading} aria-label="Premium Granatapfelkerne verzehrfertig & frisch">
          {heroText.map((line, idx) => (
            <div key={idx} className={styles.lineWrap}>
              <motion.div
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.9, delay: line.delay, ease: [0.16, 1, 0.3, 1] }}
                className={styles.word}
              >
                {line.text}
              </motion.div>
            </div>
          ))}
        </h1>
        <h2 className={styles.heroSubheading}>
          {subTexts.map((sub, idx) => (
            <div key={idx} className={styles.subWrap}>
              <motion.div
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.9, delay: sub.delay, ease: [0.16, 1, 0.3, 1] }}
              >
                {sub.text}
              </motion.div>
            </div>
          ))}
        </h2>
      </section>

      <section className={styles.caseStudiesSection}>
        <header className={styles.caseHeader}>
          <h2>Unsere Produkte.</h2>
        </header>
        <div className={styles.studiesGrid}>
          {/* Card 1 *\/
          <a href="/produkte" className={styles.caseCard} data-hover="Ansehen">
            <div className={styles.caseInner}>
              <div className={styles.numWrap}>
                <span className={styles.num}>00-1</span>
              </div>
              <div className={styles.imgWrap}>
                <img src="https://images.unsplash.com/photo-1601002821105-090c2834b677?q=80&w=2938&auto=format&fit=crop" alt="Pomegranate Box" />
              </div>
              <div className={styles.line} />
              <div className={styles.caseInfo}>
                <span>Fresh</span> - <span>Handverlesen</span>
              </div>
              <h3>Pomegranate Arils 1KG</h3>
            </div>
          </a>

          {/* Card 2 *\/
          <a href="/produkte" className={styles.caseCard} data-hover="Entdecken">
            <div className={styles.caseInner}>
              <div className={styles.numWrap}>
                <span className={styles.num}>00-2</span>
              </div>
              <div className={styles.imgWrap}>
                <img src="https://images.unsplash.com/photo-1541513233804-ba0901e4a552?q=80&w=3024&auto=format&fit=crop" alt="Pomegranate Macro" />
              </div>
              <div className={styles.line} />
              <div className={styles.caseInfo}>
                <span>Vakuum</span> - <span>Gastro</span>
              </div>
              <h3>Pomegranate Arils 5KG</h3>
            </div>
          </a>
        </div>
      </section>

      <section className={styles.aboutSection}>
        <div className={styles.aboutGrid}>
          <h2>FrischFrucht</h2>
          <h3>Ihr zuverlässiger Partner für täglich frische Produktion in Hamburg.</h3>
          <div className={styles.aboutContent}>
            <p>
              Wir fokussieren uns auf das Wesentliche: Herausragende Qualität und Frische. Unsere Granatapfelkerne werden täglich handverlesen, maschinell in Hamburg entkernt und sofort verzehrfertig verpackt. Für Großküchen, den LEH und die Gastronomie bieten wir passgenaue Formate von 1kg bis zu Big Packs.
            </p>
            <a href="/ueber-uns" className={styles.btnContainer} data-hover="Über uns">
              <span className={styles.btnText}>Mehr erfahren</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
