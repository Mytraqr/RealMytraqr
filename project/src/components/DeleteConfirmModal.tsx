import React from 'react';

interface DeleteConfirmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmModal({ onConfirm, onCancel }: DeleteConfirmModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Delete Round</h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this round? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}