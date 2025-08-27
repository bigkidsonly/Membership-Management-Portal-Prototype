import React, { useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";
export function FilterSidebar() {
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    vendors: false,
  });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);
  const categories = [
    {
      id: "data",
      name: "Data & Analytics",
    },
    {
      id: "communication",
      name: "Communication Tools",
    },
    {
      id: "crm",
      name: "CRM Systems",
    },
    {
      id: "security",
      name: "Security",
    },
    {
      id: "design",
      name: "Design Tools",
    },
    {
      id: "project",
      name: "Project Management",
    },
  ];
  const vendors = [
    {
      id: "salesforce",
      name: "Salesforce",
    },
    {
      id: "adobe",
      name: "Adobe",
    },
    {
      id: "microsoft",
      name: "Microsoft",
    },
    {
      id: "google",
      name: "Google",
    },
    {
      id: "atlassian",
      name: "Atlassian",
    },
    {
      id: "aws",
      name: "Amazon Web Services",
    },
    {
      id: "slack",
      name: "Slack",
    },
    {
      id: "zoom",
      name: "Zoom",
    },
  ];
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };
  const toggleCategory = (id: string) => {
    if (selectedCategories.includes(id)) {
      setSelectedCategories(selectedCategories.filter((catId) => catId !== id));
    } else {
      setSelectedCategories([...selectedCategories, id]);
    }
  };
  const toggleVendor = (id: string) => {
    if (selectedVendors.includes(id)) {
      setSelectedVendors(selectedVendors.filter((vendorId) => vendorId !== id));
    } else {
      setSelectedVendors([...selectedVendors, id]);
    }
  };
  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedVendors([]);
    setPriceRange([0, 200]);
  };
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-900">Filters</h3>
        {(selectedCategories.length > 0 || selectedVendors.length > 0) && (
          <button
            onClick={resetFilters}
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
          >
            <X className="h-3 w-3 mr-1" />
            Reset
          </button>
        )}
      </div>
      {/* Categories */}
      <div className="mb-6">
        <button
          className="flex justify-between items-center w-full text-left font-medium text-gray-900 mb-2"
          onClick={() => toggleSection("categories")}
        >
          Categories
          {expandedSections.categories ? (
            <ChevronUp className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          )}
        </button>
        {expandedSections.categories && (
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`category-${category.id}`}
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => toggleCategory(category.id)}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <label
                  htmlFor={`category-${category.id}`}
                  className="ml-2 text-sm text-gray-700"
                >
                  {category.name}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Price Range */}
      <div className="mb-6">
        <button
          className="flex justify-between items-center w-full text-left font-medium text-gray-900 mb-2"
          onClick={() => toggleSection("price")}
        >
          Price Range
          {expandedSections.price ? (
            <ChevronUp className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          )}
        </button>
        {expandedSections.price && (
          <div>
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
            <input
              type="range"
              min="0"
              max="200"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], parseInt(e.target.value)])
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        )}
      </div>
      {/* Vendors */}
      <div className="mb-6">
        <button
          className="flex justify-between items-center w-full text-left font-medium text-gray-900 mb-2"
          onClick={() => toggleSection("vendors")}
        >
          Vendors
          {expandedSections.vendors ? (
            <ChevronUp className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          )}
        </button>
        {expandedSections.vendors && (
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {vendors.map((vendor) => (
              <div key={vendor.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`vendor-${vendor.id}`}
                  checked={selectedVendors.includes(vendor.id)}
                  onChange={() => toggleVendor(vendor.id)}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <label
                  htmlFor={`vendor-${vendor.id}`}
                  className="ml-2 text-sm text-gray-700"
                >
                  {vendor.name}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
      <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
        Apply Filters
      </button>
    </div>
  );
}
