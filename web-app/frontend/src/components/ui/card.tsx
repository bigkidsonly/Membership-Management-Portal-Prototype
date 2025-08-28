import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({
  children,
  className = ''
}: CardProps) {
  return (
    <div className={`
      relative bg-[#FDFDF8] p-6 transform rotate-[0.3deg]
      before:content-[''] before:absolute before:inset-0 before:border-2 before:border-black before:rounded-md
      before:transform before:rotate-[-0.5deg] before:translate-x-[1px] before:pointer-events-none before:z-[-1]
      after:content-[''] after:absolute after:inset-0 after:border-2 after:border-black after:rounded-md
      after:transform after:rotate-[0.2deg] after:translate-y-[1px] after:pointer-events-none after:z-[-1]
      ${className}
    `}>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function CardHeader({ className = "", children }: CardProps) {
  return <div className={`pb-3 transform rotate-[-0.2deg] ${className}`}>{children}</div>;
}

export function CardTitle({ className = "", children }: CardProps) {
  return <h3 className={`text-lg font-bold transform rotate-[0.3deg] ${className}`}>{children}</h3>;
}

export function CardDescription({ className = "", children }: CardProps) {
  return <p className={`text-sm text-[#6B6B6B] transform rotate-[-0.1deg] ${className}`}>{children}</p>;
}

export function CardContent({ className = "", children }: CardProps) {
  return <div className={`pt-3 transform rotate-[0.1deg] ${className}`}>{children}</div>;
}

export function CardFooter({ className = "", children }: CardProps) {
  return <div className={`pt-3 transform rotate-[-0.3deg] ${className}`}>{children}</div>;
}
