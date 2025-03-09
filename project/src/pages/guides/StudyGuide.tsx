import React from 'react';
import { BookOpen, Clock, Target, Brain } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function StudyGuide() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <BookOpen className="w-12 h-12 text-orange-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Study Traqr Guide</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">Optimize your learning and productivity</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Features</h2>
              <ul className="space-y-4">
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <Clock className="w-5 h-5 text-orange-600 mr-3" />
                  Time tracking
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <Brain className="w-5 h-5 text-orange-600 mr-3" />
                  Focus analysis
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <BookOpen className="w-5 h-5 text-orange-600 mr-3" />
                  Study methods
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <Target className="w-5 h-5 text-orange-600 mr-3" />
                  Progress tracking
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Getting Started</h2>
              <ol className="space-y-4 list-decimal list-inside text-gray-600 dark:text-gray-300">
                <li>Set up your study goals</li>
                <li>Track your study sessions</li>
                <li>Use productivity tools</li>
                <li>Review performance insights</li>
              </ol>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Advanced Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Pomodoro Timer</h3>
                <p className="text-gray-600 dark:text-gray-300">Stay focused with customizable study intervals.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Study Methods</h3>
                <p className="text-gray-600 dark:text-gray-300">Access proven study techniques and strategies.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Progress Analytics</h3>
                <p className="text-gray-600 dark:text-gray-300">Track your improvement with detailed statistics.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Focus Tools</h3>
                <p className="text-gray-600 dark:text-gray-300">Use white noise and other concentration aids.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}