import React from 'react';
import { cn } from '../../utils/cn';

export const GradientText = ({ children, className, as: Component = 'span' }) => {
  return (
    <Component className={cn('text-gradient font-bold', className)}>
      {children}
    </Component>
  );
};
