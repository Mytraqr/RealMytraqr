import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Search, Plus } from 'lucide-react';
import { Round } from '../types/round';
import RoundTableHeader from '../components/RoundTableHeader';
import RoundTableRow from '../components/RoundTableRow';
import RoundDetails from '../components/RoundDetails';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import EditRoundModal from '../components/EditRoundModal';
import EmptyState from '../components/EmptyState';
import { calculateHoleScore } from '../utils/calculateStats';

export default function Rounds() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRound, setSelectedRound] = useState<Round | null>(null);
  const [rounds, setRounds] = useState<Round[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [editingRound, setEditingRound] = useState<Round | null>(null);

  useEffect(() => {
    const savedRounds = localStorage.getItem('rounds');
    if (savedRounds) {
      try {
        const parsedRounds = JSON.parse(savedRounds);
        setRounds(Array.isArray(parsedRounds) ? parsedRounds : []);
      } catch (error) {
        console.error('Error parsing rounds:', error);
        setRounds([]);
      }
    }
  }, []);

  if (rounds.length === 0) {
    return (
      <EmptyState
        type="golf-rounds"
        onAction={() => navigate('/enter-round')}
        message="Record Your Golf Journey"
        tip="Start tracking your rounds to understand your game better and make data-driven improvements."
      />
    );
  }

  const filteredRounds = rounds.filter(round => {
    if (!searchTerm) return true;
    return round.course?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleDelete = (roundId: string) => {
    const updatedRounds = rounds.filter(round => round.id !== roundId);
    setRounds(updatedRounds);
    localStorage.setItem('rounds', JSON.stringify(updatedRounds));
    setShowDeleteConfirm(null);
    setSelectedRound(null);
  };

  const handleEdit = (round: Round) => {
    setEditingRound(round);
  };

  const handleSaveEdit = (updatedRound: Round) => {
    const updatedRounds = rounds.map(round => 
      round.id === updatedRound.id ? updatedRound : round
    );
    setRounds(updatedRounds);
    localStorage.setItem('rounds', JSON.stringify(updatedRounds));
    setEditingRound(null);
    setSelectedRound(updatedRound);
  };

  const handleUpdateRound = (updatedRound: Round) => {
    const updatedRounds = rounds.map(round => 
      round.id === updatedRound.id ? updatedRound : round
    );
    setRounds(updatedRounds);
    localStorage.setItem('rounds', JSON.stringify(updatedRounds));
    setSelectedRound(updatedRound);
  };

  const exportRounds = () => {
    const roundData = rounds.map(round => {
      const totalScore = round.holes.reduce((sum, hole) => sum + calculateHoleScore(hole), 0);
      const totalPar = round.holes.reduce((sum, hole) => sum + hole.par, 0);
      const fairwaysHit = round.holes.filter(hole => {
        if (hole.par === 3) return false;
        const driveShot = hole.shots.find(s => s.type === 'drive')?.result === 'fairway';
        return driveShot;
      }).length;
      const totalPutts = round.holes.reduce((sum, hole) => 
        sum + hole.shots.filter(shot => shot.type === 'putt').length, 0
      );

      return {
        date: new Date(round.date).toLocaleDateString(),
        course: round.course,
        score: totalScore,
        toPar: totalScore - totalPar,
        fairwaysHit,
        putts: totalPutts
      };
    });

    const csv = [
      ['Date', 'Course', 'Score', 'To Par', 'Fairways Hit', 'Putts'],
      ...roundData.map(round => [
        round.date,
        round.course,
        round.score,
        round.toPar > 0 ? `+${round.toPar}` : round.toPar,
        round.fairwaysHit,
        round.putts
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'golf-rounds.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Rounds History</h1>
          <p className="text-gray-600 dark:text-gray-400">View and analyze your previous rounds</p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => navigate('/enter-round')}
            className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Round
          </button>
          <button
            onClick={exportRounds}
            className="flex items-center px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Rounds
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-orange-500 focus:ring-orange-500"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <RoundTableHeader />
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredRounds.map((round) => (
              <RoundTableRow
                key={round.id}
                round={round}
                onSelect={setSelectedRound}
                onEdit={() => handleEdit(round)}
                onDelete={(id) => setShowDeleteConfirm(id)}
              />
            ))}
          </tbody>
        </table>
      </div>

      {selectedRound && (
        <RoundDetails 
          round={selectedRound} 
          onUpdate={handleUpdateRound}
        />
      )}

      {showDeleteConfirm && (
        <DeleteConfirmModal
          onConfirm={() => handleDelete(showDeleteConfirm)}
          onCancel={() => setShowDeleteConfirm(null)}
        />
      )}

      {editingRound && (
        <EditRoundModal
          round={editingRound}
          onSave={handleSaveEdit}
          onCancel={() => setEditingRound(null)}
        />
      )}
    </div>
  );
}