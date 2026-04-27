import Link from 'next/link';
import styles from './Header.module.css';
import { getMarkdownContent } from '../lib/markdown';

export default async function Header({ lang }: { lang: string }) {
  const navData = await getMarkdownContent(['global', 'navigation'], lang);
  const links = navData?.links || [];

  return (
    <header className={styles.header}>
      <div className={styles.logoWrap}>
        <Link href={`/${lang}`} className={styles.logo}>Granatapfelkerne®</Link>
      </div>
      <nav className={styles.nav}>
        <ul className={styles.menuLinks}>
          {links.map((link: any, idx: number) => (
            <li key={idx}>
              <Link href={`/${lang}${link.href === '/' ? '' : link.href}`}>{link.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
