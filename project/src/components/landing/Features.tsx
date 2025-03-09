import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart2, 
  Brain,
  Target
} from 'lucide-react';

const features = [
  {
    icon: BarChart2,
    title: "Comprehensive Analytics",
    description: "Get detailed insights into your performance with advanced tracking and analysis tools. Make data-driven decisions to improve your progress."
  },
  {
    icon: Brain,
    title: "AI-Powered Insights",
    description: "Receive personalized recommendations and insights powered by advanced AI algorithms to help you achieve your goals faster."
  },
  {
    icon: Target,
    title: "Goal Setting & Tracking",
    description: "Set and track personalized goals with our intelligent system. Monitor your progress and celebrate your achievements."
  }
];

export default function Features() {
  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Why Choose Traqr?
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Powerful features to help you achieve your goals
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                className="bg-white dark:bg-gray-700 rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/50 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}