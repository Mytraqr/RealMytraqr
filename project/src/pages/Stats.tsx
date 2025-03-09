import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { calculateDrivingDistance, calculateScoringAverages, calculateFairwaysHit, calculateGIR, calculatePutts, calculateUpAndDowns, calculateSandSaves } from '../utils/stats';
import LineChart from '../components/LineChart';
import StrokesGained from '../components/StrokesGained';
import CompareStats from '../components/CompareStats';
import EmptyState from '../components/EmptyState';
import { getTipsByCategory } from '../utils/golfTips';
import { Round } from '../types/round';
import StatsHeader from '../components/stats/StatsHeader';
import StatsSummary from '../components/stats/StatsSummary';
import PracticeTips from '../components/stats/PracticeTips';

export default function Stats() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'strokes-gained' | 'compare'>('overview');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [rounds, setRounds] = useState<Round[]>([]);
  const [drivingTips, setDrivingTips] = useState<string[]>([]);
  const [puttingTips, setPuttingTips] = useState<string[]>([]);
  const [approachTips, setApproachTips] = useState<string[]>([]);

  useEffect(() => {
    setDrivingTips(getTipsByCategory('driving'));
    setPuttingTips(getTipsByCategory('putting'));
    setApproachTips(getTipsByCategory('approach'));
    
    const savedRounds = localStorage.getItem('rounds');
    if (savedRounds) {
      const parsedRounds = JSON.parse(savedRounds);
      setRounds(parsedRounds);
      if (parsedRounds.length > 0) {
        const earliestDate = parsedRounds.reduce((earliest: string, round: Round) => 
          round.date < earliest ? round.date : earliest
        , parsedRounds[0].date);
        setStartDate(earliestDate);
      }
    }
  }, []);

  if (rounds.length === 0) {
    return (
      <EmptyState
        type="golf-stats"
        onAction={() => navigate('/rounds')}
        message="Track Your Golf Progress"
        tip="Record your rounds consistently to build meaningful statistics and track your progress over time."
      />
    );
  }

  const filteredRounds = rounds.filter(round => {
    const roundDate = new Date(round.date);
    return (!startDate || roundDate >= new Date(startDate)) &&
           (!endDate || roundDate <= new Date(endDate));
  });

  const drivingStats = calculateDrivingDistance(filteredRounds);
  const scoringAverages = calculateScoringAverages(filteredRounds);

  const totalFairways = filteredRounds.reduce((acc, round) => {
    const stats = calculateFairwaysHit(round);
    return {
      hit: acc.hit + stats.hit,
      total: acc.total + stats.total
    };
  }, { hit: 0, total: 0 });

  const totalGIR = filteredRounds.reduce((acc, round) => {
    const stats = calculateGIR(round);
    return {
      hit: acc.hit + stats.hit,
      total: acc.total + stats.total
    };
  }, { hit: 0, total: 0 });

  const totalUpAndDowns = filteredRounds.reduce((acc, round) => {
    const stats = calculateUpAndDowns(round);
    return {
      made: acc.made + stats.made,
      total: acc.total + stats.total
    };
  }, { made: 0, total: 0 });

  const totalSandSaves = filteredRounds.reduce((acc, round) => {
    const stats = calculateSandSaves(round);
    return {
      made: acc.made + stats.made,
      total: acc.total + stats.total
    };
  }, { made: 0, total: 0 });

  const averagePutts = filteredRounds.length > 0
    ? Math.round(filteredRounds.reduce((acc, round) => acc + calculatePutts(round), 0) / filteredRounds.length)
    : 0;

  return (
    <div className="space-y-6">
      <StatsHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />

      {activeTab === 'overview' && (
        <>
          <StatsSummary
            scoringAverages={scoringAverages}
            drivingStats={drivingStats}
            fairwayStats={totalFairways}
            girStats={totalGIR}
            upAndDownStats={totalUpAndDowns}
            sandSaveStats={totalSandSaves}
            averagePutts={averagePutts}
          />

          <PracticeTips
            drivingTips={drivingTips}
            puttingTips={puttingTips}
            approachTips={approachTips}
          />
        </>
      )}

      {activeTab === 'strokes-gained' && (
        <StrokesGained rounds={filteredRounds} />
      )}

      {activeTab === 'compare' && (
        <CompareStats
          rounds={filteredRounds}
          fairwaysHit={totalFairways}
          gir={totalGIR}
          upAndDowns={totalUpAndDowns}
          sandSaves={totalSandSaves}
          averagePutts={averagePutts}
          drivingStats={drivingStats}
        />
      )}
    </div>
  );
}