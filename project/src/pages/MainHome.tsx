import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/landing/HeroSection';
import Features from '../components/landing/Features';
import HowItWorks from '../components/landing/HowItWorks';
import Services from '../components/landing/Services';
import StorySection from '../components/landing/StorySection';
import CTASection from '../components/landing/CTASection';

export default function MainHome() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main>
        <HeroSection />
        <Features />
        <HowItWorks />
        <Services />
        <StorySection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}