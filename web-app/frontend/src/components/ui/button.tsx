import React from "react";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: "default" | "outline" | "destructive" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  children: React.ReactNode;
}
export function Button({
  className = "",
  variant = "default",
  size = "default",
  children,
  ...props
}: ButtonProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case "outline":
        return "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50";
      case "destructive":
        return "bg-red-500 text-white hover:bg-red-600";
      case "ghost":
        return "bg-transparent text-gray-700 hover:bg-gray-100";
      case "link":
        return "bg-transparent text-primary underline-offset-4 hover:underline";
      default:
        return "bg-primary text-white hover:bg-primary/90";
    }
  };
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "h-8 px-3 text-xs";
      case "lg":
        return "h-12 px-8 text-base";
      case "icon":
        return "h-9 w-9";
      default:
        return "h-10 px-4 py-2 text-sm";
    }
  };
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ${getVariantClasses()} ${getSizeClasses()} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
