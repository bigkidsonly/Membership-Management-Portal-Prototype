import React, { useEffect, useState } from "react";
import { X, CheckCircle, Save } from "lucide-react";
interface User {
  id: string;
  name: string;
  email: string;
  googleGroup: string;
  memberStatus: string[];
  userType: string;
  title: string;
  status: string;
  badges: string[];
  assignedTo: string | null;
}
interface EditUserFormProps {
  user: User;
  onClose: () => void;
  onSave: (updatedUser: User) => void;
}
export function EditUserForm({ user, onClose, onSave }: EditUserFormProps) {
  const [formData, setFormData] = useState<User>({
    ...user,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  // Reset form data when user changes
  useEffect(() => {
    setFormData({
      ...user,
    });
  }, [user]);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error for the field being changed
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };
  const handleCheckboxChange = (badge: string, checked: boolean) => {
    let updatedBadges = [...formData.badges];
    if (checked && !updatedBadges.includes(badge)) {
      updatedBadges.push(badge);
    } else if (!checked && updatedBadges.includes(badge)) {
      updatedBadges = updatedBadges.filter((b) => b !== badge);
    }
    setFormData({
      ...formData,
      badges: updatedBadges,
    });
  };
  const handlePlatformChange = (platform: string, checked: boolean) => {
    let updatedPlatforms = [...formData.memberStatus];
    if (checked && !updatedPlatforms.includes(platform)) {
      updatedPlatforms.push(platform);
    } else if (!checked && updatedPlatforms.includes(platform)) {
      updatedPlatforms = updatedPlatforms.filter((p) => p !== platform);
    }
    setFormData({
      ...formData,
      memberStatus: updatedPlatforms,
    });
  };
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.googleGroup.trim())
      newErrors.googleGroup = "Organization is required";
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (formData.memberStatus.length === 0)
      newErrors.memberStatus = "At least one platform must be selected";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
      setSuccess(true);
      // Auto close after showing success message
      setTimeout(() => {
        onClose();
      }, 1500);
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {success ? "User Updated" : "Edit User"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        {success ? (
          <div className="text-center py-6">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              User Updated Successfully!
            </h3>
            <p className="text-gray-500 mb-6">
              The user information has been updated in the system.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full rounded-md border ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full rounded-md border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="googleGroup"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Organization *
                  </label>
                  <select
                    id="googleGroup"
                    name="googleGroup"
                    value={formData.googleGroup}
                    onChange={handleChange}
                    className={`w-full rounded-md border ${
                      errors.googleGroup ? "border-red-500" : "border-gray-300"
                    } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary`}
                  >
                    <option value="">Select an Organization</option>
                    <option value="Tech Justice Coalition">
                      Tech Justice Coalition
                    </option>
                    <option value="Data Equity Project">
                      Data Equity Project
                    </option>
                    <option value="Community Tech Alliance">
                      Community Tech Alliance
                    </option>
                    <option value="Digital Rights Coalition">
                      Digital Rights Coalition
                    </option>
                    <option value="Tech Access Initiative">
                      Tech Access Initiative
                    </option>
                  </select>
                  {errors.googleGroup && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.googleGroup}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Platforms *
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.memberStatus.includes("Haven")}
                        onChange={(e) =>
                          handlePlatformChange("Haven", e.target.checked)
                        }
                        className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                      <span className="ml-2 text-sm text-gray-700">Haven</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.memberStatus.includes("Hex")}
                        onChange={(e) =>
                          handlePlatformChange("Hex", e.target.checked)
                        }
                        className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                      <span className="ml-2 text-sm text-gray-700">Hex</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.memberStatus.includes("TMC Portal")}
                        onChange={(e) =>
                          handlePlatformChange("TMC Portal", e.target.checked)
                        }
                        className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        TMC Portal
                      </span>
                    </label>
                  </div>
                  {errors.memberStatus && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.memberStatus}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="userType"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    User Type
                  </label>
                  <select
                    id="userType"
                    name="userType"
                    value={formData.userType}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Administrator">Administrator</option>
                    <option value="MOU Signer">MOU Signer</option>
                    <option value="Viewer">Viewer</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Title/Position *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`w-full rounded-md border ${
                      errors.title ? "border-red-500" : "border-gray-300"
                    } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary`}
                    placeholder="e.g. Executive Director, Data Analyst, etc."
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Badges
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        checked={formData.badges.includes("voting")}
                        onChange={(e) =>
                          handleCheckboxChange("voting", e.target.checked)
                        }
                        className="h-4 w-4 mt-1 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                      <div className="ml-3">
                        <span className="text-sm font-medium text-gray-700">
                          Voting Delegate Badge
                        </span>
                        <p className="text-xs text-gray-500">
                          Allows the user to vote on organizational matters
                        </p>
                      </div>
                    </label>
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        checked={formData.badges.includes("board")}
                        onChange={(e) =>
                          handleCheckboxChange("board", e.target.checked)
                        }
                        className="h-4 w-4 mt-1 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                      <div className="ml-3">
                        <span className="text-sm font-medium text-gray-700">
                          Board Member Badge
                        </span>
                        <p className="text-xs text-gray-500">
                          Identifies the user as a member of the board of
                          directors
                        </p>
                      </div>
                    </label>
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        checked={formData.badges.includes("legal")}
                        onChange={(e) =>
                          handleCheckboxChange("legal", e.target.checked)
                        }
                        className="h-4 w-4 mt-1 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                      <div className="ml-3">
                        <span className="text-sm font-medium text-gray-700">
                          Legal Authorization Badge
                        </span>
                        <p className="text-xs text-gray-500">
                          Grants permission to sign legal documents
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t bg-gray-50 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="mr-3 px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 text-sm font-medium"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
