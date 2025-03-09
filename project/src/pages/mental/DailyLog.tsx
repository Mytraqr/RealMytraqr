import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Save } from 'lucide-react';
import EmptyState from '../../components/EmptyState';
import { EmotionLog } from '../../types/mental';
import { getRandomTip } from '../../utils/wellnessTips';

export default function DailyLog() {
  const navigate = useNavigate();
  const [logs, setLogs] = useState<EmotionLog[]>([]);
  const [showNewLogForm, setShowNewLogForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [currentLog, setCurrentLog] = useState<EmotionLog | null>(null);

  useEffect(() => {
    const savedLogs = localStorage.getItem('mentalLogs');
    if (savedLogs) {
      setLogs(JSON.parse(savedLogs));
    }
  }, []);

  const handleStartNewLog = () => {
    setShowNewLogForm(true);
  };

  const handleDateSelect = () => {
    const existingLog = logs.find(log => log.date === selectedDate);
    if (existingLog) {
      alert('A log already exists for this date');
      return;
    }

    setCurrentLog({
      id: Date.now().toString(),
      date: selectedDate,
      emotion: 'neutral',
      intensity: 5,
      happinessLevel: 50,
      factors: [],
      goodThing: '',
      gratitude: ''
    });
    setShowNewLogForm(false);
  };

  const handleSaveLog = () => {
    if (!currentLog) return;

    const updatedLogs = [...logs, currentLog];
    setLogs(updatedLogs);
    localStorage.setItem('mentalLogs', JSON.stringify(updatedLogs));
    setCurrentLog(null);
    navigate('/mental/dashboard');
  };

  if (logs.length === 0 && !showNewLogForm && !currentLog) {
    return (
      <EmptyState
        type="mental-log"
        onAction={handleStartNewLog}
        message="Start Tracking Your Emotions"
        tip="Regular emotion tracking helps identify patterns and improve self-awareness."
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Daily Emotion Log</h1>
          <p className="text-gray-600 dark:text-gray-400">Track your emotional well-being</p>
        </div>
        <button
          onClick={handleStartNewLog}
          className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Entry
        </button>
      </div>

      {showNewLogForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Select Date</h2>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white mb-4"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowNewLogForm(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleDateSelect}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Start Log
              </button>
            </div>
          </div>
        </div>
      )}

      {currentLog && (
        <div className="space-y-6">
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
            <p className="text-sm text-orange-800 dark:text-orange-200">
              <span className="font-medium">Wellness Tip:</span> {getRandomTip()}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                How are you feeling?
              </label>
              <select
                value={currentLog.emotion}
                onChange={(e) => setCurrentLog({ ...currentLog, emotion: e.target.value as EmotionLog['emotion'] })}
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="happy">Happy 😊</option>
                <option value="content">Content 😌</option>
                <option value="neutral">Neutral 😐</option>
                <option value="anxious">Anxious 😟</option>
                <option value="stressed">Stressed 😫</option>
                <option value="sad">Sad 😢</option>
                <option value="angry">Angry 😠</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Intensity (1-10)
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={currentLog.intensity}
                onChange={(e) => setCurrentLog({ ...currentLog, intensity: Number(e.target.value) })}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>Barely noticeable</span>
                <span>Moderate</span>
                <span>Very intense</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Overall Happiness Level
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={currentLog.happinessLevel}
                onChange={(e) => setCurrentLog({ ...currentLog, happinessLevel: Number(e.target.value) })}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>0%</span>
                <span>{currentLog.happinessLevel}%</span>
                <span>100%</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Contributing Factors
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['Sleep', 'Work/Study', 'Social', 'Health', 'Exercise', 'Nutrition', 'Weather', 'Family'].map((factor) => (
                  <label key={factor} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={currentLog.factors.includes(factor)}
                      onChange={(e) => {
                        const updatedFactors = e.target.checked
                          ? [...currentLog.factors, factor]
                          : currentLog.factors.filter(f => f !== factor);
                        setCurrentLog({ ...currentLog, factors: updatedFactors });
                      }}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{factor}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                One Good Thing Today
              </label>
              <textarea
                value={currentLog.goodThing}
                onChange={(e) => setCurrentLog({ ...currentLog, goodThing: e.target.value })}
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Gratitude Moment
              </label>
              <textarea
                value={currentLog.gratitude}
                onChange={(e) => setCurrentLog({ ...currentLog, gratitude: e.target.value })}
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                rows={3}
              />
            </div>

            {(currentLog.emotion === 'anxious' || currentLog.emotion === 'stressed' || currentLog.emotion === 'sad') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Mental Health Action Step
                </label>
                <textarea
                  value={currentLog.actionStep || ''}
                  onChange={(e) => setCurrentLog({ ...currentLog, actionStep: e.target.value })}
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  rows={3}
                  placeholder="What's one small step you can take to feel better?"
                />
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={handleSaveLog}
                className="flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                <Save className="w-5 h-5 mr-2" />
                Save Entry
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Emotion
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Happiness Level
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {logs.map((log) => (
              <tr key={log.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {new Date(log.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white capitalize">
                  {log.emotion}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {log.happinessLevel}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                  <button
                    onClick={() => {
                      const updatedLogs = logs.filter(l => l.id !== log.id);
                      setLogs(updatedLogs);
                      localStorage.setItem('mentalLogs', JSON.stringify(updatedLogs));
                    }}
                    className="text-red-600 hover:text-red-900 dark:hover:text-red-400"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}