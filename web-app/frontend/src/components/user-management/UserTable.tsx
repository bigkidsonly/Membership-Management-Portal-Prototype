import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  MessageSquare,
  Edit,
} from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { UserBadge } from "./UserBadge";
import { EditUserForm } from "./EditUserForm";
interface UserTableProps {
  searchQuery: string;
}
export function UserTable({ searchQuery }: UserTableProps) {
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<any | null>(null);
  // Sample user data
  const [users, setUsers] = useState([
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.johnson@techjustice.org",
      googleGroup: "Tech Justice Coalition",
      memberStatus: ["TMC Portal", "Haven"],
      userType: "Administrator",
      title: "Program Director",
      submittedAt: "2023-10-15T10:30:00",
      status: "approved",
      badges: ["voting", "legal"],
      assignedTo: "Michael Chen",
      lastUpdated: "2023-10-18T14:22:00",
    },
    {
      id: "2",
      name: "David Rodriguez",
      email: "drodriguez@dataequity.net",
      googleGroup: "Data Equity Project",
      memberStatus: ["Haven"],
      userType: "Viewer",
      title: "Data Analyst",
      submittedAt: "2023-10-16T09:15:00",
      status: "pending",
      badges: [],
      assignedTo: null,
      lastUpdated: "2023-10-16T09:15:00",
    },
    {
      id: "3",
      name: "Aisha Patel",
      email: "apatel@communitytech.org",
      googleGroup: "Community Tech Alliance",
      memberStatus: ["TMC Portal", "Haven", "Hex"],
      userType: "MOU Signer",
      title: "Executive Director",
      submittedAt: "2023-10-14T11:45:00",
      status: "under_review",
      badges: ["board"],
      assignedTo: "Jennifer Wong",
      lastUpdated: "2023-10-17T16:30:00",
    },
    {
      id: "4",
      name: "Marcus Williams",
      email: "mwilliams@digitalrights.org",
      googleGroup: "Digital Rights Coalition",
      memberStatus: ["Hex"],
      userType: "Administrator",
      title: "API Integration",
      submittedAt: "2023-10-13T14:20:00",
      status: "info_requested",
      badges: [],
      assignedTo: "Michael Chen",
      lastUpdated: "2023-10-15T10:05:00",
    },
    {
      id: "5",
      name: "Elena Gonzalez",
      email: "egonzalez@techaccess.org",
      googleGroup: "Tech Access Initiative",
      memberStatus: ["TMC Portal"],
      userType: "Viewer",
      title: "UX Researcher",
      submittedAt: "2023-10-12T16:30:00",
      status: "rejected",
      badges: [],
      assignedTo: "Jennifer Wong",
      lastUpdated: "2023-10-14T09:45:00",
    },
  ]);
  // Filter users based on search query
  const filteredUsers = users.filter((user) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.googleGroup.toLowerCase().includes(query) ||
      user.title.toLowerCase().includes(query)
    );
  });
  // Sort users based on sort field and direction
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortField) return 0;
    const aValue = a[sortField as keyof typeof a];
    const bValue = b[sortField as keyof typeof b];
    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    return 0;
  });
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };
  const toggleDropdown = (id: string) => {
    if (dropdownOpen === id) {
      setDropdownOpen(null);
    } else {
      setDropdownOpen(id);
    }
  };
  const handleEditUser = (user: any) => {
    setEditingUser(user);
    setDropdownOpen(null);
  };
  const handleSaveUser = (updatedUser: any) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };
  const renderSortIcon = (field: string) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ChevronUp className="h-4 w-4 ml-1" />
    ) : (
      <ChevronDown className="h-4 w-4 ml-1" />
    );
  };
  // Define platform tag colors
  const getPlatformTagColor = (platform: string) => {
    switch (platform) {
      case "Haven":
        return "bg-blue-100 text-blue-800";
      case "Hex":
        return "bg-purple-100 text-purple-800";
      case "TMC Portal":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  // Define user type tag colors
  const getUserTypeTagColor = (userType: string) => {
    switch (userType) {
      case "Administrator":
        return "bg-red-100 text-red-800";
      case "MOU Signer":
        return "bg-amber-100 text-amber-800";
      case "Viewer":
        return "bg-teal-100 text-teal-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort("name")}
            >
              <div className="flex items-center">
                Name
                {renderSortIcon("name")}
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort("googleGroup")}
            >
              <div className="flex items-center">
                Organization
                {renderSortIcon("googleGroup")}
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort("memberStatus")}
            >
              <div className="flex items-center">
                Platforms
                {renderSortIcon("memberStatus")}
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort("userType")}
            >
              <div className="flex items-center">
                User Type
                {renderSortIcon("userType")}
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort("status")}
            >
              <div className="flex items-center">
                Status
                {renderSortIcon("status")}
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Badges
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort("submittedAt")}
            >
              <div className="flex items-center">
                Submitted
                {renderSortIcon("submittedAt")}
              </div>
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedUsers.length > 0 ? (
            sortedUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <div className="text-sm font-medium text-gray-900">
                      {user.name}
                    </div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {user.googleGroup}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-1">
                    {user.memberStatus.map((platform, index) => (
                      <span
                        key={index}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPlatformTagColor(
                          platform
                        )}`}
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getUserTypeTagColor(
                      user.userType
                    )}`}
                  >
                    {user.userType}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={user.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-1">
                    {user.badges.map((badge, index) => (
                      <UserBadge key={index} type={badge} />
                    ))}
                    {user.badges.length === 0 && (
                      <span className="text-xs text-gray-500">None</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(user.submittedAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => toggleDropdown(user.id)}
                  >
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                  {dropdownOpen === user.id && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                      <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                      >
                        <button
                          className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                          onClick={() => handleEditUser(user)}
                        >
                          <Edit className="h-4 w-4 mr-2 text-blue-500" />
                          Edit User
                        </button>
                        <button
                          className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                          Approve
                        </button>
                        <button
                          className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          <XCircle className="h-4 w-4 mr-2 text-red-500" />
                          Reject
                        </button>
                        <button
                          className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          <AlertCircle className="h-4 w-4 mr-2 text-yellow-500" />
                          Request Info
                        </button>
                        <button
                          className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          <MessageSquare className="h-4 w-4 mr-2 text-blue-500" />
                          Add Comment
                        </button>
                        <button
                          className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          <Clock className="h-4 w-4 mr-2 text-purple-500" />
                          View History
                        </button>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={8}
                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
              >
                No users found matching your search criteria
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Previous
          </button>
          <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">{sortedUsers.length}</span> of{" "}
              <span className="font-medium">{sortedUsers.length}</span> results
            </p>
          </div>
          <div>
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Previous</span>
                <ChevronUp className="h-5 w-5 rotate-90" />
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                1
              </button>
              <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Next</span>
                <ChevronDown className="h-5 w-5 rotate-90" />
              </button>
            </nav>
          </div>
        </div>
      </div>
      {editingUser && (
        <EditUserForm
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSave={handleSaveUser}
        />
      )}
    </div>
  );
}
