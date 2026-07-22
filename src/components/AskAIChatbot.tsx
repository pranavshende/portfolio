import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X, Bot, Sparkles, User, Loader2, ArrowUpRight } from "lucide-react";

interface Message {
  sender: "user" | "bot";
  text: string;
  isCustomNode?: React.ReactNode;
}

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const chatStarterSuggestions = [
  { label: "👋 Tell me about yourself", query: "tell me about yourself" },
  { label: "🚀 Show your best project", query: "what's your best project" },
  { label: "💻 What tech stack do you use?", query: "what technologies do you know" },
  { label: "🏆 Leadership Experience", query: "what leadership roles have you held" },
  { label: "📈 Current Goals", query: "what are you currently doing" },
  { label: "📄 Download Resume", query: "download resume" },
  { label: "📬 Contact Pranav", query: "contact pranav" },
];

const qaDatabase = [
  {
    keywords: ["who", "are", "you", "name", "identity"],
    answer: "Hi! I'm Pranav Shende, a B.Tech Information Technology student at SVPCET Nagpur and a full-stack developer passionate about building AI-powered products that solve real-world problems."
  },
  {
    keywords: ["tell", "about", "yourself", "intro", "introduction", "background"],
    answer: "I'm a developer who enjoys solving practical problems using full-stack development, AI, data analytics, and cloud technologies. I also enjoy leading teams, participating in hackathons, and building products with real impact."
  },
  {
    keywords: ["currently", "doing", "today", "study", "pursuing", "current", "goals"],
    answer: "I'm pursuing my B.Tech in Information Technology while building projects in AI, software engineering, and data analytics."
  },
  {
    keywords: ["drives", "motivation", "passion", "why", "code"],
    answer: "I love creating technology that makes people's lives easier. Whether it's helping farmers, improving governance, or analyzing renewable energy data, I enjoy building meaningful solutions."
  },
  {
    keywords: ["technologies", "know", "skills", "languages", "stack", "frameworks", "tools"],
    answer: "JavaScript, Node.js, Express.js, React, MERN Stack, C++, HTML, CSS, REST APIs, PostgreSQL, MongoDB, MySQL, RBAC, WebSockets, Google Cloud, AI/ML, CNNs, Data Analytics, and IoT integration."
  },
  {
    keywords: ["frontend", "backend", "strongest", "area"],
    answer: "Backend is my strongest area, but I also build complete full-stack applications."
  },
  {
    keywords: ["databases", "sql", "nosql", "database"],
    answer: "PostgreSQL, MongoDB, and MySQL."
  },
  {
    keywords: ["work", "ai", "ml", "artificial", "intelligence", "models"],
    answer: "Yes. I've worked on CNN-based image classification, predictive analytics, AI-assisted applications, and intelligent decision-support systems."
  },
  {
    keywords: ["best", "project", "favorite", "flagship"],
    answer: "PashuRakshak—an AI-powered livestock disease detection platform that combines image analysis with location-based veterinary assistance."
  },
  {
    keywords: ["pashurakshak", "livestock", "cow", "disease", "farmers"],
    answer: "PashuRakshak helps farmers detect livestock diseases early using AI and connects them with nearby veterinary services to improve animal healthcare."
  },
  {
    keywords: ["jansampark", "civic", "grievance", "public", "service", "government"],
    answer: "JanSampark is a digital citizen-service platform that streamlines public services and governance through a modern, user-friendly interface."
  },
  {
    keywords: ["agriscore", "agriculture", "smart", "farming"],
    answer: "AgriScore is an AI-driven smart agriculture platform designed to help farmers make better decisions using data and predictive insights."
  },
  {
    keywords: ["solar", "sales", "analysis", "renewable", "energy"],
    answer: "My Solar Sales Analysis project analyzes India's solar installation data and uses predictive analytics to forecast future trends, helping understand renewable energy growth."
  },
  {
    keywords: ["teams", "collaboration", "work with others", "group"],
    answer: "Yes. I've collaborated on multiple large-scale projects, hackathons, and student-led initiatives where teamwork and communication were essential."
  },
  {
    keywords: ["led", "lead", "leadership", "technical", "head", "csi"],
    answer: "Yes. I've served as Technical Head at CSI SVPCET and coordinated technical initiatives and student events."
  },
  {
    keywords: ["hackathons", "hack", "competition"],
    answer: "Absolutely. I enjoy hackathons because they push me to solve problems quickly while working with diverse teams."
  },
  {
    keywords: ["roles", "held", "technical head", "csi", "girlscript", "mentor", "coordinator"],
    answer: "I've served as Technical Head at CSI SVPCET, Student Coordinator for Industry Academia Conclave 2.0, UBA Coordinator, Class Representative, and a GirlScript Summer of Code Mentor."
  },
  {
    keywords: ["mentored", "mentor", "teach", "help others"],
    answer: "Yes. I mentored participants during GirlScript Summer of Code and enjoy helping others learn and grow."
  },
  {
    keywords: ["looking for", "job", "career", "role", "opportunities"],
    answer: "I'm looking for opportunities where I can solve meaningful problems, learn from experienced engineers, and contribute to impactful products."
  },
  {
    keywords: ["hire", "why", "benefits", "value"],
    answer: "I learn quickly, take ownership, enjoy solving difficult problems, and have experience building complete products from idea to deployment."
  },
  {
    keywords: ["outside", "coding", "hobbies", "fun", "creative", "filmmaking", "cinematography"],
    answer: "I enjoy cinematography, filmmaking, video editing, robotics, and exploring new technologies."
  },
  {
    keywords: ["strength", "biggest", "skill"],
    answer: "Adaptability. When I don't know something, I learn it and keep improving until I solve the problem."
  },
  {
    keywords: ["learn", "new", "technologies", "study method"],
    answer: "I build real projects. Practical experience helps me learn faster than simply reading documentation."
  },
  {
    keywords: ["coffee", "tea"],
    answer: "Depends on the debugging session 😄"
  },
  {
    keywords: ["dark", "light", "mode", "theme"],
    answer: "Definitely Dark Mode."
  },
  {
    keywords: ["tabs", "spaces"],
    answer: "Spaces."
  },
  {
    keywords: ["favorite", "part", "development"],
    answer: "Turning an idea into something that real people can use."
  },
  {
    keywords: ["dream", "aspiration", "ultimate"],
    answer: "To build technology that creates meaningful impact at scale while continuously learning and growing as an engineer."
  }
];

