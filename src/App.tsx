import { useState, useEffect, useRef } from "react";
import { TypeAnimation } from "react-type-animation";
import "@fontsource/bebas-neue";
import "@fontsource/dm-sans";
import { 
  FiGithub, FiLinkedin, FiMail, FiExternalLink, FiCode, FiPhone, FiAward, 
  FiSun, FiMoon, FiCpu, FiDatabase, FiSettings, FiTerminal
} from "react-icons/fi";
import { 
  SiPython, SiJavascript, SiTypescript, SiReact, SiTailwindcss, SiHtml5, SiCss, 
  SiFastapi, SiNodedotjs, SiExpress, SiPostgresql, SiDocker, SiVercel, SiSupabase, SiGoogle, SiGmail
} from "react-icons/si";
import { FaJava, FaGitAlt, FaAws } from "react-icons/fa";
import "./App.css";

const GH_USER = "Bhushan-git20";

interface GitHubStats {
  public_repos: number;
  followers: number;
  following: number;
}

const NAME_DATA = (() => {
  const lines = ["DAMISETTI", "BHUSHANAM"];
  let i = 0;
  return lines.map(line =>
    line.split("").map(ch => ({ ch, delay: `${(0.65 + i++ * 0.05).toFixed(2)}s` }))
  );
})();

interface Project {
  id: number;
  featured?: boolean;
  name: string;
  badge?: string;
  problem: string;
  solution: string;
  result: string;
  tech: string[];
  link: string;
  image?: string;
}

const PROJECTS: Project[] = [
  {
    id: 0,
    featured: true,
    name: "MindCare",
    badge: "Published · GCCMIEA Dec 2025",
    problem: "Mental health support is fragmented — students have no single tool that combines mood tracking, AI-personalised resources, and real-time guidance.",
    solution: "Built a full-stack wellness platform with Gemini API driving personalised recommendations, real-time Supabase data sync, and an emotional tracking dashboard.",
    result: "150+ test users · 4.2/5 satisfaction · Sub-2s load · Published internationally",
    tech: ["React", "TypeScript", "FastAPI", "PostgreSQL", "Supabase", "Gemini API", "Docker", "AWS"],
    link: "https://github.com/Bhushan-git20/mindful-pathways",
    image: "/mindcare.png"
  },
  {
    id: 1,
    name: "Job Automation Pipeline",
    problem: "Manual job searching across multiple boards wastes 4+ hours per week with no scoring or deduplication.",
    solution: "Orchestrated an n8n workflow pulling from Remotive API, scoring each listing with Gemini + Groq LLMs, deduplicating via Google Sheets, and pushing filtered results to Telegram.",
    result: "200+ listings processed daily · 4 hrs/week saved · 90% reduction in manual review",
    tech: ["n8n", "Gemini 2.5 Flash", "Groq llama-3.3-70b", "Docker", "Google Sheets", "Apify", "Telegram"],
    link: "https://github.com/Bhushan-git20/job-automation-pipeline",
    image: "/automation.png"
  },
  {
    id: 2,
    name: "PDF RAG Chatbot",
    problem: "Reading through long PDFs to find specific answers is slow and loses context across documents.",
    solution: "Built a multi-PDF conversational AI using LangChain ConversationalRetrievalChain, ChromaDB vector store, and HuggingFace MiniLM embeddings — with persistent chat history and source attribution.",
    result: "91% retrieval accuracy · 60% fewer repeated queries · Multi-PDF in one session",
    tech: ["Python", "LangChain", "ChromaDB", "FAISS", "HuggingFace MiniLM", "Gemini 2.5 Flash", "Streamlit"],
    link: "https://github.com/Bhushan-git20/pdf-rag-chatbot",
    image: "/rag_chatbot.png"
  },
];

