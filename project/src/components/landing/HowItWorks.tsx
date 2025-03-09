import React from 'react';
import { motion } from 'framer-motion';
import { 
  UserPlus, 
  Target, 
  BarChart2, 
  TrendingUp 
} from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    title: "Create Your Account",
    description: "Sign up in seconds and start your journey to improvement."
  },
  {
    icon: Target,
    title: "Set Your Goals",
    description: "Define clear, achievable goals for your personal growth."
  },
  {
    icon: BarChart2,
    title: "Track Progress",
    description: "Log your activities and monitor your progress over time."
  },
  {
    icon: TrendingUp,
    title: "Get Insights",
    description: "Receive personalized insights and recommendations."
  }
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            How It Works
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Get started with Traqr in four simple steps
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="relative mb-8">
                  <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/50 rounded-full flex items-center justify-center mx-auto">
                    <Icon className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                  </div>
                  {index < steps.length - 1 && (
                    <div className="absolute top-8 left-1/2 w-full h-0.5 bg-orange-200 dark:bg-orange-800 hidden md:block" />
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}