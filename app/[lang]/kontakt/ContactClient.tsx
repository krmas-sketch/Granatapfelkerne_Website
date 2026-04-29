'use client';

import React, { useState } from 'react';
import styles from './page.module.css';

export default function ContactClient({ navData, lang }: { navData: any, lang: string }) {
  const [status, setStatus] = useState<'idle' | 'submitted'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In the future, this is where we would send the payload to an email service.
    // For now, we simulate a successful submission.
    setStatus('submitted');
  };

  const t = {
    title: lang === 'de' ? 'Kontakt' : 'Contact Us',
    name: lang === 'de' ? 'Vorname' : 'First Name',
    surname: lang === 'de' ? 'Nachname' : 'Surname',
    company: lang === 'de' ? 'Firma' : 'Company',
    email: 'E-Mail',
    phone: lang === 'de' ? 'Telefon (Optional)' : 'Phone (Optional)',
    message: lang === 'de' ? 'Nachricht' : 'Message',
    submit: lang === 'de' ? 'Senden' : 'Submit',
    success: lang === 'de' ? 'Vielen Dank für Ihre Nachricht. Wir werden uns in Kürze bei Ihnen melden.' : 'Thank you for your message. We will get back to you shortly.',
    headquarters: lang === 'de' ? 'Hauptsitz' : 'Headquarters',
    inquiries: lang === 'de' ? 'Anfragen' : 'Inquiries',
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>{t.title}</h1>
      
      <div className={styles.grid}>
        {/* Contact Info Column */}
        <div className={styles.infoCol}>
          <div className={styles.infoBlock}>
            <h3>{t.inquiries}</h3>
            <p>
              <a href={`mailto:${navData?.email || 'hallo@granatapfelkerne.de'}`}>
                {navData?.email || 'hallo@granatapfelkerne.de'}
              </a>
            </p>
            {navData?.phone && (
              <p style={{ marginTop: '0.5rem' }}>
                <a href={`tel:${navData.phone.replace(/\s+/g, '')}`}>
                  {navData.phone}
                </a>
              </p>
            )}
          </div>
          
          <div className={styles.infoBlock}>
            <h3>{t.headquarters}</h3>
            <p style={{ whiteSpace: 'pre-line' }}>
              {navData?.address || 'Musterstraße 1\n20095 Hamburg\nDeutschland'}
            </p>
          </div>
        </div>

        {/* Form Column */}
        <div className={styles.formCol}>
          {status === 'submitted' ? (
            <div className={styles.successMsg}>
              {t.success}
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className={styles.formGrid}>
                
                <div className={styles.inputGroup}>
                  <label htmlFor="firstName">{t.name}</label>
                  <input type="text" id="firstName" name="firstName" className={styles.input} required />
                </div>
                
                <div className={styles.inputGroup}>
                  <label htmlFor="lastName">{t.surname}</label>
                  <input type="text" id="lastName" name="lastName" className={styles.input} required />
                </div>

                <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                  <label htmlFor="company">{t.company}</label>
                  <input type="text" id="company" name="company" className={styles.input} required />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="email">{t.email}</label>
                  <input type="email" id="email" name="email" className={styles.input} required />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="phone">{t.phone}</label>
                  <input type="tel" id="phone" name="phone" className={styles.input} />
                </div>

                <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                  <label htmlFor="message">{t.message}</label>
                  <textarea id="message" name="message" className={styles.textarea} required></textarea>
                </div>

              </div>

              <button type="submit" className={styles.submitBtn}>
                {t.submit}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
