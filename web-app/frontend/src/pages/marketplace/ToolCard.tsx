import React from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Card, CardContent, CardFooter } from "../../components/ui/card";
interface ToolCardProps {
  tool: {
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
  };
  featured?: boolean;
}
export function ToolCard({ tool, featured }: ToolCardProps) {
  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300 relative group">
      <CardContent className="p-4 flex-grow">
        <div className="flex justify-between items-start mb-3">
          <img
            src={tool.logo}
            alt={`${tool.name} logo`}
            className="h-9 object-contain"
          />
          {tool.discount > 0 && (
            <span className="absolute right-3 top-3 px-2 py-1 text-xs font-bold rounded-full bg-green-100 text-green-800 transform group-hover:scale-110 transition-transform duration-200">
              {tool.discount}% OFF
            </span>
          )}
        </div>
        <h3 className="text-base font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-200 line-clamp-1">
          {tool.name}
        </h3>
        <p className="text-xs text-gray-500 mb-2">{tool.vendor}</p>
        <div className="flex items-center mb-2">
          <div className="flex items-center mr-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(tool.rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({tool.reviewCount})</span>
        </div>
        <p className="text-xs text-gray-700 mb-3 line-clamp-3">
          {tool.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 border-t mt-auto">
        <div className="w-full">
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-xs text-gray-500 line-through">
              {typeof tool.regularPrice === "number"
                ? `$${tool.regularPrice}/mo`
                : tool.regularPrice}
            </span>
            <span className="text-sm font-bold text-gray-900">
              {typeof tool.memberPrice === "number"
                ? `$${tool.memberPrice}/mo`
                : tool.memberPrice}
            </span>
          </div>
          <Link
            to={`/marketplace/tool/${tool.id}`}
            className="w-full flex justify-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 hover:text-blue-600 hover:border-blue-300 transition-all duration-200 text-xs group-hover:shadow-md"
          >
            View Details
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
