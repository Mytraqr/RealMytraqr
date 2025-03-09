import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      className="bg-white dark:bg-gray-700 rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow"
      whileHover={{ scale: 1.05 }}
    >
      <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/50 rounded-lg flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </motion.div>
  );
}