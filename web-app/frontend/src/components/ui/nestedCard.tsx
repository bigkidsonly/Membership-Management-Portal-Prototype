import React from "react";

interface NestedCardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "accent" | "secondary";
  nested?: boolean;
}

export function NestedCard({
  title,
  subtitle,
  children,
  className = "",
  variant = "default",
  nested = false,
}: NestedCardProps) {
  const variantStyles = {
    default: "bg-white",
    accent: "bg-[#FFF8F0]",
    secondary: "bg-[#F0F7FF]",
  };

  const borderColors = {
    default: "border-black",
    accent: "border-[#F18F01]",
    secondary: "border-[#2E86AB]",
  };

  return (
    <div
      className={`
      relative ${variantStyles[variant]} p-6 
      transform ${nested ? "rotate-[-0.2deg] scale-[0.98]" : "rotate-[0.3deg]"}
      ${nested ? "ml-4 mt-2" : ""}
      before:content-[''] before:absolute before:inset-0 before:border-2 before:${
        borderColors[variant]
      } before:rounded-md
      before:transform before:rotate-[-0.5deg] before:translate-x-[${
        nested ? "1px" : "2px"
      }]
      after:content-[''] after:absolute after:inset-0 after:border-2 after:${
        borderColors[variant]
      } after:rounded-md
      after:transform after:rotate-[0.2deg] after:translate-y-[${
        nested ? "1px" : "2px"
      }]
      ${className}
    `}
    >
      <div className="relative z-10">
        {title && (
          <div className="mb-4">
            <h3
              className={`
              ${nested ? "text-lg" : "text-xl"} font-extrabold mb-1 
              transform rotate-[-0.4deg] relative
            `}
            >
              {title}
              <span
                className={`
                absolute -bottom-1 left-0 w-full h-[2px] 
                ${
                  variant === "accent"
                    ? "bg-[#F18F01]"
                    : variant === "secondary"
                    ? "bg-[#2E86AB]"
                    : "bg-[#CC2936]"
                }
                transform rotate-[0.6deg]
              `}
              ></span>
            </h3>
            {subtitle && (
              <p className="text-[#6B6B6B] transform rotate-[0.2deg]">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

interface NestedCardGroupProps {
  children: React.ReactNode;
  className?: string;
}

export function NestedCardGroup({
  children,
  className = "",
}: NestedCardGroupProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      {React.Children.map(children, (child, index) => (
        <div key={index} className="relative">
          {child}
        </div>
      ))}
    </div>
  );
}
