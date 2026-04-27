'use client';

import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import styles from './VarietiesMap.module.css';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const VARIETIES = [
  {
    id: 'wonderful', name: 'Wonderful', origin: 'Spanien / Murcia', countryName: 'Spain',
    brix: [15.5, 18.5], hardness: 6.8, ph: 3.2,
    labL: 32, labA: 48, labB: 22,
    antho: 'hoch', purity: 99.2,
    season: 'Okt – Feb', avail: 'Ganzjährig (IQF)',
    certs: ['IFS Food v8', 'BRC', 'Bio auf Anfrage'],
    note: 'Tiefe Rubinfarbe. Höchster Anthocyangehalt. Benchmark für Industrieanwendungen.',
  },
  {
    id: 'hicaz', name: 'Hicaz', origin: 'Türkei / Antalya', countryName: 'Turkey',
    brix: [14.0, 16.5], hardness: 5.4, ph: 3.5,
    labL: 38, labA: 42, labB: 18,
    antho: 'mittel', purity: 98.8,
    season: 'Sep – Jan', avail: 'Saisonal',
    certs: ['IFS Food v8', 'Halal IFANCA'],
    note: 'Mildere Säure. Hellere Farbe. Ideal für Dessertanwendungen und Direktverzehr.',
  },
  {
    id: 'mollar', name: 'Mollar de Elche', origin: 'Spanien / Elche PDO', countryName: 'Spain',
    brix: [13.0, 15.0], hardness: 3.2, ph: 3.8,
    labL: 44, labA: 36, labB: 14,
    antho: 'niedrig', purity: 99.5,
    season: 'Sep – Nov', avail: 'Saisonal / begrenzt',
    certs: ['IFS Food v8', 'PDO-zertifiziert'],
    note: 'Weichste Textur. Niedrigste Säure. Bevorzugte Sorte für Getränkeanwendungen.',
  },
  {
    id: 'argentina', name: 'Wonderful (Südhalbkugel)', origin: 'Argentinien', countryName: 'Argentina',
    brix: [15.0, 18.0], hardness: 6.5, ph: 3.2,
    labL: 32, labA: 48, labB: 22,
    antho: 'hoch', purity: 99.2,
    season: 'März – Juli', avail: 'Saisonal / Off-Season',
    certs: ['GlobalG.A.P.', 'HACCP'],
    note: 'Sichert unsere ganzjährige Verfügbarkeit (Off-Season) bei konstanter Industrie-Qualität.',
  }
];

function Bar({ value, max = 20, color = 'var(--foreground)' }: { value: number, max?: number, color?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, position: 'relative' }}>
      <div style={{ flex: 1, height: 2, background: 'var(--grey)', opacity: 0.3 }} />
      <div style={{ position: 'absolute', width: `${(value / max) * 100}%`, height: 2, background: color, transition: 'width 0.5s ease' }} />
    </div>
  );
}