const SKILLS = [
  { cat: "Languages",    items: [
    { name: "Java SE 11", icon: <FaJava size={14} color="#ED8B00" /> },
    { name: "Python", icon: <SiPython size={14} color="#3776AB" /> },
    { name: "JavaScript", icon: <SiJavascript size={14} color="#F7DF1E" /> },
    { name: "TypeScript", icon: <SiTypescript size={14} color="#3178C6" /> }
  ] },
  { cat: "Frontend",     items: [
    { name: "React", icon: <SiReact size={14} color="#61DAFB" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss size={14} color="#06B6D4" /> },
    { name: "HTML5", icon: <SiHtml5 size={14} color="#E34F26" /> },
    { name: "CSS3", icon: <SiCss size={14} color="#1572B6" /> }
  ] },
  { cat: "Backend",      items: [
    { name: "FastAPI", icon: <SiFastapi size={14} color="#009688" /> },
    { name: "Node.js", icon: <SiNodedotjs size={14} color="#339933" /> },
    { name: "Express.js", icon: <SiExpress size={14} color="var(--logo-black)" /> }, // Adapts to theme
    { name: "PostgreSQL", icon: <SiPostgresql size={14} color="#4169E1" /> }
  ] },
  { cat: "AI / ML",      items: [
    { name: "LangChain", icon: <FiTerminal size={14} color="#10B981" /> },
    { name: "ChromaDB", icon: <FiDatabase size={14} color="#3B82F6" /> },
    { name: "Gemini API", icon: <SiGoogle size={14} color="#4285F4" /> },
    { name: "n8n", icon: <FiSettings size={14} color="#EA4B71" /> },
    { name: "Groq", icon: <FiCpu size={14} color="#F55036" /> }
  ] },
  { cat: "Cloud / DevOps", items: [
    { name: "Docker", icon: <SiDocker size={14} color="#2496ED" /> },
    { name: "AWS EC2/S3", icon: <FaAws size={14} color="#FF9900" /> },
    { name: "Git", icon: <FaGitAlt size={14} color="#F05032" /> },
    { name: "Vercel", icon: <SiVercel size={14} color="var(--logo-black)" /> }, // Adapts to theme
    { name: "Supabase", icon: <SiSupabase size={14} color="#3ECF8E" /> }
  ] },
];

const CERTS = [
  "Java SE 11 Developer · Infosys Springboard",
  "Generative AI Studio · IBM SkillsBuild",
  "Web Design Fundamentals · IBM SkillsBuild",
];

const RESUMES = [
  { label: "AI Engineer", file: "/resume-ai-engineer.pdf" },
  { label: "Full Stack Dev", file: "/resume-fullstack.pdf" },
  { label: "Associate SE", file: "/resume-associate-se.pdf" },
];

