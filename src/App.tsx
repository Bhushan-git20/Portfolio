import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GoogleGenerativeAI } from "@google/generative-ai";

gsap.registerPlugin(ScrollTrigger);
import { PillNav } from "./PillNav";
import Lanyard from "./Lanyard";
import Lightning from "./Lightning";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";
import Lenis from "lenis";
import "@fontsource/bebas-neue";
import "@fontsource/dm-sans";
import { 
  FiGithub, FiLinkedin, FiMail, FiExternalLink, FiCode, FiPhone, FiAward, 
  FiCpu, FiDatabase, FiSettings, FiTerminal, FiGitMerge, FiTwitter, FiArrowUpRight
} from "react-icons/fi";
import { 
  SiPython, SiJavascript, SiTypescript, SiReact, SiTailwindcss, SiHtml5, SiCss, 
  SiFastapi, SiNodedotjs, SiExpress, SiPostgresql, SiDocker, SiVercel, SiSupabase, SiGoogle, SiGmail
} from "react-icons/si";
import { FaJava, FaGitAlt, FaAws, FaRobot } from "react-icons/fa";
import { GitHubCalendar } from 'react-github-calendar';
import "./App.css";

const t = (s: string) => s;
const GH_USER = "Bhushan-git20";

interface GitHubStats {
  public_repos: number;
  followers: number;
  following: number;
}

const NAME_DATA = (() => {
  const lines = ["DAMISETTI BHUSHANAM"];
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
    id: 3,
    name: "Ollive AI Assistant",
    problem: "Comparing OSS and frontier AI models in a production-like setting requires building real infrastructure — not just calling APIs. Most demos are superficial and don't test models under guardrails, memory, or tool constraints.",
    solution: "Built a dual-model AI assistant pitting Qwen2.5-0.5B (open source, runs on CPU) against Gemini 2.5 Flash (frontier), with a FastAPI backend, Next.js frontend, per-session SQLite memory, tool routing (calculator, datetime, DuckDuckGo search), input/output safety guardrails, and a Recharts observability dashboard tracking latency, tokens, and guardrail hits per session. Includes a 30-question eval suite across hallucination, bias, and safety categories with auto-generated PDF reports.",
    result: "Gemini 2.5 Flash: 30/30 (100%) · Qwen2.5-0.5B: 26/30 (86.7%) · Side-by-side compare tab with cost and latency breakdown · Deployed on Hugging Face Spaces.",
    tech: ["Python", "FastAPI", "Next.js", "HuggingFace Spaces", "SQLite"],
    link: "https://github.com/Bhushan-git20/ollive-ai-assistant",
    demoLink: "https://huggingface.co/spaces/Bhushanam/ollive-ai-assistant",
    image: "/ollive.png"
  },
  {
    id: 2,
    name: "PDF RAG Chatbot",
    problem: "Reading through long PDFs to find specific answers is slow, loses context across documents, and standard keyword search misses semantically related content entirely.",
    solution: "Built a multi-PDF conversational AI using a hybrid retrieval pipeline — ChromaDB for dense semantic search combined with BM25 for sparse keyword matching, reranked by a CrossEncoder (ms-marco-MiniLM-L-6-v2) to surface only the top 3 most relevant chunks. Gemini 2.5 Flash synthesizes the answer with automatic fallback to Groq Llama-3.3-70b for high availability. Every response includes source attribution showing exactly which paragraph it came from.",
    result: "Handles multiple PDFs in a single session · Source-attributed responses with CrossEncoder confidence scoring · Thread-safe embeddings for concurrent access · Exponential backoff for API rate limits.",
    tech: ["Python", "LangChain LCEL", "ChromaDB", "CrossEncoder", "Gemini 2.5 Flash", "Streamlit"],
    link: "https://github.com/Bhushan-git20/pdf-rag-chatbot",
    demoLink: "https://huggingface.co/spaces/Bhushanam/pdf-rag-chatbot",
    image: "/rag_chatbot.png"
  },
  {
    id: 4,
    name: "HireReady",
    badge: "Open Source",
    problem: "Most students apply to jobs blindly — no idea if their skills match the role, what gaps exist, or why they keep getting ghosted. Generic interview prep doesn't account for your actual projects or background.",
    solution: "Built a full-stack AI career intelligence tool where you set up your profile once (skills, projects, CGPA, resume text) and then paste any job description to get an honest A–F fit grade, a weighted match score, specific missing skills, and how many weeks it would take to close the gap. The interview module generates STAR-format behavioral questions and answers written around your actual projects — not generic examples.",
    result: "End-to-end from JD paste to interview-ready in under 2 minutes. Tracks every application with stage updates, and surfaces rejection patterns after 5+ applications.",
    tech: ["React", "TypeScript", "Supabase", "Gemini 2.5 Flash", "Tailwind CSS"],
    link: "https://github.com/Bhushan-git20/hireready",
    image: "/placement_prospect.png"
  },
  {
    id: 0,
    featured: true,
    name: "MindCare",
    badge: "Published · GCCMIEA Dec 2025",
    problem: "Student mental health support is fragmented — clinical tools feel cold, general apps lack depth, and nothing combines mood tracking, AI-guided support, and real assessments in one place built specifically for students.",
    solution: "Built a full-stack wellness platform with PHQ-9 and GAD-7 clinical assessments, an AI chatbot (Gemini 2.5 Flash via Supabase Edge Functions) that suggests evidence-based coping strategies, mood-coded journaling with sentiment analysis, habit tracking, an anonymous peer community with content moderation, and an admin panel for counsellors. Research published at GCCMIEA International Conference, December 2025.",
    result: "150+ test users during MCA capstone evaluation · 4.2/5 satisfaction score · Sub-2s load time · Full-stack system with 6 Supabase Edge Functions handling AI, moderation, and assessment scoring.",
    tech: ["React", "TypeScript", "Supabase", "Gemini 2.5 Flash", "Vite"],
    link: "https://github.com/Bhushan-git20/mindful-pathways",
    image: "/mindcare.png"
  }
];

