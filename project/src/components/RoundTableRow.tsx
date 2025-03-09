import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { Round } from '../types/round';
import { calculateHoleScore } from '../utils/calculateStats';

interface RoundTableRowProps {
  round: Round;
  onSelect: (round: Round) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function RoundTableRow({ round, onSelect, onEdit, onDelete }: RoundTableRowProps) {
  const totalScore = round.holes.reduce((sum, hole) => sum + calculateHoleScore(hole), 0);
  const totalPar = round.holes.reduce((sum, hole) => sum + hole.par, 0);
  const scoreToPar = totalScore - totalPar;

  return (
    <tr
      onClick={() => onSelect(round)}
      className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
    >
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
        {new Date(round.date).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
        {round.course}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <span className={scoreToPar > 0 ? 'text-red-600' : scoreToPar < 0 ? 'text-green-600' : 'text-gray-600'}>
          {totalScore} ({scoreToPar > 0 ? '+' : ''}{scoreToPar})
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
        <div className="flex justify-end space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(round.id);
            }}
            className="p-2 text-gray-600 hover:text-orange-600 transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(round.id);
            }}
            className="p-2 text-gray-600 hover:text-red-600 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}