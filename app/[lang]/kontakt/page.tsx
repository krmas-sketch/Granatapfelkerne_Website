export default function KontaktPage({ params }: { params: { lang: string } }) {
  return (
    <main style={{ padding: '15rem 4rem', minHeight: '100vh' }}>
      <h1>{params.lang === 'de' ? 'Kontakt' : 'Contact'}</h1>
      <p style={{ marginTop: '2rem' }}>
        {params.lang === 'de' 
          ? 'Hier entsteht die Kontaktseite...' 
          : 'The contact page goes here...'}
      </p>
    </main>
  );
}
