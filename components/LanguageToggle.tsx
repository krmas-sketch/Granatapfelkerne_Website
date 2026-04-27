'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function LanguageToggle({ currentLang }: { currentLang: string }) {
  const pathname = usePathname();

  const getSwitchUrl = (newLang: string) => {
    if (!pathname) return `/${newLang}`;
    const segments = pathname.split('/');
    if (segments.length > 1) {
      segments[1] = newLang;
    }
    return segments.join('/') || `/${newLang}`;
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: '1rem', fontSize: '0.8rem', textTransform: 'uppercase' }}>
      <Link 
        href={getSwitchUrl('de')}
        style={{ 
          opacity: currentLang === 'de' ? 1 : 0.5,
          fontWeight: currentLang === 'de' ? 'bold' : 'normal',
          textDecoration: 'none'
        }}
      >
        DE
      </Link>
      <span>|</span>
      <Link 
        href={getSwitchUrl('en')}
        style={{ 
          opacity: currentLang === 'en' ? 1 : 0.5,
          fontWeight: currentLang === 'en' ? 'bold' : 'normal',
          textDecoration: 'none'
        }}
      >
        EN
      </Link>
    </div>
  );
}
