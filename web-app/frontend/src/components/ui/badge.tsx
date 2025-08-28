import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}: BadgeProps) {
  const baseClasses = 'inline-flex items-center font-bold transform transition-all duration-300 relative';
  
  const variantClasses = {
    default: 'bg-[#F0F0F0] text-black border-black',
    primary: 'bg-[#E8F4FD] text-[#2E86AB] border-[#2E86AB]',
    secondary: 'bg-[#F8F8F8] text-[#6B6B6B] border-black',
    success: 'bg-[#E8F5E8] text-[#22C55E] border-[#22C55E]',
    warning: 'bg-[#FEF3CD] text-[#F18F01] border-[#F18F01]',
    error: 'bg-[#FECACA] text-[#CC2936] border-[#CC2936]',
    outline: 'bg-transparent text-black border-black'
  };
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs h-5 rotate-[-0.2deg]',
    md: 'px-2.5 py-1 text-xs h-6 rotate-[0.1deg]',
    lg: 'px-3 py-1.5 text-sm h-7 rotate-[-0.1deg]'
  };

  const sketchyBorder = `
    border-2 rounded-md
    before:content-[''] before:absolute before:inset-0 before:border-2 before:border-current
    before:rounded-md before:transform before:rotate-[-0.3deg] before:pointer-events-none before:z-[-1]
  `;
  
  return (
    <span
      className={`
        ${baseClasses} 
        ${variantClasses[variant]} 
        ${sizeClasses[size]} 
        ${sketchyBorder}
        ${className}
      `}
    >
      <span className="relative z-10">{children}</span>
    </span>
  );
}