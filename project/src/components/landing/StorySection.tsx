import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Flag, UtensilsCrossed, Brain } from 'lucide-react';
import { motion } from 'framer-motion';

export default function StorySection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Story Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Story</h2>
            <div className="prose dark:prose-invert">
              <p className="text-gray-600 dark:text-gray-300">
                As a passionate golfer, I often found myself frustrated after rounds, wondering what I could improve but not knowing where to start. I knew I wanted to practice efficiently and see measurable improvement, but the lack of clear, actionable insights left me feeling stuck.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                That's when the idea for MyTraqr began. Starting with Golf Traqr, I created a tool to track every shot and uncover the patterns holding me back, empowering me to focus my practice on what truly mattered.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                But as I built it, I realized this need for clarity wasn't unique to golf—it extends to every aspect of life, from health to productivity. MyTraqr was born from my desire to help people uncover hidden insights in their journeys, whether on the golf course, in the gym, or at work.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                It's more than a tracker; it's a way to turn data into meaningful progress, helping you become the best version of yourself.
              </p>
            </div>
          </motion.div>

          {/* Quick Start Guides */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Quick Start Guides</h2>
            <div className="grid grid-cols-1 gap-4">
              <Link 
                to="/guides/golf"
                className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <Flag className="w-6 h-6 text-orange-600 mr-4" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Golf Traqr Guide</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Learn how to track shots and analyze your golf game</p>
                </div>
              </Link>

              <Link 
                to="/guides/diet"
                className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <UtensilsCrossed className="w-6 h-6 text-orange-600 mr-4" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Diet Traqr Guide</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Master nutrition tracking and meal planning</p>
                </div>
              </Link>

              <Link 
                to="/guides/mental"
                className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <Brain className="w-6 h-6 text-orange-600 mr-4" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Mental Traqr Guide</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Track and improve your emotional well-being</p>
                </div>
              </Link>

              <Link 
                to="/guides/study"
                className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <BookOpen className="w-6 h-6 text-orange-600 mr-4" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Study Traqr Guide</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Optimize your learning and productivity</p>
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}