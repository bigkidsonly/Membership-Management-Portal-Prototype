import React, { useState } from "react";
import {
  Save,
  Upload,
  Calendar,
  MapPin,
  Users,
  Globe,
  Building,
} from "lucide-react";
export function Settings() {
  const [orgSettings, setOrgSettings] = useState({
    name: "Tech Justice Coalition",
    movementFocus: ["Social Justice", "Digital Rights", "Privacy"],
    size: "medium",
    primaryContact: "Sarah Johnson",
    location: "San Francisco, CA",
    website: "https://techjustice.org",
    joinDate: "2021-05-15",
    logo: "https://via.placeholder.com/150",
    reach: "National",
  });
  const [newTag, setNewTag] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setOrgSettings({
      ...orgSettings,
      [name]: value,
    });
  };
  const handleAddTag = () => {
    if (newTag.trim() && !orgSettings.movementFocus.includes(newTag.trim())) {
      setOrgSettings({
        ...orgSettings,
        movementFocus: [...orgSettings.movementFocus, newTag.trim()],
      });
      setNewTag("");
    }
  };
  const handleRemoveTag = (tag: string) => {
    setOrgSettings({
      ...orgSettings,
      movementFocus: orgSettings.movementFocus.filter((item) => item !== tag),
    });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 1000);
  };
  // Mock user data for primary contact selection
  const users = [
    {
      id: 1,
      name: "Sarah Johnson",
    },
    {
      id: 2,
      name: "David Rodriguez",
    },
    {
      id: 3,
      name: "Aisha Patel",
    },
    {
      id: 4,
      name: "Marcus Williams",
    },
    {
      id: 5,
      name: "Elena Gonzalez",
    },
  ];
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900">
            Organization Settings
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your organization's profile and settings
          </p>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                  src={orgSettings.logo}
                  alt="Organization logo"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="ml-6">
                <h2 className="text-lg font-medium text-gray-900">
                  {orgSettings.name}
                </h2>
                <p className="text-sm text-gray-500">
                  {orgSettings.reach} organization
                </p>
                <button
                  type="button"
                  className="mt-2 flex items-center text-sm text-primary hover:text-primary/90 font-medium"
                >
                  <Upload className="h-4 w-4 mr-1" />
                  Upload new logo
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Organization Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={orgSettings.name}
                    onChange={handleInputChange}
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="size"
                  className="block text-sm font-medium text-gray-700"
                >
                  Organization Size
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Users className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    name="size"
                    id="size"
                    value={orgSettings.size}
                    onChange={handleInputChange}
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  >
                    <option value="small">Small (1-10 employees)</option>
                    <option value="medium">Medium (11-50 employees)</option>
                    <option value="large">Large (51-200 employees)</option>
                    <option value="enterprise">
                      Enterprise (200+ employees)
                    </option>
                  </select>
                </div>
              </div>
              <div>
                <label
                  htmlFor="primaryContact"
                  className="block text-sm font-medium text-gray-700"
                >
                  Primary Contact
                </label>
                <select
                  name="primaryContact"
                  id="primaryContact"
                  value={orgSettings.primaryContact}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                >
                  {users.map((user) => (
                    <option key={user.id} value={user.name}>
                      {user.name}
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-xs text-gray-500">
                  Select a user from User Management
                </p>
              </div>
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700"
                >
                  Location
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="location"
                    id="location"
                    value={orgSettings.location}
                    onChange={handleInputChange}
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    placeholder="City, State"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="website"
                  className="block text-sm font-medium text-gray-700"
                >
                  Website
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Globe className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="url"
                    name="website"
                    id="website"
                    value={orgSettings.website}
                    onChange={handleInputChange}
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    placeholder="https://example.org"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="joinDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Join Date
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    name="joinDate"
                    id="joinDate"
                    value={orgSettings.joinDate}
                    onChange={handleInputChange}
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="reach"
                  className="block text-sm font-medium text-gray-700"
                >
                  Organization Reach
                </label>
                <select
                  name="reach"
                  id="reach"
                  value={orgSettings.reach}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                >
                  <option value="Local">Local</option>
                  <option value="State">State</option>
                  <option value="National">National</option>
                  <option value="International">International</option>
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="movementFocus"
                className="block text-sm font-medium text-gray-700"
              >
                Movement Focus
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  name="movementFocus"
                  id="movementFocus"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="flex-1 min-w-0 block w-full rounded-none rounded-l-md border-gray-300 focus:border-primary focus:ring-primary sm:text-sm"
                  placeholder="Add a focus area and press Enter"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-500 sm:text-sm"
                >
                  Add
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {orgSettings.movementFocus.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full bg-blue-200 text-blue-500 hover:bg-blue-300"
                    >
                      <span className="sr-only">Remove {tag}</span>
                      <svg
                        className="h-2 w-2"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 8 8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeWidth="1.5"
                          d="M1 1l6 6m0-6L1 7"
                        />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Add tags that describe your organization's focus areas
              </p>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end">
            {saveSuccess && (
              <span className="mr-4 text-sm text-green-600">
                Settings updated successfully!
              </span>
            )}
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              disabled={isSaving}
            >
              <Save className="mr-2 -ml-1 h-4 w-4" />
              {isSaving ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
