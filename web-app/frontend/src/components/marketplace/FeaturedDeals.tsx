import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ToolCard } from './ToolCard';
interface Tool {
  id: string;
  name: string;
  category: string;
  vendor: string;
  description: string;
  regularPrice: number;
  memberPrice: number;
  discount: number;
  tier: string;
  rating: number;
  reviewCount: number;
  logo: string;
  featured?: boolean;
}
interface FeaturedDealsProps {
  tools: Tool[];
}
export function FeaturedDeals({
  tools
}: FeaturedDealsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const {
        current
      } = scrollRef;
      const scrollAmount = direction === 'left' ? -400 : 400;
      current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };
  return <div className="relative">
      <button onClick={() => scroll('left')} className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100">
        <ChevronLeft className="h-5 w-5 text-gray-700" />
      </button>
      <div ref={scrollRef} className="flex overflow-x-auto gap-6 pb-4 hide-scrollbar" style={{
      scrollbarWidth: 'none'
    }}>
        {tools.map(tool => <div key={tool.id} className="flex-shrink-0 w-[350px]">
            <ToolCard tool={tool} featured={true} />
          </div>)}
      </div>
      <button onClick={() => scroll('right')} className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100">
        <ChevronRight className="h-5 w-5 text-gray-700" />
      </button>
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>;
}