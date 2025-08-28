import { Plus, ChevronRight } from "lucide-react";
import { recentActivity } from "@/data/activityLog";
import { pendingRequests } from "@/data/activityLog";

export function AffiliatePanel() {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
        <h3 className="text-lg font-medium text-gray-900">
          Affiliate Management
        </h3>
      </div>
      <div className="px-6 py-4">
        <button
          onClick={() => setIsMembershipApplicationOpen(true)}
          className="px-4 py-2 bg-black text-white rounded-lg flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Apply for New Affiliate
        </button>
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
            Recent Affiliate Activity
          </h4>
          <ul className="mt-2 divide-y divide-gray-200">
            {recentActivity.map((item, index) => (
              <li key={index} className="py-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {item.affiliate}
                    </p>
                    <p className="text-sm text-gray-500">{item.action}</p>
                  </div>
                  <span className="text-xs text-gray-400">{item.time}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
            Pending Affiliate Requests
          </h4>
          <ul className="mt-2 divide-y divide-gray-200">
            {pendingRequests.map((item, index) => (
              <li key={index} className="py-3">
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
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6 text-center">
          <a
            href="/affiliates"
            className="text-sm font-medium text-primary hover:text-primary/80 border border-black px-3 py-1 rounded"
          >
            View All Affiliates
          </a>
        </div>
      </div>
    </div>
  );
}
