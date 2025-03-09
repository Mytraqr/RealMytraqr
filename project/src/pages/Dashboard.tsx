import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LineChart from '../components/LineChart';
import RecentRoundCard from '../components/RecentRoundCard';
import EmptyState from '../components/EmptyState';
import { Round } from '../types/round';
import { calculateHoleScore } from '../utils/calculateStats';
import { getRandomTip } from '../utils/golfTips';

export default function Dashboard() {
  const navigate = useNavigate();
  const [rounds, setRounds] = useState<Round[]>([]);
  const [currentTip, setCurrentTip] = useState('');

  useEffect(() => {
    const savedRounds = localStorage.getItem('rounds');
    if (savedRounds) {
      setRounds(JSON.parse(savedRounds));
    }
    // Set a random tip when component mounts
    setCurrentTip(getRandomTip());
  }, []);

  if (rounds.length === 0) {
    return (
      <EmptyState
        type="golf-dashboard"
        onAction={() => navigate('/information')}
        message="Start Your Golf Journey!"
        tip="Begin by learning how to track your rounds effectively in our Information section. Then add your course details and start logging your rounds."
      />
    );
  }

  const getRecentRounds = (rounds: Round[]) => {
    return rounds.slice(-3).map(round => {
      const totalScore = round.holes.reduce((sum, hole) => sum + calculateHoleScore(hole), 0);
      const totalPar = round.holes.reduce((sum, hole) => sum + hole.par, 0);
      
      return {
        ...round,
        score: totalScore,
        par: totalPar
      };
    });
  };

  const recentRounds = getRecentRounds(rounds);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back!</h1>
        <p className="text-gray-600 dark:text-gray-400">Track your progress and improve your game.</p>
      </div>

      {/* Practice Tip Card */}
      <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6">
        <h3 className="text-lg font-medium text-orange-800 dark:text-orange-200 mb-2">Practice Tip</h3>
        <p className="text-orange-700 dark:text-orange-300">{currentTip}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LineChart 
            title="Score Trends" 
            data={{
              labels: rounds.slice(-5).map(round => new Date(round.date).toLocaleDateString()),
              values: rounds.slice(-5).map(round => 
                round.holes.reduce((sum, hole) => sum + calculateHoleScore(hole), 0)
              )
            }} 
          />
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Rounds</h3>
          {recentRounds.map((round) => (
            <RecentRoundCard
              key={round.id}
              date={new Date(round.date).toLocaleDateString()}
              course={round.course}
              score={round.score}
              par={round.par}
            />
          ))}
        </div>
      </div>
    </div>
  );
}