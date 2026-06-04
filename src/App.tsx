/* eslint-disable */
import { useState, useEffect, useRef } from "react";
import { TypeAnimation } from "react-type-animation";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "@fontsource/bebas-neue";
import "@fontsource/dm-sans";
import { 
  FiGithub, FiLinkedin, FiMail, FiExternalLink, FiCode, FiPhone, FiAward, 
  FiSun, FiMoon, FiCpu, FiDatabase, FiSettings, FiTerminal, FiGitMerge
} from "react-icons/fi";
import { 
  SiPython, SiJavascript, SiTypescript, SiReact, SiTailwindcss, SiHtml5, SiCss, 
  SiFastapi, SiNodedotjs, SiExpress, SiPostgresql, SiDocker, SiVercel, SiSupabase, SiGoogle, SiGmail
} from "react-icons/si";
import { FaJava, FaGitAlt, FaAws, FaRobot } from "react-icons/fa";
import "./App.css";

const t = (s: string) => s;
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
    name: "Olive AI Assistant",
    problem: "Deploying intelligent AI assistants to the web can be complex and expensive without the right hosting.",
    solution: "Built a custom AI agent named Olive and deployed it directly to Hugging Face Spaces for free, scalable public access.",
    result: "Live interactive demo available 24/7 on Hugging Face Spaces",
    tech: ["Python", "HuggingFace Spaces", "Gradio", "LLM APIs"],
    link: "https://github.com/Bhushan-git20/ollive-ai-assistant",
    demoLink: "https://huggingface.co/spaces/Bhushan-git20/ollive-ai-assistant",
    image: "/ollive.png"
  },
  {
    id: 4,
    name: "HireReady",
    problem: "Students lack actionable insights into their career readiness and market demands, making interview preparation inefficient.",
    solution: "Developed an AI-powered open-source job application intelligence platform featuring predictive job fit scoring, real-time market insights, and STAR framework interview preparation.",
    result: "Real-time market intelligence and a personalized AI career coach for students.",
    tech: ["React", "TypeScript", "Supabase", "Gemini 2.5 Flash", "Tailwind CSS"],
    link: "https://github.com/Bhushan-git20/hireready",
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

const getSkillIcon = (skill: string) => {
  switch(skill.toLowerCase()) {
    case 'python': return <SiPython color="#5A9FD4" />;
    case 'javascript': return <SiJavascript color="#F7DF1E" />;
    case 'typescript': return <SiTypescript color="#5FA4F9" />;
    case 'react': return <SiReact color="#61DAFB" />;
    case 'tailwindcss': case 'tailwind css': return <SiTailwindcss color="#38BDF8" />;
    case 'html5': return <SiHtml5 color="#F06529" />;
    case 'css': return <SiCss color="#4BA4E6" />;
    case 'fastapi': return <SiFastapi color="#2DD4BF" />;
    case 'node.js': return <SiNodedotjs color="#4ade80" />;
    case 'express.js': return <SiExpress color="#4ade80" />;
    case 'postgresql': return <SiPostgresql color="#6B8CF4" />;
    case 'mysql': return <FiDatabase color="#63A0CF" />;
    case 'docker': return <SiDocker color="#53B1FF" />;
    case 'vercel': return <SiVercel color="#ffffff" />;
    case 'supabase': return <SiSupabase color="#3ECF8E" />;
    case 'gemini api': return <SiGoogle color="#6EA3FF" />;
    case 'java se 11': return <FaJava color="#00A2D3" />;
    case 'git': return <FaGitAlt color="#F47255" />;
    case 'aws ec2': case 'aws s3': case 'iam': case 'cloudwatch': return <FaAws color="#FF9900" />;
    case 'langchain': return <FiCpu color="#34D399" />;
    case 'n8n': return <FiGitMerge color="#FF6B6B" />;
    case 'groq': return <FiCpu color="#FF7A66" />;
    case 'chromadb': return <FiDatabase color="#F472B6" />;
    case 'faiss': return <FiDatabase color="#60A5FA" />;
    case 'rag': return <FiCode color="#C084FC" />;
    case 'prompt engineering': return <FiTerminal color="#FCD34D" />;
    case 'rest apis': return <FiCode color="#7DD3FC" />;
    default: return <FiCode color="#a3a3a3" />;
  }
};

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

  // Book Layout State
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [isBookReady, setIsBookReady] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isPageFlipping, setIsPageFlipping] = useState(false);

  useEffect(() => {
    if (isBookOpen) {
      const timer = setTimeout(() => setIsBookReady(true), 1200);
      return () => clearTimeout(timer);
    } else {
      setIsBookReady(false);
    }
  }, [isBookOpen]);

  const handleNextPage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentPage < PROJECTS.length - 1) {
      setIsPageFlipping(true);
      setTimeout(() => {
        setCurrentPage(p => p + 1);
        setTimeout(() => setIsPageFlipping(false), 50);
      }, 300);
    }
  };

  const handlePrevPage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentPage > 0) {
      setIsPageFlipping(true);
      setTimeout(() => {
        setCurrentPage(p => p - 1);
        setTimeout(() => setIsPageFlipping(false), 50);
      }, 300);
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Prevent scroll restoration on refresh
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

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

  const [isChatTyping, setIsChatTyping] = useState(false);

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isChatTyping) return;
    
    const userMessage = chatInput;
    setChatMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setChatInput("");
    setIsChatTyping(true);

    try {
      const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        setChatMessages(prev => [...prev, { sender: 'ai', text: "Error: VITE_GEMINI_API_KEY is not set in the environment variables." }]);
        setIsChatTyping(false);
        return;
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash",
        systemInstruction: `You are Bhushan's AI assistant for his portfolio website. 
You act like a RAG (Retrieval-Augmented Generation) chatbot. 
You MUST ONLY answer using the exact data provided below. Do NOT hallucinate, guess, or make up ANY information that is not explicitly written in this prompt. 
If the user asks about anything not found in the data below (even general knowledge, coding help, or unrelated topics), you must reply with: "I'm sorry, but I can only provide information that is explicitly stated in Bhushan's portfolio and resume."
Here is the strict context data:
Name: Damisetti Bhushanam
Education: MCA graduate (July 2026). Published at GCCMIEA International Conference. Open to relocation across India.
Bio: Builds AI automation systems — from LLM-powered pipelines and RAG chatbots to full-stack applications. Current focus: agentic AI systems, LangGraph, multi-agent orchestration.
Stats: 3+ Projects, 2 Internships, 7.86 CGPA, 3 Certifications.
Projects:
1. MindCare: Full-stack wellness platform with Gemini API driving personalised recommendations, Supabase real-time sync. (Published internationally). Tech: React, TS, FastAPI, PostgreSQL, Supabase, Gemini, Docker, AWS.
2. PDF RAG Chatbot: Multi-PDF AI using LangChain, ChromaDB, FAISS, HF MiniLM. 91% retrieval accuracy. Tech: Python, LangChain, ChromaDB, FAISS, Gemini 2.5 Flash, Streamlit.
3. Olive AI Assistant: Custom AI agent deployed to Hugging Face Spaces for free, scalable access. Tech: Python, HF Spaces, Gradio, LLM APIs.
4. HireReady: AI-powered open-source job application intelligence platform featuring predictive job fit scoring, real-time market insights, and STAR framework interview preparation. Tech: React, TS, Supabase, Gemini 2.5 Flash, Tailwind CSS.
Skills:
- AI/Automation: LangChain, n8n, Gemini API, Groq, ChromaDB, FAISS, RAG, Prompt Engineering
- Backend: FastAPI, Node.js, Express.js, PostgreSQL, MySQL, REST APIs
- Cloud/DevOps: Docker, AWS EC2/S3, IAM, CloudWatch, Vercel, Git
- Frontend: React, TypeScript, Tailwind CSS, JavaScript
- Languages: Python, Java SE 11, TypeScript, JavaScript
Keep your answers concise, professional, and directly related to Bhushan's skills and projects.`
      });

      // Construct history for Gemini
      const history = chatMessages
        .filter(msg => msg.text !== "Hi! I am Bhushan's AI assistant. How can I help you today?")
        .map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        }));

      const chat = model.startChat({ history });
      const result = await chat.sendMessage(userMessage);
      const response = await result.response;
      
      setChatMessages(prev => [...prev, { sender: 'ai', text: response.text() }]);
    } catch (error: any) {
      console.error("Chat API Error:", error);
      setChatMessages(prev => [...prev, { sender: 'ai', text: `Sorry, I'm having trouble: ${error.message || 'Unknown error'}` }]);
    } finally {
      setIsChatTyping(false);
    }
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
        <span className="nav-logo">{t('Bhushan')}</span>
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
        <p className="hero-intro">{t('Introducing')}</p>
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
          <a href="#work" className="cta-primary">{t('View Projects')}</a>
          <a href="https://github.com/Bhushan-git20" target="_blank" rel="noopener noreferrer" className="cta-secondary">{t('GitHub')}</a>
          <a href="#about" className="cta-secondary">{t('Resume')}</a>
        </div>
      

        <div className="scroll-hint">
          <span>{t('Scroll')}</span>
          <div className="scroll-bar" />
        </div>
      </section>

      {/* ── PROJECTS (3D BOOK LAYOUT) ── */}
      <section id="work" className="section" style={{ background: "var(--bg-alt)" }}>
        <p className="section-label reveal" ref={addToRefs}>{t('Selected Work')}</p>
        <h2 className="section-title reveal" ref={addToRefs}>{t('Projects')}</h2>
        
        <div className={`book-container ${isBookOpen ? "book-open" : ""} ${isBookReady ? "book-ready" : ""}`} ref={addToRefs}>
          {/* Cover */}
          <div 
            className="book-cover" 
            onClick={() => setIsBookOpen(true)}
          >
            <div className="book-cover-content">
              <h3>{t('My Projects Portfolio')}</h3>
              <p>{t('Click to Open')}</p>
              <div className="book-spine-detail"></div>
            </div>
          </div>
          
          {/* Inside Left Page (Image) */}
          <div className="book-page book-page-left">
             <div className={`page-content ${isPageFlipping ? 'page-transitioning' : ''}`}>
                {(PROJECTS.at(currentPage) || PROJECTS[0]).image ? (
                  <img src={(PROJECTS.at(currentPage) || PROJECTS[0]).image} alt={(PROJECTS.at(currentPage) || PROJECTS[0]).name} className="book-project-image" />
                ) : (
                  <div className="book-no-image">{t("No Image")}</div>
                )}
             </div>
          </div>

          {/* Inside Right Page (Details) */}
          <div className="book-page book-page-right">
             <div className={`page-content ${isPageFlipping ? 'page-transitioning' : ''}`}>
                <button 
                  className="book-close-btn" 
                  onClick={() => setIsBookOpen(false)}
                  aria-label="Close Book"
                >
                  &times;
                </button>
                
                {(PROJECTS.at(currentPage) || PROJECTS[0]).badge && <span className="project-badge">{(PROJECTS.at(currentPage) || PROJECTS[0]).badge}</span>}
                <h3 className="project-name">{(PROJECTS.at(currentPage) || PROJECTS[0]).name}</h3>
      
                <div className="project-story">
                  <div className="story-block">
                    <span className="story-label">{t('Problem')}</span>
                    <p className="story-text">{(PROJECTS.at(currentPage) || PROJECTS[0]).problem}</p>
                  </div>
                  <div className="story-block">
                    <span className="story-label">{t('Solution')}</span>
                    <p className="story-text">{(PROJECTS.at(currentPage) || PROJECTS[0]).solution}</p>
                  </div>
                  <div className="story-block story-result">
                    <span className="story-label">{t('Result')}</span>
                    <p className="story-text result-text">{(PROJECTS.at(currentPage) || PROJECTS[0]).result}</p>
                  </div>
                </div>
      
                <div className="project-tech">
                  {(PROJECTS.at(currentPage) || PROJECTS[0]).tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
                </div>
                
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <a href={(PROJECTS.at(currentPage) || PROJECTS[0]).link} target="_blank" rel="noopener noreferrer" className="ext-link">
                    GitHub <FiExternalLink size={14} />
                  </a>
                  {(PROJECTS.at(currentPage) || PROJECTS[0]).demoLink && (
                    <a href={(PROJECTS.at(currentPage) || PROJECTS[0]).demoLink} target="_blank" rel="noopener noreferrer" className="ext-link" style={{ color: "var(--accent)" }}>
                      Live Demo <FiExternalLink size={14} />
                    </a>
                  )}
                </div>

                {/* Pagination Controls */}
                <div className="book-pagination">
                   <button 
                     disabled={currentPage === 0 || isPageFlipping} 
                     onClick={handlePrevPage}
                   >
                     &larr; Prev
                   </button>
                   <span>{currentPage + 1} / {PROJECTS.length}</span>
                   <button 
                     disabled={currentPage === PROJECTS.length - 1 || isPageFlipping} 
                     onClick={handleNextPage}
                   >
                     Next &rarr;
                   </button>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="about-section">
        <div className="about-text reveal" ref={addToRefs}>
          <p className="section-label">{t('Background')}</p>
          <h2 className="about-title">{t('More About')}<br />Bhushan</h2>
          <p className="about-bio">
            I build <strong>{t('AI automation systems')}</strong> — from LLM-powered pipelines and RAG chatbots
            to full-stack applications that ship to production.
          </p>
          <p className="about-bio">
            MCA graduate (July 2026) · Published at <strong>{t('GCCMIEA International Conference')}</strong> · Open to relocation across India.
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
            <p className="resume-label">{t('View Resume')}</p>
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
        <p className="section-label reveal" ref={addToRefs}>{t('Capabilities')}</p>
        <h2 className="section-title reveal" ref={addToRefs}>{t('Tech Stack')}</h2>
        <div className="skills-marquee-wrapper reveal" ref={addToRefs}>
          {SKILLS.map((cat, i) => (
            <div key={cat.cat} className="skills-marquee-row" style={{ animationDirection: i % 2 === 0 ? 'normal' : 'reverse' }}>
              <div className="skills-marquee-content">
                {[...Array(4)].map((_, idx) => (
                  <div key={idx} className="skills-marquee-group">
                    <span className="skill-cat-pill">{cat.cat}</span>
                    {cat.items.map((item, idx) => (
                      <div key={idx} className="skill-item-pill">
                        {getSkillIcon(item)}
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
        <p className="section-label reveal" ref={addToRefs}>{t('Engineering Footprint')}</p>
        <h2 className="section-title reveal" ref={addToRefs}>{t('Systems Built')}</h2>
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
        <p className="section-label reveal" ref={addToRefs}>{t('Open Source')}</p>
        <h2 className="section-title reveal" ref={addToRefs}>{t('GitHub')}</h2>
      
        <div className="github-top reveal" ref={addToRefs}>
          <div className="github-stat-single">
            <div className="github-number">{ghStats?.public_repos ?? "—"}</div>
            <div className="github-label">{t('Public Repositories')}</div>
          </div>
        </div>
      
        <div className="github-contrib reveal" ref={addToRefs}>
          <p className="contrib-label">{t('Contribution Activity')}</p>
          <img
            src={`https://ghchart.rshah.org/3c8b3d/Bhushan-git20`}
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
            { name: "hireready", desc: "AI career coach & resume parsing · React · Supabase · Gemini" },
          ].map(r => (
            <a
              key={r.name}
              href={`https://github.com/Bhushan-git20/${r.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="repo-card"
            >
              <div className="repo-name">{t('Bhushan-git20 / ')}{r.name}</div>
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
        <p className="section-label reveal" ref={addToRefs}>{t('Get In Touch')}</p>
        <h2 className="contact-title reveal" ref={addToRefs}>{t("Let's Work")}<br />{t("Together")}</h2>
        <div className="contact-divider reveal" ref={addToRefs} />
        
        <div className="contact-links reveal" ref={addToRefs}>
          <a href="mailto:bhushanam2004@gmail.com" className="contact-link">
            <SiGmail size={14} color="#EA4335" /> Gmail
          </a>
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

        <form action="https://api.web3forms.com/submit" method="POST" className="contact-form reveal" ref={addToRefs}>
          <input type="hidden" name="access_key" value="0cf726bd-0957-4f18-92bd-805dc9596b43" />
          <div className="form-group">
            <input type="text" name="name" placeholder="Your Name" required className="form-input" />
            <input type="email" name="email" placeholder="Your Email" required className="form-input" />
          </div>
          <textarea name="message" placeholder="Your Message" required className="form-input form-textarea"></textarea>
          <button type="submit" className="form-submit">{t('Send Message')}</button>
        </form>
      </section>

      <footer>
        <p>© 2026 Damisetti Bhushanam</p>
        <p>{t('MCA Graduate · Visakhapatnam, AP')}</p>
      </footer>

      {/* ── AI CHATBOT ── */}
      <div className={`chatbot-widget ${chatOpen ? 'open' : ''}`}>
        {chatOpen && (
          <div className="chatbot-window">
            <div className="chatbot-header">
              <span><FaRobot size={16} /> Ask AI Assistant</span>
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
              <input type="text" placeholder="Ask about Bhushan..." value={chatInput} onChange={e => setChatInput(e.target.value)} disabled={isChatTyping} />
              <button type="submit" disabled={isChatTyping}>{isChatTyping ? "..." : "Send"}</button>
            </form>
          </div>
        )}
        <button className="chatbot-fab" onClick={() => setChatOpen(!chatOpen)} aria-label="Open AI Chat">
          <FaRobot size={24} />
        </button>
      </div>
    </>
  );
};
