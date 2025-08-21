import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
export function PurchaseRequest() {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  return <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-6">
      <Link to={`/marketplace/tool/${id}`} className="inline-flex items-center text-blue-600 mb-6 hover:text-blue-800">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Tool Details
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Purchase Request
      </h1>
      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <p className="text-blue-800">
          This page is under construction. The purchase request form for tool
          ID: {id} will be available soon.
        </p>
      </div>
    </div>;
}