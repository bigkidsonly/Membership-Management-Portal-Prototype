import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

interface MembershipApplicationProps {
  onSubmit: (applicationData: any) => void;
  onCancel: () => void;
}

export function MembershipApplication({
  onCancel,
}: MembershipApplicationProps) {
  const [formData, setFormData] = useState({
    organizationName: "",
    organizationType: "Affiliate",
    organizationSize: "",
    nationalMemberId: "",
    location: "",
    googleGroupName: "",
    havenProjectName: "",
    domain: "",
    website: "",
    slackChannel: "",
    logo: "",
    contactName: "",
    contactTitle: "",
    contactEmail: "",
    contactPhone: "",
    missionStatement: "",
    reasonForJoining: "",
    relevantExperience: "",
    agreesToTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showNotification, setShowNotification] = useState(false);

  const [userData, setUserData] = useState<any>(null);
  useEffect(() => {
    fetch("/api/users/me")
      .then((response) => response.json())
      .then((data) => {
        console.log("User Data:", data);
        setUserData(data.user);
      });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const finalValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setFormData({
      ...formData,
      [name]: finalValue,
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

    if (!formData.organizationName.trim())
      newErrors.organizationName = "Organization name is required";
    if (!formData.contactName.trim())
      newErrors.contactName = "Contact name is required";
    if (!formData.missionStatement.trim())
      newErrors.missionStatement = "Mission statement is required";
    if (!formData.reasonForJoining.trim())
      newErrors.reasonForJoining = "Reason for joining is required";
    if (!formData.agreesToTerms)
      newErrors.agreesToTerms = "You must agree to the terms and conditions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const applicationData = {
        ...formData,
        joinDate: new Date().toISOString(),
        status: "pending",
      };

      // Default to the current user's national member information
      applicationData.nationalMemberId = userData.national_member.id;
      applicationData.havenProjectName = userData.national_member.haven_project_name;

      fetch("/api/organization/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applicationData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Success:", data);
          setShowNotification(true);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }

    return (
      <>
        {showNotification && (
          <div className="fixed top-0 right-0 m-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            Application submitted successfully!
          </div>
        )}
      </>
    );
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
      <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center z-10">
          <h2 className="text-xl font-semibold text-gray-900">
            Membership Application
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <p className="text-gray-600 text-sm">
              Thank you for your interest in joining our network. Please
              complete this application to begin the membership process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="organizationName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Organization Name*
              </label>
              <input
                type="text"
                id="organizationName"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
                className={`block w-full rounded-md border ${
                  errors.organizationName ? "border-red-300" : "border-gray-300"
                } shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
              />
              {errors.organizationName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.organizationName}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="organizationType"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Organization Size
              </label>
              <select
                id="organizationSize"
                name="organizationSize"
                value={formData.organizationSize}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              >
                <option value="small">Small (1-15 employees)</option>
                <option value="medium">Medium (16-30 employees)</option>
                <option value="large">Large (30+ employees)</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="contactName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Primary Contact Name*
              </label>
              <input
                type="text"
                id="contactName"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                className={`block w-full rounded-md border ${
                  errors.contactName ? "border-red-300" : "border-gray-300"
                } shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
              />
              {errors.contactName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.contactName}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contactTitle"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Contact Title/Position
              </label>
              <input
                type="text"
                id="contactTitle"
                name="contactTitle"
                value={formData.contactTitle}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="e.g., Executive Director, Program Manager"
              />
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
                value={formData.contactEmail}
                onChange={handleChange}
                className={`block w-full rounded-md border ${
                  errors.contactEmail ? "border-red-300" : "border-gray-300"
                } shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
              />
              {errors.contactEmail && (
                <p className="mt-1 text-sm text-red-600">{errors.contactEmail}</p>
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
                value={formData.contactPhone}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>
          </div>
 

          <div className="mt-6">
            <label
              htmlFor="website"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Website URL
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

          <div className="mt-6">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="City, State"
            />
          </div>

          <div className="mt-6">
            <label
              htmlFor="missionStatement"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Mission Statement*
            </label>
            <textarea
              id="missionStatement"
              name="missionStatement"
              rows={4}
              value={formData.missionStatement}
              onChange={handleChange}
              className={`block w-full rounded-md border ${
                errors.missionStatement ? "border-red-300" : "border-gray-300"
              } shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
              placeholder="Please describe your organization's mission and primary goals..."
            />
            {errors.missionStatement && (
              <p className="mt-1 text-sm text-red-600">
                {errors.missionStatement}
              </p>
            )}
          </div>

          <div className="mt-6">
            <label
              htmlFor="reasonForJoining"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Why do you want to join our network?*
            </label>
            <textarea
              id="reasonForJoining"
              name="reasonForJoining"
              rows={4}
              value={formData.reasonForJoining}
              onChange={handleChange}
              className={`block w-full rounded-md border ${
                errors.reasonForJoining ? "border-red-300" : "border-gray-300"
              } shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
              placeholder="Please explain how joining our network aligns with your organization's goals and what you hope to achieve..."
            />
            {errors.reasonForJoining && (
              <p className="mt-1 text-sm text-red-600">
                {errors.reasonForJoining}
              </p>
            )}
          </div>

          <div className="mt-6">
            <label
              htmlFor="relevantExperience"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Relevant Experience & Projects
            </label>
            <textarea
              id="relevantExperience"
              name="relevantExperience"
              rows={4}
              value={formData.relevantExperience}
              onChange={handleChange}
              className="block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Please describe any relevant projects, partnerships, or experience that would be valuable to our network..."
            />
          </div>

          <div className="mt-6">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="agreesToTerms"
                  name="agreesToTerms"
                  type="checkbox"
                  checked={formData.agreesToTerms}
                  onChange={handleChange}
                  className="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="agreesToTerms"
                  className="font-medium text-gray-700"
                >
                  I agree to the terms and conditions*
                </label>
                <p className="text-gray-500">
                  By submitting this application, I confirm that the information
                  provided is accurate and agree to abide by the network's terms
                  and conditions.
                </p>
              </div>
            </div>
            {errors.agreesToTerms && (
              <p className="mt-1 text-sm text-red-600">
                {errors.agreesToTerms}
              </p>
            )}
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
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
