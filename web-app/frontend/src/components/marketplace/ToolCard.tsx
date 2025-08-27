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
}
export function ToolCard({ tool }: ToolCardProps) {
  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <CardContent className="p-6 flex-grow">
        <div className="flex justify-between items-start mb-4">
          <img
            src={tool.logo}
            alt={`${tool.name} logo`}
            className="h-10 object-contain"
          />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {tool.name}
        </h3>
        <p className="text-sm text-gray-500 mb-2">{tool.vendor}</p>
        <div className="flex items-center mb-3">
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
        <p className="text-sm text-gray-700 mb-4 line-clamp-3">
          {tool.description}
        </p>
      </CardContent>
      <CardFooter className="p-6 pt-0 border-t mt-auto">
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
            className="w-full flex justify-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm"
          >
            View Details
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
