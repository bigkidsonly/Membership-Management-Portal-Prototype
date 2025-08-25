import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
export function OrdersDashboard() {
  return <div className="max-w-7xl mx-auto">
      <Link to="/marketplace" className="inline-flex items-center text-blue-600 mb-6 hover:text-blue-800">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Marketplace
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Orders Dashboard
      </h1>
      <div className="bg-blue-50 rounded-lg p-4">
        <p className="text-blue-800">
          This page is under construction. The orders dashboard will be
          available soon.
        </p>
      </div>
    </div>;
}