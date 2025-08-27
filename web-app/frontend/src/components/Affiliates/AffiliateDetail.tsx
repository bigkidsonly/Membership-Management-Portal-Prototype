import React from "react";
import { Affiliate } from "../../types/affiliate";
import {
  X,
  Edit,
  Trash2,
  Mail,
  Phone,
  Globe,
  MapPin,
  Calendar,
  Tag,
} from "lucide-react";

interface AffiliateDetailProps {
  affiliate: Affiliate;
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
}

export function AffiliateDetail({
  affiliate,
  onEdit,
  onDelete,
  onClose,
}: AffiliateDetailProps) {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
      <div className="relative bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center z-10">
          <h2 className="text-xl font-semibold text-gray-900">
            Affiliate Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="flex-shrink-0">
              <img
                src={affiliate.avatar}
                alt={affiliate.name}
                className="h-32 w-32 rounded-lg object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900">
                {affiliate.name}
              </h3>
              <p className="text-gray-600">{affiliate.organization}</p>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-400 mr-2" />
                  <a
                    href={`mailto:${affiliate.email}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {affiliate.email}
                  </a>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-400 mr-2" />
                  <a
                    href={`tel:${affiliate.phone}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {affiliate.phone}
                  </a>
                </div>
                {affiliate.website && (
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 text-gray-400 mr-2" />
                    <a
                      href={affiliate.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {affiliate.website.replace(/^https?:\/\//i, "")}
                    </a>
                  </div>
                )}
                {affiliate.address && (
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-gray-700">{affiliate.address}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-700">
                    Joined {new Date(affiliate.joinDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center">
                  <Tag className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-700">
                    Contact: {affiliate.primaryContact}
                  </span>
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className="mr-2 text-gray-700">Status:</span>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    affiliate.status === "active"
                      ? "bg-green-100 text-green-800"
                      : affiliate.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {affiliate.status.charAt(0).toUpperCase() +
                    affiliate.status.slice(1)}
                </span>
              </div>
            </div>
          </div>
          {affiliate.tags && affiliate.tags.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {affiliate.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          {affiliate.notes && (
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Notes</h4>
              <p className="text-gray-700 bg-gray-50 p-3 rounded-md">
                {affiliate.notes}
              </p>
            </div>
          )}
          <div className="mt-8 flex justify-end space-x-3">
            <button
              onClick={onDelete}
              className="px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <Trash2 className="h-4 w-4 inline-block mr-1" />
              Delete
            </button>
            <button
              onClick={onEdit}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <Edit className="h-4 w-4 inline-block mr-1" />
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
