import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Loader2, Calendar, ArrowRight } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Streamdown } from "streamdown";
import { Link } from "wouter";
import { nanoid } from "nanoid";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const QUICK_QUESTIONS = [
  "What services do you offer?",
  "How does the vCISO program work?",
  "Do you handle HIPAA compliance?",
  "What is zero-trust security?",
  "How do I schedule a consultation?",
];

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content: "Hello! I'm the Creative Cyber Management AI assistant. I'm here to answer your questions about our cybersecurity services, compliance solutions, and AI offerings.\n\nHow can I help you today?",
  timestamp: new Date(),
};

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId] = useState(() => nanoid());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const sendMutation = trpc.chat.sendMessage.useMutation({
    onMutate: () => { setIsTyping(true); },
    onSuccess: (data) => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: nanoid(),
        role: "assistant",
        content: data.reply,
        timestamp: new Date(),
      }]);
    },
    onError: () => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: nanoid(),
        role: "assistant",
        content: "I'm sorry, I encountered an error. Please try again or contact us at info@creativecybermanagement.com",
        timestamp: new Date(),
      }]);
    },
  });

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    const msg = text.trim();
    if (!msg || isTyping) return;

    setMessages(prev => [...prev, {
      id: nanoid(),
      role: "user",
      content: msg,
      timestamp: new Date(),
    }]);
    setInput("");

    sendMutation.mutate({ sessionId, message: msg });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #0B1E3D 0%, #1E6FD9 100%)" }}
            aria-label="Open chat"
          >
            <MessageCircle size={26} className="text-white" />
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full animate-ping opacity-20 bg-[#1E6FD9]" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[580px] max-h-[calc(100vh-5rem)] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 shrink-0" style={{ background: "linear-gradient(135deg, #0B1E3D 0%, #1E3A6E 100%)" }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#D4A843]/20 border border-[#D4A843]/40 flex items-center justify-center">
                  <Bot size={20} className="text-[#D4A843]" />
                </div>
                <div>
                  <div className="text-white font-bold text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>CCM Assistant</div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-white/60 text-xs" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Close chat"
              >
                <X size={16} className="text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F8F9FC]">
              {messages.map(msg => (
                <div key={msg.id} className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === "assistant" ? "bg-[#0B1E3D]" : "bg-[#1E6FD9]"
                  }`}>
                    {msg.role === "assistant"
                      ? <Bot size={14} className="text-[#D4A843]" />
                      : <User size={14} className="text-white" />
                    }
                  </div>
                  {/* Bubble */}
                  <div className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[#1E6FD9] text-white rounded-tr-sm"
                      : "bg-white text-gray-800 border border-gray-100 shadow-sm rounded-tl-sm"
                  }`} style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                    {msg.role === "assistant"
                      ? <div className="prose prose-sm max-w-none prose-p:my-1 prose-ul:my-1 prose-li:my-0"><Streamdown>{msg.content}</Streamdown></div>
                      : msg.content
                    }
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#0B1E3D] flex items-center justify-center shrink-0">
                    <Bot size={14} className="text-[#D4A843]" />
                  </div>
                  <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions (only show when few messages) */}
            {messages.length <= 2 && !isTyping && (
              <div className="px-4 py-2 bg-[#F8F9FC] border-t border-gray-100 shrink-0">
                <p className="text-xs text-gray-400 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Quick questions:</p>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_QUESTIONS.map(q => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="px-3 py-1.5 rounded-full bg-white border border-gray-200 text-xs text-[#0B1E3D] hover:border-[#1E6FD9] hover:text-[#1E6FD9] transition-colors"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Schedule CTA (show after a few messages) */}
            {messages.length >= 4 && (
              <div className="px-4 py-2 bg-[#F8F9FC] border-t border-gray-100 shrink-0">
                <Link href="/schedule" onClick={() => setOpen(false)}>
                  <span className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-[#D4A843] text-[#0B1E3D] text-xs font-bold cursor-pointer hover:bg-[#c49a35] transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    <Calendar size={14} /> Schedule a Free Consultation <ArrowRight size={14} />
                  </span>
                </Link>
              </div>
            )}

            {/* Input */}
            <div className="px-4 py-3 bg-white border-t border-gray-100 shrink-0">
              <div className="flex items-center gap-2 bg-[#F8F9FC] rounded-xl border border-gray-200 px-3 py-2 focus-within:border-[#1E6FD9] focus-within:ring-2 focus-within:ring-[#1E6FD9]/20 transition-all">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything..."
                  disabled={isTyping}
                  className="flex-1 bg-transparent text-sm text-[#0B1E3D] placeholder-gray-400 outline-none disabled:opacity-50"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || isTyping}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all disabled:opacity-30"
                  style={{ backgroundColor: input.trim() && !isTyping ? "#1E6FD9" : "#E5E7EB" }}
                  aria-label="Send message"
                >
                  {isTyping
                    ? <Loader2 size={14} className="text-white animate-spin" />
                    : <Send size={14} className={input.trim() ? "text-white" : "text-gray-400"} />
                  }
                </button>
              </div>
              <p className="text-center text-xs text-gray-300 mt-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Powered by Creative Cyber Management AI
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
