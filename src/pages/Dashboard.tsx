import React from 'react';
import { MetricsCards } from '../components/Dashboard/MetricsCards';
import { AffiliatePanel } from '../components/Dashboard/AffiliatePanel';
import { BenefitsPanel } from '../components/Dashboard/BenefitsPanel';
import { SupportPanel } from '../components/Dashboard/SupportPanel';
import { MarketplaceActivity } from '../components/Dashboard/MarketplaceActivity';
import { ProjectUpdates } from '../components/Dashboard/ProjectUpdates';
export function Dashboard() {
  return <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Welcome back, TechNetworks Alliance
      </h1>
      <h2 className="text-sm text-gray-500 -mt-4 mb-6">
        TL-1 - Affiliated Networks Dashboard
      </h2>
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
    </div>;
}