export default function VarietiesMap({ lang }: { lang: string }) {
  const [hoverRow, setHoverRow] = useState<number | null>(null);
  const [selectedCol, setSelectedCol] = useState('wonderful');

  const selectedVariety = VARIETIES.find(v => v.id === selectedCol) || VARIETIES[0];

  const params = [
    { key: 'brix', label: 'Brix-Wert (Bereich)', render: (v: typeof VARIETIES[0]) => (
      <div>
        <div style={{ fontSize: '12px', marginBottom: '4px', fontWeight: 500 }}>{v.brix[0]}–{v.brix[1]} °Bx</div>
        <Bar value={v.brix[1]} max={22} color="var(--foreground)" />
      </div>
    )},
    { key: 'hardness', label: 'Kernhärte Shore 1–10', render: (v: typeof VARIETIES[0]) => (
      <div>
        <div style={{ fontSize: '12px', marginBottom: '4px', fontWeight: 500 }}>{v.hardness}</div>
        <Bar value={v.hardness} max={10} color="var(--foreground)" />
      </div>
    )},
    { key: 'ph', label: 'pH-Wert', render: (v: typeof VARIETIES[0]) => <div style={{ fontSize: '12px', fontWeight: 500 }}>{v.ph}</div> },
    { key: 'lab', label: 'Farbe CIE L*a*b*', render: (v: typeof VARIETIES[0]) => {
      const r = Math.min(255, v.labA * 4 + 80), g = Math.max(0, 80 - v.labA), b2 = Math.max(0, v.labB - 10);
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 14, height: 14, background: `rgb(${r},${g},${b2})`, border: '1px solid var(--grey)', flexShrink: 0, borderRadius: '2px' }} />
          <div style={{ fontSize: '11px', fontWeight: 500 }}>{v.labL} / {v.labA} / {v.labB}</div>
        </div>
      );
    }},
    { key: 'antho', label: 'Anthocyan-Gehalt', render: (v: typeof VARIETIES[0]) => (
      <span style={{ fontSize: '12px', color: v.antho === 'hoch' ? 'var(--accent)' : 'var(--grey)', fontWeight: 500 }}>
        {v.antho.charAt(0).toUpperCase() + v.antho.slice(1)}
      </span>
    )},
    { key: 'purity', label: 'Sortenreinheit', render: (v: typeof VARIETIES[0]) => <div style={{ fontSize: '12px', fontWeight: 500 }}>{v.purity}%</div> },
    { key: 'season', label: 'Saison', render: (v: typeof VARIETIES[0]) => <span style={{ fontSize: '11px', color: 'var(--grey)', fontWeight: 500 }}>{v.season}</span> },
    { key: 'avail', label: 'Verfügbarkeit', render: (v: typeof VARIETIES[0]) => <span style={{ fontSize: '11px', fontWeight: 500 }}>{v.avail}</span> },
    { key: 'certs', label: 'Zertifikate', render: (v: typeof VARIETIES[0]) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {v.certs.map((c: string) => <span key={c} style={{ fontSize: '10px', letterSpacing: '0.05em', color: 'var(--grey)' }}>{c}</span>)}
      </div>
    )},
    { key: 'note', label: 'Anwendungsempfehlung', render: (v: typeof VARIETIES[0]) => (
      <span style={{ fontSize: '11px', color: 'var(--grey)', lineHeight: 1.4 }}>{v.note}</span>
    )},
  ];

  return (
    <section className={styles.section}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <span className={styles.subtitle}>02 — Sortenmatrix</span>
          <h2 className={styles.title}>
            Technische<br/>Spezifikation
          </h2>
        </div>
        
        {/* Small Interactive Map */}
        <div className={styles.mapContainer}>
          <ComposableMap 
            projection="geoMercator" 
            projectionConfig={{ scale: 65, center: [0, 20] }}
            style={{ width: "100%", height: "100%" }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const isHighlighted = geo.properties.name === selectedVariety.countryName;
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={isHighlighted ? "var(--accent)" : "var(--grey)"}
                      stroke="transparent"
                      style={{
                        default: { outline: "none", transition: "all 0.3s" },
                        hover: { outline: "none", fill: isHighlighted ? "var(--accent)" : "var(--grey)" },
                        pressed: { outline: "none" }
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        </div>

        <div className={styles.metaText}>
          <span style={{ display: 'block', marginBottom: '4px' }}>Alle Werte nach AOAC-Methodik</span>
          <span style={{ display: 'block' }}>Chargenprotokoll auf Anfrage · Probenahme ISO 2859-1</span>
        </div>
      </div>

      <div style={{ height: 1, background: 'var(--grey)', opacity: 0.3, marginBottom: '0' }} />

      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th} style={{ width: '20%', borderLeft: 'none' }}>
                <span className={styles.tdLabel}>Parameter</span>
              </th>
              {VARIETIES.map(v => (
                <th key={v.id} className={`${styles.th} ${selectedCol === v.id ? styles.selectedCol : ''}`} style={{ width: '20%' }} onClick={() => setSelectedCol(v.id)}>
                  <div className={styles.colName} style={{ color: selectedCol === v.id ? 'var(--accent)' : 'var(--foreground)' }}>
                    {v.name}
                  </div>
                  <span className={styles.colOrigin}>{v.origin}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {params.map((p, pi) => (
              <tr key={p.key}
                onMouseEnter={() => setHoverRow(pi)}
                onMouseLeave={() => setHoverRow(null)}
                className={hoverRow === pi ? styles.trHover : ''}>
                <td className={styles.td} style={{ borderLeft: 'none' }}>
                  <span className={styles.tdLabel}>{p.label}</span>
                </td>
                {VARIETIES.map(v => (
                  <td key={v.id} className={`${styles.td} ${selectedCol === v.id ? styles.selectedCol : ''}`}>
                    {p.render(v)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
