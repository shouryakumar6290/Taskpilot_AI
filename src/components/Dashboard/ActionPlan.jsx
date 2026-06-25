import React from 'react';
import { GlassCard } from '../UI/GlassCard';
import { useTasks } from '../../contexts/TaskContext';
import { Calendar, ArrowRight } from 'lucide-react';
import { AnimatedButton } from '../UI/AnimatedButton';

export const ActionPlan = () => {
  const { tasks } = useTasks();
  
  const pendingTasks = tasks.filter(t => t.status === 'pending' && t.risk !== 'Overdue');
  
  const recommendedTask = pendingTasks.sort((a, b) => {
    const riskWeight = { 'Critical': 3, 'At Risk': 2, 'Safe': 1 };
    
    if (riskWeight[a.risk] !== riskWeight[b.risk]) {
      return riskWeight[b.risk] - riskWeight[a.risk]; // Higher risk first
    }
    // If same risk, earliest deadline first
    return new Date(a.deadline) - new Date(b.deadline);
  })[0];

  return (
    <GlassCard className="flex flex-col gap-4">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <Calendar className="text-primary" /> Today's Plan
      </h2>
      
      {recommendedTask ? (
        <div className="bg-gradient-to-br from-primary/20 to-accent/20 border border-white/10 rounded-xl p-5">
          <p className="text-sm text-primary-glow font-bold mb-1">AI Recommendation</p>
          <h3 className="text-lg font-semibold mb-3">Focus on: {recommendedTask.title}</h3>
          <p className="text-sm text-gray-300 mb-4">
            Based on deadlines and your current velocity, this is the most optimal task to tackle right now.
          </p>
          <AnimatedButton variant="primary" className="w-full text-sm py-2">
            Start Working <ArrowRight className="w-4 h-4" />
          </AnimatedButton>
        </div>
      ) : (
        <div className="text-center py-6 text-gray-400">
          <p>No tasks pending for today.</p>
          <p className="text-sm mt-1">Take a break, you've earned it!</p>
        </div>
      )}
    </GlassCard>
  );
};
