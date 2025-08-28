// src/pages/Dashboard.tsx (Simplified version using hooks)
import React, { useEffect, useState } from "react";
import { MetricsCards } from "../components/Dashboard/MetricsCards";
import { AffiliatePanel } from "../components/Dashboard/AffiliatePanel";
import { BenefitsPanel } from "../components/Dashboard/BenefitsPanel";
import { SupportPanel } from "../components/Dashboard/SupportPanel";
import { MarketplaceActivity } from "../components/Dashboard/MarketplaceActivity";
import { ProjectUpdates } from "../components/Dashboard/ProjectUpdates";
import { useDashboardMetrics, useAffiliates } from "../hooks/useSupabaseData";

export function Dashboard() {
  const {
    metrics,
    loading: metricsLoading,
    error: metricsError,
    refetch: refetchMetrics,
  } = useDashboardMetrics();
  const {
    data: affiliates,
    loading: affiliatesLoading,
    error: affiliatesError,
  } = useAffiliates();

  const [username, setUsername] = useState("friend");
  useEffect(() => {
    fetch("/api/users/me")
      .then((response) => response.json())
      .then((data) => {
        console.log("User Data:", data);
        setUsername(data.user?.first_name);
      });
  }, []);

  // Show error state if there's a critical error
  if (metricsError || affiliatesError) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-md p-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Error Loading Dashboard
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{metricsError || affiliatesError}</p>
              </div>
              <div className="mt-4">
                <button
                  onClick={refetchMetrics}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Welcome back, {username}!
      </h1>
      <h2 className="text-sm text-gray-500 -mt-4 mb-6">
        TL-1 - Affiliated Networks Dashboard
      </h2>

      {/* Top Section - Key Metrics */}
      <MetricsCards
        affiliatesCount={metrics.affiliatesCount}
        maxAffiliates={metrics.maxAffiliates}
        monthlyOrders={metrics.monthlyOrders}
        pendingApprovals={metrics.pendingApprovals}
        loading={metricsLoading}
      />

      {/* Three Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <AffiliatePanel
          recentAffiliates={affiliates?.slice(0, 5) || []}
          loading={affiliatesLoading}
        />
        <BenefitsPanel />
        <SupportPanel />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 gap-6 mt-6">
        <MarketplaceActivity activities={[]} />
      </div>
    </div>
  );
}
