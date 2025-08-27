import React, { useState } from "react";
import { X, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";
interface ApplicationFormProps {
  onClose: () => void;
}
export function ApplicationForm({ onClose }: ApplicationFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    googleGroup: "",
    memberStatus: "Member",
    userType: "Staff",
    title: "",
    requestedBadges: {
      voting: false,
      board: false,
      legal: false,
    },
    justification: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
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
    // Clear error for the field being changed
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      requestedBadges: {
        ...formData.requestedBadges,
        [name]: checked,
      },
    });
  };
  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};
    if (currentStep === 1) {
      if (!formData.firstName.trim())
        newErrors.firstName = "First name is required";
      if (!formData.lastName.trim())
        newErrors.lastName = "Last name is required";
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid";
      }
    } else if (currentStep === 2) {
      if (!formData.googleGroup.trim())
        newErrors.googleGroup = "Google Group is required";
      if (!formData.title.trim())
        newErrors.title = "Title/Position is required";
    } else if (currentStep === 3) {
      const hasBadges = Object.values(formData.requestedBadges).some((v) => v);
      if (hasBadges && !formData.justification.trim()) {
        newErrors.justification =
          "Justification is required when requesting badges";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };
  const handlePreviousStep = () => {
    setStep(step - 1);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(step)) {
      // Here you would normally submit the form data to your backend
      // For now, we'll just simulate a successful submission
      setStep(4); // Move to success step
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {step === 4 ? "Application Submitted" : "New User Application"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        {step < 4 && (
          <div className="px-6 pt-4">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step >= s
                          ? "bg-primary text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {s}
                    </div>
                    <span className="text-xs mt-1 text-gray-500">
                      {s === 1
                        ? "Basic Info"
                        : s === 2
                        ? "Organization"
                        : "Permissions"}
                    </span>
                  </div>
                ))}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{
                    width: `${((step - 1) / 3) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div className="p-6">
          {step === 1 && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Basic Information
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full rounded-md border ${
                        errors.firstName ? "border-red-500" : "border-gray-300"
                      } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary`}
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full rounded-md border ${
                        errors.lastName ? "border-red-500" : "border-gray-300"
                      } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary`}
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
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
              </div>
            </div>
          )}
          {step === 2 && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Organization Details
              </h3>
              <div className="space-y-4">
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
                    {/* Affiliate Organizations */}
                    <option value="Civic Tech Network">
                      Civic Tech Network
                    </option>
                    <option value="Digital Inclusion Alliance">
                      Digital Inclusion Alliance
                    </option>
                    <option value="Open Source Advocates">
                      Open Source Advocates
                    </option>
                  </select>
                  {errors.googleGroup && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.googleGroup}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    User Type *
                  </label>
                  <select
                    id="userType"
                    name="userType"
                    value={formData.userType}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Staff">Staff</option>
                    <option value="Contractor">Contractor</option>
                    <option value="Service Account">Service Account</option>
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
              </div>
            </div>
          )}
          {step === 3 && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Permissions & Badges
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Requested Badges (Optional)
                  </label>
                  <p className="text-sm text-gray-500 mb-3">
                    Select any badges that should be assigned to this user. Each
                    badge grants specific permissions within the system.
                  </p>
                  <div className="space-y-3">
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        name="voting"
                        checked={formData.requestedBadges.voting}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 mt-1 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                      <div className="ml-3">
                        <span className="text-sm font-medium text-gray-700">
                          Voting Delegate Badge
                        </span>
                        <p className="text-xs text-gray-500">
                          Allows the user to vote on organizational matters and
                          participate in elections
                        </p>
                      </div>
                    </label>
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        name="board"
                        checked={formData.requestedBadges.board}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 mt-1 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                      <div className="ml-3">
                        <span className="text-sm font-medium text-gray-700">
                          Board Member Badge
                        </span>
                        <p className="text-xs text-gray-500">
                          Identifies the user as a member of the organization's
                          board of directors
                        </p>
                      </div>
                    </label>
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        name="legal"
                        checked={formData.requestedBadges.legal}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 mt-1 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                      <div className="ml-3">
                        <span className="text-sm font-medium text-gray-700">
                          Legal Authorization Badge
                        </span>
                        <p className="text-xs text-gray-500">
                          Grants permission to sign MOUs and legal documents on
                          behalf of the organization
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
                {(formData.requestedBadges.voting ||
                  formData.requestedBadges.board ||
                  formData.requestedBadges.legal) && (
                  <div>
                    <label
                      htmlFor="justification"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Badge Justification *
                    </label>
                    <textarea
                      id="justification"
                      name="justification"
                      value={formData.justification}
                      onChange={handleChange}
                      rows={4}
                      className={`w-full rounded-md border ${
                        errors.justification
                          ? "border-red-500"
                          : "border-gray-300"
                      } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary`}
                      placeholder="Please explain why this user needs the selected badges"
                    />
                    {errors.justification && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.justification}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
          {step === 4 && (
            <div className="text-center py-6">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Application Submitted Successfully!
              </h3>
              <p className="text-gray-500 mb-6">
                Your application for {formData.firstName} {formData.lastName}{" "}
                has been submitted and is pending review by TMC staff. You will
                receive email notifications about the status of this
                application.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Next Steps:
                </h4>
                <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
                  <li>TMC staff will review your application</li>
                  <li>You may be contacted for additional information</li>
                  <li>Once approved, the user account will be created</li>
                  <li>Login credentials will be sent to {formData.email}</li>
                </ol>
              </div>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-primary text-black rounded-lg hover:bg-primary/90 transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </div>
        {step < 4 && (
          <div className="px-6 py-4 border-t bg-gray-50 flex justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePreviousStep}
                className="flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </button>
            ) : (
              <div></div>
            )}
            {step < 3 ? (
              <button
                type="button"
                onClick={handleSubmit}
                className="flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <ArrowRight className="h-4 w-4 mr-2" />
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 text-sm font-medium"
              >
                Submit Application
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
