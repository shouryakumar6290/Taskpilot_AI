import React from 'react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

export const GlassCard = ({ children, className, hover = false, ...props }) => {
  return (
    <motion.div
      className={cn(
        'glass rounded-2xl p-6',
        hover && 'glass-hover',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
