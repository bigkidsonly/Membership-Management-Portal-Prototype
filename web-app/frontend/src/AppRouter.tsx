import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { App } from "./App";
import { Dashboard } from "./pages/Dashboard";
import { Marketplace } from "./pages/Marketplace";
import { Affiliates } from "./pages/Affiliates";
import { Projects } from "./pages/Projects";
import { Billing } from "./pages/Billing";
import { Directory } from "./pages/Directory";
import { Support } from "./pages/Support";
import { ToolDetail } from "./pages/marketplace/ToolDetail";
import { ThruTalkDetail } from "././pages/marketplace/ThruTalkDetail";
import { PurchaseRequest } from "./pages/marketplace/PurchaseRequest";
import { OrdersDashboard } from "./pages/marketplace/OrdersDashboard";
import { VendorDirectory } from "./pages/marketplace/VendorDirectory";
import { UserManagement } from "./pages/UserManagement";
import { Profile } from "./pages/Profile";
import { Settings } from "./pages/Settings";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="marketplace/tool/:id" element={<ToolDetail />} />
          <Route
            path="marketplace/tool/thrutalk"
            element={<ThruTalkDetail />}
          />
          <Route
            path="marketplace/purchase/:id"
            element={<PurchaseRequest />}
          />
          <Route path="marketplace/orders" element={<OrdersDashboard />} />
          <Route path="marketplace/vendors" element={<VendorDirectory />} />
          <Route path="affiliates" element={<Affiliates />} />
          <Route path="projects" element={<Projects />} />
          <Route path="billing" element={<Billing />} />
          <Route path="directory" element={<Directory />} />
          <Route path="support" element={<Support />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
