import { useState, useEffect } from "react";

const GH_USER = "Bhushan-git20";

const NAME_DATA = (() => {
  const lines = ["DAMISETTI", "BHUSHANAM"];
  let i = 0;
  return lines.map(line =>
    line.split("").map(ch => ({ ch, delay: `${(0.65 + i++ * 0.05).toFixed(2)}s` }))
  );
})();

const PROJECTS = [
  {
    id: 0, featured: true,
    name: "MindCare",
    badge: "Published · GCCMIEA Dec 2025",
    desc: "AI-powered mental wellness platform with personalised resources, real-time support, and emotional tracking. Deployed on AWS with Docker.",
    tech: ["React", "TypeScript", "FastAPI", "PostgreSQL", "Gemini API", "Docker", "AWS"],
    link: "https://github.com/Bhushan-git20/mindful-pathways",
  },
  {
    id: 1,
    name: "Job Automation Pipeline",
    desc: "n8n workflow that scrapes live job listings, scores them with Gemini AI, and delivers filtered matches to Telegram with zero manual effort.",
    tech: ["n8n", "Gemini", "Groq", "Docker", "Google Sheets", "Apify"],
    link: "https://github.com/Bhushan-git20/job-automation-pipeline",
  },
  {
    id: 2,
    name: "PDF RAG Chatbot",
    desc: "Multi-PDF conversational AI with semantic search, source attribution, and persistent chat history — built with LangChain and ChromaDB.",
    tech: ["Python", "LangChain", "ChromaDB", "Gemini 2.5 Flash", "Streamlit", "HuggingFace"],
    link: "https://github.com/Bhushan-git20/pdf-rag-chatbot",
  },
  {
    id: 3,
    name: "Ollive",
    desc: "Built a custom AI agent deployed directly to Hugging Face Spaces for free, scalable public access.",
    tech: ["Python", "HuggingFace Spaces", "Gradio", "LLM APIs"],
    link: "https://github.com/Bhushan-git20/ollive-ai-assistant",
  },
  {
    id: 4,
    name: "HireReady",
    desc: "AI-powered open-source job application intelligence platform featuring predictive job fit scoring, real-time market insights, and STAR framework interview preparation.",
    tech: ["React", "TypeScript", "Supabase", "Gemini 2.5 Flash", "Tailwind CSS"],
    link: "https://github.com/Bhushan-git20/hireready"
  }
];

const SKILLS = [
  { cat: "Languages",    items: ["Java SE 11", "Python", "JavaScript", "TypeScript"] },
  { cat: "Frontend",     items: ["React", "Tailwind CSS", "HTML5", "CSS3"] },
  { cat: "Backend",      items: ["FastAPI", "Node.js", "Express.js", "PostgreSQL"] },
  { cat: "AI / ML",      items: ["LangChain", "ChromaDB", "Gemini API", "n8n", "Groq"] },
  { cat: "Cloud / DevOps", items: ["Docker", "AWS EC2/S3", "Git", "Vercel", "Supabase"] },
];

const CERTS = [
  "Java SE 11 Developer · Infosys Springboard",
  "Generative AI Studio · IBM SkillsBuild",
  "Web Design Fundamentals · IBM SkillsBuild",
];

const PIPELINE = [
  { label: "Remotive API",  sub: "200+ jobs fetched",          dot: "#1a3a1a" },
  { label: "n8n Workflow",  sub: "Orchestrate + deduplicate",  dot: "#1a1a3a" },
  { label: "Gemini 2.5",   sub: "LLM scoring per listing",    dot: "#2d1a0a" },
  { label: "Score Filter",  sub: "Threshold 50+ only",         dot: "#2a1a2a" },
  { label: "Telegram",      sub: "12 matches delivered",       dot: "#1a3a1a" },
];

