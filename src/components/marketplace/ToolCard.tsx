import React from 'react';
import { Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
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
interface ToolCardProps {
  tool: Tool;
  featured?: boolean;
}
export function ToolCard({
  tool,
  featured = false
}: ToolCardProps) {
  return <div className={`bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow ${featured ? 'border-2 border-blue-500' : ''}`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <img src={tool.logo} alt={`${tool.vendor} logo`} className="h-10 object-contain" />
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${tool.tier === 'TL-1' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
            {tool.tier} Access
          </span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {tool.name}
        </h3>
        <p className="text-sm text-gray-500 mb-3">{tool.vendor}</p>
        <p className="text-sm text-gray-700 mb-4 line-clamp-2">
          {tool.description}
        </p>
        <div className="flex items-center mb-4">
          <div className="flex items-center mr-2">
            {[...Array(5)].map((_, i) => <Star key={i} className={`h-4 w-4 ${i < Math.floor(tool.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />)}
          </div>
          <span className="text-sm text-gray-500">({tool.reviewCount})</span>
        </div>
        <div className="flex items-baseline mb-4">
          <span className="text-sm text-gray-500 line-through mr-2">
            ${tool.regularPrice}/mo
          </span>
          <span className="text-xl font-bold text-gray-900">
            ${tool.memberPrice}/mo
          </span>
          <span className="ml-2 px-2 py-1 text-xs font-bold rounded-full bg-green-100 text-green-800">
            {tool.discount}% OFF
          </span>
        </div>
        <Link to={`/marketplace/tool/${tool.id}`} className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none">
          View Details
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>;
}