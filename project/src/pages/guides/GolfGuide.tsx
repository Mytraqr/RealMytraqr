import React from 'react';
import { Flag, Target, BarChart2, Award } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function GolfGuide() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Flag className="w-12 h-12 text-orange-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Golf Traqr Guide</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">Master your game with detailed tracking and analysis</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Features</h2>
              <ul className="space-y-4">
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <Target className="w-5 h-5 text-orange-600 mr-3" />
                  Shot tracking
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <BarChart2 className="w-5 h-5 text-orange-600 mr-3" />
                  Score analysis
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <Award className="w-5 h-5 text-orange-600 mr-3" />
                  Performance insights
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <Flag className="w-5 h-5 text-orange-600 mr-3" />
                  Handicap tracking
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Getting Started</h2>
              <ol className="space-y-4 list-decimal list-inside text-gray-600 dark:text-gray-300">
                <li>Set up your course details in the Courses section</li>
                <li>Start a new round from the Rounds page</li>
                <li>Track each shot during your round</li>
                <li>Review your stats and insights after completing the round</li>
              </ol>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Advanced Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Strokes Gained Analysis</h3>
                <p className="text-gray-600 dark:text-gray-300">Compare your performance to scratch golfers in different aspects of the game.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Practice Recommendations</h3>
                <p className="text-gray-600 dark:text-gray-300">Get personalized practice suggestions based on your performance data.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Trend Analysis</h3>
                <p className="text-gray-600 dark:text-gray-300">Track your improvement over time with detailed performance trends.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Shot Patterns</h3>
                <p className="text-gray-600 dark:text-gray-300">Identify patterns in your misses to improve course management.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}