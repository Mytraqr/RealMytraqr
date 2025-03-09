import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Round } from '../types/round';
import { calculateHoleScore } from '../utils/calculateStats';

interface EditRoundModalProps {
  round: Round;
  onSave: (round: Round) => void;
  onCancel: () => void;
}

export default function EditRoundModal({ round, onSave, onCancel }: EditRoundModalProps) {
  const [editedRound, setEditedRound] = useState<Round>({ ...round });
  const par4and5Count = editedRound.holes.filter(hole => hole.par === 4 || hole.par === 5).length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedRound);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-lg w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Edit Round</h2>
          <button onClick={onCancel} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Course Name
            </label>
            <input
              type="text"
              value={editedRound.course}
              onChange={(e) => setEditedRound({ ...editedRound, course: e.target.value })}
              className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-orange-500 focus:ring-orange-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Date
            </label>
            <input
              type="date"
              value={editedRound.date}
              onChange={(e) => setEditedRound({ ...editedRound, date: e.target.value })}
              className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-orange-500 focus:ring-orange-500"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Fairways Hit
              </label>
              <input
                type="number"
                value={editedRound.fairwaysHit}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value >= 0 && value <= par4and5Count) {
                    setEditedRound({ ...editedRound, fairwaysHit: value });
                  }
                }}
                min="0"
                max={par4and5Count}
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-orange-500 focus:ring-orange-500"
                required
              />
              <p className="mt-1 text-sm text-gray-500">Max: {par4and5Count}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                GIR
              </label>
              <input
                type="number"
                value={editedRound.gir}
                onChange={(e) => setEditedRound({ ...editedRound, gir: Number(e.target.value) })}
                min="0"
                max="18"
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-orange-500 focus:ring-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Putts
              </label>
              <input
                type="number"
                value={editedRound.putts}
                onChange={(e) => setEditedRound({ ...editedRound, putts: Number(e.target.value) })}
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-orange-500 focus:ring-orange-500"
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}