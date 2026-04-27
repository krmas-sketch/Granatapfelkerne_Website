export default function VorteilePage({ params }: { params: { lang: string } }) {
  return (
    <main style={{ padding: '15rem 4rem', minHeight: '100vh' }}>
      <h1>{params.lang === 'de' ? 'Vorteile' : 'Benefits'}</h1>
      <p style={{ marginTop: '2rem' }}>
        {params.lang === 'de' 
          ? 'Hier entsteht die Vorteile-Seite...' 
          : 'The benefits page goes here...'}
      </p>
    </main>
  );
}
