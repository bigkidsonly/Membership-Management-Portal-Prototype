import React from "react";
import { MetricsCards } from "./MetricsCards";
import { AffiliatePanel } from "./AffiliatePanel";
import { BenefitsPanel } from "./BenefitsPanel";
import { SupportPanel } from "./SupportPanel";
import { MarketplaceActivity } from "./MarketplaceActivity";
import { ProjectUpdates } from "./ProjectUpdates";
export function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Welcome back, Affiliated Networks
      </h1>
      {/* Top Section - Key Metrics */}
      <MetricsCards />
      {/* Three Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <AffiliatePanel />
        <BenefitsPanel />
        <SupportPanel />
      </div>
      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <MarketplaceActivity />
        <ProjectUpdates />
      </div>
    </div>
  );
}
