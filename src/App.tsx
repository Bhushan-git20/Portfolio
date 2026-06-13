/* eslint-disable */
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "@fontsource/bebas-neue";
import "@fontsource/dm-sans";
import { 
  FiGithub, FiLinkedin, FiMail, FiExternalLink, FiCode, FiPhone, FiAward, 
  FiSun, FiMoon, FiCpu, FiDatabase, FiSettings, FiTerminal, FiGitMerge, FiTwitter
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
    id: 4,
    name: "HireReady",
    badge: "Open Source",
    problem: "Students lack actionable insights into their career readiness and market demands, making interview preparation inefficient.",
    solution: "Developed an AI-powered open-source job application intelligence platform featuring predictive job fit scoring, real-time market insights, and STAR framework interview preparation.",
    result: "Real-time market intelligence and a personalized AI career coach for students.",
    tech: ["React", "TypeScript", "Supabase", "Gemini 2.5 Flash", "Tailwind CSS"],
    link: "https://github.com/Bhushan-git20/hireready",
    image: "/placement_prospect.png"
  },
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

const TiltCard = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={className || "id-card id-card-drop"}
    >
      <div style={{ transform: "translateZ(50px)", width: "100%", height: "100%" }}>
        {children}
      </div>
    </motion.div>
  );
};

