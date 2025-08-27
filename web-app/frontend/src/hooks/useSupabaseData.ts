// src/hooks/useSupabaseData.ts
import { useState, useEffect, useCallback } from "react";
// import { affiliatesService, marketplaceService } from '../services/database';
import { memberOrganizations } from "@/data/organization";
import { affiliates } from "@/data/affiliatesOrganization";
import { recentActivity } from "@/data/activityLog";
import { benefits } from "@/data/benefitsUsage";
import { tools } from "@/data/tools";
import { marketplaceService } from "@/services/database";

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
  return useAsyncData(async () => affiliates);
}

export function useMemberOrganizations() {
  return useAsyncData(async () => memberOrganizations);
}

export function useActivityLog() {
  return useAsyncData(async () => recentActivity);
}

export function useBenefits() {
  return useAsyncData(async () => benefits);
}

export function useTools() {
  return useAsyncData(async () => tools);
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
        affiliatesCount: affiliates.length, // affiliates.length,
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
