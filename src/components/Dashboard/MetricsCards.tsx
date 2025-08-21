import React from 'react';
import { Users, FolderOpen, ShoppingCart, AlertCircle } from 'lucide-react';
export function MetricsCards() {
  const metrics = [{
    title: 'Total Affiliates',
    value: '47/50',
    icon: <Users className="h-8 w-8 text-blue-500" />,
    hasProgress: true,
    progress: 94,
    color: 'blue',
    detail: '3 slots remaining'
  }, {
    title: 'Active Projects',
    value: '3',
    icon: <FolderOpen className="h-8 w-8 text-green-500" />,
    color: 'green',
    detail: '+1 from last month'
  }, {
    title: "This Month's Orders",
    value: '$12,450',
    icon: <ShoppingCart className="h-8 w-8 text-purple-500" />,
    color: 'purple',
    detail: '+15% from last month'
  }, {
    title: 'Pending Approvals',
    value: '5',
    icon: <AlertCircle className="h-8 w-8 text-amber-500" />,
    isClickable: true,
    color: 'amber',
    hasButton: true,
    buttonText: 'Review Now'
  }];
  return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => <div key={index} className={`bg-white rounded-xl shadow-sm p-6 ${metric.isClickable ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">
                {metric.title}
              </p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {metric.value}
              </p>
              {metric.detail && <p className="text-xs text-gray-500 mt-1">{metric.detail}</p>}
            </div>
            <div className={`p-2 rounded-lg ${metric.color === 'blue' ? 'bg-blue-50' : metric.color === 'green' ? 'bg-green-50' : metric.color === 'purple' ? 'bg-purple-50' : 'bg-amber-50'}`}>
              {metric.icon}
            </div>
          </div>
          {metric.hasProgress && <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{
            width: `${metric.progress}%`
          }}></div>
              </div>
            </div>}
          {metric.hasButton && <div className="mt-4">
              <button className="w-full py-2 px-4 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors">
                {metric.buttonText}
              </button>
            </div>}
        </div>)}
    </div>;
}