import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.logoWrap}>
            <Link href="/" className={styles.logo}>Granatapfelkerne®</Link>
          </div>
          <ul className={styles.menuLinks}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/produkte">Produkte</Link></li>
            <li><Link href="/vorteile">Vorteile</Link></li>
            <li><Link href="/ueber-uns">Über Uns</Link></li>
            <li><Link href="/kontakt">Kontakt</Link></li>
          </ul>
        </div>
        
        <div className={styles.middle}>
          <div className={styles.contact}>
            <h3 className={styles.contactHeading}>Wir freuen uns auf Ihre Anfrage. Lassen Sie uns zusammenarbeiten.</h3>
            <a href="/kontakt" className={styles.btnContainer} data-hover="Kontakt">
              <span className={styles.btnText}>Anfrage senden</span>
            </a>
          </div>

          <div className={styles.details}>
            <div className={styles.listWrap}>
              <h4 className={styles.greyHeading}>Geschäftsanfragen</h4>
              <ul>
                <li><a href="mailto:hallo@granatapfelkerne.de">hallo@granatapfelkerne.de</a></li>
                <li><a href="tel:+49123456789">+49 123 456789</a></li>
              </ul>
            </div>
            <div className={styles.listWrap}>
              <h4 className={styles.greyHeading}>Standort</h4>
              <p>Musterstraße 1<br/>20095 Hamburg<br/>Deutschland</p>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.copyright}>Granatapfelkerne FrischFrucht ©2026</div>
          <div className={styles.metaLinks}>
            <a href="#" target="_blank">LinkedIn</a>
            <a href="#" target="_blank">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
