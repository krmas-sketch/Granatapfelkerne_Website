'use client';

import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import styles from './VarietiesMap.module.css';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const VARIETIES = [
  {
    id: 'wonderful',
    name: 'Wonderful',
    origin: 'Spanien / Murcia',
    countryName: 'Spain',
    brix: [15.5, 18.5],
    hardness: 6.8,
    ph: 3.2,
    labL: 32, labA: 48, labB: 22,
    antho: 'Hoch',
    purity: 99.2,
    season: 'Okt – Feb',
    avail: 'Ganzjährig (IQF)',
    certs: ['IFS Food v8', 'BRC', 'Bio auf Anfrage'],
    note: 'Tiefe Rubinfarbe. Höchster Anthocyangehalt. Benchmark für Industrieanwendungen.'
  },
  {
    id: 'hicaz',
    name: 'Hicaz',
    origin: 'Türkei / Antalya',
    countryName: 'Turkey',
    brix: [14.0, 16.5],
    hardness: 5.4,
    ph: 3.5,
    labL: 38, labA: 42, labB: 18,
    antho: 'Mittel',
    purity: 98.8,
    season: 'Sep – Jan',
    avail: 'Saisonal',
    certs: ['IFS Food v8', 'Halal IFANCA'],
    note: 'Mildere Säure. Hellere Farbe. Ideal für Dessertanwendungen und Direktverzehr.'
  },
  {
    id: 'mollar',
    name: 'Mollar de Elche',
    origin: 'Spanien / Elche PDO',
    countryName: 'Spain',
    brix: [13.0, 15.0],
    hardness: 3.2,
    ph: 3.8,
    labL: 44, labA: 36, labB: 14,
    antho: 'Niedrig',
    purity: 99.5,
    season: 'Sep – Nov',
    avail: 'Saisonal / begrenzt',
    certs: ['IFS Food v8', 'PDO-zertifiziert'],
    note: 'Weichste Textur. Niedrigste Säure. Bevorzugte Sorte für Getränkeanwendungen.'
  },
  {
    id: 'argentina',
    name: 'Wonderful (Südhalbkugel)',
    origin: 'Argentinien',
    countryName: 'Argentina',
    brix: [15.0, 18.0],
    hardness: 6.5,
    ph: 3.2,
    labL: 33, labA: 46, labB: 20,
    antho: 'Hoch',
    purity: 99.0,
    season: 'März – Juli',
    avail: 'Ganzjährig (IQF)',
    certs: ['IFS Food v8', 'BRC'],
    note: 'Sichert unsere ganzjährige Verfügbarkeit (Off-Season).'
  }
];

function Bar({ value, max = 20, color = 'var(--foreground)' }: { value: number, max?: number, color?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: '8px' }}>
      <div style={{ flex: 1, height: 2, background: 'var(--grey)', position: 'relative', opacity: 0.3 }}></div>
      <div style={{ position: 'absolute', width: `${(value / max) * 100}%`, height: 2, background: color, transition: 'width 0.5s ease' }}></div>
    </div>
  );
}

