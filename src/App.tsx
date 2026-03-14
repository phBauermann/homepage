import { useState } from "react";

const posts = [
  {
    id: "erste-schritte",
    title: "Erste Schritte: Von lokal zu CI/CD",
    date: "2026-03-13",
    summary: "Wie diese kleine Seite entstanden ist und warum alles direkt im Container läuft.",
    body: [
      "Diese Seite ist als Spielwiese gestartet, um moderne Entwicklung mit Containern, CI/CD und einem einfachen Deployment bei Render zu üben.",
      "Der komplette Workflow ist: lokal im Container entwickeln, über Git-Branches arbeiten, Pull Requests öffnen, CI durchlaufen lassen und anschließend automatisch deployen."
    ]
  },
  {
    id: "deployment-automatisiert",
    title: "Automatisches Deployment mit GitHub Actions",
    date: "2026-03-13",
    summary: "Jeder Merge in main löst Build, Image-Bau und Deployment aus.",
    body: [
      "Sobald ein Pull Request in den main-Branch gemergt wird, läuft die Pipeline durch: Lint, Build und Docker-Image-Build.",
      "Render holt sich anschließend den aktuellen Stand aus dem Repository und deployed die neue Version."
    ]
  }
] as const;

type Post = (typeof posts)[number];

function PostList({
  onSelect
}: {
  onSelect: (post: Post) => void;
}) {
  return (
    <section className="card">
      <h2>Blog</h2>
      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.id} className="post-list-item" onClick={() => onSelect(post)}>
            <h3>{post.title}</h3>
            <p className="post-meta">{post.date}</p>
            <p className="post-summary">{post.summary}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function PostDetail({
  post,
  onBack
}: {
  post: Post;
  onBack: () => void;
}) {
  return (
    <section className="card">
      <button type="button" className="back-button" onClick={onBack}>
        ← Zurück zur Übersicht
      </button>
      <h2>{post.title}</h2>
      <p className="post-meta">{post.date}</p>
      {post.body.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </section>
  );
}

export function App() {
  const [activePost, setActivePost] = useState<Post | null>(null);

  return (
    <main className="page">
      <header className="hero">
        <h1>Mein kleines Dev-Blog</h1>
        <p>
          Notizen zu Containern, CI/CD und allem, was hier nach und nach entsteht.
        </p>
      </header>

      {activePost ? (
        <PostDetail post={activePost} onBack={() => setActivePost(null)} />
      ) : (
        <PostList onSelect={setActivePost} />
      )}
    </main>
  );
}


