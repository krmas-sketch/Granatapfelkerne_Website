import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logoWrap}>
        <Link href="/" className={styles.logo}>Granatapfelkerne®</Link>
      </div>
      <nav className={styles.nav}>
        <ul className={styles.menuLinks}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/produkte">Produkte</Link></li>
          <li><Link href="/vorteile">Vorteile</Link></li>
          <li><Link href="/ueber-uns">Über Uns</Link></li>
          <li><Link href="/kontakt">Kontakt</Link></li>
        </ul>
      </nav>
    </header>
  );
}
