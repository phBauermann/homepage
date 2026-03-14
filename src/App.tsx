import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CopyToClipboard } from "react-copy-to-clipboard";
import coverImage from "./minimal-modern-cover-illustration-for.png";

const posts = [
  {
    id: "coverbild",
    title: "Neues Coverbild für das Dev-Blog",
    date: "2026-03-13",
    summary:
      "Ein eigenes Titelbild, das perfekt zu Containern, CI/CD und dem dunklen Theme passt.",
    body: [
      "Das Dev-Blog hat jetzt ein eigenes Coverbild, das sich optisch in das dunkle, leicht futuristische Farbschema der Seite einfügt.",
      "Das Bild sitzt oben über der Überschrift, füllt den kompletten Hero-Block und wird per CSS so zugeschnitten, dass der spannende Mittelteil im Fokus steht.",
      "Verwendeter Prompt (Englisch):"
    ],
    prompt:
      "Minimal, modern cover illustration for a personal developer blog homepage. Dark, slightly futuristic color palette with deep navy blue and subtle neon blue accents. In the center, a stylized abstract container icon (similar to a shipping container, no logo) and a soft glowing CI/CD flow arrow from “Code” to “Build” to “Deploy”. Flat vector style, clean lines, no people, no text. Background with a soft radial gradient, designed to match a sleek developer website hero section."
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
  },
  {
    id: "erste-schritte",
    title: "Erste Schritte: Von lokal zu CI/CD",
    date: "2026-03-13",
    summary:
      "Wie diese kleine Seite entstanden ist und warum alles direkt im Container läuft.",
    body: [
      "Diese Seite ist als Spielwiese gestartet, um moderne Entwicklung mit Containern, CI/CD und einem einfachen Deployment bei Render zu üben.",
      "Der komplette Workflow ist: lokal im Container entwickeln, über Git-Branches arbeiten, Pull Requests öffnen, CI durchlaufen lassen und anschließend automatisch deployen."
    ]
  }
] as const;

type Post = (typeof posts)[number];

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="code-block">
      <div className="code-block-header">
        <span className="code-block-label">Prompt</span>
        <CopyToClipboard
          text={code}
          onCopy={() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
        >
          <button type="button" className="code-copy-button">
            {copied ? "Copied" : "Copy"}
          </button>
        </CopyToClipboard>
      </div>
      <SyntaxHighlighter
        language="text"
        style={tomorrow}
        customStyle={{
          margin: 0,
          background: "transparent",
          padding: "8px 0 0",
          fontSize: "13px"
        }}
        wrapLongLines
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

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
      {"prompt" in post && post.prompt ? <CodeBlock code={post.prompt} /> : null}
    </section>
  );
}

export function App() {
  const [activePost, setActivePost] = useState<Post | null>(null);

  return (
    <main className="page">
      <header className="hero">
        <div className="hero-image-wrapper">
          <img
            src={coverImage}
            alt="Abstrakte Illustration zu Containern und CI/CD"
            className="hero-image"
          />
        </div>
        <div className="hero-text">
          <h1>Mein kleines Dev-Blog</h1>
          <p>
            Notizen zu Containern, CI/CD und allem, was hier nach und nach entsteht.
          </p>
        </div>
      </header>

      {activePost ? (
        <PostDetail post={activePost} onBack={() => setActivePost(null)} />
      ) : (
        <PostList onSelect={setActivePost} />
      )}
    </main>
  );
}


