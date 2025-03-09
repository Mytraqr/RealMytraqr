import React, { useState } from 'react';
import { Target, Flag, BarChart2, CircleDot, Ruler } from 'lucide-react';

export default function Information() {
  const [activeTab, setActiveTab] = useState<'understand' | 'importance' | 'recording'>('understand');

  const statCategories = [
    {
      icon: Target,
      title: "Fairways Hit",
      description: "The percentage of times your tee shot lands in the fairway on par 4 and par 5 holes.",
      importance: "Hitting fairways gives you a better chance of reaching the green in regulation and scoring well.",
      calculation: "Number of fairways hit divided by total number of fairways (usually 14 per round)."
    },
    {
      icon: Flag,
      title: "Greens in Regulation (GIR)",
      description: "Reaching the green in the expected number of shots or fewer (e.g., 2 shots on a par 4).",
      importance: "Higher GIR percentages strongly correlate with lower scores.",
      calculation: "Number of greens hit in regulation divided by 18 holes."
    },
    {
      icon: BarChart2,
      title: "Driving Distance",
      description: "Average distance of your tee shots on par 4 and par 5 holes.",
      importance: "Longer drives can give you shorter approach shots, making it easier to reach greens.",
      calculation: "Calculated separately for par 4s and par 5s based on hole length minus approach shot distance."
    },
    {
      icon: CircleDot,
      title: "Putts per Round",
      description: "Total number of putts taken during a round.",
      importance: "Putting typically accounts for about 40% of your total strokes.",
      calculation: "Sum of all putts taken during the round."
    },
    {
      icon: Ruler,
      title: "Scrambling",
      description: "The percentage of time you make par or better when missing the green in regulation.",
      importance: "Shows your ability to recover from missed greens and save strokes.",
      calculation: "Number of pars or better when missing GIR divided by total missed greens."
    }
  ];

  const renderRecordingGuide = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">How to Record Your Stats</h3>
        <div className="space-y-4">
          <p className="text-gray-600">
            Follow these steps to accurately record your round:
          </p>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">1. Before Your Round</h4>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Set up your course details in the Courses section</li>
                <li>Enter yardages and pars for each hole</li>
                <li>Ensure you have a way to track shots during play (phone or notepad)</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">2. During Your Round</h4>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>For each shot, note:
                  <ul className="list-circle pl-5 mt-1">
                    <li>Club used</li>
                    <li>Type of shot (drive, approach, chip, putt)</li>
                    <li>Result (fairway, rough, sand, green)</li>
                    <li>Approximate distances</li>
                  </ul>
                </li>
                <li>Track putts separately for each hole</li>
                <li>Note any penalty strokes</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">3. After Your Round</h4>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Enter your round data while it's fresh in your memory</li>
                <li>Review your stats and identify patterns</li>
                <li>Use the insights to focus your practice</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 bg-orange-50 rounded-lg p-4">
            <h4 className="font-medium text-orange-800 mb-2">Pro Tips:</h4>
            <ul className="list-disc pl-5 space-y-2 text-orange-700">
              <li>Be honest with your tracking - it's for your improvement</li>
              <li>Don't try to track everything at once if you're just starting</li>
              <li>Focus on major stats first (fairways, greens, putts)</li>
              <li>Use the notes section to record unusual circumstances or conditions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Golf Statistics Guide</h1>
        <p className="text-gray-600">Learn about golf statistics and how to track them effectively.</p>
      </div>

      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('understand')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'understand'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Understanding Stats
          </button>
          <button
            onClick={() => setActiveTab('importance')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'importance'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Why Track Stats?
          </button>
          <button
            onClick={() => setActiveTab('recording')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'recording'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Recording Guide
          </button>
        </nav>
      </div>

      {activeTab === 'understand' && (
        <div className="space-y-8">
          {statCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-orange-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">{category.title}</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">What is it?</h4>
                      <p className="mt-1 text-gray-600">{category.description}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Why is it important?</h4>
                      <p className="mt-1 text-gray-600">{category.importance}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">How is it calculated?</h4>
                      <p className="mt-1 text-gray-600">{category.calculation}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'importance' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Why Track Your Golf Stats?</h3>
            <div className="space-y-4">
              <p className="text-gray-600">
                Tracking your golf statistics is crucial for improving your game. It helps you:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Identify strengths and weaknesses in your game</li>
                <li>Set realistic goals for improvement</li>
                <li>Track progress over time</li>
                <li>Make data-driven decisions about practice focus areas</li>
                <li>Compare your performance to players at similar skill levels</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'recording' && renderRecordingGuide()}
    </div>
  );
}