import React from 'react';
import { HealthScore } from '../components/Dashboard/HealthScore';
import { RiskAlerts } from '../components/Dashboard/RiskAlerts';
import { ActionPlan } from '../components/Dashboard/ActionPlan';
import { TaskInput } from '../components/Tasks/TaskInput';
import { TaskList } from '../components/Tasks/TaskList';
import { CoachBot } from '../components/Chat/CoachBot';
import { GradientText } from '../components/UI/GradientText';
import { LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const DashboardPage = () => {
  const { logout, currentUser } = useAuth();

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight">
            TaskPilot <GradientText>AI</GradientText>
          </h1>
          <p className="text-gray-400 text-sm mt-1">Predict. Prioritize. Perform.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:block text-sm text-gray-300">
            {currentUser?.email}
          </div>
          <button 
            onClick={logout}
            className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
          >
            <LogOut className="w-5 h-5 text-gray-300" />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 flex flex-col gap-8">
          <HealthScore />
          <RiskAlerts />
          <ActionPlan />
        </div>
        
        <div className="lg:col-span-2 flex flex-col gap-8">
          <TaskInput />
          <TaskList />
        </div>
      </div>

      <CoachBot />
    </div>
  );
};
