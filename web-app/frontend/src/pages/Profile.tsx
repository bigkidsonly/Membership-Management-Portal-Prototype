import React, { useState } from "react";
import { Save } from "lucide-react";
export function Profile() {
  const [profileData, setProfileData] = useState({
    name: "Sarah Johnson",
    title: "Program Director",
    organization: "Tech Justice Coalition",
    linkedin: "https://linkedin.com/in/sarahjohnson",
    expertise: ["Data Analysis", "Community Organizing", "Grant Writing"],
  });
  const [newExpertise, setNewExpertise] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };
  const handleAddExpertise = () => {
    if (
      newExpertise.trim() &&
      !profileData.expertise.includes(newExpertise.trim())
    ) {
      setProfileData({
        ...profileData,
        expertise: [...profileData.expertise, newExpertise.trim()],
      });
      setNewExpertise("");
    }
  };
  const handleRemoveExpertise = (skill: string) => {
    setProfileData({
      ...profileData,
      expertise: profileData.expertise.filter((item) => item !== skill),
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
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900">Your Profile</h1>
          <p className="mt-1 text-sm text-gray-500">
            Update your personal information and areas of expertise
          </p>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="h-24 w-24 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold">
                {profileData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="ml-6">
                <h2 className="text-lg font-medium text-gray-900">
                  {profileData.name}
                </h2>
                <p className="text-sm text-gray-500">{profileData.title}</p>
                <button
                  type="button"
                  className="mt-2 text-sm text-primary hover:text-primary/90 font-medium"
                >
                  Change profile picture
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={profileData.title}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="organization"
                  className="block text-sm font-medium text-gray-700"
                >
                  Organization
                </label>
                <input
                  type="text"
                  name="organization"
                  id="organization"
                  value={profileData.organization}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="linkedin"
                  className="block text-sm font-medium text-gray-700"
                >
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  name="linkedin"
                  id="linkedin"
                  value={profileData.linkedin}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="expertise"
                className="block text-sm font-medium text-gray-700"
              >
                Areas of Expertise / Skills
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  name="expertise"
                  id="expertise"
                  value={newExpertise}
                  onChange={(e) => setNewExpertise(e.target.value)}
                  className="flex-1 min-w-0 block w-full rounded-none rounded-l-md border-gray-300 focus:border-primary focus:ring-primary sm:text-sm"
                  placeholder="Add a skill and press Enter"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddExpertise();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddExpertise}
                  className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-500 sm:text-sm"
                >
                  Add
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {profileData.expertise.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveExpertise(skill)}
                      className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full bg-blue-200 text-blue-500 hover:bg-blue-300"
                    >
                      <span className="sr-only">Remove {skill}</span>
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
                Add skills that best describe your areas of expertise
              </p>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end">
            {saveSuccess && (
              <span className="mr-4 text-sm text-green-600">
                Profile updated successfully!
              </span>
            )}
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              disabled={isSaving}
            >
              <Save className="mr-2 -ml-1 h-4 w-4" />
              {isSaving ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
