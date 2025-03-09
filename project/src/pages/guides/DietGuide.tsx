import React from 'react';
import { UtensilsCrossed, Apple, Scale, Target } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function DietGuide() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <UtensilsCrossed className="w-12 h-12 text-orange-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Diet Traqr Guide</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">Master your nutrition with smart meal tracking</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Features</h2>
              <ul className="space-y-4">
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <UtensilsCrossed className="w-5 h-5 text-orange-600 mr-3" />
                  Meal logging
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <Apple className="w-5 h-5 text-orange-600 mr-3" />
                  Nutrition analysis
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <Target className="w-5 h-5 text-orange-600 mr-3" />
                  Goal tracking
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <Scale className="w-5 h-5 text-orange-600 mr-3" />
                  Progress monitoring
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Getting Started</h2>
              <ol className="space-y-4 list-decimal list-inside text-gray-600 dark:text-gray-300">
                <li>Complete the initial questionnaire</li>
                <li>Set your nutrition goals</li>
                <li>Log your daily meals</li>
                <li>Review insights and adjust as needed</li>
              </ol>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Advanced Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Meal Library</h3>
                <p className="text-gray-600 dark:text-gray-300">Save and reuse your favorite meals for quick logging.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Nutrition Insights</h3>
                <p className="text-gray-600 dark:text-gray-300">Get detailed analysis of your macro and micronutrient intake.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Progress Tracking</h3>
                <p className="text-gray-600 dark:text-gray-300">Monitor your progress with detailed charts and trends.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">AI Analysis</h3>
                <p className="text-gray-600 dark:text-gray-300">Receive personalized recommendations based on your eating patterns.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}