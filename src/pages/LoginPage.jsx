import React, { useState } from 'react';
import { GlassCard } from '../components/UI/GlassCard';
import { GradientText } from '../components/UI/GradientText';
import { AnimatedButton } from '../components/UI/AnimatedButton';
import { useAuth } from '../contexts/AuthContext';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password);
      }
    } catch (err) {
      setError('Failed to authenticate. ' + (err.message || ''));
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[100px] pointer-events-none"></div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md z-10">
        <GlassCard className="p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Sparkles className="w-12 h-12 text-primary-glow" />
            </div>
            <h1 className="text-3xl font-black mb-2">
              TaskPilot <GradientText>AI</GradientText>
            </h1>
            <p className="text-gray-400">Predict. Prioritize. Perform.</p>
          </div>

          {error && <div className="bg-danger/20 border border-danger/50 text-danger p-3 rounded-xl mb-4 text-sm">{error}</div>}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-dark-bg/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-dark-bg/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors"
                placeholder="••••••••"
              />
            </div>
            <AnimatedButton type="submit" disabled={loading} className="w-full mt-2">
              {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
            </AnimatedButton>
          </form>

          <div className="mt-6 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
            </button>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
};
