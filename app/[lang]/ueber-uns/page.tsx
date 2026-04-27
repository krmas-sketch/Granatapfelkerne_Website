export default function UeberUnsPage({ params }: { params: { lang: string } }) {
  return (
    <main style={{ padding: '15rem 4rem', minHeight: '100vh' }}>
      <h1>{params.lang === 'de' ? 'Über Uns' : 'About Us'}</h1>
      <p style={{ marginTop: '2rem' }}>
        {params.lang === 'de' 
          ? 'Hier entsteht die Über-Uns-Seite...' 
          : 'The about us page goes here...'}
      </p>
    </main>
  );
}
