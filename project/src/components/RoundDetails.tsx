import React, { useState } from 'react';
import { Round } from '../types/round';
import HoleEntry from './HoleEntry';
import { calculateHoleScore, calculateFairwaysHit, calculateGIR } from '../utils/calculateStats';

interface RoundDetailsProps {
  round: Round;
  onUpdate: (round: Round) => void;
}

export default function RoundDetails({ round, onUpdate }: RoundDetailsProps) {
  const [editingHole, setEditingHole] = useState<number | null>(null);

  const handleHoleUpdate = (updatedHole: Round['holes'][0]) => {
    const updatedRound = {
      ...round,
      holes: round.holes.map(hole => 
        hole.number === updatedHole.number ? updatedHole : hole
      )
    };
    onUpdate(updatedRound);
  };

  if (editingHole !== null) {
    const currentHole = round.holes.find(h => h.number === editingHole)!;
    
    return (
      <HoleEntry
        round={round}
        currentHole={currentHole}
        onUpdateHole={handleHoleUpdate}
        onCancel={() => setEditingHole(null)}
      />
    );
  }

  const fairwaysStats = calculateFairwaysHit(round);
  const girStats = calculateGIR(round);
  const totalPutts = round.holes.reduce((sum, hole) => 
    sum + hole.shots.filter(shot => shot.type === 'putt').length, 0
  );

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">
            Round Details - {round.course}
          </h2>
          <span className="text-gray-400">
            {new Date(round.date).toLocaleDateString()}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-700 rounded-lg p-4">
            <p className="text-sm text-gray-400">Score</p>
            <p className="text-2xl font-bold text-white">
              {round.holes.reduce((sum, hole) => sum + calculateHoleScore(hole), 0)}
            </p>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <p className="text-sm text-gray-400">Fairways Hit</p>
            <p className="text-2xl font-bold text-white">
              {fairwaysStats.hit}/{fairwaysStats.total} ({Math.round((fairwaysStats.hit / fairwaysStats.total) * 100)}%)
            </p>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <p className="text-sm text-gray-400">GIR</p>
            <p className="text-2xl font-bold text-white">
              {girStats.hit}/{girStats.total} ({Math.round((girStats.hit / girStats.total) * 100)}%)
            </p>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <p className="text-sm text-gray-400">Putts</p>
            <p className="text-2xl font-bold text-white">{totalPutts}</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Hole</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Par</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Yardage</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Score</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Fairway</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">GIR</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Putts</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {round.holes.map(hole => {
              const score = calculateHoleScore(hole);
              const fairwayHit = hole.par > 3 && hole.shots.find(s => s.type === 'drive')?.result === 'fairway';
              const putts = hole.shots.filter(s => s.type === 'putt').length;
              const firstPuttIndex = hole.shots.findIndex(s => s.type === 'putt');
              const gir = firstPuttIndex !== -1 && firstPuttIndex <= hole.par - 2;

              return (
                <tr key={hole.number} className="hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{hole.number}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{hole.par}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{hole.yardage}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={
                      score > hole.par ? 'text-red-400' : 
                      score < hole.par ? 'text-green-400' : 
                      'text-white'
                    }>
                      {score} ({score - hole.par > 0 ? '+' : ''}{score - hole.par})
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {hole.par === 3 ? 'N/A' : fairwayHit ? '✓' : '✗'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {gir ? '✓' : '✗'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{putts}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    <button
                      onClick={() => setEditingHole(hole.number)}
                      className="text-orange-400 hover:text-orange-300"
                    >
                      Edit Hole
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}