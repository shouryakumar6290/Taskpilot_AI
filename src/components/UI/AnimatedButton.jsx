import React from 'react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

export const AnimatedButton = ({ 
  children, 
  className, 
  variant = 'primary', 
  ...props 
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/30',
    outline: 'border border-primary/50 text-primary-glow hover:bg-primary/10',
    ghost: 'text-gray-300 hover:text-white hover:bg-white/5'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'px-6 py-3 rounded-xl font-medium transition-colors duration-300 flex items-center justify-center gap-2',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};
