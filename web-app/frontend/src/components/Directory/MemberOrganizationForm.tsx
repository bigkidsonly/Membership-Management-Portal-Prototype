import React, { useState } from 'react';
import { MemberOrganization } from '../../types/memberOrganization';
import { X, Plus } from 'lucide-react';
interface MemberOrganizationFormProps {
  organization: MemberOrganization;
  onSubmit: (updatedOrg: MemberOrganization) => void;
  onCancel: () => void;
}
export function MemberOrganizationForm({
  organization,
  onSubmit,
  onCancel
}: MemberOrganizationFormProps) {
  const [formData, setFormData] = useState<MemberOrganization>({
    ...organization
  });
  const [focusInput, setFocusInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, nestedField?: string) => {
    const {
      name,
      value
    } = e.target;
    if (nestedField) {
      // Handle nested fields like primaryContact.name
      setFormData({
        ...formData,
        [nestedField]: {
          ...formData[nestedField as keyof MemberOrganization],
          [name]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    // Clear error when field is updated
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  const handleAddFocus = () => {
    if (focusInput.trim() && !formData.movementFocus.includes(focusInput.trim())) {
      setFormData({
        ...formData,
        movementFocus: [...formData.movementFocus, focusInput.trim()]
      });
      setFocusInput('');
    }
  };
  const handleRemoveFocus = (focusToRemove: string) => {
    setFormData({
      ...formData,
      movementFocus: formData.movementFocus.filter(focus => focus !== focusToRemove)
    });
  };
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Organization name is required';
    if (!formData.primaryContact.name.trim()) newErrors['primaryContact.name'] = 'Contact name is required';
    if (!formData.primaryContact.email.trim()) {
      newErrors['primaryContact.email'] = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.primaryContact.email)) {
      newErrors['primaryContact.email'] = 'Email is invalid';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };
  const reachOptions = ['Local', 'State', 'Regional', 'National', 'International'];
  const sizeOptions = ['1-10 employees', '10-50 employees', '50-100 employees', '100-500 employees', '500+ employees'];
  const tierOptions = ['TL-1', 'TL-2', 'TL-3', 'TL-4', 'TL-5', 'TL-6'];
  return <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
      <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center z-10">
          <h2 className="text-xl font-semibold text-gray-900">
            Edit Organization Profile
          </h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Organization Name*
              </label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={`block w-full rounded-md border ${errors.name ? 'border-red-300' : 'border-gray-300'} shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`} />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="tier" className="block text-sm font-medium text-gray-700 mb-1">
                Membership Tier
              </label>
              <select id="tier" name="tier" value={formData.tier} onChange={handleChange} className="block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                {tierOptions.map(option => <option key={option} value={option}>
                    {option}
                  </option>)}
              </select>
            </div>
            <div>
              <label htmlFor="reach" className="block text-sm font-medium text-gray-700 mb-1">
                Organization Reach
              </label>
              <select id="reach" name="reach" value={formData.reach || ''} onChange={handleChange} className="block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                <option value="">Select Reach</option>
                {reachOptions.map(option => <option key={option} value={option}>
                    {option}
                  </option>)}
              </select>
            </div>
            <div>
              <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
                Organization Size
              </label>
              <select id="size" name="size" value={formData.size} onChange={handleChange} className="block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                {sizeOptions.map(option => <option key={option} value={option}>
                    {option}
                  </option>)}
              </select>
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input type="text" id="location" name="location" value={formData.location || ''} onChange={handleChange} className="block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="City, State" />
            </div>
            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                Website
              </label>
              <input type="url" id="website" name="website" value={formData.website || ''} onChange={handleChange} className="block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="https://" />
            </div>
          </div>
          <div className="mt-6">
            <label htmlFor="movementFocus" className="block text-sm font-medium text-gray-700 mb-1">
              Movement Focus
            </label>
            <div className="flex items-center">
              <input type="text" id="movementFocus" value={focusInput} onChange={e => setFocusInput(e.target.value)} onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddFocus();
              }
            }} className="block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="Add a focus area and press Enter" />
              <button type="button" onClick={handleAddFocus} className="ml-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.movementFocus.map((focus, index) => <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {focus}
                  <button type="button" onClick={() => handleRemoveFocus(focus)} className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full bg-green-200 text-green-500 hover:bg-green-300">
                    <X className="h-3 w-3" />
                  </button>
                </span>)}
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-md font-medium text-gray-700 mb-2">
              Primary Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Name*
                </label>
                <input type="text" id="contactName" name="name" value={formData.primaryContact.name} onChange={e => handleChange(e, 'primaryContact')} className={`block w-full rounded-md border ${errors['primaryContact.name'] ? 'border-red-300' : 'border-gray-300'} shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`} />
                {errors['primaryContact.name'] && <p className="mt-1 text-sm text-red-600">
                    {errors['primaryContact.name']}
                  </p>}
              </div>
              <div>
                <label htmlFor="contactTitle" className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Title
                </label>
                <input type="text" id="contactTitle" name="title" value={formData.primaryContact.title} onChange={e => handleChange(e, 'primaryContact')} className="block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
              </div>
              <div>
                <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Email*
                </label>
                <input type="email" id="contactEmail" name="email" value={formData.primaryContact.email} onChange={e => handleChange(e, 'primaryContact')} className={`block w-full rounded-md border ${errors['primaryContact.email'] ? 'border-red-300' : 'border-gray-300'} shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`} />
                {errors['primaryContact.email'] && <p className="mt-1 text-sm text-red-600">
                    {errors['primaryContact.email']}
                  </p>}
              </div>
              <div>
                <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Phone
                </label>
                <input type="text" id="contactPhone" name="phone" value={formData.primaryContact.phone || ''} onChange={e => handleChange(e, 'primaryContact')} className="block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-end space-x-3">
            <button type="button" onClick={onCancel} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>;
}