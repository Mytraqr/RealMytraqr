import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Privacy Policy</h1>
          
          <div className="space-y-6 text-gray-600 dark:text-gray-300">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">1. Information We Collect</h2>
              <p>We collect information that you provide directly to us, including:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Account information (name, email, password)</li>
                <li>Golf performance data (scores, statistics, round details)</li>
                <li>Device and usage information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">2. How We Use Your Information</h2>
              <p>We use the collected information to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Provide and improve our services</li>
                <li>Analyze performance trends and statistics</li>
                <li>Communicate with you about your account</li>
                <li>Ensure security and prevent fraud</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">3. Data Storage and Security</h2>
              <p>We implement appropriate security measures to protect your personal information. Your data is stored securely and accessed only by authorized personnel.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">4. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Export your data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">5. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at:</p>
              <p className="mt-2">Email: privacy@golftraqr.com</p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}