import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-orange-600">
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-white mb-6">
          Ready to Transform Your Life?
        </h2>
        <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
          Join thousands of users who are already using Traqr to track their progress and achieve their goals.
        </p>
        <motion.button
          onClick={() => navigate('/signup')}
          className="px-8 py-4 bg-white text-orange-600 rounded-lg text-lg font-semibold hover:bg-orange-50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Free Trial
        </motion.button>
      </motion.div>
    </section>
  );
}