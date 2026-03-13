export function App() {
  return (
    <main className="page">
      <header className="hero">
        <h1>News</h1>
        <p>mein Kleines Heimprojekt</p>
      </header>

      <section className="card">
        <h2>Was jetzt schon steht</h2>
        <ul>
          <li>Dev läuft ausschließlich via Docker Compose</li>
          <li>CI baut & prüft (Lint/Build) in GitHub Actions</li>
          <li>Optional: Docker Image Build/Publish nach GHCR</li>
        </ul>

        <h2>Ausgangssituation</h2>
        <ul>
                 <li><   Container-first Setup mit CI/CD als Ausgangspunkt. </li>
          </ul>


      </section>
    </main>
  );
}

