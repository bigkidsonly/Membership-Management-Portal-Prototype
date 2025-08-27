import React, { useEffect, useState, useRef } from "react";
import {
  Search,
  Filter,
  ShoppingCart,
  Clock,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { FilterSidebar } from "../components/marketplace/FilterSidebar";
import { ToolCard } from "../components/marketplace/ToolCard";
import { FeaturedDeals } from "../components/marketplace/FeaturedDeals";
import { Link } from "react-router-dom";
export function Marketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [categoryScrollPosition, setCategoryScrollPosition] = useState(0);
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  // Sample data for marketplace tools
  const tools = [
    {
      id: "1",
      name: "Tableau",
      category: "Data & Analytics",
      vendor: "Salesforce",
      description:
        "Enterprise-grade data visualization and business intelligence platform with advanced analytics capabilities.",
      regularPrice: 70,
      memberPrice: 49,
      discount: 30,
      tier: "TL-1",
      rating: 4.8,
      reviewCount: 245,
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Tableau_Logo.png",
      featured: true,
    },
    {
      id: "2",
      name: "Asana",
      category: "Project Management",
      vendor: "Asana, Inc.",
      description:
        "Work management platform designed to help teams organize, track, and manage their work.",
      regularPrice: 24.99,
      memberPrice: 17.99,
      discount: 28,
      tier: "TL-2",
      rating: 4.6,
      reviewCount: 189,
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Asana_logo.svg/1200px-Asana_logo.svg.png",
      featured: false,
    },
    {
      id: "3",
      name: "Slack",
      category: "Communication Tools",
      vendor: "Salesforce",
      description:
        "Business communication platform offering many IRC-style features, including persistent chat rooms.",
      regularPrice: 12.5,
      memberPrice: 8.75,
      discount: 30,
      tier: "TL-1",
      rating: 4.9,
      reviewCount: 320,
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Slack_Technologies_Logo.svg/2560px-Slack_Technologies_Logo.svg.png",
      featured: true,
    },
    {
      id: "4",
      name: "Airtable",
      category: "Data & Analytics",
      vendor: "Airtable, Inc.",
      description:
        "Cloud collaboration service that combines the features of a database with the visual interface of a spreadsheet.",
      regularPrice: 20,
      memberPrice: 14,
      discount: 30,
      tier: "TL-2",
      rating: 4.7,
      reviewCount: 156,
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Airtable_Logo.svg/2560px-Airtable_Logo.svg.png",
      featured: false,
    },
    {
      id: "5",
      name: "Notion",
      category: "Project Management",
      vendor: "Notion Labs",
      description:
        "All-in-one workspace for notes, tasks, wikis, and databases with customizable blocks.",
      regularPrice: 8,
      memberPrice: 5.6,
      discount: 30,
      tier: "TL-1",
      rating: 4.8,
      reviewCount: 210,
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png",
      featured: true,
    },
    {
      id: "6",
      name: "Figma",
      category: "Design Tools",
      vendor: "Figma, Inc.",
      description:
        "Cloud-based design tool that enables collaborative interface design with real-time editing.",
      regularPrice: 15,
      memberPrice: 10.5,
      discount: 30,
      tier: "TL-1",
      rating: 4.9,
      reviewCount: 278,
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
      featured: false,
    },
    {
      id: "7",
      name: "Okta",
      category: "Security",
      vendor: "Okta, Inc.",
      description:
        "Identity and access management service that enables secure connections to applications and services.",
      regularPrice: 29,
      memberPrice: 20.3,
      discount: 30,
      tier: "TL-1",
      rating: 4.7,
      reviewCount: 142,
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Okta_Logo.svg",
      featured: false,
    },
    {
      id: "8",
      name: "Salesforce",
      category: "CRM Systems",
      vendor: "Salesforce",
      description:
        "Cloud-based customer relationship management platform for sales, service, marketing, and more.",
      regularPrice: 150,
      memberPrice: 105,
      discount: 30,
      tier: "TL-1",
      rating: 4.6,
      reviewCount: 320,
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/2560px-Salesforce.com_logo.svg.png",
      featured: true,
    },
    {
      id: "9",
      name: "Zoom",
      category: "Communication Tools",
      vendor: "Zoom Video Communications",
      description:
        "Video conferencing service with robust features for virtual meetings, webinars, and collaboration.",
      regularPrice: 14.99,
      memberPrice: 10.49,
      discount: 30,
      tier: "TL-2",
      rating: 4.5,
      reviewCount: 287,
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Zoom_Communications_Logo.svg/1280px-Zoom_Communications_Logo.svg.png",
      featured: false,
    },
    {
      id: "thrutalk",
      name: "ThruTalk",
      category: "Communication Tools",
      vendor: "ThruText, Inc.",
      description:
        "Advanced phone service platform with SMS, MMS, voice calls, and message segmentation for organizations.",
      regularPrice: "Variable",
      memberPrice: "Pay per use",
      discount: 30,
      tier: "TL-1",
      rating: 4.9,
      reviewCount: 187,
      logo: "https://via.placeholder.com/200x80/0066cc/ffffff?text=ThruTalk",
      featured: true,
    },
  ];
  const featuredTools = tools.filter((tool) => tool.featured);
  // Categories with counts
  const categories = [
    {
      name: "Data & Analytics",
      count: 15,
      icon: "📊",
    },
    {
      name: "Communication Tools",
      count: 12,
      icon: "💬",
    },
    {
      name: "CRM Systems",
      count: 8,
      icon: "👥",
    },
    {
      name: "Security",
      count: 10,
      icon: "🔒",
    },
    {
      name: "Design Tools",
      count: 7,
      icon: "🎨",
    },
    {
      name: "Project Management",
      count: 14,
      icon: "📋",
    },
  ];
  // Scroll categories horizontally
  const scrollCategories = (direction: "left" | "right") => {
    if (categoryScrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      categoryScrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
      // Update scroll position for showing/hiding arrows
      setCategoryScrollPosition(
        direction === "left"
          ? Math.max(0, categoryScrollPosition - 300)
          : categoryScrollPosition + 300
      );
    }
  };
  // Update category scroll position on resize and check sidebar state
  useEffect(() => {
    const handleResize = () => {
      if (categoryScrollRef.current) {
        setCategoryScrollPosition(categoryScrollRef.current.scrollLeft);
      }
      // Auto-collapse sidebar on medium screens
      if (window.innerWidth < 1200 && window.innerWidth >= 768) {
        setIsSidebarCollapsed(true);
      } else if (window.innerWidth >= 1200) {
        setIsSidebarCollapsed(false);
      }
    };
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // Check if category scroll is at start or end
  const canScrollLeft = categoryScrollPosition > 0;
  const canScrollRight = categoryScrollRef.current
    ? categoryScrollRef.current.scrollWidth >
      categoryScrollRef.current.clientWidth + categoryScrollPosition
    : false;
  // Toggle sidebar on medium screens
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          TMC Member Marketplace
        </h1>
        <p className="text-base md:text-lg text-gray-600 mt-2">
          Exclusive discounts for cooperative members
        </p>
      </div>
      <div className="bg-gradient-to-r from-primary to-primary/80 rounded-xl p-4 md:p-6 mb-6 md:mb-8 text-white">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-xl md:text-2xl font-bold mb-2">
              Find the right tools for your organization
            </h2>
            <p className="text-primary-foreground/80 text-sm md:text-base">
              Members saved $2.3M this year through cooperative purchasing power
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/marketplace/orders"
              className="bg-white text-primary px-4 py-2 rounded-lg font-medium flex items-center justify-center"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              My Orders
            </Link>
            <Link
              to="/marketplace/orders?tab=approvals"
              className="bg-white text-primary px-4 py-2 rounded-lg font-medium flex items-center justify-center"
            >
              <Clock className="h-4 w-4 mr-2" />
              Pending Approvals
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Search and Filter Bar */}
      <div className="md:hidden mb-6">
        <div className="flex gap-2">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="flex items-center justify-center px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Filter className="h-4 w-4 text-gray-700" />
          </button>
        </div>
        {/* Mobile Filter Panel */}
        {isMobileFilterOpen && (
          <div className="mt-4 bg-white rounded-xl shadow-md p-4 border border-gray-200">
            <FilterSidebar />
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Sidebar - Hidden on Mobile, Collapsible on Medium */}
        <div
          className={`hidden md:block transition-all duration-300 ${
            isSidebarCollapsed ? "w-12" : "w-60"
          } flex-shrink-0`}
        >
          {isSidebarCollapsed ? (
            <div className="sticky top-20">
              <button
                onClick={toggleSidebar}
                className="flex items-center justify-center w-10 h-10 mb-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                aria-label="Expand sidebar"
              >
                <Menu className="h-5 w-5 text-gray-700" />
              </button>
            </div>
          ) : (
            <div className="sticky top-20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Filters</h3>
                <button
                  onClick={toggleSidebar}
                  className="p-1 rounded-md hover:bg-gray-100"
                  aria-label="Collapse sidebar"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              <div className="mb-6 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <FilterSidebar />
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Featured Deals */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4 border-b pb-2">
              <h2 className="text-xl font-semibold text-gray-900">
                Featured Deals
              </h2>
              <Link
                to="/marketplace/featured"
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                View all
              </Link>
            </div>
            <FeaturedDeals tools={featuredTools} />
          </div>

          {/* All Tools */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h2 className="text-xl font-semibold text-gray-900">All Tools</h2>
              <div className="hidden md:flex items-center text-sm text-gray-500">
                <Filter className="h-4 w-4 mr-1" />
                <span>Filtered by: </span>
                <span className="font-medium text-blue-600 ml-1">
                  All Categories
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tools.map((tool) => (
                <div key={tool.id} className="h-full">
                  <ToolCard tool={tool} />
                </div>
              ))}
            </div>
          </div>

          {/* Popular Categories */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4 border-b pb-2">
              <h2 className="text-xl font-semibold text-gray-900">
                Popular Categories
              </h2>
              <Link
                to="/marketplace/categories"
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                View all
              </Link>
            </div>
            {/* Category scroll container with arrows */}
            <div className="relative group">
              <button
                onClick={() => scrollCategories("left")}
                className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-r from-white via-white to-transparent pl-0 pr-4 py-8 transition-opacity duration-300 ${
                  canScrollLeft
                    ? "opacity-100 md:opacity-0 md:group-hover:opacity-100"
                    : "opacity-0 pointer-events-none"
                }`}
                aria-label="Scroll categories left"
                disabled={!canScrollLeft}
              >
                <div className="bg-white rounded-full p-2 shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-200">
                  <ChevronLeft className="h-4 w-4 text-gray-700" />
                </div>
              </button>
              <div
                ref={categoryScrollRef}
                className="grid grid-flow-col auto-cols-max gap-4 overflow-x-auto pb-4 px-1 hide-scrollbar scroll-smooth"
                style={{
                  scrollbarWidth: "none",
                  scrollSnapType: "x mandatory",
                }}
                onScroll={(e) =>
                  setCategoryScrollPosition(e.currentTarget.scrollLeft)
                }
              >
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-sm p-4 text-center hover:shadow-md transition-all duration-300 cursor-pointer w-32 sm:w-36"
                    style={{
                      scrollSnapAlign: "start",
                    }}
                  >
                    <div className="text-3xl mb-2">{category.icon}</div>
                    <h3 className="font-medium text-gray-900 text-sm">
                      {category.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {category.count} tools
                    </p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => scrollCategories("right")}
                className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-l from-white via-white to-transparent pr-0 pl-4 py-8 transition-opacity duration-300 ${
                  canScrollRight
                    ? "opacity-100 md:opacity-0 md:group-hover:opacity-100"
                    : "opacity-0 pointer-events-none"
                }`}
                aria-label="Scroll categories right"
                disabled={!canScrollRight}
              >
                <div className="bg-white rounded-full p-2 shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-200">
                  <ChevronRight className="h-4 w-4 text-gray-700" />
                </div>
              </button>
            </div>
          </div>

          <div className="flex justify-center border-t pt-6">
            <Link
              to="/marketplace/vendors"
              className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 group"
            >
              View all vendor partnerships
              <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </div>
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
