// src/components/Dashboard/MetricsCards.tsx
import React from "react";
import { Users, FolderOpen, ShoppingCart, AlertCircle } from "lucide-react";

interface MetricsCardsProps {
  affiliatesCount?: number;
  maxAffiliates?: number;
  activeProjects?: number;
  monthlyOrders?: string;
  pendingApprovals?: number;
  loading?: boolean;
}

export function MetricsCards({
  affiliatesCount = 0,
  maxAffiliates = 50,
  activeProjects = 0,
  monthlyOrders = "$0",
  pendingApprovals = 0,
  loading = false,
}: MetricsCardsProps) {
  const affiliateProgress = Math.round((affiliatesCount / maxAffiliates) * 100);
  const remainingSlots = maxAffiliates - affiliatesCount;

  const metrics = [
    {
      title: "Total Affiliates",
      value: loading ? "..." : `${affiliatesCount}/${maxAffiliates}`,
      icon: <Users className="h-8 w-8 text-blue-500" />,
      hasProgress: true,
      progress: affiliateProgress,
      color: "blue",
      detail: loading ? "Loading..." : `${remainingSlots} slots remaining`,
    },
    {
      title: "Active Projects",
      value: loading ? "..." : activeProjects.toString(),
      icon: <FolderOpen className="h-8 w-8 text-green-500" />,
      color: "green",
      detail: loading ? "Loading..." : "+1 from last month",
    },
    {
      title: "This Month's Orders",
      value: loading ? "..." : monthlyOrders,
      icon: <ShoppingCart className="h-8 w-8 text-purple-500" />,
      color: "purple",
      detail: loading ? "Loading..." : "+15% from last month",
    },
    {
      title: "Pending Approvals",
      value: loading ? "..." : pendingApprovals.toString(),
      icon: <AlertCircle className="h-8 w-8 text-amber-500" />,
      isClickable: true,
      color: "amber",
      hasButton: true,
      buttonText: "Review Now",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className={`bg-white rounded-xl shadow-sm p-6 ${
            metric.isClickable
              ? "cursor-pointer hover:shadow-md transition-shadow"
              : ""
          } ${loading ? "animate-pulse" : ""}`}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">
                {metric.title}
              </p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {metric.value}
              </p>
              {metric.detail && (
                <p className="text-xs text-gray-500 mt-1">{metric.detail}</p>
              )}
            </div>
            <div
              className={`p-2 rounded-lg ${
                metric.color === "blue"
                  ? "bg-blue-50"
                  : metric.color === "green"
                  ? "bg-green-50"
                  : metric.color === "purple"
                  ? "bg-purple-50"
                  : "bg-amber-50"
              }`}
            >
              {metric.icon}
            </div>
          </div>
          {metric.hasProgress && !loading && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${metric.progress}%` }}
                ></div>
              </div>
            </div>
          )}
          {metric.hasButton && (
            <div className="mt-4">
              <button className="w-full py-2 px-4 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/90 transition-colors disabled:opacity-50">
                {loading ? "Loading..." : metric.buttonText}
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