const findBestAnswer = (userQuery: string): string => {
  const query = userQuery.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "");
  
  if (query.includes("download resume") || query.includes("resume") || query.includes("cv")) {
    return "__resume__";
  }
  if (query.includes("contact") || query.includes("email") || query.includes("reach out") || query.includes("gmail") || query.includes("linkedin")) {
    return "__contact__";
  }

  const queryWords = query.split(/\s+/);
  let bestMatch = { answer: "", score: 0 };

  for (const item of qaDatabase) {
    let score = 0;
    // Score based on how many keywords appear in the user query
    for (const keyword of item.keywords) {
      if (query.includes(keyword)) {
        score += 2;
      }
    }
    // Boost score if the query exactly matches some keywords
    const matchesCount = item.keywords.filter(kw => queryWords.includes(kw)).length;
    score += matchesCount * 3;

    if (score > bestMatch.score) {
      bestMatch = { answer: item.answer, score };
    }
  }

  // Threshold to avoid false positives
  if (bestMatch.score >= 2) {
    return bestMatch.answer;
  }

  return "I'm not entirely sure about that, but feel free to ask me about Pranav's skills, projects, work experience, or hobbies! Or click 'Contact Pranav' to get in touch. 📬";
};

const AskAIChatbot: React.FC<ChatbotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "👋 Hi! I'm Pranav's AI assistant. Ask me anything about Pranav's skills, projects, leadership, or career goals! Or pick a quick question below.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInputValue("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      setIsTyping(false);
      const answer = findBestAnswer(text);

      if (answer === "__resume__") {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "Here is Pranav's latest resume and documents hosted on Google Drive:",
            isCustomNode: (
              <a
                href="https://drive.google.com/drive/folders/1z3-tvjY5U1OP90Dls4IfLwV10E8e4qij?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 text-xs font-medium border border-emerald-500/30 transition-all active:scale-95"
              >
                <span>Download Resume</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            ),
          },
        ]);
      } else if (answer === "__contact__") {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "You can reach Pranav via the following channels:",
            isCustomNode: (
              <div className="mt-2 flex flex-col gap-2">
                <a
                  href="mailto:pranavshende97@gmail.com"
                  className="inline-flex items-center justify-between px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white text-xs transition-all"
                >
                  <span>Email: pranavshende97@gmail.com</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://linkedin.com/in/pranavshende"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white text-xs transition-all"
                >
                  <span>LinkedIn Profile</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            ),
          },
        ]);
      } else {
        setMessages((prev) => [...prev, { sender: "bot", text: answer }]);
      }
    }, 600 + Math.random() * 400); // 600ms - 1000ms delay
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.96 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed bottom-[64px] sm:bottom-22 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-auto sm:right-8 z-50 w-[92vw] sm:w-[360px] h-[48vh] sm:h-[480px] min-h-[330px] max-h-[500px] rounded-2xl bg-zinc-950/95 border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-3.5 py-2.5 sm:px-4 sm:py-3 bg-zinc-900/50 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center">
                <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                  Ask Pranav AI <Sparkles className="w-3 h-3 text-emerald-400" />
                </h3>
                <span className="text-[10px] text-emerald-500 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Online
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages scrollarea */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 no-scrollbar">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2 max-w-[88%] ${
                  msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                <div
                  className={`w-5.5 h-5.5 rounded-full flex-shrink-0 flex items-center justify-center border text-[9px] ${
                    msg.sender === "user"
                      ? "bg-zinc-800 border-zinc-700 text-white"
                      : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                  }`}
                >
                  {msg.sender === "user" ? <User className="w-2.5 h-2.5" /> : <Bot className="w-2.5 h-2.5" />}
                </div>
                <div className="space-y-1">
                  <div
                    className={`rounded-xl px-3 py-1.5 text-[11px] sm:text-xs leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-emerald-500 text-black font-medium rounded-tr-none"
                        : "bg-zinc-900 border border-white/[0.04] text-zinc-300 rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.isCustomNode}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 max-w-[85%] mr-auto items-center">
                <div className="w-5.5 h-5.5 rounded-full flex-shrink-0 flex items-center justify-center bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <Bot className="w-2.5 h-2.5" />
                </div>
                <div className="rounded-xl px-3 py-1.5 text-[11px] sm:text-xs text-zinc-500 bg-zinc-900 border border-white/[0.04] rounded-tl-none flex items-center gap-1.5">
                  <Loader2 className="w-3 animate-spin text-emerald-500" />
                  <span>Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestions block (horizontally scrollable row) */}
          <div className="px-3 py-2 border-t border-white/[0.06] bg-zinc-900/20 overflow-x-auto no-scrollbar flex-shrink-0">
            <div className="flex gap-1.5 whitespace-nowrap">
              {chatStarterSuggestions.map((s) => (
                <button
                  key={s.label}
                  onClick={() => handleSendMessage(s.query)}
                  className="px-2.5 py-1 rounded-full bg-zinc-900 border border-white/[0.06] hover:border-emerald-500/40 text-[10px] text-zinc-400 hover:text-white transition-all inline-block active:scale-95"
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input field */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }}
            className="p-2.5 sm:p-3 border-t border-white/[0.06] bg-zinc-950 flex gap-2 items-center flex-shrink-0"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me a question..."
              className="flex-1 bg-zinc-900 border border-white/[0.06] focus:border-emerald-500/50 rounded-xl px-3 py-1.5 text-[11px] sm:text-xs text-white placeholder-zinc-500 outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="p-2 rounded-xl bg-emerald-500 disabled:bg-zinc-800 text-black disabled:text-zinc-600 hover:bg-emerald-400 transition-colors active:scale-95"
            >
              <Send className="w-3 h-3" />
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AskAIChatbot;