export default function Portfolio() {
  const [ghStats, setGhStats] = useState(null);

  useEffect(() => {
    const fonts = [
      "https://cdn.jsdelivr.net/npm/@fontsource/bebas-neue@5/index.css",
      "https://cdn.jsdelivr.net/npm/@fontsource/dm-sans@5/index.css",
    ];
    fonts.forEach(href => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        document.head.appendChild(link);
      }
    });

    const startObserver = () => {
      const obs = new IntersectionObserver(
        entries => entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); }
        }),
        { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
      );
      document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
      return obs;
    };

    const obs = startObserver();

    fetch(`https://api.github.com/users/${GH_USER}`)
      .then(r => r.json())
      .then(data => { setGhStats(data); setTimeout(startObserver, 100); })
      .catch(() => {});

    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{CSS}</style>

      {/* ── NAV ── */}
      <nav>
        <span className="nav-logo">Bhushan</span>
        <div className="nav-links">
          {[["#home","Home"],["#work","Work"],["#about","About"],["#contact","Contact"]].map(([href, label]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="home" className="hero-section">
        <p className="hero-intro">Introducing</p>
        <h1 className="hero-name">
          {NAME_DATA.map((line, li) => (
            <div key={li} className="hero-line">
              {line.map(({ ch, delay }) => (
                <span key={delay} className="hero-letter" style={{ animationDelay: delay }}>{ch}</span>
              ))}
            </div>
          ))}
        </h1>
        <p className="hero-tagline">
          AI Engineer · Full Stack Developer · <em>MCA Graduate 2026</em>
        </p>
        <div className="scroll-hint">
          <span>Scroll</span>
          <div className="scroll-bar" />
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="work" className="section" style={{ background: "#080808" }}>
        <p className="section-label reveal">Selected Work</p>
        <h2 className="section-title reveal">Projects</h2>
        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <div
              key={p.id}
              className={`project-card reveal${p.featured ? " featured" : ""}`}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div className="project-body">
                {p.badge && <span className="project-badge">{p.badge}</span>}
                <h3 className="project-name">{p.name}</h3>
                <p className="project-desc">{p.desc}</p>
                <div className="project-tech">
                  {p.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
                </div>
                {p.id === 1 && (
                  <svg viewBox="0 0 340 90" xmlns="http://www.w3.org/2000/svg" className="arch-svg arch-svg-sm">
                    <rect x="0"   y="20" width="55" height="28" rx="2" fill="none" stroke="#1a1a1a" strokeWidth="1"/>
                    <text x="27"  y="32" textAnchor="middle" fill="#2a2a2a" fontSize="6.5" fontFamily="monospace">Remotive</text>
                    <text x="27"  y="42" textAnchor="middle" fill="#1a1a1a" fontSize="5.5" fontFamily="monospace">API Source</text>

                    <rect x="70"  y="20" width="55" height="28" rx="2" fill="none" stroke="#1a1a2a" strokeWidth="1"/>
                    <text x="97"  y="32" textAnchor="middle" fill="#2a2a4a" fontSize="6.5" fontFamily="monospace">n8n</text>
                    <text x="97"  y="42" textAnchor="middle" fill="#1a1a2a" fontSize="5.5" fontFamily="monospace">Orchestrate</text>

                    <rect x="140" y="20" width="55" height="28" rx="2" fill="none" stroke="#1a3a1a" strokeWidth="1"/>
                    <text x="167" y="32" textAnchor="middle" fill="#2d5a2d" fontSize="6.5" fontFamily="monospace">Gemini AI</text>
                    <text x="167" y="42" textAnchor="middle" fill="#1a2a1a" fontSize="5.5" fontFamily="monospace">LLM Score</text>

                    <rect x="210" y="20" width="55" height="28" rx="2" fill="none" stroke="#1a1a1a" strokeWidth="1"/>
                    <text x="237" y="32" textAnchor="middle" fill="#2a2a2a" fontSize="6.5" fontFamily="monospace">Filter 50+</text>
                    <text x="237" y="42" textAnchor="middle" fill="#1a1a1a" fontSize="5.5" fontFamily="monospace">Threshold</text>

                    <rect x="280" y="20" width="55" height="28" rx="2" fill="none" stroke="#1a3a1a" strokeWidth="1"/>
                    <text x="307" y="32" textAnchor="middle" fill="#2d5a2d" fontSize="6.5" fontFamily="monospace">Telegram</text>
                    <text x="307" y="42" textAnchor="middle" fill="#1a2a1a" fontSize="5.5" fontFamily="monospace">Deliver</text>

                    <line x1="55"  y1="34" x2="70"  y2="34" stroke="#111" strokeWidth="1"/>
                    <line x1="125" y1="34" x2="140" y2="34" stroke="#111" strokeWidth="1"/>
                    <line x1="195" y1="34" x2="210" y2="34" stroke="#111" strokeWidth="1"/>
                    <line x1="265" y1="34" x2="280" y2="34" stroke="#111" strokeWidth="1"/>

                    <text x="170" y="82" textAnchor="middle" fill="#111" fontSize="5.5" fontFamily="monospace">Job Automation — Pipeline Architecture</text>
                  </svg>
                )}

                {p.id === 2 && (
                  <svg viewBox="0 0 340 90" xmlns="http://www.w3.org/2000/svg" className="arch-svg arch-svg-sm">
                    <rect x="0"   y="20" width="55" height="28" rx="2" fill="none" stroke="#1a1a1a" strokeWidth="1"/>
                    <text x="27"  y="32" textAnchor="middle" fill="#2a2a2a" fontSize="6.5" fontFamily="monospace">PDF Upload</text>
                    <text x="27"  y="42" textAnchor="middle" fill="#1a1a1a" fontSize="5.5" fontFamily="monospace">Streamlit</text>

                    <rect x="70"  y="20" width="55" height="28" rx="2" fill="none" stroke="#1a1a2a" strokeWidth="1"/>
                    <text x="97"  y="32" textAnchor="middle" fill="#2a2a4a" fontSize="6.5" fontFamily="monospace">Chunking</text>
                    <text x="97"  y="42" textAnchor="middle" fill="#1a1a2a" fontSize="5.5" fontFamily="monospace">LangChain</text>

                    <rect x="140" y="20" width="55" height="28" rx="2" fill="none" stroke="#2a1a1a" strokeWidth="1"/>
                    <text x="167" y="32" textAnchor="middle" fill="#4a2a2a" fontSize="6.5" fontFamily="monospace">Embeddings</text>
                    <text x="167" y="42" textAnchor="middle" fill="#2a1a1a" fontSize="5.5" fontFamily="monospace">MiniLM</text>

                    <rect x="210" y="20" width="55" height="28" rx="2" fill="none" stroke="#1a1a2a" strokeWidth="1"/>
                    <text x="237" y="32" textAnchor="middle" fill="#2a2a4a" fontSize="6.5" fontFamily="monospace">ChromaDB</text>
                    <text x="237" y="42" textAnchor="middle" fill="#1a1a2a" fontSize="5.5" fontFamily="monospace">Vector Store</text>

                    <rect x="280" y="20" width="55" height="28" rx="2" fill="none" stroke="#1a3a1a" strokeWidth="1"/>
                    <text x="307" y="32" textAnchor="middle" fill="#2d5a2d" fontSize="6.5" fontFamily="monospace">Gemini 2.5</text>
                    <text x="307" y="42" textAnchor="middle" fill="#1a2a1a" fontSize="5.5" fontFamily="monospace">Answer + Cite</text>

                    <line x1="55"  y1="34" x2="70"  y2="34" stroke="#111" strokeWidth="1"/>
                    <line x1="125" y1="34" x2="140" y2="34" stroke="#111" strokeWidth="1"/>
                    <line x1="195" y1="34" x2="210" y2="34" stroke="#111" strokeWidth="1"/>
                    <line x1="265" y1="34" x2="280" y2="34" stroke="#111" strokeWidth="1"/>

                    <text x="170" y="82" textAnchor="middle" fill="#111" fontSize="5.5" fontFamily="monospace">RAG Chatbot — Retrieval Architecture</text>
                  </svg>
                )}

                <a href={p.link} target="_blank" rel="noopener noreferrer" className="ext-link">
                  View on GitHub →
                </a>
              </div>
              {p.featured && (
                <div className="card-visual">
                  <svg viewBox="0 0 340 220" xmlns="http://www.w3.org/2000/svg" className="arch-svg">
                    {/* Nodes */}
                    <rect x="10"  y="85" width="70" height="34" rx="2" fill="none" stroke="#1a1a1a" strokeWidth="1"/>
                    <text x="45"  y="97"  textAnchor="middle" fill="#2a2a2a" fontSize="7" fontFamily="monospace">React</text>
                    <text x="45"  y="108" textAnchor="middle" fill="#1a1a1a" fontSize="6" fontFamily="monospace">TypeScript</text>

                    <rect x="110" y="50" width="70" height="34" rx="2" fill="none" stroke="#1a1a1a" strokeWidth="1"/>
                    <text x="145" y="62"  textAnchor="middle" fill="#2a2a2a" fontSize="7" fontFamily="monospace">FastAPI</text>
                    <text x="145" y="73" textAnchor="middle" fill="#1a1a1a" fontSize="6" fontFamily="monospace">Python</text>

                    <rect x="110" y="120" width="70" height="34" rx="2" fill="none" stroke="#1a3a1a" strokeWidth="1"/>
                    <text x="145" y="132" textAnchor="middle" fill="#2d5a2d" fontSize="7" fontFamily="monospace">Gemini API</text>
                    <text x="145" y="143" textAnchor="middle" fill="#1a2a1a" fontSize="6" fontFamily="monospace">AI Layer</text>

                    <rect x="210" y="50" width="70" height="34" rx="2" fill="none" stroke="#1a1a1a" strokeWidth="1"/>
                    <text x="245" y="62"  textAnchor="middle" fill="#2a2a2a" fontSize="7" fontFamily="monospace">PostgreSQL</text>
                    <text x="245" y="73" textAnchor="middle" fill="#1a1a1a" fontSize="6" fontFamily="monospace">Supabase</text>

                    <rect x="210" y="120" width="70" height="34" rx="2" fill="none" stroke="#1a1a2a" strokeWidth="1"/>
                    <text x="245" y="132" textAnchor="middle" fill="#2a2a4a" fontSize="7" fontFamily="monospace">Docker</text>
                    <text x="245" y="143" textAnchor="middle" fill="#1a1a2a" fontSize="6" fontFamily="monospace">AWS EC2</text>

                    {/* Arrows */}
                    <line x1="80"  y1="102" x2="110" y2="80"  stroke="#111" strokeWidth="1"/>
                    <line x1="80"  y1="102" x2="110" y2="137" stroke="#111" strokeWidth="1"/>
                    <line x1="180" y1="67"  x2="210" y2="67"  stroke="#111" strokeWidth="1"/>
                    <line x1="180" y1="137" x2="210" y2="137" stroke="#111" strokeWidth="1"/>
                    <line x1="145" y1="84"  x2="145" y2="120" stroke="#111" strokeWidth="1" strokeDasharray="3,3"/>

                    {/* Labels */}
                    <text x="170" y="215" textAnchor="middle" fill="#151515" fontSize="6" fontFamily="monospace">MindCare — System Architecture</text>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── PIPELINE VISUALISER ── */}
      <section className="section" style={{ background: "#030303", overflow: "hidden" }}>
        <p className="section-label reveal">Live Architecture</p>
        <h2 className="section-title reveal">How the Pipeline Works</h2>

        <div className="pipeline-wrapper reveal">
          <div className="pipeline-track">
            {PIPELINE.map((node, i) => (
              <div key={i} className="pipeline-node-wrap">
                <div className="pipeline-node">
                  <div className="pipeline-node-dot" style={{ background: node.dot }} />
                  <div className="pipeline-label">{node.label}</div>
                  <div className="pipeline-sub">{node.sub}</div>
                </div>
                {i < PIPELINE.length - 1 && (
                  <div className="pipeline-connector">
                    <div className="pipeline-line" />
                    <div className="flow-dot" style={{ animationDelay: `${i * 0.5}s` }} />
                    <div className="flow-dot" style={{ animationDelay: `${i * 0.5 + 0.9}s` }} />
                    <div className="flow-dot" style={{ animationDelay: `${i * 0.5 + 1.8}s` }} />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="pipeline-stats">
            {[
              ["200+", "Jobs fetched daily"],
              ["~12",  "High-match results"],
              ["4hrs", "Manual effort saved"],
              ["0",    "Human intervention"],
            ].map(([num, label]) => (
              <div key={label} className="ps-block">
                <div className="ps-num">{num}</div>
                <div className="ps-label">{label}</div>
              </div>
            ))}
          </div>

          <div className="pipeline-caption">
            n8n · Gemini 2.5 Flash · Groq llama-3.3-70b · Google Sheets · Telegram Bot API
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="about-section">
        <div className="about-text reveal">
          <p className="section-label">Background</p>
          <h2 className="about-title">More About<br />Bhushan</h2>
          <p className="about-bio">
            Final-year <strong>MCA student</strong> at Vignan's Institute of Information Technology,
            Visakhapatnam (CGPA 7.86), graduating July 2026.
          </p>
          <p className="about-bio">
            I build AI tools, automate workflows, and develop full-stack applications. Published at
            the <strong>GCCMIEA International Conference</strong> (Dec 2025). Open to relocation across India.
          </p>
          <div className="certs-list">
            {CERTS.map(c => <div key={c} className="cert-row">{c}</div>)}
          </div>
          <div className="about-stats">
            {[["3+","Projects"],["2","Internships"],["7.86","CGPA"],["3","Certs"]].map(([num, label]) => (
              <div key={label} className="stat-block">
                <div className="stat-number">{num}</div>
                <div className="stat-label">{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="about-photo reveal" style={{ transitionDelay: "0.2s" }}>
          <div className="photo-placeholder">
            <span className="photo-initials">DB</span>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="section" style={{ background: "#050505" }}>
        <p className="section-label reveal">Capabilities</p>
        <h2 className="section-title reveal">Tech Stack</h2>
        <div className="skills-grid">
          {SKILLS.map((cat, i) => (
            <div key={cat.cat} className="skill-column reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="skill-cat">{cat.cat}</div>
              {cat.items.map(item => <div key={item} className="skill-item">{item}</div>)}
            </div>
          ))}
        </div>
      </section>

      {/* ── GITHUB ── */}
      <section className="section" style={{ background: "#080808" }}>
        <p className="section-label reveal">Open Source</p>
        <h2 className="section-title reveal">GitHub</h2>
        <div className="github-grid reveal">
          {[[ghStats?.public_repos, "Public Repos"],[ghStats?.followers, "Followers"],[ghStats?.following, "Following"]].map(([val, label]) => (
            <div key={label} className="github-stat">
              <div className="github-number">{val ?? "—"}</div>
              <div className="github-label">{label}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <a href="https://github.com/Bhushan-git20" target="_blank" rel="noopener noreferrer" className="ext-link">
            github.com/Bhushan-git20 →
          </a>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="contact-section">
        <p className="section-label reveal">Get In Touch</p>
        <h2 className="contact-title reveal">Let's Work<br />Together</h2>
        <div className="contact-divider reveal" />
        <a href="mailto:bhushanam2004@gmail.com" className="contact-email reveal">
          bhushanam2004@gmail.com
        </a>
        <div className="contact-links reveal">
          {[
            ["https://linkedin.com/in/bhushanam-damisetti", "LinkedIn"],
            ["https://github.com/Bhushan-git20", "GitHub"],
            ["tel:+919390782043", "+91 93907 82043"],
          ].map(([href, label]) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="contact-link">
              {label}
            </a>
          ))}
        </div>
      </section>

      <footer>
        <p>© 2026 Damisetti Bhushanam</p>
        <p>MCA Graduate · Visakhapatnam, AP</p>
      </footer>
    </>
  );
}

const CSS = `
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body {
    background: #000;
    color: #fff;
    font-family: 'DM Sans', system-ui, sans-serif;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }

  @keyframes letterDrop {
    from { opacity: 0; transform: translateY(110%); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes scrollMove {
    from { transform: translateY(-100%); }
    to   { transform: translateY(300%); }
  }

  .reveal {
    opacity: 0;
    transform: translateY(36px);
    transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1),
                transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .reveal.visible { opacity: 1; transform: translateY(0); }

  /* ── NAV ── */
  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 999;
    display: flex; justify-content: space-between; align-items: center;
    padding: 1.5rem 4rem;
    background: linear-gradient(to bottom, rgba(0,0,0,0.92) 0%, transparent 100%);
  }
  .nav-logo {
    font-family: 'Bebas Neue', 'Impact', sans-serif;
    font-size: 1.3rem; letter-spacing: .12em; color: #fff;
  }
  .nav-links { display: flex; gap: 2.5rem; }
  .nav-links a {
    font-size: .7rem; letter-spacing: .2em; text-transform: uppercase;
    color: #fff; text-decoration: none; opacity: .4; transition: opacity .25s;
  }
  .nav-links a:hover { opacity: 1; }

  /* ── HERO ── */
  .hero-section {
    min-height: 100vh;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    background: #000; position: relative; overflow: hidden;
  }
  .hero-intro {
    font-size: .7rem; letter-spacing: .35em; text-transform: uppercase;
    color: #3a3a3a; margin-bottom: 1.5rem;
    opacity: 0; animation: fadeUp .8s .3s cubic-bezier(0.16,1,0.3,1) forwards;
  }
  .hero-name {
    font-family: 'Bebas Neue', 'Impact', sans-serif;
    font-size: clamp(5.5rem, 14vw, 12rem);
    line-height: .88; text-align: center;
  }
  .hero-line { overflow: hidden; display: block; }
  .hero-letter {
    display: inline-block; opacity: 0;
    animation: letterDrop .6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  .hero-tagline {
    font-size: .8rem; letter-spacing: .2em; text-transform: uppercase;
    color: #444; margin-top: 2.5rem;
    opacity: 0; animation: fadeUp .8s 2.5s cubic-bezier(0.16,1,0.3,1) forwards;
  }
  .hero-tagline em { color: #666; font-style: normal; }
  .scroll-hint {
    position: absolute; bottom: 2.5rem; left: 50%; transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: .75rem;
    opacity: 0; animation: fadeUp .8s 3.1s ease forwards;
  }
  .scroll-hint span { font-size: .58rem; letter-spacing: .3em; text-transform: uppercase; color: #222; }
  .scroll-bar { width: 1px; height: 50px; background: #181818; overflow: hidden; position: relative; }
  .scroll-bar::after {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 40%;
    background: #444; animation: scrollMove 1.8s 3.6s ease-in-out infinite;
  }

  /* ── SHARED SECTION ── */
  .section { padding: 8rem 4rem; }
  .section-label { font-size: .65rem; letter-spacing: .3em; text-transform: uppercase; color: #2e2e2e; margin-bottom: .75rem; }
  .section-title { font-family: 'Bebas Neue', 'Impact', sans-serif; font-size: clamp(3rem, 7vw, 5.5rem); line-height: 1; margin-bottom: 4rem; }

  /* ── PROJECTS ── */
  .projects-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: #111; }
  .project-card { background: #000; padding: 2.5rem; cursor: default; transition: background .3s; }
  .project-card:hover { background: #060606; }
  .featured { grid-column: 1 / -1; display: grid; grid-template-columns: 1.3fr .7fr; gap: 3rem; align-items: center; }
  .project-badge {
    display: inline-block; font-size: .6rem; letter-spacing: .12em; text-transform: uppercase;
    padding: .3rem .7rem; border: 1px solid #1d3a1d; color: #3d8a3d; margin-bottom: 1.25rem;
  }
  .project-name { font-family: 'Bebas Neue', 'Impact', sans-serif; font-size: 2.2rem; letter-spacing: .02em; margin-bottom: 1rem; }
  .project-desc { font-size: .875rem; line-height: 1.75; color: #5a5a5a; margin-bottom: 1.5rem; }
  .project-tech { display: flex; flex-wrap: wrap; gap: .4rem; margin-bottom: 1.75rem; }
  .tech-tag { font-size: .62rem; letter-spacing: .1em; text-transform: uppercase; padding: .25rem .65rem; border: 1px solid #1c1c1c; color: #3d3d3d; }
  .ext-link { font-size: .7rem; letter-spacing: .15em; text-transform: uppercase; color: #fff; text-decoration: none; opacity: .35; transition: opacity .25s; }
  .ext-link:hover { opacity: 1; }
  .card-visual { aspect-ratio: 4/3; background: #080808; border: 1px solid #111; display: flex; align-items: center; justify-content: center; }
  .card-visual span { font-family: 'Bebas Neue', 'Impact', sans-serif; font-size: 6rem; color: #141414; }

  /* ── ABOUT ── */
  .about-section { display: grid; grid-template-columns: 1fr 1fr; gap: 6rem; padding: 8rem 4rem; background: #000; align-items: center; }
  .about-title { font-family: 'Bebas Neue', 'Impact', sans-serif; font-size: clamp(2.5rem, 6vw, 5rem); line-height: 1; margin-bottom: 2rem; }
  .about-bio { font-size: .9rem; line-height: 1.85; color: #5a5a5a; margin-bottom: 1.25rem; }
  .about-bio strong { color: #aaa; font-weight: 400; }
  .certs-list { margin: 1.75rem 0; }
  .cert-row { font-size: .68rem; letter-spacing: .08em; text-transform: uppercase; color: #2a2a2a; padding: .5rem 0; border-bottom: 1px solid #0d0d0d; }
  .about-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-top: 2rem; }
  .stat-block { border-top: 1px solid #111; padding-top: 1rem; }
  .stat-number { font-family: 'Bebas Neue', 'Impact', sans-serif; font-size: 2.2rem; }
  .stat-label { font-size: .58rem; letter-spacing: .15em; text-transform: uppercase; color: #333; margin-top: .2rem; }
  .photo-placeholder { width: 100%; aspect-ratio: 3/4; background: #0a0a0a; border: 1px solid #111; display: flex; align-items: center; justify-content: center; }
  .photo-initials { font-family: 'Bebas Neue', 'Impact', sans-serif; font-size: 6rem; color: #181818; }

  /* ── SKILLS ── */
  .skills-grid { display: grid; grid-template-columns: repeat(5, 1fr); background: #0c0c0c; }
  .skill-column { padding: 2rem; border-right: 1px solid #111; }
  .skill-column:last-child { border-right: none; }
  .skill-cat { font-size: .6rem; letter-spacing: .2em; text-transform: uppercase; color: #252525; margin-bottom: 1.25rem; padding-bottom: .75rem; border-bottom: 1px solid #111; }
  .skill-item { font-size: .85rem; color: #464646; padding: .35rem 0; transition: color .2s; cursor: default; }
  .skill-item:hover { color: #bbb; }

  /* ── GITHUB ── */
  .github-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: #111; margin-top: 3.5rem; }
  .github-stat { background: #080808; padding: 2.5rem; text-align: center; }
  .github-number { font-family: 'Bebas Neue', 'Impact', sans-serif; font-size: 4rem; }
  .github-label { font-size: .62rem; letter-spacing: .2em; text-transform: uppercase; color: #333; margin-top: .5rem; }

  /* ── CONTACT ── */
  .contact-section {
    background: #000; padding: 8rem 4rem;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    min-height: 80vh; text-align: center;
    border-top: 1px solid #0a0a0a;
  }
  .contact-title { font-family: 'Bebas Neue', 'Impact', sans-serif; font-size: clamp(4rem, 12vw, 10rem); line-height: .88; margin: 1.5rem 0 3rem; }
  .contact-divider { width: 1px; height: 50px; background: #1a1a1a; margin: 0 auto 2.5rem; }
  .contact-email { font-size: 1rem; color: #3d3d3d; text-decoration: none; letter-spacing: .04em; transition: color .25s; }
  .contact-email:hover { color: #fff; }
  .contact-links { display: flex; gap: 3rem; margin-top: 3rem; }
  .contact-link { font-size: .7rem; letter-spacing: .2em; text-transform: uppercase; color: #fff; text-decoration: none; opacity: .3; transition: opacity .25s; }
  .contact-link:hover { opacity: 1; }

  /* ── FOOTER ── */
  footer { padding: 1.5rem 4rem; display: flex; justify-content: space-between; border-top: 1px solid #0a0a0a; background: #000; }
  footer p { font-size: .62rem; letter-spacing: .1em; text-transform: uppercase; color: #1e1e1e; }

  /* ── PIPELINE VISUALISER ── */
  @keyframes flowMove {
    0%   { left: -8px; opacity: 0; }
    5%   { opacity: 1; }
    95%  { opacity: 1; }
    100% { left: calc(100% + 8px); opacity: 0; }
  }
  @keyframes nodePulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(61,138,61,0); }
    50%       { box-shadow: 0 0 0 6px rgba(61,138,61,0.08); }
  }

  .pipeline-wrapper {
    display: flex; flex-direction: column; gap: 3rem;
    padding: 2.5rem; background: #080808; border: 1px solid #0e0e0e;
  }
  .pipeline-track {
    display: flex; align-items: center;
    gap: 0; overflow-x: auto; padding-bottom: .5rem;
  }
  .pipeline-node-wrap {
    display: flex; align-items: center; flex-shrink: 0;
  }
  .pipeline-node {
    display: flex; flex-direction: column; align-items: center;
    gap: .6rem; padding: 1.25rem 1rem; min-width: 110px;
    border: 1px solid #111; background: #050505;
    transition: border-color .3s;
    animation: nodePulse 3s ease-in-out infinite;
  }
  .pipeline-node:hover { border-color: #1e1e1e; }
  .pipeline-node-dot {
    width: 10px; height: 10px; border-radius: 50%;
    box-shadow: 0 0 8px currentColor;
  }
  .pipeline-label {
    font-size: .7rem; letter-spacing: .08em; color: #444;
    text-align: center; text-transform: uppercase;
  }
  .pipeline-sub {
    font-size: .58rem; letter-spacing: .06em; color: #1e1e1e;
    text-align: center;
  }
  .pipeline-connector {
    position: relative; width: 60px; height: 1px;
    flex-shrink: 0; margin: 0 2px;
  }
  .pipeline-line {
    position: absolute; top: 0; left: 0; right: 0;
    height: 1px; background: #111;
  }
  .flow-dot {
    position: absolute; top: -3px;
    width: 7px; height: 7px; border-radius: 50%;
    background: #3d8a3d;
    animation: flowMove 2.7s linear infinite;
    box-shadow: 0 0 6px #3d8a3d;
  }
  .pipeline-stats {
    display: grid; grid-template-columns: repeat(4, 1fr);
    gap: 1px; background: #0d0d0d;
  }
  .ps-block {
    background: #050505; padding: 1.5rem;
    text-align: center;
  }
  .ps-num {
    font-family: 'Bebas Neue', 'Impact', sans-serif;
    font-size: 2.5rem; color: #fff; line-height: 1;
  }
  .ps-label {
    font-size: .58rem; letter-spacing: .15em;
    text-transform: uppercase; color: #252525; margin-top: .4rem;
  }
  .pipeline-caption {
    font-size: .6rem; letter-spacing: .12em; color: #1a1a1a;
    text-align: center; text-transform: uppercase;
  }

  .arch-svg { width: 100%; height: auto; display: block; opacity: .7; transition: opacity .3s; }
  .arch-svg:hover { opacity: 1; }
  .arch-svg-sm { margin-bottom: 1.5rem; border: 1px solid #0d0d0d; padding: .75rem 0; background: #040404; }

  /* ── MOBILE ── */
  @media (max-width: 768px) {
    nav { padding: 1.25rem 1.5rem; }
    .nav-links { gap: 1.25rem; }
    .nav-links a { font-size: .6rem; letter-spacing: .12em; }

    .hero-name { font-size: clamp(3.5rem, 18vw, 6rem); }
    .hero-headline { font-size: .95rem; padding: 0 1.5rem; }
    .hero-subtext { font-size: .68rem; padding: 0 1.5rem; }
    .hero-ctas { gap: .6rem; padding: 0 1.5rem; }
    .cta-primary, .cta-secondary { padding: .7rem 1.2rem; font-size: .6rem; }
    .hero-terminal { width: calc(100vw - 3rem); }

    .section { padding: 5rem 1.5rem; }

    .projects-grid { grid-template-columns: 1fr; }
    .featured { grid-column: 1; grid-template-columns: 1fr; }
    .card-visual { display: none; }

    .about-section { grid-template-columns: 1fr; gap: 3rem; padding: 5rem 1.5rem; }
    .about-photo { order: -1; }
    .about-stats { grid-template-columns: repeat(2, 1fr); }

    .skills-grid { grid-template-columns: 1fr 1fr; }
    .skill-column { border-right: none; border-bottom: 1px solid #111; }

    .pipeline-track { gap: 0; }
    .pipeline-connector { width: 30px; }
    .pipeline-node { min-width: 80px; padding: .75rem .5rem; }
    .pipeline-label { font-size: .58rem; }
    .pipeline-stats { grid-template-columns: repeat(2, 1fr); }

    .systems-list { padding: 0; }
    .system-row { grid-template-columns: 2.5rem 1fr; gap: 1rem; }
    .system-line { display: none; }

    .github-repos { overflow: hidden; }
    .repo-card { grid-template-columns: 1fr auto; }
    .repo-desc { display: none; }

    .contact-section { padding: 5rem 1.5rem; }
    .contact-title { font-size: clamp(2.5rem, 14vw, 6rem); }
    .contact-links { gap: 1.5rem; flex-wrap: wrap; justify-content: center; }

    footer { padding: 1.25rem 1.5rem; flex-direction: column; gap: .5rem; text-align: center; }

    .resume-btns { flex-direction: column; }
    .resume-btn { text-align: center; }
  }

  @media (max-width: 480px) {
    .hero-name { font-size: clamp(3rem, 20vw, 5rem); }
    .skills-grid { grid-template-columns: 1fr; }
    .pipeline-track { flex-direction: column; align-items: flex-start; gap: 0; }
    .pipeline-connector { width: 1px; height: 24px; margin: 0 0 0 54px; }
    .pipeline-line { width: 1px; height: 100%; top: 0; left: 0; }
    .flow-dot { top: -8px; left: -3px; animation-name: flowMoveV; }
  }

  @keyframes flowMoveV {
    0%   { top: -8px; opacity: 0; }
    5%   { opacity: 1; }
    95%  { opacity: 1; }
    100% { top: calc(100% + 8px); opacity: 0; }
  }
`;
