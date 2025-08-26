import React, { useEffect, useState } from "react";
import { DirectorySearch } from "../components/Directory/DirectorySearch";
import { DirectoryTable } from "../components/Directory/DirectoryTable";
import { DirectoryFilters } from "../components/Directory/DirectoryFilters";
import { MemberOrganizationForm } from "../components/Directory/MemberOrganizationForm";
import { memberOrganizations } from "../data/memberOrganizations";
import { MemberOrganization } from "./../types/memberOrganization";
import { Building, Users, Filter } from "lucide-react";
interface ActiveFilter {
  field: string;
  value: string;
}
export function Directory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOrganizations, setFilteredOrganizations] =
    useState<MemberOrganization[]>(memberOrganizations);
  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([]);
  const [allOrganizations, setAllOrganizations] =
    useState<MemberOrganization[]>(memberOrganizations);
  const [editingOrganization, setEditingOrganization] =
    useState<MemberOrganization | null>(null);
  // Define filter options for each column
  const getFilterOptions = () => {
    // Get unique tiers
    const tiers = Array.from(new Set(allOrganizations.map((org) => org.tier)));
    // Get unique movement focuses
    const allFocuses = allOrganizations.flatMap((org) => org.movementFocus);
    const focuses = Array.from(new Set(allFocuses));
    // Get unique organization reaches
    const reaches = Array.from(
      new Set(
        allOrganizations
          .map((org) => org.reach)
          .filter((reach) => reach !== undefined && reach !== "")
      )
    );
    // Get unique locations
    const locations = Array.from(
      new Set(
        allOrganizations
          .map((org) => org.location)
          .filter((location) => location !== undefined && location !== "")
      )
    );
    // Get unique organization sizes
    const sizes = Array.from(
      new Set(
        allOrganizations
          .map((org) => org.size)
          .filter((size) => size !== undefined && size !== "")
      )
    );
    return [
      {
        id: "name",
        label: "Organization Name",
        field: "name",
        type: "text" as const,
      },
      {
        id: "tier",
        label: "Membership Type",
        field: "tier",
        type: "select" as const,
        options: tiers,
      },
      {
        id: "movementFocus",
        label: "Movement Focus",
        field: "movementFocus",
        type: "select" as const,
        options: focuses,
      },
      {
        id: "reach",
        label: "Organization Reach",
        field: "reach",
        type: "select" as const,
        options: reaches,
      },
      {
        id: "size",
        label: "Organization Size",
        field: "size",
        type: "select" as const,
        options: sizes,
      },
      {
        id: "primaryContact",
        label: "Primary Contact",
        field: "primaryContact.name",
        type: "text" as const,
      },
      {
        id: "email",
        label: "Email",
        field: "primaryContact.email",
        type: "text" as const,
      },
      {
        id: "website",
        label: "Website",
        field: "website",
        type: "text" as const,
      },
      {
        id: "location",
        label: "Location",
        field: "location",
        type: "select" as const,
        options: locations,
      },
    ];
  };
  // Add a new filter
  const handleAddFilter = (field: string, value: string) => {
    setActiveFilters([
      ...activeFilters,
      {
        field,
        value,
      },
    ]);
  };
  // Remove a filter
  const handleRemoveFilter = (index: number) => {
    const newFilters = [...activeFilters];
    newFilters.splice(index, 1);
    setActiveFilters(newFilters);
  };
  // Helper function to get nested property value
  const getNestedValue = (obj: any, path: string) => {
    const keys = path.split(".");
    return keys.reduce(
      (o, key) => (o && o[key] !== undefined ? o[key] : undefined),
      obj
    );
  };
  // Handle editing an organization
  const handleEditOrganization = (org: MemberOrganization) => {
    setEditingOrganization(org);
  };
  // Handle form submission for organization updates
  const handleUpdateOrganization = (updatedOrg: MemberOrganization) => {
    // Update the organization in our data
    const updatedOrganizations = allOrganizations.map((org) =>
      org.id === updatedOrg.id ? updatedOrg : org
    );
    setAllOrganizations(updatedOrganizations);
    setEditingOrganization(null);
    // Show a success message
    alert("Organization profile updated successfully!");
  };
  // Filter organizations based on search query and active filters
  useEffect(() => {
    let result = allOrganizations;
    // Filter by search query
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      result = result.filter(
        (org) =>
          org.name.toLowerCase().includes(lowerCaseQuery) ||
          org.primaryContact.name.toLowerCase().includes(lowerCaseQuery) ||
          org.primaryContact.email.toLowerCase().includes(lowerCaseQuery) ||
          org.primaryContact.title.toLowerCase().includes(lowerCaseQuery) ||
          org.movementFocus.some((focus) =>
            focus.toLowerCase().includes(lowerCaseQuery)
          ) ||
          (org.location && org.location.toLowerCase().includes(lowerCaseQuery))
      );
    }
    // Apply all active filters
    if (activeFilters.length > 0) {
      result = result.filter((org) => {
        return activeFilters.every((filter) => {
          if (filter.field === "movementFocus") {
            // Special handling for array field
            return org.movementFocus.includes(filter.value);
          } else if (filter.field.includes(".")) {
            // Handle nested properties (like primaryContact.name)
            const value = getNestedValue(org, filter.field);
            return (
              value && value.toLowerCase().includes(filter.value.toLowerCase())
            );
          } else {
            // Standard field filtering
            const value = org[filter.field as keyof MemberOrganization];
            if (typeof value === "string") {
              return value.toLowerCase().includes(filter.value.toLowerCase());
            }
            return false;
          }
        });
      });
    }
    setFilteredOrganizations(result);
  }, [searchQuery, activeFilters, allOrganizations]);
  // Handle search input change
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };
  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-lg bg-primary text-white flex items-center justify-center mr-4">
                <Building className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Member Directory
                </h1>
                <p className="text-gray-500 mt-1">
                  Browse and search for member organizations in the network
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-700 flex items-center">
              <Users className="h-4 w-4 mr-2 text-gray-500" />
              <span>
                <strong>{allOrganizations.length}</strong> Organizations
              </span>
            </div>
            <div className="px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-700 flex items-center">
              <Filter className="h-4 w-4 mr-2 text-gray-500" />
              <span>
                <strong>{activeFilters.length}</strong> Active Filters
              </span>
            </div>
          </div>
        </div>
        <DirectorySearch
          onSearchChange={handleSearchChange}
          searchQuery={searchQuery}
        />
        <DirectoryFilters
          activeFilters={activeFilters}
          onAddFilter={handleAddFilter}
          onRemoveFilter={handleRemoveFilter}
          filterOptions={getFilterOptions()}
        />
      </div>
      <DirectoryTable
        organizations={filteredOrganizations}
        totalCount={allOrganizations.length}
        onEditOrganization={handleEditOrganization}
      />
      {/* Organization Edit Form */}
      {editingOrganization && (
        <MemberOrganizationForm
          organization={editingOrganization}
          onSubmit={handleUpdateOrganization}
          onCancel={() => setEditingOrganization(null)}
        />
      )}
    </div>
  );
}
