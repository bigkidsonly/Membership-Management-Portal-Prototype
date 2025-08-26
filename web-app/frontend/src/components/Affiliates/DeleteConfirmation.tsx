import React from 'react'
import { AlertTriangle } from 'lucide-react'
interface DeleteConfirmationProps {
  affiliateName: string
  onConfirm: () => void
  onCancel: () => void
}
export function DeleteConfirmation({
  affiliateName,
  onConfirm,
  onCancel,
}: DeleteConfirmationProps) {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-red-100 rounded-full p-3">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <h3 className="text-lg font-medium text-gray-900 text-center mb-2">
            Delete Affiliate
          </h3>
          <p className="text-sm text-gray-500 text-center mb-6">
            Are you sure you want to delete{' '}
            <span className="font-semibold">{affiliateName}</span>? This action
            cannot be undone.
          </p>
          <div className="flex justify-center space-x-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
