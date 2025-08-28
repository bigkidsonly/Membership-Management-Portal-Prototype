import React, { useState } from "react";
import { UserTable } from ".././components/user-management/UserTable";
import { ApplicationForm } from ".././components/user-management/ApplicationForm";
import { Search, Plus, Download, Filter, RefreshCw } from "lucide-react";
export function UserManagement() {
  const [activeTab, setActiveTab] = useState("new-users");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const handleOpenForm = () => {
    setIsFormOpen(true);
  };
  const handleCloseForm = () => {
    setIsFormOpen(false);
  };
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          User Management
        </h1>
        <div className="flex items-center mt-4 md:mt-0 space-x-3">
          <button
            onClick={handleOpenForm}
            className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            <Plus className="h-4 w-4 mr-2" />
            Apply for New User
          </button>
          <button className="p-2 text-black-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
            <Download className="h-5 w-5" />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
            <RefreshCw className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {[
              {
                id: "new-users",
                name: "New Users",
              },
              {
                id: "active-users",
                name: "Active Users",
              },
              {
                id: "badge-management",
                name: "Badge Management",
              },
              {
                id: "settings",
                name: "Settings",
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search users..."
                className="pl-10 w-full rounded-lg border border-gray-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center mt-4 md:mt-0">
              <button className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg ml-2">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </button>
            </div>
          </div>
          {activeTab === "new-users" && <UserTable searchQuery={searchQuery} />}
          {activeTab === "active-users" && (
            <div className="text-center py-8 text-gray-500">
              Active Users tab content will appear here
            </div>
          )}
          {activeTab === "badge-management" && (
            <div className="text-center py-8 text-gray-500">
              Badge Management tab content will appear here
            </div>
          )}
          {activeTab === "settings" && (
            <div className="text-center py-8 text-gray-500">
              Settings tab content will appear here
            </div>
          )}
        </div>
      </div>
      {isFormOpen && <ApplicationForm onClose={handleCloseForm} />}
    </div>
  );
}
