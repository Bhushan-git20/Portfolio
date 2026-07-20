import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GoogleGenerativeAI } from "@google/generative-ai";

gsap.registerPlugin(ScrollTrigger);
import { PillNav } from "./PillNav";
import Lanyard from "./Lanyard";
import Starfield from "./Starfield";
import AnimatedButton from "./AnimatedButton";
import CustomCursor from "./CustomCursor";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";
import { PortfolioChatbot } from "./components/PortfolioChatbot";
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

import { 
  t, GH_USER, NAME_DATA, Project, PROJECTS, 
  SKILLS, getSkillIcon, SYSTEMS, RESUMES 
} from "./data/portfolioData";

interface GitHubStats {
  public_repos: number;
  followers: number;
  following: number;
}





export const Portfolio = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [ghStats, setGhStats] = useState<GitHubStats | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const heroTextContainerRef = useRef<HTMLDivElement>(null);
  const heroNameRef = useRef<HTMLHeadingElement>(null);
  const heroRoleRef = useRef<HTMLParagraphElement>(null);
  
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Preloader counting sequence (smooth from 0 to 100 bypassing React state for performance)
    let progress = { value: 0 };
    const tween = gsap.to(progress, {
      value: 100,
      duration: 1.5,
      ease: "power2.inOut",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.innerText = String(Math.round(progress.value)).padStart(3, '0');
        }
      },
      onComplete: () => {
        setTimeout(() => setIsLoading(false), 200); 
      }
    });

    return () => { tween.kill(); };
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
      <CustomCursor />
      <Starfield />

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
        <div className="preloader-counter" ref={counterRef}>000</div>
      </div>

      {/* ── HERO ── */}
      <section id="home" className="hero-section">
        
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
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', justifyContent: 'center' }}>
              <AnimatedButton as="a" href={RESUMES[0].file} target="_blank" rel="noopener noreferrer">
                View Resume ↗
              </AnimatedButton>
              <AnimatedButton as="a" href="#contact">
                Hire Me
              </AnimatedButton>
            </div>
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
            {[["5+","Projects"],["1","Internships"],["7","Repos"],["5+","Certs"],["1","Papers"]].map(([num, label]) => (
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
                <p className="timeline-desc">CGPA: 7.71</p>
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
              <div className="node">Supabase Edge Functions</div>
              <div className="flow-arrow">→</div>
              <div className="node highlight">Gemini 2.5 Flash</div>
              <div className="flow-arrow">→</div>
              <div className="node">Supabase DB</div>
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
              <div className="node">Google Sheets / Telegram</div>
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
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="section" style={{ background: "var(--bg-alt)", position: "relative", overflow: "hidden" }}>
        <p className="section-label reveal" ref={addToRefs}>{t('Connect')}</p>
        <h2 className="section-title reveal" ref={addToRefs} style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', position: 'relative', zIndex: 2 }}>
          {t("lets build together")}
        </h2>
        <div className="contact-wrapper reveal" ref={addToRefs}>
          <div className="contact-links-sidebar">
            <p style={{ marginBottom: '2.5rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '1.05rem' }}>
              {t('Currently open to roles as: AI Engineer / GenAI, AI Automation Engineer, or Full Stack Developer.')}
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
              <a href="mailto:bhushanamd20@gmail.com" className="social-card card-email" aria-label="Email">
                <span className="social-card-icon"><FiMail size={24} color="#EA4335" /></span>
                <span className="social-card-label">Email</span>
              </a>
              <a href="tel:+919390782043" className="social-card card-phone" aria-label="Phone">
                <span className="social-card-icon"><FiPhone size={24} color="#25D366" /></span>
                <span className="social-card-label">Call</span>
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
      <PortfolioChatbot />
    </>
  );
};
