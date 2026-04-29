import Link from 'next/link';
import styles from './Footer.module.css';
import { getMarkdownContent } from '../lib/markdown';

export default async function Footer({ lang }: { lang: string }) {
  const navData = await getMarkdownContent(['global', 'navigation'], lang);
  const links = navData?.links || [];
  
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.logoWrap}>
            <Link href={`/${lang}`} className={styles.logo}>
              {navData?.logo ? (
                <img src={navData.logo} alt="Granatapfelkerne Logo" style={{ maxHeight: '60px', width: 'auto', display: 'block' }} />
              ) : (
                "Granatapfelkerne®"
              )}
            </Link>
          </div>
          <ul className={styles.menuLinks}>
            {links.map((link: any, idx: number) => (
              <li key={idx}>
                <Link href={`/${lang}${link.href === '/' ? '' : link.href}`}>{link.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div className={styles.middle}>
          <div className={styles.contact}>
            <h3 className={styles.contactHeading}>
              {lang === 'de' ? 'Wir freuen uns auf Ihre Anfrage. Lassen Sie uns zusammenarbeiten.' : "We look forward to your inquiry. Let's work together."}
            </h3>
            <Link href={`/${lang}/kontakt`} className={styles.btnContainer}>
              <span className={styles.btnText}>{lang === 'de' ? 'Anfrage senden' : 'Send inquiry'}</span>
            </Link>
          </div>

          <div className={styles.details}>
            <div className={styles.listWrap}>
              <h4 className={styles.greyHeading}>{lang === 'de' ? 'Geschäftsanfragen' : 'Business Inquiries'}</h4>
              <ul>
                <li><a href={`mailto:${navData?.email}`}>{navData?.email}</a></li>
                <li><a href={`tel:${navData?.phone?.replace(/\s/g, '')}`}>{navData?.phone}</a></li>
              </ul>
            </div>
            <div className={styles.listWrap}>
              <h4 className={styles.greyHeading}>{lang === 'de' ? 'Standort' : 'Location'}</h4>
              <p>{navData?.address?.split(', ').map((line: string, i: number) => <span key={i}>{line}<br/></span>)}</p>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.copyright}>Granatapfelkerne FrischFrucht ©2026</div>
          <div className={styles.metaLinks}>
            <a href={`/${lang}/impressum`}>{lang === 'de' ? 'Impressum' : 'Imprint'}</a>
            <a href={`/${lang}/datenschutz`}>{lang === 'de' ? 'Datenschutz' : 'Privacy Policy'}</a>
            <a href="#" target="_blank">LinkedIn</a>
            <a href="#" target="_blank">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