export const Portfolio = () => {
  const [ghStats, setGhStats] = useState<GitHubStats | null>(null);
  const [theme, setTheme] = useState("dark");
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  // Premium feature states
  const [copied, setCopied] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<{sender: string, text: string}[]>([
    { sender: 'ai', text: 'Hi! I am Bhushan\'s AI assistant. How can I help you today?' }
  ]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const toggleTheme = () => setTheme(prev => prev === "dark" ? "light" : "dark");

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("bhushanam2004@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatMessages([...chatMessages, { sender: 'user', text: chatInput }, { sender: 'ai', text: 'Connecting to Gemini AI backend... (UI Placeholder)' }]);
    setChatInput("");
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    revealRefs.current.forEach(el => {
      if (el) observer.observe(el);
    });

    const fetchGitHubStats = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${GH_USER}`);
        if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
        const data: GitHubStats = await response.json();
        setGhStats(data);
      } catch (error) {
        console.error("Failed to fetch GitHub stats:", error);
      }
    };

    fetchGitHubStats();

    return () => observer.disconnect();
  }, [ghStats]);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  return (
    <>
      <div className="cursor-glow"></div>
      {/* ── NAV ── */}
      <nav>
        <span className="nav-logo">Bhushan</span>
        <div className="nav-links">
          {[["#home","Home"],["#work","Work"],["#about","About"],["#contact","Contact"]].map(([href, label]) => (
            <a key={href} href={href}>{label}</a>
          ))}
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "dark" ? <FiSun size={16} /> : <FiMoon size={16} />}
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="home" className="hero-section">
        <p className="hero-intro">Introducing</p>
        <h1 className="hero-name" aria-label="DAMISETTI BHUSHANAM">
          {NAME_DATA.map((line, li) => (
            <div key={li} className="hero-line" aria-hidden="true">
              {line.map(({ ch, delay }) => (
                <span key={delay} className="hero-letter" style={{ animationDelay: delay }}>{ch}</span>
              ))}
            </div>
          ))}
        </h1>
      
        <div className="hero-typed">
          <span className="hero-typed-prefix">I build </span>
          <TypeAnimation
            sequence={[
              "AI automation pipelines.",
              2000,
              "RAG-powered chatbots.",
              2000,
              "full-stack AI applications.",
              2000,
              "systems that actually ship.",
              2000,
            ]}
            wrapper="span"
            speed={55}
            repeat={Infinity}
            className="hero-typed-text"
          />
        </div>
      
        <p className="hero-subline">
          AI Automation Engineer · Full Stack Developer · <em>MCA Graduate 2026</em>
        </p>
      
        <div className="hero-terminal">
          <div className="terminal-bar">
            <span className="t-dot" style={{ background: "#ff5f57" }} />
            <span className="t-dot" style={{ background: "#febc2e" }} />
            <span className="t-dot" style={{ background: "#28c840" }} />
            <span className="t-title">pipeline.py</span>
          </div>
          <div className="terminal-body">
            <TypeAnimation
              sequence={[
                800,
                "$ python pipeline.py --source remotive",
                600,
                "$ python pipeline.py --source remotive\n→ Fetched 200+ listings",
                500,
                "$ python pipeline.py --source remotive\n→ Fetched 200+ listings\n→ Scoring with Gemini 2.5 Flash...",
                600,
                "$ python pipeline.py --source remotive\n→ Fetched 200+ listings\n→ Scoring with Gemini 2.5 Flash...\n→ Filtered to 12 high-match roles",
                500,
                "$ python pipeline.py --source remotive\n→ Fetched 200+ listings\n→ Scoring with Gemini 2.5 Flash...\n→ Filtered to 12 high-match roles\n→ Delivered to Telegram ✓",
                3000,
              ]}
              wrapper="pre"
              speed={75}
              repeat={Infinity}
              className="terminal-text"
            />
          </div>
        </div>
      
        <div className="scroll-hint">
          <span>Scroll</span>
          <div className="scroll-bar" />
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="work" className="section" style={{ background: "var(--bg-alt)" }}>
        <p className="section-label reveal" ref={addToRefs}>Selected Work</p>
        <h2 className="section-title reveal" ref={addToRefs}>Projects</h2>
        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <div
              key={p.id}
              className={`project-card reveal${p.featured ? " featured" : ""}`}
              ref={addToRefs}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              {p.image && (
                <div className="project-image-wrapper">
                  <img src={p.image} alt={p.name} className="project-image" />
                </div>
              )}
              <div className="project-body">
                {p.badge && <span className="project-badge">{p.badge}</span>}
                <h3 className="project-name">{p.name}</h3>
      
                <div className="project-story">
                  <div className="story-block">
                    <span className="story-label">Problem</span>
                    <p className="story-text">{p.problem}</p>
                  </div>
                  <div className="story-block">
                    <span className="story-label">Solution</span>
                    <p className="story-text">{p.solution}</p>
                  </div>
                  <div className="story-block story-result">
                    <span className="story-label">Result</span>
                    <p className="story-text result-text">{p.result}</p>
                  </div>
                </div>
      
                <div className="project-tech">
                  {p.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
                </div>
                <a href={p.link} target="_blank" rel="noopener noreferrer" className="ext-link">
                  View on GitHub <FiExternalLink size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="about-section">
        <div className="about-text reveal" ref={addToRefs}>
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
            {CERTS.map(c => (
              <div key={c} className="cert-row">
                <FiAward size={14} /> {c}
              </div>
            ))}
          </div>
          <div className="resume-selector">
            <p className="resume-label">View Resume</p>
            <div className="resume-btns">
              {RESUMES.map(r => (
                <a
                  key={r.label}
                  href={r.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resume-btn"
                >
                  {r.label} ↗
                </a>
              ))}
            </div>
          </div>
          <dl className="about-stats">
            {[["3+","Projects"],["2","Internships"],["7.86","CGPA"],["3","Certs"]].map(([num, label]) => (
              <div key={label} className="stat-block">
                <dt className="stat-label">{label}</dt>
                <dd className="stat-number">{num}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="about-photo reveal" ref={addToRefs} style={{ transitionDelay: "0.2s" }}>
          <div className="photo-wrapper">
            <img
              src="/bhushan.png"
              alt="Damisetti Bhushanam"
              className="about-photo-img"
            />
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="section" style={{ background: "var(--bg-alt)", overflow: 'hidden' }}>
        <p className="section-label reveal" ref={addToRefs}>Capabilities</p>
        <h2 className="section-title reveal" ref={addToRefs}>Tech Stack</h2>
        <div className="skills-marquee-wrapper reveal" ref={addToRefs}>
          {SKILLS.map((cat, i) => (
            <div key={cat.cat} className="skills-marquee-row" style={{ animationDirection: i % 2 === 0 ? 'normal' : 'reverse' }}>
              <div className="skills-marquee-content">
                {[...Array(4)].map((_, idx) => (
                  <div key={idx} className="skills-marquee-group">
                    <span className="skill-cat-pill">{cat.cat}</span>
                    {cat.items.map(item => (
                      <div key={item.name} className="skill-item-pill">
                        {item.icon} <span>{item.name}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── GITHUB ── */}
      <section className="section" style={{ background: "var(--bg-main)" }}>
        <p className="section-label reveal" ref={addToRefs}>Open Source</p>
        <h2 className="section-title reveal" ref={addToRefs}>GitHub</h2>
        <div className="github-grid reveal" ref={addToRefs}>
          <div className="github-stat">
            <div className="github-number">{ghStats?.public_repos ?? "—"}</div>
            <div className="github-label">Public Repositories</div>
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <a href="https://github.com/Bhushan-git20" target="_blank" rel="noopener noreferrer" className="ext-link">
            github.com/Bhushan-git20 <FiExternalLink size={14} />
          </a>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="contact-section">
        <p className="section-label reveal" ref={addToRefs}>Get In Touch</p>
        <h2 className="contact-title reveal" ref={addToRefs}>Let's Work<br />Together</h2>
        <div className="contact-divider reveal" ref={addToRefs} />
        <button onClick={handleCopyEmail} className="contact-email reveal" ref={addToRefs} style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer', fontFamily: 'inherit' }}>
          <SiGmail size={16} color="#EA4335" style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} />
          bhushanam2004@gmail.com
          {copied && <span className="copied-tooltip">Copied! ✅</span>}
        </button>

        <form action="https://api.web3forms.com/submit" method="POST" className="contact-form reveal" ref={addToRefs}>
          <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" />
          <div className="form-group">
            <input type="text" name="name" placeholder="Your Name" required className="form-input" />
            <input type="email" name="email" placeholder="Your Email" required className="form-input" />
          </div>
          <textarea name="message" placeholder="Your Message" required className="form-input form-textarea"></textarea>
          <button type="submit" className="form-submit">Send Message</button>
        </form>

        <div className="contact-links reveal" ref={addToRefs}>
          <a href="https://linkedin.com/in/bhushanam-damisetti" target="_blank" rel="noopener noreferrer" className="contact-link">
            <FiLinkedin size={14} color="#0A66C2" /> LinkedIn
          </a>
          <a href="https://github.com/Bhushan-git20" target="_blank" rel="noopener noreferrer" className="contact-link">
            <FiGithub size={14} color="var(--logo-black)" /> GitHub
          </a>
          <a href="tel:+919390782043" className="contact-link">
            <FiPhone size={14} /> Phone
          </a>
        </div>
      </section>

      <footer>
        <p>© 2026 Damisetti Bhushanam</p>
        <p>MCA Graduate · Visakhapatnam, AP</p>
      </footer>

      {/* ── AI CHATBOT ── */}
      <div className={`chatbot-widget ${chatOpen ? 'open' : ''}`}>
        {chatOpen && (
          <div className="chatbot-window">
            <div className="chatbot-header">
              <span><FiCpu size={16} /> Ask AI Assistant</span>
              <button onClick={() => setChatOpen(false)} className="chatbot-close">&times;</button>
            </div>
            <div className="chatbot-messages">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`chat-bubble ${msg.sender}`}>
                  {msg.text}
                </div>
              ))}
            </div>
            <form className="chatbot-input" onSubmit={handleChatSubmit}>
              <input type="text" placeholder="Ask about Bhushan..." value={chatInput} onChange={e => setChatInput(e.target.value)} />
              <button type="submit">Send</button>
            </form>
          </div>
        )}
        <button className="chatbot-fab" onClick={() => setChatOpen(!chatOpen)} aria-label="Open AI Chat">
          <FiCpu size={24} />
        </button>
      </div>
    </>
  );
};
