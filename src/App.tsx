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
  demoLink?: string;
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
    demoLink: "https://huggingface.co/spaces/Bhushan-git20/pdf-rag-chatbot",
    image: "/rag_chatbot.png"
  },
  {
    id: 3,
    name: "Ollive",
    problem: "Deploying intelligent AI assistants to the web can be complex and expensive without the right hosting.",
    solution: "Built a custom AI agent named Ollive and deployed it directly to Hugging Face Spaces for free, scalable public access.",
    result: "Live interactive demo available 24/7 on Hugging Face Spaces",
    tech: ["Python", "HuggingFace Spaces", "Gradio", "LLM APIs"],
    link: "https://github.com/Bhushan-git20/ollive-ai-assistant",
    demoLink: "https://huggingface.co/spaces/Bhushan-git20/ollive-ai-assistant",
    image: "/ollive.png"
  },
  {
    id: 4,
    name: "Placement Prospect AI",
    problem: "Students lack actionable insights into their career readiness and market demands, making interview preparation inefficient.",
    solution: "Developed an AI-powered platform with Gemini 1.5 Flash and Supabase Edge Functions for predictive job fit scoring and smart resume parsing.",
    result: "Real-time market intelligence and a personalized AI career coach for students.",
    tech: ["React", "TypeScript", "Supabase", "Gemini 1.5 Flash", "Tailwind CSS"],
    link: "https://github.com/Bhushan-git20/placement-prospect-ai",
    image: "/placement_prospect.png"
  }
];

const SKILLS = [
  { cat: "AI / Automation",  items: ["LangChain", "n8n", "Gemini API", "Groq", "ChromaDB", "FAISS", "RAG", "Prompt Engineering"] },
  { cat: "Backend",          items: ["FastAPI", "Node.js", "Express.js", "PostgreSQL", "MySQL", "REST APIs"] },
  { cat: "Cloud / DevOps",   items: ["Docker", "AWS EC2", "AWS S3", "IAM", "CloudWatch", "Vercel", "Git"] },
  { cat: "Frontend",         items: ["React", "TypeScript", "Tailwind CSS", "JavaScript"] },
  { cat: "Languages",        items: ["Python", "Java SE 11", "TypeScript", "JavaScript"] },
];