export const Portfolio = () => {
  const [ghStats, setGhStats] = useState<GitHubStats | null>(null);
  const [theme, setTheme] = useState("dark");
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.id) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.3 });
    
    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });
    
    return () => observer.disconnect();
  }, []);
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  // Scroll tracking for Timeline animations
  const processRef = useRef<HTMLElement>(null);
  const { scrollYProgress: processScroll } = useScroll({
    target: processRef,
    offset: ["start center", "end center"]
  });
  const processLineHeight = useTransform(processScroll, [0, 1], ["0%", "100%"]);
  // Premium feature states
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<{sender: string, text: string}[]>([
    { sender: 'ai', text: 'Hi! I am Bhushan\'s AI assistant. How can I help you today?' }
  ]);

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
    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
          document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const toggleTheme = () => setTheme(prev => prev === "dark" ? "light" : "dark");

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
        model: "gemini-1.5-flash-latest",
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
2. PDF RAG Chatbot: Multi-PDF AI using LangChain, ChromaDB, FAISS, HF MiniLM. 91% retrieval accuracy. Tech: Python, LangChain, ChromaDB, FAISS, Gemini 1.5 Flash, Streamlit.
3. Olive AI Assistant: Custom AI agent deployed to Hugging Face Spaces for free, scalable access. Tech: Python, HF Spaces, Gradio, LLM APIs.
4. HireReady: AI-powered open-source job application intelligence platform featuring predictive job fit scoring, real-time market insights, and STAR framework interview preparation. Tech: React, TS, Supabase, Gemini 1.5 Flash, Tailwind CSS.
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


  // ── SPOTLIGHT EFFECT ──
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll('.expertise-card, .project-sbs');
      cards.forEach(card => {
        const rect = (card as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
        (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
          } else {
            e.target.classList.remove("visible");
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
  }, []);

  const addToRefs = useCallback((el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  }, []);

  return (
    <>
      <div className="cursor-glow"></div>
      {/* ── NAV ── */}
      {/* ── NAV ── */}
      <nav className="nav-wrapper">
        <span className="nav-logo">{t('Bhushan')}</span>
        <div className="nav-links">
          {[["#home","Home"], ["#about","About"], ["#experience","Experience"], ["#process","Workflow"], ["#work","Projects"], ["#skills","Skills"], ["#contact","Contact"]].map(([href, label]) => {
            const isActive = activeSection === href.replace('#', '');
            return (
              <a key={href} href={href} className={`nav-link ${isActive ? 'active' : ''}`} style={{ position: 'relative' }}>
                {label}
                {isActive && (
                  <motion.div 
                    layoutId="nav-indicator"
                    className="nav-active-indicator"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "dark" ? <FiSun size={16} color="#FFD700" /> : <FiMoon size={16} />}
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
          AI Automation Engineer
        </p>

        <p className="hero-subtext">
          Building AI agents, workflow automations, and intelligent systems that create measurable business outcomes.
        </p>

        <div className="hero-ctas">
          <a href="#work" className="cta-primary">{t('View Projects')}</a>
          <a href="#about" className="cta-secondary">{t('Resume')}</a>
        </div>
      </section>

      {/* ── PROJECTS (SIDE-BY-SIDE LAYOUT) ── */}
      {/* ── ABOUT ── */}
      <section id="about" className="about-section">
        <div className="about-text reveal" ref={addToRefs}>
          <p className="section-label">{t('Background')}</p>
          <h2 className="about-title">{t('About')}</h2>
          <p className="about-bio">
            I build <strong>{t('AI automation systems')}</strong> — from LLM-powered pipelines and RAG chatbots
            to full-stack applications that ship to production.
          </p>
          <p className="about-bio">
            MCA graduate (July 2026) · Published at <strong>{t('GCCMIEA International Conference')}</strong> · Open to relocation across India.
          </p>
          <p className="about-bio" style={{ color: "var(--text-muted)", fontSize: ".85rem", letterSpacing: ".06em" }}>
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
            <p className="resume-label" style={{ color: '#FFD700' }}>{t('View Resume')}</p>
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
            {[["3+","Projects"],["2","Internships"],["7","Repos"],["3","Certs"]].map(([num, label]) => (
              <div key={label} className="stat-block">
                <dt className="stat-label">{label}</dt>
                <dd className="stat-number">{num}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="about-photo reveal" ref={addToRefs} style={{ transitionDelay: "0.2s", perspective: "1000px" }}>
          <TiltCard>
            <div className="photo-wrapper" style={{ width: "100%", height: "100%" }}>
              <img
                src="/bhushan.png"
                alt="Damisetti Bhushanam"
                className="about-photo-img"
              />
            </div>
          </TiltCard>
        </div>
      </section>

      {/* ── EDUCATION & EXPERIENCE ── */}
      <section id="experience" className="section" style={{ background: "var(--bg-main)" }}>
        <p className="section-label reveal" ref={addToRefs}>{t('My Journey')}</p>
        <h2 className="section-title reveal" ref={addToRefs}>{t('Background')}</h2>

        <div className="timeline-two-col reveal" ref={addToRefs}>
          {/* Education Column */}
          <div className="timeline-col">
            <h3 className="timeline-col-title">Education</h3>
            <div className="timeline-item">
              <div className="timeline-dot" />
              <TiltCard className="timeline-content">
                <div className="timeline-date">Jul 2024 - Jul 2026</div>
                <h4 className="timeline-role">Master of Computer Applications (MCA)</h4>
                <p className="timeline-org">Vignan's Institute of Information Technology</p>
                <p className="timeline-desc">CGPA: 7.86</p>
              </TiltCard>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot" />
              <TiltCard className="timeline-content">
                <div className="timeline-date">Jun 2021 - Apr 2024</div>
                <h4 className="timeline-role">B.Sc Computer Science</h4>
                <p className="timeline-org">Aditya Degree College</p>
                <p className="timeline-desc">CGPA: 7.27</p>
              </TiltCard>
            </div>
          </div>

          {/* Experience Column */}
          <div className="timeline-col">
            <h3 className="timeline-col-title">Experience</h3>
            <div className="timeline-item">
              <div className="timeline-dot" />
              <TiltCard className="timeline-content">
                <div className="timeline-date">Mar 2026 - Apr 2026</div>
                <h4 className="timeline-role">Full Stack Developer Intern</h4>
                <p className="timeline-org">Codec Technologies</p>
                <p className="timeline-desc">Built async FastAPI endpoints and React dashboards. Deployed to AWS EC2 with Docker.</p>
              </TiltCard>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot" />
              <TiltCard className="timeline-content">
                <div className="timeline-date">Feb 2024 - Apr 2024</div>
                <h4 className="timeline-role">AWS Cloud Intern</h4>
                <p className="timeline-org">Adhoc Network Company</p>
                <p className="timeline-desc">Monitored EC2 & S3 via CloudWatch, documented IAM roles, and authored operational runbooks.</p>
              </TiltCard>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" className="section" ref={processRef} style={{ background: "var(--bg-main)", position: "relative" }}>
        <p className="section-label reveal" ref={addToRefs}>{t('Workflow')}</p>
        <h2 className="section-title reveal" ref={addToRefs}>{t('AI Engineering Process')}</h2>
        
        <div className="process-timeline-container">
          <div className="timeline-track-bg"></div>
          <motion.div className="timeline-track-fill" style={{ height: processLineHeight }}></motion.div>
          <div className="process-timeline-items">
            {[
              { num: "01", title: "Discovery & Architecture", desc: "Analyze business bottlenecks, select optimal LLMs (Gemini, Groq) and design the agentic workflow structure (n8n, LangChain)." },
              { num: "02", title: "Data Integration", desc: "Connect diverse data sources, setup vector databases (ChromaDB, FAISS), and ingest unstructured data for RAG pipelines." },
              { num: "03", title: "Agent & Prompt Engineering", desc: "Craft robust system prompts, configure tool-calling capabilities, and build autonomous agents that can reason and execute." },
              { num: "04", title: "Testing & Evaluation", desc: "Rigorously evaluate retrieval accuracy, test edge cases, and ensure the system behaves predictably." },
              { num: "05", title: "Deployment & Automation", desc: "Dockerize applications, deploy to cloud infrastructure (AWS, Vercel), and establish monitoring." }
            ].map((step, i) => (
              <div key={step.num} className={`process-timeline-item ${i % 2 === 0 ? "left" : "right"}`}>
                <div className="process-timeline-dot"></div>
                <motion.div 
                  className="process-card"
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="process-num">{step.num}</div>
              <h3 className="process-step-title">{step.title}</h3>
              <p className="process-step-desc">{step.desc}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="section" style={{ background: "var(--bg-alt)" }}>
        <p className="section-label reveal" ref={addToRefs}>{t('Selected Work')}</p>
        <h2 className="section-title reveal" ref={addToRefs}>{t('Projects')}</h2>
        
        <div className="projects-sbs-list">
          {PROJECTS.map((proj, idx) => (
            <div key={proj.id} className={`project-sbs reveal ${idx % 2 !== 0 ? "sbs-reverse" : ""}`} ref={addToRefs}>
              <div className="project-sbs-visual">
                {proj.image ? (
                  <img src={proj.image} alt={proj.name} className="project-sbs-img" />
                ) : (
                  <div className="book-no-image">{t("No Image")}</div>
                )}
              </div>
              <div className="project-sbs-content">
                {proj.badge && <span className="project-badge">{proj.badge}</span>}
                <h3 className="project-sbs-title">{proj.name}</h3>
                
                <div className="project-sbs-desc">
                  <p><strong>{t('Problem')}:</strong> {proj.problem}</p>
                  <p><strong>{t('Solution')}:</strong> {proj.solution}</p>
                  <p className="result-text"><strong>{t('Result')}:</strong> {proj.result}</p>
                </div>
                
                <div className="project-sbs-tech">
                  {proj.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
                </div>
                
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <a href={proj.link} target="_blank" rel="noopener noreferrer" className="project-link-btn ext-link">
                    GitHub <FiExternalLink size={14} />
                  </a>
                  {proj.demoLink && (
                    <a href={proj.demoLink} target="_blank" rel="noopener noreferrer" className="project-link-btn ext-link" style={{ color: "var(--accent)" }}>
                      Live Demo <FiExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      
      {/* ── ARCHITECTURE DIAGRAMS ── */}
      <section className="section" style={{ background: "var(--bg-alt)", position: "relative", overflow: "hidden" }}>
        <p className="section-label reveal" ref={addToRefs}>{t('Systems Design')}</p>
        <h2 className="section-title reveal" ref={addToRefs}>{t('Architecture Flow')}</h2>
        
        <div className="arch-container reveal" ref={addToRefs}>
          {/* MindCare Architecture */}
          <div className="arch-card">
            <h3 className="arch-card-title">MindCare: AI Mental Wellness</h3>
            <div className="arch-flow">
              <div className="node">React UI</div>
              <div className="flow-arrow">→</div>
              <div className="node">FastAPI</div>
              <div className="flow-arrow">→</div>
              <div className="node highlight">Gemini Pro</div>
              <div className="flow-arrow">→</div>
              <div className="node">Supabase</div>
            </div>
          </div>

          {/* Job Automation Pipeline */}
          <div className="arch-card">
            <h3 className="arch-card-title">Job Automation Pipeline</h3>
            <div className="arch-flow">
              <div className="node">Data Sources</div>
              <div className="flow-arrow">→</div>
              <div className="node highlight">n8n Workflow</div>
              <div className="flow-arrow">→</div>
              <div className="node">AI Scoring</div>
              <div className="flow-arrow">→</div>
              <div className="node">Telegram / Notion</div>
            </div>
          </div>
        </div>
      </section>




      
      {/* ── AUTOMATION EXPERTISE ── */}
      <section className="section" style={{ background: "var(--bg-alt)", position: "relative" }}>
        <p className="section-label reveal" ref={addToRefs}>{t('Core Competencies')}</p>
        <h2 className="section-title reveal" ref={addToRefs}>{t('Automation Systems I Build')}</h2>
        
        <div className="expertise-grid reveal" ref={addToRefs}>
          <div className="expertise-card">
            <h3 className="expertise-title">Workflow Automation</h3>
            <p className="expertise-desc">Connecting APIs and automating complex business processes to eliminate manual data entry.</p>
            <div className="expertise-tech">
              <span>n8n</span>
              <span>Make</span>
              <span>Webhooks</span>
            </div>
          </div>
          
          <div className="expertise-card">
            <h3 className="expertise-title">Agentic AI</h3>
            <p className="expertise-desc">Building autonomous LLM agents capable of reasoning, tool use, and multi-step execution.</p>
            <div className="expertise-tech">
              <span>LangGraph</span>
              <span>CrewAI</span>
              <span>Gemini</span>
            </div>
          </div>
          
          <div className="expertise-card">
            <h3 className="expertise-title">Custom Web Apps</h3>
            <p className="expertise-desc">Developing premium, scalable full-stack applications with modern frameworks.</p>
            <div className="expertise-tech">
              <span>React</span>
              <span>FastAPI</span>
              <span>Supabase</span>
            </div>
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
      <section className="section" style={{ background: "var(--bg-main)" }}>
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
      <section className="section" style={{ background: "var(--bg-alt)" }}>
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
          <a href="https://github.com/Bhushan-git20" target="_blank" rel="noopener noreferrer" className="ext-link" style={{ color: '#FFD700' }}>
            github.com/Bhushan-git20 →
          </a>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="section" style={{ background: "var(--bg-alt)" }}>
        <p className="section-label reveal" ref={addToRefs}>{t('Connect')}</p>
        <h2 className="section-title reveal" ref={addToRefs} style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
          {t("Let's Build Something Useful.")}
        </h2>
        <div className="contact-wrapper reveal" ref={addToRefs}>
          <div className="contact-links-sidebar">
            <p style={{ marginBottom: '2.5rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '1.05rem' }}>
              {t('Currently open to roles as: AI Automation Engineer, Full Stack Developer, or Backend Developer.')}
            </p>
            <div className="social-icons">
              <a href="mailto:bhushanam2004@gmail.com" className="social-icon" aria-label="Email"><FiMail size={22} color="#EA4335" /> <span>Email</span></a>
              <a href="https://www.linkedin.com/in/bhushanam-damisetti/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn"><FiLinkedin size={22} color="#0A66C2" /> <span>LinkedIn</span></a>
              <a href="https://github.com/Bhushan-git20" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub"><FiGithub size={22} color="currentColor" /> <span>GitHub</span></a>
            </div>
          </div>
          <div className="contact-form-container">
            <form action="https://api.web3forms.com/submit" method="POST" className="contact-form">
              <input type="hidden" name="access_key" value="09d66144-8d9e-4c74-a6c8-58edbb813426" />
              <input type="text" name="name" placeholder="Name" required className="form-input" />
              <input type="email" name="email" placeholder="Email" required className="form-input" />
              <textarea name="message" placeholder="Your Message" required className="form-input form-textarea"></textarea>
              <button type="submit" className="cta-primary" style={{ width: '100%', marginTop: '1rem', border: 'none', cursor: 'pointer', padding: '1.2rem', fontSize: '1rem' }}>Send Message</button>
            </form>
          </div>
        </div>
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
