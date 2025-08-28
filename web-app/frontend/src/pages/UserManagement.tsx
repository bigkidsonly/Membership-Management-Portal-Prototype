import React, { useEffect, useState } from "react";
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

  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/users/list");
      const data = await response.json();
      if (response.ok) {
        setUsers(data.users);
      }
    };
    fetchUsers();
  }, []);

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
      {isFormOpen && <ApplicationForm onClose={handleCloseForm} />}
       <div className="mt-8">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Organization Name</th>
              <th className="px-4 py-2 text-left">User Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Active</th>
            </tr>
          </thead>
          <tbody>
            {users && users.length > 0 ? (
              users.map((user: any) => (
                <tr key={user.id} className="border-t">
                  <td className="px-4 py-2">{user.organization_name}</td>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.is_active ? "✅" : ""}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-4 py-2 text-center text-gray-400">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    
  );
}
