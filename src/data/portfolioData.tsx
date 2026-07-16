import React from "react";
import { 
  FiDatabase, FiCpu, FiCode, FiTerminal, FiGitMerge
} from "react-icons/fi";
import { 
  SiPython, SiJavascript, SiTypescript, SiReact, SiTailwindcss, SiHtml5, SiCss, 
  SiFastapi, SiNodedotjs, SiExpress, SiPostgresql, SiDocker, SiVercel, SiSupabase, SiGoogle
} from "react-icons/si";
import { FaJava, FaGitAlt, FaAws } from "react-icons/fa";

export const t = (s: string) => s;
export const GH_USER = "Bhushan-git20";

export const NAME_DATA = (() => {
  const lines = ["DAMISETTI BHUSHANAM"];
  let i = 0;
  return lines.map(line =>
    line.split("").map(ch => ({ ch, delay: `${(0.65 + i++ * 0.05).toFixed(2)}s` }))
  );
})();

export interface Project {
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

export const PROJECTS: Project[] = [
  {
    id: 3,
    name: "Ollive AI Assistant",
    problem: "Comparing OSS and frontier AI models in a production-like setting requires building real infrastructure — not just calling APIs. Most demos are superficial and don't test models under guardrails, memory, or tool constraints.",
    solution: "Built a dual-model AI assistant to compare local OSS models against Frontier APIs. Features a FastAPI backend, Next.js frontend, persistent SQLite memory, SSE streaming, DuckDuckGo Search grounding, tool routing, and input/output safety guardrails. Includes a Recharts observability dashboard tracking latency, tokens, and guardrail hits per session, plus a 30-question eval suite with auto-generated PDF reports.",
    result: "OSS vs Frontier model comparison · Side-by-side compare tab with cost and latency breakdown · Optimized via prompt engineering + guardrails · Deployed on Hugging Face Spaces.",
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
    result: "Handles multiple PDFs in a single session · Source-attributed responses with CrossEncoder confidence scoring · Verified RAGAS faithfulness 0.97 (15 queries) · Exponential backoff for API rate limits.",
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
  },
  {
    id: 5,
    name: "AI Job Automation Pipeline",
    problem: "Manually searching, filtering, and scoring daily job listings across multiple platforms is a repetitive, time-consuming process that delays applying to the best roles.",
    solution: "Built an automated job scraping and evaluation pipeline using n8n. It aggregates listings, uses Gemini/Groq for predictive scoring against my resume, and pushes high-match opportunities directly to a Telegram bot or Google Sheets for quick action.",
    result: "Zero manual input · Score-filtered delivery · Real-time Telegram alerts for top matches.",
    tech: ["n8n", "Gemini 2.5 Flash", "Groq", "Telegram API", "Google Sheets API", "Docker"],
    link: "https://github.com/Bhushan-git20/job-automation-pipeline",
    image: "/job_pipeline.png"
  }
];

export const SKILLS = [
  { cat: "AI-Automations",  items: ["LangChain", "n8n", "Gemini API", "Groq", "ChromaDB", "FAISS", "RAG", "Prompt Engineering"] },
  { cat: "Backend",          items: ["FastAPI", "Node.js", "Express.js", "PostgreSQL", "MySQL", "REST APIs"] },
  { cat: "Cloud-DevOps",   items: ["Docker", "AWS EC2", "AWS S3", "IAM", "CloudWatch", "Vercel", "Git"] },
  { cat: "Frontend",         items: ["React", "TypeScript", "Tailwind CSS", "JavaScript"] },
  { cat: "Languages",        items: ["Python", "Java SE 11", "TypeScript", "JavaScript"] },
];

export const getSkillIcon = (skill: string) => {
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

export const SYSTEMS = [
  {
    name: "AI Job Automation Pipeline",
    desc: "n8n + Gemini + Groq · automated resume matching · zero manual input"
  },
  {
    name: "LLM Document Processing System",
    desc: "LangChain + ChromaDB + BM25 · RAGAS faithfulness 0.97 · multi-PDF"
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

export const RESUMES = [
  { label: "AI Engineer", file: "/Bhushan-AI-Engineer.pdf" }
];
