import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ReactMarkdown from 'react-markdown';
import yaml from 'js-yaml';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import coverImage from "./minimal-modern-cover-illustration-for.png";
import deploymentImage from "./deployment-github-actions.png";
import startIdeaImage from "./start idea.png";
import coverPost from './posts/coverbild.md?raw';
import deploymentPost from './posts/deployment-automatisiert.md?raw';
import ersteSchrittePost from './posts/erste-schritte.md?raw';

/** Einzelner Blog-Post – alle Felder außer den optionalen sind Pflicht. */
export type Post = {
  /** Eindeutige ID, wird z.B. für URLs genutzt (slug). */
  id: string;
  /** Anzeigetitel. */
  title: string;
  /** Veröffentlichungsdatum (ISO 8601, z.B. "2026-03-13"). */
  date: string;
  /** Kurzfassung für die Listenansicht. */
  summary: string;
  /** Fließtext des Artikels als Markdown. */
  body: string;
  /** Optional: Vorschaubild für die Listenkarte (Import von Bilddatei). */
  previewImage?: string;
  /** Optional: Code/Prompt zum Anzeigen in einem Codeblock mit Copy-Button. */
  prompt?: string;
  /** Optional: Tags für Filterung/Kategorien (z.B. "CI/CD", "Docker"). */
  tags?: string[];
};

function parsePost(md: string, previewImage?: string): Post {
  const parts = md.split('---');
  if (parts.length < 3) throw new Error('Invalid frontmatter');
  const frontmatter = parts[1].trim();
  const body = parts.slice(2).join('---').trim();
  const attributes = yaml.load(frontmatter, { schema: yaml.FAILSAFE_SCHEMA }) as Record<string, unknown>;
  return {
    ...attributes,
    body,
    previewImage,
  } as Post;
}

const posts: Post[] = [
  parsePost(coverPost, coverImage),
  parsePost(deploymentPost, deploymentImage),
  parsePost(ersteSchrittePost, startIdeaImage),
];

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

function PostList() {
  const navigate = useNavigate();
  return (
    <section className="card">
      <h2>Blog</h2>
      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.id} className="post-list-item" onClick={() => navigate(`/post/${post.id}`)}>
            <div className="post-list-item-preview">
              {post.previewImage ? (
                <img
                  src={post.previewImage}
                  alt=""
                  className="post-list-item-preview-img"
                />
              ) : (
                <div className="post-list-item-preview-placeholder" aria-hidden />
              )}
            </div>
            <div className="post-list-item-content">
              <div className="post-list-item-meta">
                <span className="post-date">{post.date}</span>
                {post.tags && post.tags.length > 0 ? (
                  <span className="post-tags">
                    {post.tags.map((tag) => (
                      <span key={tag} className="post-tag">
                        {tag}
                      </span>
                    ))}
                  </span>
                ) : null}
              </div>
              <h3>{post.title}</h3>
              <p className="post-summary">{post.summary}</p>
            </div>
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
      <div className="post-detail-meta">
        <span className="post-date">{post.date}</span>
        {post.tags && post.tags.length > 0 ? (
          <span className="post-tags">
            {post.tags.map((tag) => (
              <span key={tag} className="post-tag">
                {tag}
              </span>
            ))}
          </span>
        ) : null}
      </div>
      <ReactMarkdown>{post.body}</ReactMarkdown>
      {post.prompt ? <CodeBlock code={post.prompt} /> : null}
    </section>
  );
}

function PostDetailRoute() {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find(p => p.id === id);
  if (!post) return <div>Post not found</div>;
  return <PostDetail post={post} onBack={() => navigate('/')} />;
}

export function App() {
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
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/post/:id" element={<PostDetailRoute />} />
      </Routes>
    </main>
  );
}


