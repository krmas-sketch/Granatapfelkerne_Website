'use client';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hoverText, setHoverText] = useState<string | null>(null);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverData = target.closest('[data-hover]')?.getAttribute('data-hover');
      if (hoverData) {
        setHoverText(hoverData);
      } else {
        setHoverText(null);
      }
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
      animate={{
        x: position.x - 15, // center offset
        y: position.y - 15,
        scale: hoverText ? 3 : 1,
      }}
      transition={{ type: 'spring', stiffness: 250, damping: 20, mass: 0.5 }}
    >
      <div style={{
        width: '30px',
        height: '30px',
        backgroundColor: hoverText ? 'var(--accent)' : 'var(--foreground)',
        borderRadius: '50%',
        mixBlendMode: 'difference',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '4px', // scales with Framer motion
        textAlign: 'center',
        opacity: hoverText ? 0.8 : 0,
        transition: 'background-color 0.3s, opacity 0.3s'
      }}>
        {hoverText && <span style={{ transform: 'scale(0.33)' }}>{hoverText}</span>}
      </div>
    </motion.div>
  );
}
