import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();
  
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h2 className="text-5xl md:text-6xl font-bold mb-6">
          Track. Analyze. <span className="text-orange-500">Improve.</span>
        </h2>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          Your comprehensive platform for tracking golf performance, nutrition, and mental wellness.
        </p>
        <button
          onClick={() => navigate('/signup')}
          className="px-8 py-4 bg-orange-600 text-white rounded-lg text-lg font-semibold hover:bg-orange-700 transition-colors"
        >
          Start Your Journey
        </button>
      </div>
    </section>
  );
}