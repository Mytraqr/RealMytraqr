import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  name: string;
  description: string;
  icon: LucideIcon;
  benefits: string[];
  bgImage: string;
  onClick: () => void;
  index: number;
}

export default function ServiceCard({
  name,
  description,
  icon: Icon,
  benefits,
  bgImage,
  onClick,
  index
}: ServiceCardProps) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl shadow-lg cursor-pointer group"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      whileHover={{ scale: 1.02 }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-40 transition-all" />
      <div className="relative p-8 h-96 flex flex-col justify-end">
        <div className="mb-4">
          <Icon className="w-12 h-12 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
        <p className="text-gray-200 mb-4">{description}</p>
        <ul className="space-y-2">
          {benefits.map((benefit, i) => (
            <li key={i} className="flex items-center text-white">
              <CheckCircle className="w-5 h-5 mr-2 text-orange-500" />
              {benefit}
            </li>
          ))}
        </ul>
        <motion.div 
          className="mt-6 flex items-center text-orange-500 group-hover:text-orange-400"
          whileHover={{ x: 10 }}
        >
          <span className="font-semibold">Get Started</span>
          <ArrowRight className="w-5 h-5 ml-2" />
        </motion.div>
      </div>
    </motion.div>
  );
}