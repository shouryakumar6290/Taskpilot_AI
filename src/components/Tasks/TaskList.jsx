import React from 'react';
import { useTasks } from '../../contexts/TaskContext';
import { TaskCard } from './TaskCard';
import { motion, AnimatePresence } from 'framer-motion';

export const TaskList = () => {
  const { tasks } = useTasks();

  const sortedTasks = [...tasks].sort((a, b) => {
    // Sort by status (pending first), then by risk, then by deadline
    if (a.status !== b.status) return a.status === 'pending' ? -1 : 1;
    if (a.risk === 'Critical' && b.risk !== 'Critical') return -1;
    if (b.risk === 'Critical' && a.risk !== 'Critical') return 1;
    return new Date(a.deadline) - new Date(b.deadline);
  });

  return (
    <div className="flex flex-col gap-4 mt-6">
      <h2 className="text-xl font-bold mb-2">Your Tasks</h2>
      <AnimatePresence>
        {sortedTasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </AnimatePresence>
      {tasks.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No tasks yet. Create one above!
        </div>
      )}
    </div>
  );
};
