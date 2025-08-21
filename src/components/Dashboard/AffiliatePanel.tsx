import React from 'react';
import { Plus, ChevronRight } from 'lucide-react';
export function AffiliatePanel() {
  const recentActivity = [{
    affiliate: 'Tech Justice Collective',
    action: 'Updated profile',
    time: '2 hours ago'
  }, {
    affiliate: 'Digital Democracy Project',
    action: 'Added new user',
    time: '5 hours ago'
  }, {
    affiliate: 'Community Tech Hub',
    action: 'Placed marketplace order',
    time: 'Yesterday'
  }, {
    affiliate: 'Open Source Alliance',
    action: 'Completed onboarding',
    time: '2 days ago'
  }, {
    affiliate: 'Data for Good',
    action: 'Joined project #1274',
    time: '3 days ago'
  }];
  const pendingRequests = [{
    name: 'Urban Tech Network',
    status: 'Membership Application'
  }, {
    name: 'Rural Connectivity Coalition',
    status: 'Awaiting Documentation'
  }];
  return <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
        <h3 className="text-lg font-medium text-gray-900">
          Affiliate Management
        </h3>
      </div>
      <div className="px-6 py-4">
        <button className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none">
          <Plus className="h-4 w-4 mr-2" />
          Add New Affiliate
        </button>
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
            Recent Affiliate Activity
          </h4>
          <ul className="mt-2 divide-y divide-gray-200">
            {recentActivity.map((item, index) => <li key={index} className="py-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {item.affiliate}
                    </p>
                    <p className="text-sm text-gray-500">{item.action}</p>
                  </div>
                  <span className="text-xs text-gray-400">{item.time}</span>
                </div>
              </li>)}
          </ul>
        </div>
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
            Pending Affiliate Requests
          </h4>
          <ul className="mt-2 divide-y divide-gray-200">
            {pendingRequests.map((item, index) => <li key={index} className="py-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-500">{item.status}</p>
                  </div>
                  <button className="text-primary hover:text-primary/80">
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </li>)}
          </ul>
        </div>
        <div className="mt-6 text-center">
          <a href="#" className="text-sm font-medium text-primary hover:text-primary/80">
            View All Affiliates
          </a>
        </div>
      </div>
    </div>;
}