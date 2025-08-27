import React, { useEffect, useState } from "react";
import { Affiliate } from "../../types/affiliate";
import { X } from "lucide-react";

interface AffiliateFormProps {
  affiliate: Affiliate | null;
  onSubmit: (affiliate: any) => void;
  onCancel: () => void;
}

export function AffiliateForm({
  affiliate,
  onSubmit,
  onCancel,
}: AffiliateFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    organization: "Your Organization Name", // This should be populated from logged-in user context
    email: "",
    phone: "",
    status: "active",
    joinDate: new Date().toISOString().split("T")[0],
    notes: "",
    website: "",
    primaryContact: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Populate form with affiliate data if editing
  useEffect(() => {
    if (affiliate) {
      setFormData({
        name: affiliate.name,
        organization: affiliate.organization,
        email: affiliate.email,
        phone: affiliate.phone,
        status: affiliate.status,
        joinDate: affiliate.joinDate.split("T")[0],
        notes: affiliate.notes,
        website: affiliate.website || "",
        primaryContact: affiliate.primaryContact,
      });
    }
  }, [affiliate]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when field is updated
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.organization.trim())
      newErrors.organization = "Organization is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.primaryContact.trim())
      newErrors.primaryContact = "Primary contact is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Add default values for removed fields
      const submissionData = {
        ...formData,
        tags: [],
        avatar: "https://randomuser.me/api/portraits/lego/1.jpg",
        address: "",
      };
      onSubmit(submissionData);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
      <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center z-10">
          <h2 className="text-xl font-semibold text-gray-900">
            {affiliate ? "Edit Affiliate" : "Add New Affiliate"}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Affiliate Name*
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`block w-full rounded-md border ${
                  errors.name ? "border-red-300" : "border-gray-300"
                } shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="organization"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Organization Name*
              </label>
              <input
                type="text"
                id="organization"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                className={`block w-full rounded-md border ${
                  errors.organization ? "border-red-300" : "border-gray-300"
                } shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
                placeholder="This should be your organization's name"
              />
              {errors.organization && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.organization}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="primaryContact"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Primary Contact Name*
              </label>
              <input
                type="text"
                id="primaryContact"
                name="primaryContact"
                value={formData.primaryContact}
                onChange={handleChange}
                className={`block w-full rounded-md border ${
                  errors.primaryContact ? "border-red-300" : "border-gray-300"
                } shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
              />
              {errors.primaryContact && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.primaryContact}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address*
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`block w-full rounded-md border ${
                  errors.email ? "border-red-300" : "border-gray-300"
                } shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="website"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Website
              </label>
              <input
                type="url"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="https://"
              />
            </div>

            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              >
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="joinDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Join Date
              </label>
              <input
                type="date"
                id="joinDate"
                name="joinDate"
                value={formData.joinDate}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>
          </div>

          <div className="mt-6">
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              value={formData.notes}
              onChange={handleChange}
              className="block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              {affiliate ? "Update Affiliate" : "Add Affiliate"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
