import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart2, Target, TrendingUp } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import FeatureCard from './components/FeatureCard';
import Testimonial from './components/Testimonial';

export default function App() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section 
        className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-cover bg-center min-h-[600px] flex items-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&q=80")'
        }}
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Master Your Game with Traqr
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Track your golf stats, analyze your performance, and improve your skills with detailed insights and powerful analytics.
            </p>
            <button 
              onClick={() => navigate('/signup')}
              className="px-8 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors"
            >
              Get Started Free
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Why Choose Traqr?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Comprehensive golf tracking tools designed to help you understand and improve your game.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={BarChart2}
              title="Stat Tracking"
              description="Easily track fairways, greens in regulation, putts, and more with our intuitive interface."
            />
            <FeatureCard
              icon={TrendingUp}
              title="Performance Analysis"
              description="Visualize trends and patterns over time with detailed charts and insights."
            />
            <FeatureCard
              icon={Target}
              title="Improvement Tools"
              description="Identify areas for improvement with detailed insights and personalized recommendations."
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">What Golfers Say</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Join thousands of golfers who have improved their game with Traqr.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Testimonial
              quote="Traqr has completely transformed how I analyze my game. The insights are invaluable."
              author="David Thompson"
              role="15 Handicap Golfer"
              image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100"
            />
            <Testimonial
              quote="The detailed stats helped me identify my weaknesses and improve my scoring average by 3 strokes."
              author="Emily Rodriguez"
              role="Single Digit Handicap"
              image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100"
            />
            <Testimonial
              quote="Best golf tracking app I've ever used. Simple yet powerful."
              author="Marcus Williams"
              role="Golf Enthusiast"
              image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}