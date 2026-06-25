import React from 'react';
import { GlassCard } from '../UI/GlassCard';
import { useTasks } from '../../contexts/TaskContext';
import { format } from 'date-fns';
import { CheckCircle2, Circle, Clock, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

export const TaskCard = ({ task }) => {
  const { completeTask } = useTasks();
  const isCompleted = task.status === 'completed';

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Critical': return 'text-danger';
      case 'At Risk': return 'text-warning';
      default: return 'text-success';
    }
  };

  return (
    <motion.div layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
      <GlassCard hover className={`flex items-center gap-4 transition-all duration-300 ${isCompleted ? 'opacity-50 grayscale' : ''}`}>
        <button 
          onClick={() => !isCompleted && completeTask(task.id)}
          className="shrink-0 text-primary hover:text-primary-glow transition-colors"
          disabled={isCompleted}
        >
          {isCompleted ? <CheckCircle2 className="w-8 h-8" /> : <Circle className="w-8 h-8" />}
        </button>
        
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold text-lg truncate ${isCompleted ? 'line-through' : ''}`}>
            {task.title}
          </h3>
          <div className="flex flex-wrap items-center gap-4 mt-1 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {task.deadline ? format(new Date(task.deadline), 'MMM d, h:mm a') : 'No deadline'}
            </span>
            <span className="bg-white/5 px-2 py-0.5 rounded-full border border-white/10 text-xs">
              {task.category}
            </span>
            <span className="text-xs">{task.hours}h est.</span>
          </div>
        </div>

        <div className={`shrink-0 flex items-center gap-1 font-medium ${getRiskColor(task.risk)}`}>
          {task.risk !== 'Safe' && <Flame className="w-4 h-4" />}
          <span className="hidden sm:inline">{task.risk}</span>
        </div>
      </GlassCard>
    </motion.div>
  );
};
