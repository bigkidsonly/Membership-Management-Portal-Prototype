import React, { useState } from "react";
import { AffiliatesList } from "../components/Affiliates/AffiliatesList";
import { AffiliateForm } from "../components/Affiliates/AffiliateForm";
import { AffiliateDetail } from "../components/Affiliates/AffiliateDetail";
import { DeleteConfirmation } from "../components/Affiliates/DeleteConfirmation";
import { Affiliate } from "../types/affiliate";
import { Plus, Filter, Search } from "lucide-react";
export function Affiliates() {
  // State for managing affiliates
  const [affiliates, setAffiliates] = useState<Affiliate[]>([
    {
      id: "1",
      name: "Tech Justice Collective",
      organization: "Tech Justice Collective",
      email: "contact@techjustice.org",
      phone: "(555) 123-4567",
      status: "active",
      tier: "TL-1",
      joinDate: "2022-06-15",
      notes:
        "Working on digital equity initiatives in underserved communities.",
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
  ]);
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
