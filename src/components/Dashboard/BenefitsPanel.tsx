import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
export function BenefitsPanel() {
  const benefits = [{
    name: 'TMC SmartVAN',
    status: 'Active',
    statusColor: 'green',
    detail: ''
  }, {
    name: 'Haven Data Syncs',
    status: 'Active',
    statusColor: 'green',
    detail: '127 syncs this month'
  }, {
    name: 'Compass',
    status: 'Active',
    statusColor: 'green',
    detail: '23 active users'
  }, {
    name: 'Hex',
    status: 'Warning',
    statusColor: 'yellow',
    detail: '8/10 user licenses used'
  }, {
    name: 'Member Library',
    status: 'Active',
    statusColor: 'green',
    detail: '156 resources accessed'
  }, {
    name: 'Member Discounts',
    status: 'Active',
    statusColor: 'green',
    detail: '$25,000 saved YTD'
  }];
  return <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
        <h3 className="text-lg font-medium text-gray-900">
          Benefits Utilization
        </h3>
      </div>
      <div className="px-6 py-4">
        <ul className="divide-y divide-gray-200">
          {benefits.map((benefit, index) => <li key={index} className="py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {benefit.statusColor === 'green' ? <CheckCircle className="h-5 w-5 text-green-500 mr-3" /> : <AlertCircle className="h-5 w-5 text-amber-500 mr-3" />}
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {benefit.name}
                    </p>
                    <p className="text-xs text-gray-500">{benefit.detail}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${benefit.statusColor === 'green' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                  {benefit.status}
                </span>
              </div>
            </li>)}
        </ul>
        <div className="mt-6 bg-blue-50 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircle className="h-5 w-5 text-blue-500" />
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-medium text-blue-800">
                All TL-1 Benefits Active
              </h4>
              <p className="mt-1 text-sm text-blue-700">
                Your organization is fully utilizing available cooperative
                benefits.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>;
}