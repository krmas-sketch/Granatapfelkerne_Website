export default function JsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'FrischFrucht GmbH',
    image: '',
    url: 'https://granatapfelkerne.de',
    telephone: '+49 123 456789',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Musterstraße 1',
      addressLocality: 'Hamburg',
      postalCode: '20095',
      addressCountry: 'DE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 53.551086,
      longitude: 9.993682,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
