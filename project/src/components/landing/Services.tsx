import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Flag, UtensilsCrossed, Brain, BookOpen } from 'lucide-react';

const services = [
  {
    name: 'Golf Traqr',
    description: 'Track your golf stats, analyze your game, and improve your performance',
    icon: Flag,
    path: '/dashboard',
    bgImage: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&q=80',
    features: [
      'Shot tracking',
      'Score analysis',
      'Performance insights',
      'Handicap tracking'
    ]
  },
  {
    name: 'Diet Traqr',
    description: 'Monitor nutrition, track meals, and achieve health goals',
    icon: UtensilsCrossed,
    path: '/diet/dashboard',
    bgImage: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80',
    features: [
      'Meal logging',
      'Nutrition analysis',
      'Goal tracking',
      'Recipe suggestions'
    ]
  },
  {
    name: 'Mental Traqr',
    description: 'Track emotional well-being and mental health journey',
    icon: Brain,
    path: '/mental/dashboard',
    bgImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80',
    features: [
      'Mood tracking',
      'Pattern recognition',
      'Wellness tips',
      'Progress insights'
    ]
  },
  {
    name: 'Study Traqr',
    description: 'Track productivity and optimize learning',
    icon: BookOpen,
    path: '/study/dashboard',
    bgImage: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&q=80',
    features: [
      'Time tracking',
      'Focus analysis',
      'Study methods',
      'Progress tracking'
    ]
  }
];

export default function Services() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your Path
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Select your tracking tool and begin your journey to improvement
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            const path = isAuthenticated ? service.path : `/login?redirect=${service.path}`;
            
            return (
              <div
                key={service.name}
                className="relative overflow-hidden rounded-2xl shadow-lg cursor-pointer transform hover:scale-105 transition-all duration-300"
                onClick={() => navigate(path)}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${service.bgImage})` }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 hover:bg-opacity-40 transition-all" />
                <div className="relative p-8 h-96 flex flex-col justify-end">
                  <div className="mb-4">
                    <Icon className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{service.name}</h3>
                  <p className="text-gray-200 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-white">
                        <svg className="w-4 h-4 mr-2 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}