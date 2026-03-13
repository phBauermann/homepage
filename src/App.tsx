export function App() {
  return (
    <main className="page">
      <header className="hero">
        <h1>Homepage</h1>
        <p>Container-first Setup mit CI/CD als Ausgangspunkt.</p>
      </header>

      <section className="card">
        <h2>Was jetzt schon steht</h2>
        <ul>
          <li>Dev läuft ausschließlich via Docker Compose</li>
          <li>CI baut & prüft (Lint/Build) in GitHub Actions</li>
          <li>Optional: Docker Image Build/Publish nach GHCR</li>
        </ul>
      </section>
    </main>
  );
}

