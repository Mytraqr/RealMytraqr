import React from 'react';
import { Brain, Heart, TrendingUp, Sun } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function MentalGuide() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Brain className="w-12 h-12 text-orange-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Mental Traqr Guide</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">Track and improve your emotional well-being</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Features</h2>
              <ul className="space-y-4">
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <Heart className="w-5 h-5 text-orange-600 mr-3" />
                  Mood tracking
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <Brain className="w-5 h-5 text-orange-600 mr-3" />
                  Pattern recognition
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <Sun className="w-5 h-5 text-orange-600 mr-3" />
                  Wellness tips
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <TrendingUp className="w-5 h-5 text-orange-600 mr-3" />
                  Progress insights
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Getting Started</h2>
              <ol className="space-y-4 list-decimal list-inside text-gray-600 dark:text-gray-300">
                <li>Start your daily emotion log</li>
                <li>Track contributing factors</li>
                <li>Record gratitude moments</li>
                <li>Review patterns and insights</li>
              </ol>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Advanced Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Pattern Analysis</h3>
                <p className="text-gray-600 dark:text-gray-300">Identify triggers and patterns in your emotional well-being.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Wellness Insights</h3>
                <p className="text-gray-600 dark:text-gray-300">Get personalized recommendations for emotional balance.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Progress Tracking</h3>
                <p className="text-gray-600 dark:text-gray-300">Monitor your emotional growth over time.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Gratitude Journal</h3>
                <p className="text-gray-600 dark:text-gray-300">Build a positive mindset through regular gratitude practice.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}