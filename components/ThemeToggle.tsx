'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      style={{
        background: 'none',
        border: '1px solid var(--foreground)',
        color: 'var(--foreground)',
        padding: '0.3rem 0.6rem',
        borderRadius: '99px',
        cursor: 'pointer',
        fontSize: '0.8rem',
        marginLeft: '1rem',
        textTransform: 'uppercase'
      }}
    >
      {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}