export default function VarietiesMap({ lang }: { lang: string }) {
  const [selectedId, setSelectedId] = useState(VARIETIES[0].id);
  const selectedVariety = VARIETIES.find(v => v.id === selectedId) || VARIETIES[0];

  const r = Math.min(255, selectedVariety.labA * 4 + 80);
  const g = Math.max(0, 80 - selectedVariety.labA);
  const b2 = Math.max(0, selectedVariety.labB - 10);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <p className={styles.preTitle}>02 — {lang === 'de' ? 'Sortenmatrix' : 'Varieties Matrix'}</p>
        <h2>{lang === 'de' ? 'Technische Spezifikation' : 'Technical Specification'}</h2>
      </div>

      <div className={styles.grid}>
        {/* Left column: Selector and Data Table */}
        <div className={styles.dataCol}>
          <div className={styles.tabs}>
            {VARIETIES.map((v) => (
              <button 
                key={v.id} 
                className={`${styles.tab} ${selectedId === v.id ? styles.activeTab : ''}`}
                onClick={() => setSelectedId(v.id)}
              >
                {v.name}
              </button>
            ))}
          </div>

          <div className={styles.specTable}>
            {/* Table Header */}
            <div className={styles.tableRow}>
              <div className={styles.labelCol}>
                <span className={styles.label}>Parameter</span>
              </div>
              <div className={styles.valCol}>
                <div className={styles.varietyHeader}>
                  <span className={styles.varietyName}>{selectedVariety.name}</span>
                  <span className={styles.varietyOrigin}>{selectedVariety.origin}</span>
                </div>
              </div>
            </div>

            {/* Rows */}
            <div className={styles.tableRow}>
              <div className={styles.labelCol}><span className={styles.label}>Brix-Wert (Bereich)</span></div>
              <div className={styles.valCol}>
                <div className={styles.valText}>{selectedVariety.brix[0]}–{selectedVariety.brix[1]} °Bx</div>
                <div style={{ position: 'relative', width: '100%', maxWidth: '200px' }}>
                  <Bar value={selectedVariety.brix[1]} max={22} color="var(--accent)" />
                </div>
              </div>
            </div>

            <div className={styles.tableRow}>
              <div className={styles.labelCol}><span className={styles.label}>Kernhärte Shore 1-10</span></div>
              <div className={styles.valCol}>
                <div className={styles.valText}>{selectedVariety.hardness}</div>
                <div style={{ position: 'relative', width: '100%', maxWidth: '200px' }}>
                  <Bar value={selectedVariety.hardness} max={10} color="var(--foreground)" />
                </div>
              </div>
            </div>

            <div className={styles.tableRow}>
              <div className={styles.labelCol}><span className={styles.label}>pH-Wert</span></div>
              <div className={styles.valCol}><div className={styles.valText}>{selectedVariety.ph}</div></div>
            </div>

            <div className={styles.tableRow}>
              <div className={styles.labelCol}><span className={styles.label}>Farbe CIE L*a*b*</span></div>
              <div className={styles.valCol} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: 16, height: 16, background: `rgb(${r},${g},${b2})`, border: '1px solid var(--grey)' }} />
                <div className={styles.valText}>{selectedVariety.labL} / {selectedVariety.labA} / {selectedVariety.labB}</div>
              </div>
            </div>

            <div className={styles.tableRow}>
              <div className={styles.labelCol}><span className={styles.label}>Anthocyan-Gehalt</span></div>
              <div className={styles.valCol}>
                <div className={styles.valText} style={{ color: selectedVariety.antho === 'Hoch' ? 'var(--accent)' : 'inherit' }}>
                  {selectedVariety.antho}
                </div>
              </div>
            </div>

            <div className={styles.tableRow}>
              <div className={styles.labelCol}><span className={styles.label}>Sortenreinheit</span></div>
              <div className={styles.valCol}><div className={styles.valText}>{selectedVariety.purity}%</div></div>
            </div>

            <div className={styles.tableRow}>
              <div className={styles.labelCol}><span className={styles.label}>Saison</span></div>
              <div className={styles.valCol}><div className={styles.valText} style={{ opacity: 0.7 }}>{selectedVariety.season}</div></div>
            </div>

            <div className={styles.tableRow}>
              <div className={styles.labelCol}><span className={styles.label}>Verfügbarkeit</span></div>
              <div className={styles.valCol}><div className={styles.valText}>{selectedVariety.avail}</div></div>
            </div>

            <div className={styles.tableRow}>
              <div className={styles.labelCol}><span className={styles.label}>Zertifikate</span></div>
              <div className={styles.valCol}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {selectedVariety.certs.map(c => (
                    <span key={c} className={styles.certBadge}>{c}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.tableRow} style={{ borderBottom: 'none' }}>
              <div className={styles.labelCol}><span className={styles.label}>Anwendungsempfehlung</span></div>
              <div className={styles.valCol}>
                <div className={styles.valText} style={{ opacity: 0.7, lineHeight: 1.5 }}>{selectedVariety.note}</div>
              </div>
            </div>

          </div>
        </div>

        {/* Right column: Map */}
        <div className={styles.mapCol}>
          <ComposableMap 
            projection="geoMercator" 
            projectionConfig={{ scale: 120, center: [0, 20] }}
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
                      fill={isHighlighted ? "var(--accent)" : "var(--background)"}
                      stroke={isHighlighted ? "var(--accent)" : "var(--grey)"}
                      strokeWidth={isHighlighted ? 0 : 0.5}
                      style={{
                        default: { outline: "none", transition: "all 0.3s" },
                        hover: { outline: "none", fill: isHighlighted ? "var(--accent)" : "var(--grey)", opacity: 0.8 },
                        pressed: { outline: "none" }
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        </div>
      </div>
    </section>
  );
}
