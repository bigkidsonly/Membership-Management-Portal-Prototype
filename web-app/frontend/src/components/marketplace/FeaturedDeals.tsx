import React, { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ToolCard } from "./ToolCard";
interface Tool {
  id: string;
  name: string;
  category: string;
  vendor: string;
  description: string;
  regularPrice: number | string;
  memberPrice: number | string;
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
export function FeaturedDeals({ tools }: FeaturedDealsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [visibleItemCount, setVisibleItemCount] = useState(3);
  // Card dimensions
  const cardWidth = 320; // Slightly reduced from 350
  const cardGap = 16; // Reduced from 24
  // Calculate how many items are visible based on container width
  const getVisibleItemCount = () => {
    if (!containerRef.current) return 3;
    const containerWidth = containerRef.current.clientWidth;
    const itemWidth = cardWidth + cardGap;
    const count = Math.floor(containerWidth / itemWidth);
    return Math.max(1, Math.min(3, count)); // Limit to max 3 cards
  };
  // Update visible item count on resize
  useEffect(() => {
    const handleResize = () => {
      setVisibleItemCount(getVisibleItemCount());
    };
    handleResize(); // Initial calculation
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // Update arrow visibility based on scroll position
  const updateArrowVisibility = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
      // Update active index for dots
      const itemWidth = cardWidth + cardGap;
      const newIndex = Math.round(scrollLeft / itemWidth);
      setActiveIndex(Math.min(newIndex, tools.length - 1));
    }
  };
  // Handle scroll events
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      const handleScroll = () => {
        updateArrowVisibility();
      };
      scrollContainer.addEventListener("scroll", handleScroll);
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, []);
  // Initialize arrow visibility
  useEffect(() => {
    updateArrowVisibility();
    // Check if content exceeds container width
    if (scrollRef.current) {
      const { scrollWidth, clientWidth } = scrollRef.current;
      setShowRightArrow(scrollWidth > clientWidth);
    }
  }, [tools, visibleItemCount]);
  // Scroll to specific index (for dot navigation)
  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const itemWidth = cardWidth + cardGap;
      scrollRef.current.scrollTo({
        left: index * itemWidth,
        behavior: "smooth",
      });
    }
  };
  // Enhanced scroll function with better calculation
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const itemWidth = cardWidth + cardGap;
      // Scroll by the width of visible cards minus one (for context)
      const scrollAmount =
        direction === "left"
          ? -(itemWidth * Math.max(1, visibleItemCount - 1))
          : itemWidth * Math.max(1, visibleItemCount - 1);
      container.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };
  // Mouse drag scrolling (for touch-like experience on desktop)
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    if (scrollRef.current) {
      const x = e.pageX - (scrollRef.current.offsetLeft || 0);
      const walk = (x - startX) * 2; // Scroll speed multiplier
      scrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  const handleMouseLeave = () => {
    setIsDragging(false);
  };
  // Calculate total number of "pages" for dot indicators
  const totalPages = Math.ceil(tools.length / visibleItemCount);
  return (
    <div ref={containerRef} className="relative group w-full">
      {/* Left scroll button with gradient background */}
      <button
        onClick={() => scroll("left")}
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-r from-white via-white to-transparent pl-2 pr-4 py-12 transition-opacity duration-300 ${
          showLeftArrow
            ? "opacity-100 md:opacity-0 md:group-hover:opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
        aria-label="Scroll left"
        disabled={!showLeftArrow}
      >
        <div className="bg-white rounded-full p-2 shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-200">
          <ChevronLeft className="h-5 w-5 text-gray-700" />
        </div>
      </button>

      {/* Carousel container */}
      <div
        className="w-full overflow-hidden"
        style={{
          maxWidth: `${
            (cardWidth + cardGap) * Math.min(3, tools.length) - cardGap
          }px`,
          margin: "0 auto",
        }}
      >
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 pb-8 pt-2 px-1 hide-scrollbar scroll-smooth"
          style={{
            scrollbarWidth: "none",
            scrollSnapType: "x mandatory",
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {tools.map((tool, index) => (
            <div
              key={tool.id}
              className="flex-shrink-0 transition-transform duration-300 hover:scale-[1.02] hover:z-10"
              style={{
                width: `${cardWidth}px`,
                scrollSnapAlign: "start",
              }}
            >
              <ToolCard tool={tool} featured={true} />
            </div>
          ))}
        </div>
      </div>

      {/* Right scroll button with gradient background */}
      <button
        onClick={() => scroll("right")}
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-l from-white via-white to-transparent pr-2 pl-4 py-12 transition-opacity duration-300 ${
          showRightArrow
            ? "opacity-100 md:opacity-0 md:group-hover:opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
        aria-label="Scroll right"
        disabled={!showRightArrow}
      >
        <div className="bg-white rounded-full p-2 shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-200">
          <ChevronRight className="h-5 w-5 text-gray-700" />
        </div>
      </button>

      {/* Dot indicators for position */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-2 space-x-1.5">
          {Array.from({
            length: totalPages,
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index * visibleItemCount)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                Math.floor(activeIndex / visibleItemCount) === index
                  ? "w-6 bg-blue-600"
                  : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
