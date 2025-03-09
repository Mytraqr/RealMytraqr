import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureSectionProps {
  icon: LucideIcon;
  title: string;
  description: string;
  details: string[];
  imageUrl: string;
  isReversed?: boolean;
}

export default function FeatureSection({ 
  icon: Icon, 
  title, 
  description, 
  details, 
  imageUrl, 
  isReversed = false 
}: FeatureSectionProps) {
  return (
    <div className="py-16 border-b border-gray-200 last:border-0">
      <div className={`max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
        <div className={`space-y-6 ${isReversed ? 'lg:pl-12' : 'lg:pr-12'}`}>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Icon className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
          </div>
          <p className="text-lg text-gray-600">{description}</p>
          <ul className="space-y-4">
            {details.map((detail, index) => (
              <li key={index} className="flex items-start">
                <svg className="w-6 h-6 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="ml-3 text-gray-600">{detail}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={`relative h-[400px] rounded-2xl overflow-hidden ${isReversed ? 'lg:order-first' : ''}`}>
          <img
            src={imageUrl}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}