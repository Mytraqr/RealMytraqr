import React, { useState } from 'react';
import { Timer, Calculator as CalcIcon, FileText, Volume2 } from 'lucide-react';
import PomodoroTimer from '../../components/study/tools/PomodoroTimer';
import Calculator from '../../components/study/tools/Calculator';
import WhiteNoise from '../../components/study/tools/WhiteNoise';

export default function StudyTools() {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const tools = [
    {
      name: 'Pomodoro Timer',
      description: 'Stay focused with customizable work/break intervals',
      icon: Timer,
      component: <PomodoroTimer />
    },
    {
      name: 'Scientific Calculator',
      description: 'Advanced calculator for complex calculations',
      icon: CalcIcon,
      component: <Calculator />
    },
    {
      name: 'White Noise',
      description: 'Background sounds for better concentration',
      icon: Volume2,
      component: <WhiteNoise />
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Study Tools</h1>
        <p className="text-gray-600 dark:text-gray-400">Helpful tools to enhance your study sessions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tools.map((tool) => {
          const Icon = tool.icon;
          const isActive = activeTool === tool.name;
          
          return (
            <button
              key={tool.name}
              onClick={() => setActiveTool(isActive ? null : tool.name)}
              className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-all ${
                isActive ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-lg">
                  <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{tool.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{tool.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {activeTool && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{activeTool}</h2>
          {tools.find(t => t.name === activeTool)?.component}
        </div>
      )}
    </div>
  );
}