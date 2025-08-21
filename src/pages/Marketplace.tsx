import React, { useState } from 'react';
import { Search, Filter, ShoppingCart, Clock, ArrowRight } from 'lucide-react';
import { FilterSidebar } from '../components/marketplace/FilterSidebar';
import { ToolCard } from '../components/marketplace/ToolCard';
import { FeaturedDeals } from '../components/marketplace/FeaturedDeals';
import { Link } from 'react-router-dom';
export function Marketplace() {
  const [searchQuery, setSearchQuery] = useState('');
  // Sample data for marketplace tools
  const tools = [{
    id: '1',
    name: 'Tableau',
    category: 'Data & Analytics',
    vendor: 'Salesforce',
    description: 'Enterprise-grade data visualization and business intelligence platform with advanced analytics capabilities.',
    regularPrice: 70,
    memberPrice: 49,
    discount: 30,
    tier: 'TL-1',
    rating: 4.8,
    reviewCount: 245,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Tableau_Logo.png',
    featured: true
  }, {
    id: '2',
    name: 'Asana',
    category: 'Project Management',
    vendor: 'Asana, Inc.',
    description: 'Work management platform designed to help teams organize, track, and manage their work.',
    regularPrice: 24.99,
    memberPrice: 17.99,
    discount: 28,
    tier: 'TL-2',
    rating: 4.6,
    reviewCount: 189,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Asana_logo.svg/1200px-Asana_logo.svg.png',
    featured: false
  }, {
    id: '3',
    name: 'Slack',
    category: 'Communication Tools',
    vendor: 'Salesforce',
    description: 'Business communication platform offering many IRC-style features, including persistent chat rooms.',
    regularPrice: 12.5,
    memberPrice: 8.75,
    discount: 30,
    tier: 'TL-1',
    rating: 4.9,
    reviewCount: 320,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Slack_Technologies_Logo.svg/2560px-Slack_Technologies_Logo.svg.png',
    featured: true
  }, {
    id: '4',
    name: 'Airtable',
    category: 'Data & Analytics',
    vendor: 'Airtable, Inc.',
    description: 'Cloud collaboration service that combines the features of a database with the visual interface of a spreadsheet.',
    regularPrice: 20,
    memberPrice: 14,
    discount: 30,
    tier: 'TL-2',
    rating: 4.7,
    reviewCount: 156,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Airtable_Logo.svg/2560px-Airtable_Logo.svg.png',
    featured: false
  }, {
    id: '5',
    name: 'Notion',
    category: 'Project Management',
    vendor: 'Notion Labs',
    description: 'All-in-one workspace for notes, tasks, wikis, and databases with customizable blocks.',
    regularPrice: 8,
    memberPrice: 5.6,
    discount: 30,
    tier: 'TL-1',
    rating: 4.8,
    reviewCount: 210,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png',
    featured: true
  }, {
    id: '6',
    name: 'Figma',
    category: 'Design Tools',
    vendor: 'Figma, Inc.',
    description: 'Cloud-based design tool that enables collaborative interface design with real-time editing.',
    regularPrice: 15,
    memberPrice: 10.5,
    discount: 30,
    tier: 'TL-1',
    rating: 4.9,
    reviewCount: 278,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg',
    featured: false
  }, {
    id: '7',
    name: 'Okta',
    category: 'Security',
    vendor: 'Okta, Inc.',
    description: 'Identity and access management service that enables secure connections to applications and services.',
    regularPrice: 29,
    memberPrice: 20.3,
    discount: 30,
    tier: 'TL-1',
    rating: 4.7,
    reviewCount: 142,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Okta_Logo.svg',
    featured: false
  }, {
    id: '8',
    name: 'Salesforce',
    category: 'CRM Systems',
    vendor: 'Salesforce',
    description: 'Cloud-based customer relationship management platform for sales, service, marketing, and more.',
    regularPrice: 150,
    memberPrice: 105,
    discount: 30,
    tier: 'TL-1',
    rating: 4.6,
    reviewCount: 320,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/2560px-Salesforce.com_logo.svg.png',
    featured: true
  }, {
    id: '9',
    name: 'Zoom',
    category: 'Communication Tools',
    vendor: 'Zoom Video Communications',
    description: 'Video conferencing service with robust features for virtual meetings, webinars, and collaboration.',
    regularPrice: 14.99,
    memberPrice: 10.49,
    discount: 30,
    tier: 'TL-2',
    rating: 4.5,
    reviewCount: 287,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Zoom_Communications_Logo.svg/1280px-Zoom_Communications_Logo.svg.png',
    featured: false
  }];
  const featuredTools = tools.filter(tool => tool.featured);
  // Categories with counts
  const categories = [{
    name: 'Data & Analytics',
    count: 15,
    icon: '📊'
  }, {
    name: 'Communication Tools',
    count: 12,
    icon: '💬'
  }, {
    name: 'CRM Systems',
    count: 8,
    icon: '👥'
  }, {
    name: 'Security',
    count: 10,
    icon: '🔒'
  }, {
    name: 'Design Tools',
    count: 7,
    icon: '🎨'
  }, {
    name: 'Project Management',
    count: 14,
    icon: '📋'
  }];
  return <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          TMC Member Marketplace
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Exclusive discounts for cooperative members
        </p>
      </div>
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 mb-8 text-white">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              Find the right tools for your organization
            </h2>
            <p className="text-blue-100">
              Members saved $2.3M this year through cooperative purchasing power
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Link to="/marketplace/orders" className="bg-white text-blue-700 px-4 py-2 rounded-lg font-medium flex items-center">
              <ShoppingCart className="h-4 w-4 mr-2" />
              My Orders
            </Link>
            <Link to="/marketplace/orders?tab=approvals" className="bg-white text-blue-700 px-4 py-2 rounded-lg font-medium flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Pending Approvals
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="mb-6 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input type="text" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Search tools..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          </div>
          <FilterSidebar />
        </div>
        {/* Main Content */}
        <div className="flex-1">
          {/* Featured Deals */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Featured Deals
            </h2>
            <FeaturedDeals tools={featuredTools} />
          </div>
          {/* All Tools */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">All Tools</h2>
              <div className="flex items-center text-sm text-gray-500">
                <Filter className="h-4 w-4 mr-1" />
                <span>Filtered by: </span>
                <span className="font-medium text-blue-600 ml-1">
                  All Categories
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map(tool => <ToolCard key={tool.id} tool={tool} />)}
            </div>
          </div>
          {/* Popular Categories */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Popular Categories
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category, index) => <div key={index} className="bg-white rounded-xl shadow-sm p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
                  <div className="text-3xl mb-2">{category.icon}</div>
                  <h3 className="font-medium text-gray-900">{category.name}</h3>
                  <p className="text-sm text-gray-500">
                    {category.count} tools
                  </p>
                </div>)}
            </div>
          </div>
          <div className="flex justify-center">
            <Link to="/marketplace/vendors" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800">
              View all vendor partnerships
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>;
}