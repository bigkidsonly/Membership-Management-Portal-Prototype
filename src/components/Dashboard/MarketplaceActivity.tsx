import React from 'react';
import { Check, X } from 'lucide-react';
export function MarketplaceActivity() {
  const activities = [{
    affiliate: 'Digital Democracy Project',
    item: 'Custom Database Development',
    amount: '$4,500',
    date: 'Mar 10, 2023',
    status: 'Pending Approval'
  }, {
    affiliate: 'Tech Justice Collective',
    item: 'Data Analysis Package',
    amount: '$2,750',
    date: 'Mar 8, 2023',
    status: 'Pending Approval'
  }, {
    affiliate: 'Community Tech Hub',
    item: 'Website Redesign',
    amount: '$3,200',
    date: 'Mar 5, 2023',
    status: 'Approved'
  }, {
    affiliate: 'Open Source Alliance',
    item: 'Server Infrastructure',
    amount: '$1,800',
    date: 'Mar 3, 2023',
    status: 'Approved'
  }, {
    affiliate: 'Data for Good',
    item: 'Training Workshop',
    amount: '$950',
    date: 'Mar 1, 2023',
    status: 'Approved'
  }];
  return <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
        <h3 className="text-lg font-medium text-gray-900">
          Recent Marketplace Activity
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Affiliate
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Item
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {activities.map((activity, index) => <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {activity.affiliate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {activity.item}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {activity.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {activity.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${activity.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                    {activity.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {activity.status === 'Pending Approval' && <div className="flex justify-end space-x-2">
                      <button className="p-1 rounded-full text-green-600 hover:bg-green-100">
                        <Check className="h-5 w-5" />
                      </button>
                      <button className="p-1 rounded-full text-red-600 hover:bg-red-100">
                        <X className="h-5 w-5" />
                      </button>
                    </div>}
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>
    </div>;
}