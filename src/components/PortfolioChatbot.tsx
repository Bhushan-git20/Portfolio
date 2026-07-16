import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { FaRobot } from "react-icons/fa";

export const PortfolioChatbot = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [isChatTyping, setIsChatTyping] = useState(false);
  const [chatMessages, setChatMessages] = useState<{sender: string, text: string}[]>([
    { sender: 'ai', text: 'Hi! I am Bhushan\'s AI assistant. How can I help you today?' }
  ]);

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
    if (q.includes('education') || q.includes('mca') || q.includes('college') || q.includes('study') || q.includes('cgpa') || q.includes('gpa')) {
      return "Bhushan completed his Master of Computer Applications (MCA) at Vignan's Institute of Information Technology (2024 - 2026) with a CGPA of 7.71. Prior to that, he earned his B.Sc in Computer Science at Aditya Degree College.";
    }
    if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('github') || q.includes('linkedin')) {
      return "You can connect with Bhushan via:\n\n• **Email**: bhushanamd20@gmail.com\n• **GitHub**: [github.com/Bhushan-git20](https://github.com/Bhushan-git20)\n• **LinkedIn**: [linkedin.com/in/bhushanam-damisetti](https://linkedin.com/in/bhushanam-damisetti)";
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
Stats: 5+ Projects, 1 Internship, 7.71 CGPA, 5+ Certifications.
Projects:
1. MindCare: Full-stack wellness platform with Gemini API driving personalised recommendations, Supabase real-time sync. (Published internationally). Tech: React18, TS, Vite6, Tailwind, shadcn/ui, Supabase (PostgreSQL/Realtime/RLS/Edge Functions), Gemini 2.5 Flash.
2. PDF RAG Chatbot: Multi-PDF AI using LangChain LCEL, ChromaDB Hybrid Search, Google Embeddings, and CrossEncoder reranking. RAGAS faithfulness 0.97 (15 queries). Tech: Python, LangChain, ChromaDB, Gemini 2.5 Flash, Streamlit.
3. Ollive AI Assistant: Custom AI agent to compare local OSS models against Frontier APIs. Tech: FastAPI + Next.js, SSE streaming, DuckDuckGo Search grounding, Recharts eval dashboard, PDF report export, optimized via prompt engineering + guardrails.
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

  return (
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
            {isChatTyping && (
              <div className="chat-bubble ai typing">
                <span>.</span><span>.</span><span>.</span>
              </div>
            )}
          </div>
          <form className="chatbot-input" onSubmit={handleChatSubmit}>
            <input 
              type="text" 
              placeholder="Ask about Bhushan..." 
              value={chatInput} 
              onChange={e => setChatInput(e.target.value)} 
              disabled={isChatTyping} 
            />
            <button type="submit" disabled={isChatTyping}>{isChatTyping ? "..." : "Send"}</button>
          </form>
        </div>
      )}
      <button className="chatbot-fab" onClick={() => setChatOpen(!chatOpen)} aria-label="Open AI Chat">
        <FaRobot size={24} />
      </button>
    </div>
  );
};
