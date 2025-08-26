import React, { useEffect, useState } from "react";
import { AffiliatesList } from "../components/Affiliates/AffiliatesList";
import { AffiliateForm } from "../components/Affiliates/AffiliateForm";
import { AffiliateDetail } from "../components/Affiliates/AffiliateDetail";
import { DeleteConfirmation } from "../components/Affiliates/DeleteConfirmation";
import { Affiliate } from "../types/affiliate";
import { Plus, Filter, Search } from "lucide-react";
import { useAffiliates } from "@/hooks/useSupabaseData";
export function Affiliates() {
  // State for managing affiliates
  const {
    data: initialAffiliates,
    loading: affiliatesLoading,
    error: affiliatesError,
  } = useAffiliates();

  const [affiliates, setAffiliates] = useState<Affiliate[]>(
    initialAffiliates || []
  );

  useEffect(() => {
    if (!affiliatesLoading && !!affiliates) {
      setAffiliates(initialAffiliates);
    }
  }, [affiliatesLoading]);

  // State for managing UI
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentAffiliate, setCurrentAffiliate] = useState<Affiliate | null>(
    null
  );
  // Handler for adding a new affiliate
  const handleAddAffiliate = (affiliate: Omit<Affiliate, "id">) => {
    const newAffiliate = {
      ...affiliate,
      id: (affiliates.length + 1).toString(),
    };
    setAffiliates([...affiliates, newAffiliate]);
    setIsFormOpen(false);
  };
  // Handler for updating an affiliate
  const handleUpdateAffiliate = (updatedAffiliate: Affiliate) => {
    setAffiliates(
      affiliates.map((affiliate) =>
        affiliate.id === updatedAffiliate.id ? updatedAffiliate : affiliate
      )
    );
    setIsDetailOpen(false);
    setCurrentAffiliate(null);
  };
  // Handler for deleting an affiliate
  const handleDeleteAffiliate = () => {
    if (currentAffiliate) {
      setAffiliates(
        affiliates.filter((affiliate) => affiliate.id !== currentAffiliate.id)
      );
      setIsDeleteModalOpen(false);
      setCurrentAffiliate(null);
    }
  };
  // Handler for viewing affiliate details
  const handleViewAffiliate = (affiliate: Affiliate) => {
    setCurrentAffiliate(affiliate);
    setIsDetailOpen(true);
  };
  // Handler for editing an affiliate
  const handleEditAffiliate = (affiliate: Affiliate) => {
    setCurrentAffiliate(affiliate);
    setIsFormOpen(true);
  };
  // Handler for opening delete confirmation
  const handleOpenDeleteModal = (affiliate: Affiliate) => {
    setCurrentAffiliate(affiliate);
    setIsDeleteModalOpen(true);
  };
  // Filter affiliates based on search and status filter
  const filteredAffiliates = affiliates.filter((affiliate) => {
    const matchesSearch =
      affiliate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      affiliate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      affiliate.organization
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      affiliate.primaryContact
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || affiliate.status === filterStatus;
    return matchesSearch && matchesFilter;
  });
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Affiliates</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your network of affiliated organizations
          </p>
        </div>
        <button
          onClick={() => {
            setCurrentAffiliate(null);
            setIsFormOpen(true);
          }}
          className="px-4 py-2 bg-primary text-white rounded-lg flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Affiliate
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="Search affiliates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center">
          <Filter className="h-5 w-5 text-gray-400 mr-2" />
          <select
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Affiliates List */}
      <AffiliatesList
        affiliates={filteredAffiliates}
        onView={handleViewAffiliate}
        onEdit={handleEditAffiliate}
        onDelete={handleOpenDeleteModal}
      />

      {/* Add/Edit Affiliate Form Modal */}
      {isFormOpen && (
        <AffiliateForm
          affiliate={currentAffiliate}
          onSubmit={
            currentAffiliate ? handleUpdateAffiliate : handleAddAffiliate
          }
          onCancel={() => {
            setIsFormOpen(false);
            setCurrentAffiliate(null);
          }}
        />
      )}

      {/* Affiliate Detail Modal */}
      {isDetailOpen && currentAffiliate && (
        <AffiliateDetail
          affiliate={currentAffiliate}
          onEdit={() => {
            setIsDetailOpen(false);
            setIsFormOpen(true);
          }}
          onDelete={() => {
            setIsDetailOpen(false);
            setIsDeleteModalOpen(true);
          }}
          onClose={() => {
            setIsDetailOpen(false);
            setCurrentAffiliate(null);
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && currentAffiliate && (
        <DeleteConfirmation
          affiliateName={currentAffiliate.name}
          onConfirm={handleDeleteAffiliate}
          onCancel={() => {
            setIsDeleteModalOpen(false);
            setCurrentAffiliate(null);
          }}
        />
      )}
    </div>
  );
}
