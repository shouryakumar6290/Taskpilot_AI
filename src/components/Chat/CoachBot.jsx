import React, { useState } from 'react';
import { GlassCard } from '../UI/GlassCard';
import { MessageSquare, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedButton } from '../UI/AnimatedButton';
import { useTasks } from '../../contexts/TaskContext';
export const CoachBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm your AI Productivity Coach. How can I help you today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');

  const { tasks } = useTasks();

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setMessages([...messages, { id: Date.now(), text: input, sender: 'user' }]);
    setInput('');
    
    // Mock dynamic response based on tasks context
    setTimeout(() => {
      const hasCritical = tasks.some(t => t.risk === 'Critical');
      const hasSafe = tasks.some(t => t.risk === 'Safe');
      
      let botResponse = "I can definitely help with that! Would you like me to create a schedule?";
      if (hasCritical) {
        botResponse = "I noticed you have a task marked as 'Critical'. Don't panic! Let's break this down into 10-minute focus sprints. You can absolutely do this!";
      } else if (hasSafe) {
        botResponse = "Looks like you're in a 'Safe' zone right now! Great time management. Keep up the good work!";
      }

      setMessages(prev => [...prev, { 
        id: Date.now(), 
        text: botResponse,
        sender: 'bot' 
      }]);
    }, 1500);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-110 transition-transform z-50 text-white"
      >
        <MessageSquare />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-80 md:w-96 z-50 origin-bottom-right"
          >
            <GlassCard className="p-0 overflow-hidden flex flex-col h-[500px]">
              <div className="bg-white/5 p-4 flex justify-between items-center border-b border-white/10">
                <h3 className="font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
                  AI Coach
                </h3>
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
                {messages.map(msg => (
                  <div key={msg.id} className={`max-w-[80%] rounded-xl p-3 ${msg.sender === 'user' ? 'bg-primary self-end text-white' : 'bg-white/10 self-start text-gray-200'}`}>
                    {msg.text}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSend} className="p-4 border-t border-white/10 flex gap-2">
                <input 
                  type="text" 
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-dark-bg/50 border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary/50"
                />
                <AnimatedButton type="submit" className="px-3 py-2 rounded-xl">
                  <Send className="w-4 h-4" />
                </AnimatedButton>
              </form>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
