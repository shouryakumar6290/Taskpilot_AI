import React from 'react';
import { GlassCard } from '../UI/GlassCard';
import { useTasks } from '../../contexts/TaskContext';
import { Activity } from 'lucide-react';

export const HealthScore = () => {
  const { healthScore } = useTasks();

  const getScoreColor = () => {
    if (healthScore >= 80) return 'text-success';
    if (healthScore >= 50) return 'text-warning';
    return 'text-danger';
  };

  return (
    <GlassCard className="flex flex-col items-center justify-center p-8">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-bold">Productivity Health</h2>
      </div>
      
      <div className="relative w-40 h-40 flex items-center justify-center rounded-full border-4 border-dark-card shadow-[0_0_20px_rgba(99,102,241,0.2)] bg-dark-bg/50">
        <div className={`text-5xl font-black ${getScoreColor()}`}>
          {healthScore}
        </div>
      </div>
      
      <p className="mt-4 text-sm text-gray-400">
        {healthScore >= 80 ? 'You are on fire! Keep it up.' : 'You are falling behind. Time to focus.'}
      </p>
    </GlassCard>
  );
};