const SKILLS = [
  { cat: "AI-Automations",  items: ["LangChain", "n8n", "Gemini API", "Groq", "ChromaDB", "FAISS", "RAG", "Prompt Engineering"] },
  { cat: "Backend",          items: ["FastAPI", "Node.js", "Express.js", "PostgreSQL", "MySQL", "REST APIs"] },
  { cat: "Cloud-DevOps",   items: ["Docker", "AWS EC2", "AWS S3", "IAM", "CloudWatch", "Vercel", "Git"] },
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
  {
    name: "AI Job Automation Pipeline",
    desc: "n8n + Gemini + Groq · processes 200+ listings/day · zero manual input"
  },
  {
    name: "LLM Document Processing System",
    desc: "LangChain + ChromaDB + FAISS · 91% retrieval accuracy · multi-PDF"
  },
  {
    name: "Dockerised Workflow Infrastructure",
    desc: "Full stack containerisation · AWS EC2 deploy · 3 zero-downtime releases"
  },
  {
    name: "Event-Driven Notification System",
    desc: "Telegram bot integration · score-filtered delivery · real-time alerts"
  },
  {
    name: "AI-Powered Wellness Platform",
    desc: "Gemini API + Supabase real-time · 150+ users · published research"
  }
];

const RESUMES = [
  { label: "AI Engineer", file: "/Bhushan-AI-Engineer.pdf" }
];





