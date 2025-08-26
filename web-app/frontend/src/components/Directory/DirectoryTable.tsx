import React, { useState } from "react";
import { MemberOrganization } from "../../types/memberOrganization";
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Mail,
  Phone,
  Globe,
  MapPin,
  Edit,
  Info,
  Users,
  Building,
  ArrowUpRight,
} from "lucide-react";
import { useUser } from "../../context/UserContext";
interface DirectoryTableProps {
  organizations: MemberOrganization[];
  totalCount: number;
  onEditOrganization: (org: MemberOrganization) => void;
}
// Helper function to get membership type based on tier
const getMembershipType = (tier: string): string => {
  if (tier === "TL-1") {
    return "Members with Affiliate Networks";
  } else if (["TL-2", "TL-4", "TL-5"].includes(tier)) {
    return "National Member";
  } else if (tier === "TL-3") {
    return "State Program Member";
  } else if (tier === "TL-6") {
    return "Community Member";
  } else {
    return tier;
  }
};
export function DirectoryTable({
  organizations,
  totalCount,
  onEditOrganization,
}: DirectoryTableProps) {
  const [sortField, setSortField] = useState<keyof MemberOrganization>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const { user } = useUser();
  // Handle sorting
  const handleSort = (field: keyof MemberOrganization) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };
  // Sort organizations
  const sortedOrganizations = [...organizations].sort((a, b) => {
    if (sortField === "primaryContact") {
      // Special handling for nested primaryContact.name
      const valueA = a.primaryContact.name.toLowerCase();
      const valueB = b.primaryContact.name.toLowerCase();
      if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
      if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    } else if (sortField === "movementFocus") {
      // Special handling for array field
      const valueA = a.movementFocus.join(", ").toLowerCase();
      const valueB = b.movementFocus.join(", ").toLowerCase();
      if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
      if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    } else {
      // Default sorting for other fields
      const valueA = String(a[sortField]).toLowerCase();
      const valueB = String(b[sortField]).toLowerCase();
      if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
      if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    }
  });
  // Render sort indicator
  const renderSortIndicator = (field: keyof MemberOrganization) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ChevronUp className="h-4 w-4 inline ml-1" />
    ) : (
      <ChevronDown className="h-4 w-4 inline ml-1" />
    );
  };
  // Check if the current user can edit this organization
  const canEditOrganization = (orgId: string) => {
    // Admin can edit any organization
    if (user?.role === "admin") return true;
    // Staff can only edit their own organization
    return user?.organizationId === orgId;
  };
  if (organizations.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="flex flex-col items-center justify-center py-12">
          <Users className="h-16 w-16 text-gray-300 mb-4" />
          <p className="text-xl font-medium text-gray-500 mb-2">
            No organizations found
          </p>
          <p className="text-gray-400 max-w-md">
            Try adjusting your search criteria or filters to find what you're
            looking for.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
      <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              Member Organizations
            </h3>
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-medium text-gray-900">
                {organizations.length}
              </span>{" "}
              of <span className="font-medium text-gray-900">{totalCount}</span>{" "}
              organizations
            </p>
          </div>
          {user && (
            <div className="mt-3 md:mt-0 flex items-center px-4 py-2 bg-blue-50 border border-blue-100 rounded-lg">
              <Info className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0" />
              <span className="text-sm text-blue-700">
                {user.role === "admin"
                  ? "As an admin, you can edit all organization profiles"
                  : 'Your organization is highlighted in blue. Click "Edit Profile" to make changes.'}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center">
                  <Building className="h-4 w-4 mr-1 text-gray-400" />
                  Organization {renderSortIndicator("name")}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("tier")}
              >
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1 text-gray-400" />
                  Membership {renderSortIndicator("tier")}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("movementFocus")}
              >
                Focus Areas {renderSortIndicator("movementFocus")}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("reach")}
              >
                Reach {renderSortIndicator("reach")}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("primaryContact")}
              >
                Contact {renderSortIndicator("primaryContact")}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedOrganizations.map((org) => (
              <tr
                key={org.id}
                className={`group hover:bg-gray-50 transition-colors ${
                  canEditOrganization(org.id) ? "bg-blue-50" : ""
                }`}
              >
                <td className="px-6 py-5 whitespace-nowrap">
                  <div className="flex items-center">
                    {org.logo ? (
                      <img
                        src={org.logo}
                        alt={`${org.name} logo`}
                        className="h-12 w-12 rounded-lg object-cover bg-gray-100 mr-4 shadow-sm"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-lg bg-primary text-white flex items-center justify-center mr-4 shadow-sm">
                        <span className="font-semibold text-lg">
                          {org.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      <div className="text-md font-semibold text-gray-900 mb-1">
                        {org.name}
                        {canEditOrganization(org.id) && (
                          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                            <Users className="h-3 w-3 mr-1" />
                            Your Organization
                          </span>
                        )}
                      </div>
                      {org.location && (
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-3.5 w-3.5 mr-1 text-gray-400" />
                          {org.location}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="px-2.5 py-1.5 text-xs font-medium rounded-md bg-blue-100 text-blue-800 border border-blue-200 inline-block max-w-full break-words">
                    {getMembershipType(org.tier)}
                  </span>
                  <div className="text-xs text-gray-500 mt-1">
                    Tier: {org.tier}
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex flex-wrap gap-1.5 max-w-xs">
                    {org.movementFocus.slice(0, 5).map((focus, index) => (
                      <span
                        key={index}
                        className="px-2.5 py-1 text-xs font-medium rounded-md bg-green-50 text-green-700 border border-green-100"
                      >
                        {focus}
                      </span>
                    ))}
                    {org.movementFocus.length > 5 && (
                      <span className="px-2.5 py-1 text-xs font-medium rounded-md bg-gray-50 text-gray-700 border border-gray-100">
                        +{org.movementFocus.length - 5} more
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-md bg-purple-50 text-purple-700 border border-purple-100">
                    {org.reach || "Not specified"}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className="text-sm font-medium text-gray-900 mb-1">
                    {org.primaryContact.name}
                  </div>
                  <div className="text-xs text-gray-500 mb-2">
                    {org.primaryContact.title}
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <a
                      href={`mailto:${org.primaryContact.email}`}
                      className="text-xs text-primary hover:text-primary/80 flex items-center"
                    >
                      <Mail className="h-3.5 w-3.5 mr-1" />
                      {org.primaryContact.email}
                    </a>
                    {org.primaryContact.phone && (
                      <a
                        href={`tel:${org.primaryContact.phone}`}
                        className="text-xs text-gray-600 hover:text-gray-800 flex items-center"
                      >
                        <Phone className="h-3.5 w-3.5 mr-1" />
                        {org.primaryContact.phone}
                      </a>
                    )}
                    {org.website && (
                      <a
                        href={org.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:text-primary/80 flex items-center"
                      >
                        <Globe className="h-3.5 w-3.5 mr-1" />
                        {org.website
                          .replace(/^https?:\/\//i, "")
                          .replace(/\/$/, "")}
                      </a>
                    )}
                  </div>
                </td>
                <td className="px-6 py-5 whitespace-nowrap text-center">
                  {canEditOrganization(org.id) ? (
                    <button
                      onClick={() => onEditOrganization(org)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </button>
                  ) : (
                    <a
                      href={org.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                    >
                      <ArrowUpRight className="h-4 w-4 mr-2" />
                      Visit Website
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
