import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
}

export function Input({
  label,
  error,
  className = '',
  ...props
}: InputProps) {
  if (label) {
    return (
      <div className="mb-4">
        <label className="block font-bold mb-1 transform rotate-[-0.3deg] text-black">
          {label}
        </label>
        <div className="relative">
          <input
            {...props}
            className={`
              w-full py-2 px-3 bg-[#FDFDF8] text-black
              border-2 border-black focus:outline-none rounded-md
              transform rotate-[0.2deg] relative z-10
              ${error ? 'border-[#CC2936]' : 'focus:border-[#2E86AB]'}
              disabled:opacity-50 disabled:cursor-not-allowed
              ${className}
            `}
          />
          <div className="absolute inset-0 border-2 border-black rounded-md pointer-events-none transform rotate-[-0.4deg] translate-x-[1px] translate-y-[1px] z-0"></div>
        </div>
        {error && (
          <p className="mt-1 text-[#CC2936] font-medium transform rotate-[0.5deg] text-sm">
            <span className="inline-block border-b-2 border-[#CC2936] border-dashed">
              {error}
            </span>
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <input
        {...props}
        className={`
          flex h-10 w-full py-2 px-3 bg-[#FDFDF8] text-black
          border-2 border-black focus:outline-none rounded-md
          transform rotate-[0.2deg] relative z-10
          focus:border-[#2E86AB]
          disabled:opacity-50 disabled:cursor-not-allowed
          file:border-0 file:bg-transparent file:text-sm file:font-medium
          placeholder:text-[#6B6B6B]
          ${className}
        `}
      />
      <div className="absolute inset-0 border-2 border-black rounded-md pointer-events-none transform rotate-[-0.4deg] translate-x-[1px] translate-y-[1px] z-0"></div>
    </div>
  );
}
