import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ShotBlock from './ShotBlock';
import PenaltyWorkflow from './PenaltyWorkflow';
import { Round } from '../types/round';

interface HoleEntryProps {
  round: Round;
  currentHole?: Round['holes'][0];
  onUpdateHole: (hole: Round['holes'][0]) => void;
  onCancel?: () => void;
  onFinishRound?: () => void;
}

export default function HoleEntry({ 
  round, 
  currentHole, 
  onUpdateHole, 
  onCancel, 
  onFinishRound 
}: HoleEntryProps) {
  const [currentHoleNumber, setCurrentHoleNumber] = useState(currentHole?.number || 1);
  const [showPenaltyWorkflow, setShowPenaltyWorkflow] = useState(false);
  const holeData = round.holes.find(h => h.number === currentHoleNumber)!;

  useEffect(() => {
    if (holeData.par === 3 && holeData.shots.length === 0) {
      const approachShot = {
        id: Date.now().toString(),
        type: 'approach' as const,
        distance: holeData.yardage
      };
      onUpdateHole({
        ...holeData,
        shots: [approachShot]
      });
    }
  }, [currentHoleNumber, holeData.par]);

  const addShot = (type: 'drive' | 'approach' | 'greenside' | 'putt' | 'penalty') => {
    if (type === 'drive' && holeData.par === 3) return;

    const newShot = {
      id: Date.now().toString(),
      type,
      club: type === 'drive' ? 'driver' : undefined
    };

    const updatedHole = {
      ...holeData,
      shots: [...holeData.shots, newShot]
    };

    onUpdateHole(updatedHole);
  };

  const updateShot = (shotId: string, updates: Partial<Round['holes'][0]['shots'][0]>) => {
    const updatedHole = {
      ...holeData,
      shots: holeData.shots.map(shot => 
        shot.id === shotId ? { ...shot, ...updates } : shot
      )
    };

    onUpdateHole(updatedHole);
  };

  const removeShot = (shotId: string) => {
    const updatedHole = {
      ...holeData,
      shots: holeData.shots.filter(shot => shot.id !== shotId)
    };

    onUpdateHole(updatedHole);
  };

  const handlePenalty = () => {
    setShowPenaltyWorkflow(true);
  };

  const handleRehit = (shotId: string) => {
    const originalShot = holeData.shots.find(s => s.id === shotId);
    if (!originalShot) return;

    const newShot = {
      ...originalShot,
      id: Date.now().toString(),
      result: undefined,
      distance: undefined,
      direction: undefined
    };

    const updatedHole = {
      ...holeData,
      shots: [...holeData.shots, newShot]
    };

    onUpdateHole(updatedHole);
    setShowPenaltyWorkflow(false);
  };

  const handleContinue = () => {
    setShowPenaltyWorkflow(false);
  };

  const getPreviousShots = () => {
    return holeData.shots
      .filter(shot => shot.type !== 'penalty')
      .map((shot, index) => ({
        id: shot.id,
        type: shot.type,
        number: index + 1
      }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-gray-800 p-4 rounded-lg">
        <button
          onClick={() => currentHole ? onCancel?.() : setCurrentHoleNumber(prev => Math.max(1, prev - 1))}
          disabled={currentHoleNumber === 1}
          className="p-2 rounded-lg hover:bg-gray-700 disabled:opacity-50 text-white"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">Hole {currentHoleNumber}</h2>
          <p className="text-gray-400">Par {holeData.par} - {holeData.yardage} yards</p>
        </div>

        <button
          onClick={() => currentHole ? onCancel?.() : setCurrentHoleNumber(prev => Math.min(18, prev + 1))}
          disabled={currentHoleNumber === 18}
          className="p-2 rounded-lg hover:bg-gray-700 disabled:opacity-50 text-white"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {showPenaltyWorkflow && (
        <PenaltyWorkflow
          previousShots={getPreviousShots()}
          onRehit={handleRehit}
          onContinue={handleContinue}
        />
      )}

      <div className="grid grid-cols-5 gap-4">
        {['drive', 'approach', 'greenside', 'putt', 'penalty'].map((type) => {
          if (type === 'drive' && holeData.par === 3) return null;

          return (
            <button
              key={type}
              onClick={() => type === 'penalty' ? handlePenalty() : addShot(type as any)}
              className="flex flex-col items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 text-white"
            >
              <span className="text-sm font-medium">
                Add {type === 'drive' ? 'Tee Shot' : type.charAt(0).toUpperCase() + type.slice(1)}
              </span>
            </button>
          );
        })}
      </div>

      <div className="space-y-4">
        {holeData.shots.map((shot) => (
          <ShotBlock
            key={shot.id}
            shot={shot}
            onUpdate={(updates) => updateShot(shot.id, updates)}
            onRemove={() => removeShot(shot.id)}
            onAddPenalty={handlePenalty}
            holePar={holeData.par}
            holeYardage={holeData.yardage}
          />
        ))}
      </div>

      {currentHoleNumber === 18 && !currentHole && onFinishRound && (
        <div className="flex justify-end">
          <button
            onClick={onFinishRound}
            className="px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors"
          >
            Finish Round
          </button>
        </div>
      )}
    </div>
  );
}