import React from 'react';
import { BarChart2, Target, Flag, Award, TrendingUp } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FeatureSection from '../components/FeatureSection';

export default function Features() {
  const features = [
    {
      icon: BarChart2,
      title: "Round Tracking",
      description: "Record every detail of your golf rounds with our comprehensive tracking system.",
      details: [
        "Track fairways hit, putts per hole, and greens in regulation",
        "View detailed round summaries and statistics",
        "Monitor progress over time with historical data",
        "Easy-to-use interface for quick data entry during or after your round"
      ],
      imageUrl: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&q=80"
    },
    {
      icon: Target,
      title: "Detailed Hole Stats",
      description: "Capture and analyze shot-specific data for every hole you play.",
      details: [
        "Record tee shots, approach shots, and putting distances",
        "Track shot patterns and tendencies",
        "Identify strengths and areas for improvement",
        "Visualize your performance with hole-by-hole analytics"
      ],
      imageUrl: "https://images.unsplash.com/photo-1592919505780-303950717480?auto=format&fit=crop&q=80",
      isReversed: true
    },
    {
      icon: Flag,
      title: "Course Management",
      description: "Keep track of your performance across different golf courses.",
      details: [
        "Store detailed course information and layouts",
        "Track performance on specific holes and courses",
        "Identify challenging spots and develop strategies",
        "Compare scoring patterns across different courses"
      ],
      imageUrl: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&q=80"
    },
    {
      icon: TrendingUp,
      title: "Performance Metrics",
      description: "Analyze key metrics to understand and improve your game.",
      details: [
        "Track GIR (Greens in Regulation) percentage",
        "Monitor scrambling success rate",
        "Analyze driving accuracy and distances",
        "View detailed putting statistics"
      ],
      imageUrl: "https://images.unsplash.com/photo-1461695008884-244cb4543d74?auto=format&fit=crop&q=80",
      isReversed: true
    },
    {
      icon: Award,
      title: "Leaderboard and Competition",
      description: "Compare your stats and compete with other golfers.",
      details: [
        "Join competitive leaderboards",
        "Compare stats with friends",
        "Track handicap progress",
        "Participate in challenges and competitions"
      ],
      imageUrl: "https://images.unsplash.com/photo-1535132011086-b8818f016104?auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-emerald-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Features That Drive Improvement
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how Traqr's powerful features can help you understand your game better and make meaningful improvements to your golf performance.
          </p>
        </div>
      </section>

      {/* Features List */}
      <section className="py-8">
        {features.map((feature, index) => (
          <FeatureSection
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            details={feature.details}
            imageUrl={feature.imageUrl}
            isReversed={feature.isReversed}
          />
        ))}
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-emerald-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Improve Your Game?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of golfers who are already using Traqr to track their progress and improve their performance.
          </p>
          <button className="px-8 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors">
            Get Started Free
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}