import React, { createContext, useContext, useState, useEffect } from 'react';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const calculateRisk = (deadline, hours) => {
  if (!deadline || !hours) return 'Safe';
  
  const now = new Date();
  const taskDeadline = new Date(deadline);
  
  // Time difference in hours
  const diffInMs = taskDeadline - now;
  const hoursLeft = diffInMs / (1000 * 60 * 60);

  if (hoursLeft < 0) return 'Overdue';
  if (hoursLeft < hours) return 'Critical';
  if (hoursLeft < hours * 1.5) return 'At Risk';
  return 'Safe';
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([
    { 
      id: '1', 
      title: 'Finish AI Integration', 
      deadline: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
      hours: 4, 
      category: 'Work', 
      status: 'pending' 
    },
    { 
      id: '2', 
      title: 'Prepare for DBMS Exam', 
      deadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
      hours: 10, 
      category: 'Study', 
      status: 'pending' 
    }
  ].map(t => ({ ...t, risk: calculateRisk(t.deadline, t.hours) })));
  
  const [healthScore, setHealthScore] = useState(85);
  const [xp, setXp] = useState(1250);
  const [level, setLevel] = useState(4);

  // Recalculate risks periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setTasks(currentTasks => currentTasks.map(t => ({
        ...t,
        risk: t.status === 'completed' ? 'Safe' : calculateRisk(t.deadline, t.hours)
      })));
    }, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const addTask = (task) => {
    const risk = calculateRisk(task.deadline, task.hours);
    setTasks([...tasks, { ...task, id: Date.now().toString(), status: 'pending', risk }]);
  };

  const completeTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: 'completed', risk: 'Safe' } : t));
    setXp(xp + 50);
    setHealthScore(Math.min(100, healthScore + 2));
  };

  const value = {
    tasks,
    healthScore,
    xp,
    level,
    addTask,
    completeTask
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};