export const Portfolio = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [ghStats, setGhStats] = useState<GitHubStats | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const heroTextContainerRef = useRef<HTMLDivElement>(null);
  const heroNameRef = useRef<HTMLHeadingElement>(null);
  const heroRoleRef = useRef<HTMLParagraphElement>(null);
  
  useEffect(() => {
    // Preloader counting sequence (sped up)
    const steps = [0, 54, 100];
    let stepIndex = 0;
    
    const interval = setInterval(() => {
      stepIndex++;
      if (stepIndex < steps.length) {
        setLoadingProgress(steps[stepIndex]);
      } else {
        clearInterval(interval);
        setTimeout(() => setIsLoading(false), 0); 
      }
    }, 60); 

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isLoading || !heroNameRef.current || !heroTextContainerRef.current) return;
    const charInners = heroNameRef.current.querySelectorAll('.gsap-char-inner');
    const uChars = heroNameRef.current.querySelectorAll('.char-u');
    const cChars = heroNameRef.current.querySelectorAll('.char-c');

    const tl = gsap.timeline({ 
      delay: 0.1,
      onComplete: () => {
        charInners.forEach((node) => {
          const uChar = node.querySelector('.char-u');
          const cChar = node.querySelector('.char-c');
          
          if (!uChar || !cChar) return;

          const onEnter = () => {
            gsap.to(uChar, { clipPath: "inset(0 0 0 100%)", duration: 0.4, ease: "power3.out", overwrite: true });
            gsap.to(cChar, { clipPath: "inset(0 0 0 0)", duration: 0.4, ease: "power3.out", overwrite: true });
          };
          
          const onLeave = () => {
            gsap.to(cChar, { clipPath: "inset(0 100% 0 0)", duration: 0.5, ease: "power3.out", overwrite: true });
            gsap.to(uChar, { clipPath: "inset(0 0 0 0)", duration: 0.5, ease: "power3.out", overwrite: true });
          };

          node.addEventListener('mouseenter', onEnter);
          node.addEventListener('mouseleave', onLeave);
          
          (node as any)._cleanupHover = () => {
            node.removeEventListener('mouseenter', onEnter);
            node.removeEventListener('mouseleave', onLeave);
          };
        });
      }
    }); 
    
    // Set initial clip-path for hover clones
    gsap.set(cChars, { clipPath: "inset(0 100% 0 0)" });

    // 1. Center Text Reveal (Slide up)
    tl.fromTo(charInners, 
      { yPercent: 110 }, 
      { yPercent: 0, duration: 0.6, ease: "power4.out", stagger: 0.015 }
    );

    // 2. Move to top (but not too far, leave room for nav bar)
    tl.to(heroTextContainerRef.current, {
      y: "-20vh",
      duration: 0.8,
      ease: "power3.inOut"
    }, "+=0.1");

    // 3. Role and button pop up
    if (heroRoleRef.current) {
      tl.to([".hero-intro", heroRoleRef.current], { 
        autoAlpha: 1, 
        y: 0, 
        duration: 0.6, 
        ease: "power3.out", 
        stagger: 0.1 
      }, "-=0.3");
    }

    return () => {
      charInners.forEach(node => {
        if ((node as any)._cleanupHover) (node as any)._cleanupHover();
      });
      tl.kill();
    };
  }, [isLoading]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.id) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });
    
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
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

  const [isChatTyping, setIsChatTyping] = useState(false);

  const getLocalFallbackResponse = (query: string): string => {
    const q = query.toLowerCase();
    if (q.includes('who is bhushan') || q.includes('who are you') || q.includes('about') || q.includes('bhushan')) {
      return "Damisetti Bhushanam is an AI Automation Engineer and Full Stack Developer. He recently graduated with his MCA in July 2026 and builds advanced AI automation systems, RAG pipelines (like PDF RAG Chatbot), and full-stack web applications.";
    }
    if (q.includes('project') || q.includes('work') || q.includes('portfolio') || q.includes('build')) {
      return "Bhushan has built several high-impact projects:\n\n1. **Ollive AI Assistant**: A dual-model assistant comparing Qwen2.5 & Gemini with a FastAPI backend.\n2. **PDF RAG Chatbot**: Multi-PDF AI using ChromaDB and CrossEncoder reranking.\n3. **HireReady**: AI career intelligence tool for JD analysis & STAR prep.\n4. **MindCare**: Full-stack wellness platform (GCCMIEA published).";
    }
    if (q.includes('skill') || q.includes('tech') || q.includes('python') || q.includes('react') || q.includes('stack')) {
      return "Bhushan's core technical stack includes:\n\n• **AI/Automation**: LangChain, n8n, Gemini API, ChromaDB, RAG, Prompt Engineering\n• **Languages & Backend**: Python, FastAPI, Node.js, TypeScript, PostgreSQL, Docker\n• **Frontend**: React, TypeScript, Tailwind CSS, JavaScript";
    }
    if (q.includes('education') || q.includes('mca') || q.includes('college') || q.includes('study')) {
      return "Bhushan completed his Master of Computer Applications (MCA) at Vignan's Institute of Information Technology (2024 - 2026) with a CGPA of 7.86. Prior to that, he earned his B.Sc in Computer Science at Aditya Degree College.";
    }
    if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('github') || q.includes('linkedin')) {
      return "You can connect with Bhushan via:\n\n• **Email**: damisettibhushanam@gmail.com\n• **GitHub**: [github.com/Bhushan-git20](https://github.com/Bhushan-git20)\n• **LinkedIn**: [linkedin.com/in/damisetti-bhushanam](https://linkedin.com/in/damisetti-bhushanam)";
    }
    return "I'm sorry, but I can only provide information that is explicitly stated in Bhushan's portfolio and resume. Feel free to ask about his projects, skills, education, experience, or contact details!";
  };

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
        model: "gemini-2.0-flash-lite",
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
2. PDF RAG Chatbot: Multi-PDF AI using LangChain LCEL, ChromaDB Hybrid Search, Google Embeddings, and CrossEncoder reranking. 91% retrieval accuracy. Tech: Python, LangChain, ChromaDB, Gemini 2.5 Flash, Streamlit.
3. Olive AI Assistant: Custom AI agent deployed to Hugging Face Spaces for free, scalable access. Tech: Python, HF Spaces, Gradio, LLM APIs.
4. HireReady: AI-powered open-source job application intelligence platform featuring predictive job fit scoring, real-time market insights, and STAR framework interview preparation. Tech: React, TS, Supabase, Gemini 2.0 Flash, Tailwind CSS.
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
      console.warn("Gemini API Quota/Error, falling back to local dataset:", error);
      const fallbackText = getLocalFallbackResponse(userMessage);
      setChatMessages(prev => [...prev, { sender: 'ai', text: fallbackText }]);
    } finally {
      setIsChatTyping(false);
    }
  };


  // ── SPOTLIGHT EFFECT ──
  const handleCardMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
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
      if (el) revealObserver.observe(el);
    });

    const navObserver = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            setActiveSection(e.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-10% 0px -40% 0px" }
    );
    
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(s => navObserver.observe(s));

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

    return () => {
      revealObserver.disconnect();
      navObserver.disconnect();
    };
  }, []);

  const addToRefs = useCallback((el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  }, []);

  return (
    <>

      {/* ── NAV ── */}
      <PillNav
        items={[
          { label: 'Home', href: '#home' },
          { label: 'About', href: '#about' },
          { label: 'Experience', href: '#experience' },
          { label: 'Workflow', href: '#process' },
          { label: 'Projects', href: '#work' },
          { label: 'Skills', href: '#skills' },
          { label: 'Contact', href: '#contact' }
        ]}
        activeHref={`#${activeSection}`}
        baseColor="#161617"
        pillColor="#000000"
        hoveredPillTextColor="#ffffff"
        pillTextColor="#888888"
        initialLoadAnimation={true}
      />

      {/* ── PRELOADER ── */}
      <div className={`preloader ${!isLoading ? 'preloader-hidden' : ''}`}>
        <div className="preloader-counter">{loadingProgress}</div>
      </div>

      {/* ── HERO ── */}
      <section id="home" className="hero-section">
        
        <Lightning hue={220} xOffset={0} speed={1} intensity={1.5} size={1} />
        
        <div className="hero-text-content" ref={heroTextContainerRef}>
          <h1 className="hero-name" aria-label="DAMISETTI BHUSHANAM" ref={heroNameRef}>
            {NAME_DATA.map((line, li) => (
              <div key={li} className="hero-line" aria-hidden="true" style={{ overflow: 'hidden' }}>
                {line.map((item, idx) => (
                  <span key={idx} className="gsap-char" style={{ animationDelay: item.delay }}>
                    <span className="gsap-char-inner">
                      <span className="char-u">{item.ch === ' ' ? '\u00A0' : item.ch}</span>
                      <span className="char-c">{item.ch === ' ' ? '\u00A0' : item.ch}</span>
                    </span>
                  </span>
                ))}
              </div>
            ))}
          </h1>
          
          <p className="hero-intro">{t('Introducing')}</p>
        
          <div className="hero-meta" ref={heroRoleRef}>
            <p className="hero-headline">AI Automation Engineer</p>
            <a href={RESUMES[0].file} target="_blank" rel="noopener noreferrer" className="resume-btn">
              View Resume ↗
            </a>
          </div>
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
            {[["3+","Projects"],["2","Internships"],["7","Repos"],["3+","Certs"],["1","Papers"]].map(([num, label]) => (
              <div key={label} className="stat-block">
                <dt className="stat-label">{label}</dt>
                <dd className="stat-number">{num}</dd>
              </div>
            ))}
          </dl>
        </div>
          <div className="about-photo reveal" ref={addToRefs} style={{ transitionDelay: "0.2s", perspective: "1000px" }}>
            <Lanyard paused={activeSection !== "about"} position={[0, 0, 20]} gravity={[0, -40, 0]} frontImage={"/bhushan.png" as any} />
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
              <div className="timeline-content">
                <div className="timeline-date">Jul 2024 - Jul 2026</div>
                <h4 className="timeline-role">Master of Computer Applications (MCA)</h4>
                <p className="timeline-org">Vignan's Institute of Information Technology</p>
                <p className="timeline-desc">CGPA: 7.86</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-content">
                <div className="timeline-date">Jun 2021 - Apr 2024</div>
                <h4 className="timeline-role">B.Sc Computer Science</h4>
                <p className="timeline-org">Aditya Degree College</p>
                <p className="timeline-desc">CGPA: 7.27</p>
              </div>
            </div>
          </div>

          {/* Experience Column */}
          <div className="timeline-col">
            <h3 className="timeline-col-title">Experience</h3>
            <div className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-content">
                <div className="timeline-date">Mar 2026 - Apr 2026</div>
                <h4 className="timeline-role">Full Stack Developer Intern</h4>
                <p className="timeline-org">Codec Technologies</p>
                <p className="timeline-desc">Built async FastAPI endpoints and React dashboards. Deployed to AWS EC2 with Docker.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-content">
                <div className="timeline-date">Feb 2024 - Apr 2024</div>
                <h4 className="timeline-role">AWS Cloud Intern</h4>
                <p className="timeline-org">Adhoc Network Company</p>
                <p className="timeline-desc">Monitored EC2 & S3 via CloudWatch, documented IAM roles, and authored operational runbooks.</p>
              </div>
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
        
        <ScrollStack 
          useWindowScroll={true} 
          itemDistance={100} 
          baseScale={0.82} 
          itemScale={0.045} 
          blurAmount={1.5}
          stackPosition="25%"
          scaleEndPosition="10%"
        >
          {PROJECTS.map((proj, idx) => (
            <ScrollStackItem key={proj.id}>
              <div className={`project-sbs ${idx % 2 !== 0 ? "sbs-reverse" : ""}`} style={{ margin: 0, height: '100%' }} onMouseMove={handleCardMouseMove}>
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
                    <p><strong style={{ color: '#EF4444', fontSize: '1.2em' }}>{t('Problem')}:</strong> {proj.problem}</p>
                    <p><strong style={{ color: '#EF4444', fontSize: '1.2em' }}>{t('Solution')}:</strong> {proj.solution}</p>
                    <p className="result-text"><strong style={{ color: '#EF4444', fontSize: '1.2em' }}>{t('Result')}:</strong> {proj.result}</p>
                  </div>
                  
                  <div className="project-sbs-tech">
                    {proj.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
                  </div>
                  
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '1.25rem' }}>
                    <a href={proj.link} target="_blank" rel="noopener noreferrer" className="project-link-btn ext-link">
                      <FiGithub size={16} /> View on GitHub <FiArrowUpRight size={14} />
                    </a>
                    {proj.demoLink && (
                      <a href={proj.demoLink} target="_blank" rel="noopener noreferrer" className="project-link-btn demo-btn ext-link">
                        <FiExternalLink size={16} /> Live Demo <FiArrowUpRight size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
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
          <div className="expertise-card" onMouseMove={handleCardMouseMove}>
            <h3 className="expertise-title">Workflow Automation</h3>
            <p className="expertise-desc">Connecting APIs and automating complex business processes to eliminate manual data entry.</p>
            <div className="expertise-tech">
              <span>n8n</span>
              <span>Make</span>
              <span>Webhooks</span>
            </div>
          </div>
          
          <div className="expertise-card" onMouseMove={handleCardMouseMove}>
            <h3 className="expertise-title">Agentic AI</h3>
            <p className="expertise-desc">Building autonomous LLM agents capable of reasoning, tool use, and multi-step execution.</p>
            <div className="expertise-tech">
              <span>LangGraph</span>
              <span>CrewAI</span>
              <span>Gemini</span>
            </div>
          </div>
          
          <div className="expertise-card" onMouseMove={handleCardMouseMove}>
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
          <p className="contrib-label" style={{ marginBottom: '1.5rem', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{t('Contribution Activity')}</p>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%', overflowX: 'auto', padding: '1rem' }}>
            <GitHubCalendar 
              username="Bhushan-git20" 
              colorScheme="dark" 
              blockSize={13} 
              blockMargin={4} 
              fontSize={14} 
            />
          </div>
        </div>
      
        <div className="github-repos reveal" ref={addToRefs}>
          {[
            { name: "mindful-pathways", desc: "AI mental wellness platform · React · Supabase · Gemini" },
              { name: "pdf-rag-chatbot", desc: "Multi-PDF RAG chatbot · LangChain · ChromaDB · Streamlit" },
              { name: "job-automation-pipeline", desc: "n8n job scraper · Gemini scoring · Telegram delivery" },
              { name: "ollive-ai-assistant", desc: "Dual-model AI Assistant eval suite · Next.js · FastAPI" },
              { name: "hireready", desc: "AI career intelligence tool · React · Supabase · Gemini" },
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
      <section id="contact" className="section" style={{ background: "var(--bg-alt)", position: "relative", overflow: "hidden" }}>
        <p className="section-label reveal" ref={addToRefs}>{t('Connect')}</p>
        <h2 className="section-title reveal" ref={addToRefs} style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', position: 'relative', zIndex: 2 }}>
          {t("Lets connect & build something useful together")}
        </h2>
        <div className="contact-wrapper reveal" ref={addToRefs}>
          <div className="contact-links-sidebar">
            <p style={{ marginBottom: '2.5rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '1.05rem' }}>
              {t('Currently open to roles as: AI Automation Engineer, Full Stack Developer, or Backend Developer.')}
            </p>
            <div className="social-cards-row">
              <a href="https://github.com/Bhushan-git20" target="_blank" rel="noopener noreferrer" className="social-card card-github" aria-label="GitHub">
                <span className="social-card-icon"><FiGithub size={24} color="#ffffff" /></span>
                <span className="social-card-label">GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/bhushanam-damisetti/" target="_blank" rel="noopener noreferrer" className="social-card card-linkedin" aria-label="LinkedIn">
                <span className="social-card-icon"><FiLinkedin size={24} color="#00A0DC" /></span>
                <span className="social-card-label">LinkedIn</span>
              </a>
              <a href="mailto:bhushanam2004@gmail.com" className="social-card card-email" aria-label="Email">
                <span className="social-card-icon"><FiMail size={24} color="#EA4335" /></span>
                <span className="social-card-label">Email</span>
              </a>
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
