'use client';
import { useState, useRef, useEffect } from 'react';
import { Bot, Send, MessageCircle, X, Sparkles, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'assistant', content: 'Hi! I am Yash AI. Ask me anything about Yash\'s experience, projects, or skills!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = { type: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input, conversation_history: messages.slice(-10) }) // Send last 10 messages for context
      });
      
      const data = await res.json();
      setMessages(prev => [...prev, { type: 'assistant', content: data.message }]);
    } catch (error) {
      setMessages(prev => [...prev, { type: 'assistant', content: "Sorry, I'm having some trouble connecting. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-[calc(100vw-48px)] sm:w-96 h-[500px] bg-black/90 backdrop-blur-2xl rounded-3xl flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden border border-white/5"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-primary/20 rounded-lg">
                    <Bot className="text-primary w-5 h-5" />
                </div>
                <div>
                    <div className="flex items-center gap-1">
                        <span className="font-bold text-white tracking-tight">Yash AI</span>
                        <Sparkles className="w-3 h-3 text-yellow-500" />
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
                        <span className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider">Online</span>
                    </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/50 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Messages Area */}
            <div 
                ref={scrollRef} 
                className="flex-1 overflow-y-auto p-4 space-y-4 pt-6 scroll-smooth"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'hsl(var(--primary)) transparent'
                }}
            >
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                    m.type === 'user' 
                      ? 'bg-primary text-white ml-auto rounded-tr-none shadow-[0_5px_15px_rgba(var(--primary-rgb),0.3)]' 
                      : 'bg-white/5 text-white/90 mr-auto rounded-tl-none border border-white/5'
                  }`}>
                    <div className="flex items-center gap-2 mb-2 opacity-40 text-[9px] font-bold uppercase tracking-[0.2em]">
                        {m.type === 'user' ? <><User size={10} /> You</> : <><Bot size={10} /> Yash AI</>}
                    </div>
                    <div className="whitespace-pre-wrap">
                      {m.content}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none border border-white/5 flex gap-1.5 px-4 shadow-sm">
                    <div className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce" />
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/5 bg-black/40">
              <div className="flex gap-2 bg-white/5 border border-white/10 rounded-2xl p-2 focus-within:border-primary/40 focus-within:bg-white/10 transition-all duration-300">
                <input 
                  value={input} 
                  onChange={e => setInput(e.target.value)} 
                  onKeyDown={e => e.key === 'Enter' && sendMessage()}
                  className="flex-1 bg-transparent border-none focus:ring-0 text-white text-sm px-2 py-1 placeholder:text-white/20"
                  placeholder="Ask about my experience..."
                  disabled={isLoading}
                />
                <button 
                  onClick={sendMessage} 
                  disabled={isLoading || !input.trim()}
                  className="bg-primary hover:bg-primary/80 disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed p-2.5 rounded-xl transition-all active:scale-90 shadow-lg"
                >
                  <Send size={16} className="text-white" />
                </button>
              </div>
              <p className="text-[9px] text-white/20 text-center mt-3 font-medium tracking-tight">
                Powered by Gemini 2.0 Flash
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)} 
        className={`p-4 rounded-full shadow-2xl transition-all duration-300 ${
            isOpen 
            ? 'bg-white/10 backdrop-blur-md rotate-90 text-white' 
            : 'bg-primary text-white hover:shadow-primary/20'
        } border border-white/10`}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        {!isOpen && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
        )}
      </motion.button>
    </div>
  );
}
