import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'destructive' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  className?: string;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  ...props
}: ButtonProps) {
  const baseClasses = 'relative inline-flex items-center justify-center font-bold tracking-wide transform rotate-[-0.5deg] transition-all duration-300 ease-out active:rotate-[0.5deg] active:scale-95 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-[#000000] text-white hover:bg-black/90 after:border-[#CC2936]',
    secondary: 'bg-[#2E86AB] text-white hover:bg-[#2E86AB]/90 after:border-[#000000]',
    outline: 'bg-transparent text-black hover:bg-black/5 after:border-black border-2 border-black',
    destructive: 'bg-[#CC2936] text-white hover:bg-[#CC2936]/90 after:border-black',
    ghost: 'bg-transparent text-black hover:bg-black/5 after:border-transparent',
    link: 'bg-transparent text-black underline-offset-4 hover:underline after:border-transparent'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm h-8',
    md: 'px-4 py-2 text-base h-10',
    lg: 'px-6 py-3 text-lg h-12',
    icon: 'h-9 w-9 p-0'
  };
  
  const sketchyBorder = variant !== 'link' && variant !== 'ghost' ? `
    after:content-[''] after:absolute after:inset-0 after:border-2 after:border-black 
    after:rounded-md after:transform after:rotate-[0.4deg] after:translate-x-[1px] after:translate-y-[1px] after:pointer-events-none after:z-[-1]
    before:content-[''] before:absolute before:inset-0 before:border-2 before:border-black 
    before:rounded-md before:transform before:rotate-[-0.7deg] before:translate-x-[-1px] before:translate-y-[-1px] before:pointer-events-none before:z-[-1]
  ` : '';
  
  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${sketchyBorder} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}