const SYSTEMS = [
  { name: "AI Job Automation Pipeline",       desc: "n8n + Gemini + Groq · processes 200+ listings/day · zero manual input" },
  { name: "LLM Document Processing System",   desc: "LangChain + ChromaDB + FAISS · 91% retrieval accuracy · multi-PDF" },
  { name: "Dockerised Workflow Infrastructure", desc: "Full stack containerisation · AWS EC2 deploy · 3 zero-downtime releases" },
  { name: "Event-Driven Notification System", desc: "Telegram bot integration · score-filtered delivery · real-time alerts" },
  { name: "AI-Powered Wellness Platform",     desc: "Gemini API + Supabase real-time · 150+ users · published research" },
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
      
        <p className="hero-headline">
          AI Automation Engineer building agentic workflows and scalable AI systems.
        </p>

        <p className="hero-subtext">
          Specialised in AI automation · FastAPI backends · n8n workflows · LLM integrations · production-ready AI applications
        </p>

        <div className="hero-ctas">
          <a href="#work" className="cta-primary">View Projects</a>
          <a href="https://github.com/Bhushan-git20" target="_blank" rel="noopener noreferrer" className="cta-secondary">GitHub</a>
          <a href="#about" className="cta-secondary">Resume</a>
        </div>
      
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
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="ext-link">
                    View on GitHub <FiExternalLink size={14} />
                  </a>
                  {p.demoLink && (
                    <a href={p.demoLink} target="_blank" rel="noopener noreferrer" className="ext-link" style={{ color: "var(--accent)" }}>
                      Live Demo <FiExternalLink size={14} />
                    </a>
                  )}
                </div>

                {p.id === 0 && (
                  <svg viewBox="0 0 340 220" xmlns="http://www.w3.org/2000/svg" className="arch-svg arch-svg-sm" style={{marginTop: "1.5rem", width: "100%", height: "auto", maxHeight: "200px"}}>
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
                )}

                {p.id === 1 && (
                  <svg viewBox="0 0 340 90" xmlns="http://www.w3.org/2000/svg" className="arch-svg arch-svg-sm" style={{marginTop: "1.5rem", width: "100%", height: "auto", maxHeight: "140px"}}>
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
                  <svg viewBox="0 0 340 90" xmlns="http://www.w3.org/2000/svg" className="arch-svg arch-svg-sm" style={{marginTop: "1.5rem", width: "100%", height: "auto", maxHeight: "140px"}}>
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
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PIPELINE VISUALISER ── */}
      <section className="section" style={{ background: "var(--bg-main)", paddingBottom: "2rem" }}>
        <p className="section-label reveal" ref={addToRefs}>Live Architecture</p>
        <h2 className="section-title reveal" ref={addToRefs}>Automation Flow</h2>
        
        <div className="pipeline-track reveal" ref={addToRefs}>
          <div className="flow-line" />
          {PIPELINE.map((node, i) => (
            <div key={i} className="pipeline-node">
              <div className="node-icon" style={{ borderColor: node.dot, color: node.dot }}>
                {i === 0 && <FiDatabase />}
                {i === 1 && <FiSettings />}
                {i === 2 && <FiCpu />}
                {i === 3 && <FiCode />}
                {i === 4 && <FiTerminal />}
                <div className="node-pulse" style={{ borderColor: node.dot }} />
              </div>
              <div className="node-label">
                <span style={{ display: 'block', fontWeight: 600, color: 'var(--text-main)', marginBottom: '4px' }}>{node.label}</span>
                <span style={{ fontSize: '0.55rem', opacity: 0.6 }}>{node.sub}</span>
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
            I build <strong>AI automation systems</strong> — from LLM-powered pipelines and RAG chatbots
            to full-stack applications that ship to production.
          </p>
          <p className="about-bio">
            MCA graduate (July 2026) · Published at <strong>GCCMIEA International Conference</strong> · Open to relocation across India.
          </p>
          <p className="about-bio" style={{ color: "#222", fontSize: ".78rem", letterSpacing: ".06em" }}>
            Current focus: agentic AI systems · LangGraph · multi-agent orchestration
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
                    {cat.items.map((item, idx) => (
                      <div key={idx} className="skill-item-pill">
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SYSTEMS BUILT ── */}
      <section className="section" style={{ background: "#000" }}>
        <p className="section-label reveal" ref={addToRefs}>Engineering Footprint</p>
        <h2 className="section-title reveal" ref={addToRefs}>Systems Built</h2>
        <div className="systems-list reveal" ref={addToRefs}>
          {SYSTEMS.map((s, i) => (
            <div key={i} className="system-row">
              <div className="system-index">0{i + 1}</div>
              <div className="system-info">
                <div className="system-name">{s.name}</div>
                <div className="system-desc">{s.desc}</div>
              </div>
              <div className="system-line" />
            </div>
          ))}
        </div>
      </section>

      {/* ── GITHUB ── */}
      <section className="section" style={{ background: "#080808" }}>
        <p className="section-label reveal" ref={addToRefs}>Open Source</p>
        <h2 className="section-title reveal" ref={addToRefs}>GitHub</h2>
      
        <div className="github-top reveal" ref={addToRefs}>
          <div className="github-stat-single">
            <div className="github-number">{ghStats?.public_repos ?? "—"}</div>
            <div className="github-label">Public Repositories</div>
          </div>
        </div>
      
        <div className="github-contrib reveal" ref={addToRefs}>
          <p className="contrib-label">Contribution Activity</p>
          <img
            src={`https://ghchart.rshah.org/3d8a3d/Bhushan-git20`}
            alt="GitHub contribution graph"
            className="contrib-graph"
          />
        </div>
      
        <div className="github-repos reveal" ref={addToRefs}>
          {[
            { name: "mindful-pathways", desc: "AI mental wellness platform · React · FastAPI · Gemini" },
            { name: "pdf-rag-chatbot", desc: "Multi-PDF RAG chatbot · LangChain · ChromaDB · Streamlit" },
            { name: "job-automation-pipeline", desc: "n8n job scraper · Gemini scoring · Telegram delivery" },
            { name: "ollive-ai-assistant", desc: "AI Assistant deployed on Hugging Face Spaces · Python · Gradio" },
            { name: "placement-prospect-ai", desc: "AI career coach & resume parsing · React · Supabase · Gemini" },
          ].map(r => (
            <a
              key={r.name}
              href={`https://github.com/Bhushan-git20/${r.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="repo-card"
            >
              <div className="repo-name">Bhushan-git20 / {r.name}</div>
              <div className="repo-desc">{r.desc}</div>
              <div className="repo-arrow">→</div>
            </a>
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
        <p className="section-label reveal" ref={addToRefs}>Get In Touch</p>
        <h2 className="contact-title reveal" ref={addToRefs}>Let's Work<br />Together</h2>
        <div className="contact-divider reveal" ref={addToRefs} />
        <button onClick={handleCopyEmail} className="contact-email reveal" ref={addToRefs} style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer', fontFamily: 'inherit' }}>
          <SiGmail size={16} color="#EA4335" style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} />
          bhushanam2004@gmail.com
          {copied && <span className="copied-tooltip">Copied! ✅</span>}
        </button>

        <form action="https://api.web3forms.com/submit" method="POST" className="contact-form reveal" ref={addToRefs}>
          <input type="hidden" name="access_key" value="0cf726bd-0957-4f18-92bd-805dc9596b43" />
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
