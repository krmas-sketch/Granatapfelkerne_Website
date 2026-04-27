import Link from 'next/link';
import styles from './Header.module.css';
import { getMarkdownContent } from '../lib/markdown';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';

export default async function Header({ lang }: { lang: string }) {
  const navData = await getMarkdownContent(['global', 'navigation'], lang);
  const links = navData?.links || [];

  return (
    <header className={styles.header}>
      <div className={styles.logoWrap}>
        <Link href={`/${lang}`} className={styles.logo}>
          {navData?.logo ? (
            <img src={navData.logo} alt="Granatapfelkerne Logo" style={{ maxHeight: '60px', width: 'auto', display: 'block' }} />
          ) : (
            "Granatapfelkerne®"
          )}
        </Link>
      </div>
      <nav className={styles.nav}>
        <ul className={styles.menuLinks}>
          {links.map((link: any, idx: number) => (
            <li key={idx}>
              <Link href={`/${lang}${link.href === '/' ? '' : link.href}`}>{link.title}</Link>
            </li>
          ))}
        </ul>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <LanguageToggle currentLang={lang} />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
