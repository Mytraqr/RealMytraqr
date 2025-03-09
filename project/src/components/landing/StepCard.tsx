import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StepCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
  total: number;
}

export default function StepCard({ icon: Icon, title, description, index, total }: StepCardProps) {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
    >
      <div className="relative mb-8">
        <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/50 rounded-full flex items-center justify-center mx-auto">
          <Icon className="w-8 h-8 text-orange-600 dark:text-orange-400" />
        </div>
        {index < total - 1 && (
          <div className="absolute top-8 left-1/2 w-full h-0.5 bg-orange-200 dark:bg-orange-800 hidden md:block" />
        )}
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