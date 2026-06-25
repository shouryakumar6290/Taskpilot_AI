import React, { useState } from 'react';
import { GlassCard } from '../UI/GlassCard';
import { AnimatedButton } from '../UI/AnimatedButton';
import { parseNaturalLanguageTask } from '../../services/gemini';
import { useTasks } from '../../contexts/TaskContext';
import { Sparkles, Send, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const TaskInput = () => {
  const [mode, setMode] = useState('manual'); // 'manual' or 'ai'
  const [aiInput, setAiInput] = useState('');
  const [loading, setLoading] = useState(false);
  const { addTask } = useTasks();

  // Manual Form State
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [hours, setHours] = useState('');

  const handleAiSubmit = async (e) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    
    setLoading(true);
    const taskData = await parseNaturalLanguageTask(aiInput);
    if (taskData) {
      addTask(taskData);
      setAiInput('');
    }
    setLoading(false);
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!title || !date || !time || !hours) return;

    // Split date and time to guarantee local time construction
    const [year, month, day] = date.split('-');
    const [hour, minute] = time.split(':');
    
    // new Date(year, monthIndex, day, hours, minutes)
    const deadlineDate = new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute));

    addTask({
      title,
      deadline: deadlineDate.toISOString(),
      hours: parseFloat(hours),
      category: 'General'
    });

    setTitle('');
    setDate('');
    setTime('');
    setHours('');
  };

  return (
    <GlassCard className="w-full">
      <div className="flex gap-4 mb-4 border-b border-white/10 pb-2">
        <button 
          onClick={() => setMode('manual')}
          className={`font-semibold transition-colors ${mode === 'manual' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
        >
          Manual Entry
        </button>
        <button 
          onClick={() => setMode('ai')}
          className={`font-semibold transition-colors flex items-center gap-1 ${mode === 'ai' ? 'text-primary-glow' : 'text-gray-500 hover:text-gray-300'}`}
        >
          <Sparkles className="w-4 h-4" /> AI Magic
        </button>
      </div>

      <AnimatePresence mode="wait">
        {mode === 'ai' ? (
          <motion.form 
            key="ai-form"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onSubmit={handleAiSubmit} 
            className="flex gap-3"
          >
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Sparkles className="h-5 w-5 text-primary-glow" />
              </div>
              <input
                type="text"
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                placeholder='e.g., "I have a DBMS exam next Friday and need 10 hours preparation"'
                className="w-full bg-dark-bg/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                disabled={loading}
              />
            </div>
            <AnimatedButton type="submit" disabled={loading} className="px-4">
              {loading ? <div className="animate-spin h-5 w-5 border-2 border-white/20 border-t-white rounded-full" /> : <Send className="h-5 w-5" />}
            </AnimatedButton>
          </motion.form>
        ) : (
          <motion.form 
            key="manual-form"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onSubmit={handleManualSubmit} 
            className="flex flex-col gap-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Particulars (Task Name)</label>
              <input 
                type="text" 
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g., Database Management Exam"
                className="w-full bg-dark-bg/50 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-primary/50"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Date</label>
                <input 
                  type="date" 
                  required
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="w-full bg-dark-bg/50 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-primary/50"
                  style={{ colorScheme: 'dark' }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Time</label>
                <input 
                  type="time" 
                  required
                  value={time}
                  onChange={e => setTime(e.target.value)}
                  className="w-full bg-dark-bg/50 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-primary/50"
                  style={{ colorScheme: 'dark' }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Prep Time (Hours)</label>
                <input 
                  type="number" 
                  step="0.1"
                  min="0.1"
                  required
                  value={hours}
                  onChange={e => setHours(e.target.value)}
                  placeholder="e.g., 1.5"
                  className="w-full bg-dark-bg/50 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-primary/50"
                />
              </div>
            </div>

            <AnimatedButton type="submit" className="mt-2 flex justify-center items-center gap-2">
              <Plus className="w-5 h-5" /> Add Task
            </AnimatedButton>
          </motion.form>
        )}
      </AnimatePresence>
    </GlassCard>
  );
};
