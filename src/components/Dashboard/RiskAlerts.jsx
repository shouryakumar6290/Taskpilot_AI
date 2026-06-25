import React from 'react';
import { GlassCard } from '../UI/GlassCard';
import { useTasks } from '../../contexts/TaskContext';
import { AlertTriangle, ShieldCheck, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

export const RiskAlerts = () => {
  const { tasks } = useTasks();
  
  const atRiskTasks = tasks.filter(t => t.risk === 'At Risk' && t.status !== 'completed');
  const criticalTasks = tasks.filter(t => t.risk === 'Critical' && t.status !== 'completed');

  return (
    <GlassCard className="flex flex-col gap-4">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <Flame className="text-accent" /> Risk Analysis
      </h2>
      
      {criticalTasks.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-danger/20 border border-danger/50 rounded-xl flex items-start gap-3">
          <AlertTriangle className="text-danger shrink-0" />
          <div>
            <h3 className="text-danger font-bold">Critical Danger</h3>
            <p className="text-sm text-gray-300">You are about to miss deadlines for {criticalTasks.length} tasks!</p>
          </div>
        </motion.div>
      )}

      {atRiskTasks.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-warning/20 border border-warning/50 rounded-xl flex items-start gap-3">
          <AlertTriangle className="text-warning shrink-0" />
          <div>
            <h3 className="text-warning font-bold">At Risk</h3>
            <p className="text-sm text-gray-300">{atRiskTasks.length} tasks are falling behind schedule.</p>
          </div>
        </motion.div>
      )}

      {criticalTasks.length === 0 && atRiskTasks.length === 0 && (
        <div className="p-4 bg-success/20 border border-success/50 rounded-xl flex items-center gap-3">
          <ShieldCheck className="text-success shrink-0" />
          <div>
            <h3 className="text-success font-bold">All Clear</h3>
            <p className="text-sm text-gray-300">Your schedule is perfectly balanced.</p>
          </div>
        </div>
      )}
    </GlassCard>
  );
};
