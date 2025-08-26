// src/hooks/useSupabaseData.ts
import { useState, useEffect, useCallback } from "react";
// import { affiliatesService, marketplaceService } from '../services/database';

// Mock Data
export const sampleAffiliatesData = [
  {
    id: "1",
    name: "Tech Justice Collective",
    organization: "Tech Justice Collective",
    email: "contact@techjustice.org",
    phone: "(555) 123-4567",
    status: "active",
    tier: "TL-1",
    joinDate: "2022-06-15",
    notes: "Working on digital equity initiatives in underserved communities.",
    tags: ["Digital Rights", "Education"],
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    address: "123 Tech Way, San Francisco, CA 94110",
    website: "https://techjustice.org",
    primaryContact: "Maria Rodriguez",
  },
  {
    id: "2",
    name: "Digital Democracy Project",
    organization: "Digital Democracy Project",
    email: "info@digitaldemocracy.org",
    phone: "(555) 234-5678",
    status: "active",
    tier: "TL-1",
    joinDate: "2022-08-22",
    notes: "Focused on civic tech and voter access technologies.",
    tags: ["Civic Tech", "Voting Rights"],
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    address: "456 Democracy Ave, Washington, DC 20001",
    website: "https://digitaldemocracy.org",
    primaryContact: "James Wilson",
  },
  {
    id: "3",
    name: "Community Tech Hub",
    organization: "Community Tech Hub",
    email: "hello@communitytechhub.org",
    phone: "(555) 345-6789",
    status: "active",
    tier: "TL-2",
    joinDate: "2022-10-05",
    notes: "Community makerspace and digital literacy center.",
    tags: ["Digital Literacy", "Maker Space"],
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    address: "789 Community Blvd, Chicago, IL 60607",
    website: "https://communitytechhub.org",
    primaryContact: "Aisha Johnson",
  },
  {
    id: "4",
    name: "Open Source Alliance",
    organization: "Open Source Alliance",
    email: "contact@opensourcealliance.org",
    phone: "(555) 456-7890",
    status: "active",
    tier: "TL-1",
    joinDate: "2023-01-10",
    notes: "Promoting open source solutions for nonprofit organizations.",
    tags: ["Open Source", "Software Development"],
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    address: "101 Open Way, Portland, OR 97201",
    website: "https://opensourcealliance.org",
    primaryContact: "David Chen",
  },
  {
    id: "5",
    name: "Data for Good",
    organization: "Data for Good",
    email: "info@dataforgood.org",
    phone: "(555) 567-8901",
    status: "active",
    tier: "TL-2",
    joinDate: "2023-02-18",
    notes: "Harnessing data science for social impact projects.",
    tags: ["Data Science", "Social Impact"],
    avatar: "https://randomuser.me/api/portraits/women/56.jpg",
    address: "202 Data Drive, Boston, MA 02110",
    website: "https://dataforgood.org",
    primaryContact: "Sarah Kim",
  },
  {
    id: "6",
    name: "Urban Tech Network",
    organization: "Urban Tech Network",
    email: "hello@urbantechnetwork.org",
    phone: "(555) 678-9012",
    status: "pending",
    tier: "TL-3",
    joinDate: "2023-04-30",
    notes: "Application in review - focusing on smart city technologies.",
    tags: ["Smart Cities", "Urban Planning"],
    avatar: "https://randomuser.me/api/portraits/men/36.jpg",
    address: "303 Urban Street, Atlanta, GA 30308",
    website: "https://urbantechnetwork.org",
    primaryContact: "Marcus Johnson",
  },
  {
    id: "7",
    name: "Rural Connectivity Coalition",
    organization: "Rural Connectivity Coalition",
    email: "contact@ruralconnect.org",
    phone: "(555) 789-0123",
    status: "pending",
    tier: "TL-2",
    joinDate: "2023-05-15",
    notes: "Awaiting documentation - working on rural broadband access.",
    tags: ["Rural Tech", "Broadband Access"],
    avatar: "https://randomuser.me/api/portraits/women/89.jpg",
    address: "404 Rural Road, Boise, ID 83702",
    website: "https://ruralconnect.org",
    primaryContact: "Emma Garcia",
  },
];

// Generic hook for data fetching with loading and error states
export function useAsyncData<T>(
  fetchFunction: () => Promise<T>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      console.error("Error loading data:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const refetch = useCallback(() => {
    loadData();
  }, [loadData]);

  return { data, loading, error, refetch };
}

// Specific hooks for different data types
export function useAffiliates() {
  // return useAsyncData(() => affiliatesService.getAll());

  return useAsyncData(async () => sampleAffiliatesData);
}

export function useMarketplaceTools(options?: {
  category?: string;
  featured?: boolean;
  limit?: number;
}) {
  return useAsyncData(
    () => marketplaceService.getTools(options),
    [options?.category, options?.featured, options?.limit]
  );
}

export function useFeaturedTools() {
  return useAsyncData(() => marketplaceService.getFeaturedTools());
}

export function useToolById(id: string) {
  return useAsyncData(() => marketplaceService.getToolById(id), [id]);
}

export function useSearchTools(searchTerm: string) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (term: string) => {
    if (!term.trim()) {
      setData([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const results = await marketplaceService.searchTools(term);
      setData(results || []);
    } catch (err) {
      console.error("Error searching tools:", err);
      setError(err instanceof Error ? err.message : "Search failed");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      search(searchTerm);
    }, 300); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [searchTerm, search]);

  return { data, loading, error, search };
}

// Hook for dashboard metrics
export function useDashboardMetrics() {
  const [metrics, setMetrics] = useState({
    affiliatesCount: 0,
    maxAffiliates: 50,
    activeProjects: 0,
    monthlyOrders: "$0",
    pendingApprovals: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadMetrics();
  }, []);

  const loadMetrics = async () => {
    try {
      setLoading(true);
      setError(null);

      // const affiliates = await affiliatesService.getAll();

      setMetrics({
        affiliatesCount: sampleAffiliatesData.length, // affiliates.length,
        maxAffiliates: 50,
        activeProjects: 3, // Would come from projects service
        monthlyOrders: "$12,450", // Would come from orders service
        pendingApprovals: 5, // Would come from orders service
      });
    } catch (err) {
      console.error("Error loading metrics:", err);
      setError(err instanceof Error ? err.message : "Failed to load metrics");
    } finally {
      setLoading(false);
    }
  };

  return { metrics, loading, error, refetch: loadMetrics };
}
