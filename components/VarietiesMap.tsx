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
    brix: '15.5–18.5 °Bx',
    hardness: '6.8 / 10',
    color: 'Tiefe Rubinfarbe',
    note: 'Höchster Anthocyangehalt. Benchmark für Industrieanwendungen.'
  },
  {
    id: 'hicaz',
    name: 'Hicaz',
    origin: 'Türkei / Antalya',
    countryName: 'Turkey',
    brix: '14.0–16.5 °Bx',
    hardness: '5.4 / 10',
    color: 'Hellere rote Farbe',
    note: 'Mildere Säure. Ideal für Dessertanwendungen und Direktverzehr.'
  },
  {
    id: 'mollar',
    name: 'Mollar de Elche',
    origin: 'Spanien / Elche PDO',
    countryName: 'Spain',
    brix: '13.0–15.0 °Bx',
    hardness: '3.2 / 10',
    color: 'Hellere rosa-rote Farbe',
    note: 'Weichste Textur. Niedrigste Säure. Bevorzugte Sorte für Getränkeanwendungen.'
  },
  {
    id: 'argentina',
    name: 'Wonderful (Südhalbkugel)',
    origin: 'Argentinien',
    countryName: 'Argentina',
    brix: '15.0–18.0 °Bx',
    hardness: '6.5 / 10',
    color: 'Tiefe Rubinfarbe',
    note: 'Sichert unsere ganzjährige Verfügbarkeit (Off-Season).'
  }
];

export default function VarietiesMap({ lang }: { lang: string }) {
  const [selectedId, setSelectedId] = useState(VARIETIES[0].id);

  const selectedVariety = VARIETIES.find(v => v.id === selectedId) || VARIETIES[0];

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2>{lang === 'de' ? 'Sortenmatrix & Herkunft' : 'Varieties & Origin'}</h2>
        <p>{lang === 'de' ? 'Wählen Sie eine Sorte, um spezifische Eigenschaften und das Herkunftsland auf der Weltkarte zu sehen.' : 'Select a variety to view its specific properties and origin on the world map.'}</p>
      </div>

      <div className={styles.grid}>
        {/* Left column: Selector and Data */}
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

          <div className={styles.detailsCard}>
            <div className={styles.detailRow}>
              <span className={styles.label}>{lang === 'de' ? 'Herkunft' : 'Origin'}</span>
              <span className={styles.value} style={{ color: 'var(--accent)', fontWeight: 'bold' }}>{selectedVariety.origin}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.label}>Brix-Wert</span>
              <span className={styles.value}>{selectedVariety.brix}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.label}>{lang === 'de' ? 'Kernhärte (1-10)' : 'Hardness (1-10)'}</span>
              <span className={styles.value}>{selectedVariety.hardness}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.label}>{lang === 'de' ? 'Farbe' : 'Color'}</span>
              <span className={styles.value}>{selectedVariety.color}</span>
            </div>
            <div className={styles.detailRow} style={{ borderBottom: 'none', flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
              <span className={styles.label}>{lang === 'de' ? 'Anwendungsempfehlung' : 'Application Note'}</span>
              <span className={styles.value}>{selectedVariety.note}</span>
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
                      fill={isHighlighted ? "var(--accent)" : "var(--grey)"}
                      stroke="var(--background)"
                      strokeWidth={0.5}
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
