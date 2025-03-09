import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

export default function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Play notification sound
      const audio = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
      audio.play();
      
      // Switch between work and break
      setIsBreak(!isBreak);
      setTimeLeft(isBreak ? 25 * 60 : 5 * 60);
      setIsRunning(false);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, isBreak]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleReset = () => {
    setTimeLeft(25 * 60);
    setIsRunning(false);
    setIsBreak(false);
  };

  return (
    <div className="text-center p-6">
      <h2 className="text-2xl font-bold mb-4">{isBreak ? 'Break Time!' : 'Focus Time'}</h2>
      <div className="text-6xl font-mono mb-6">{formatTime(timeLeft)}</div>
      <div className="space-x-4">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {isRunning ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={handleReset}
          className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Reset
        </button>
      </div>
    </div>
  );
}