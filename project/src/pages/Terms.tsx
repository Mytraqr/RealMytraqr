import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Terms of Service</h1>
          
          <div className="space-y-6 text-gray-600 dark:text-gray-300">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
              <p>By accessing or using Traqr, you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use our service.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">2. User Accounts</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>You must provide accurate information when creating an account</li>
                <li>You are responsible for maintaining the security of your account</li>
                <li>You must not share your account credentials</li>
                <li>We reserve the right to terminate accounts that violate our terms</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">3. User Content</h2>
              <p>You retain ownership of your content but grant us a license to use, store, and display it in connection with our services.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">4. Prohibited Activities</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Violating laws or regulations</li>
                <li>Interfering with the service's operation</li>
                <li>Attempting to gain unauthorized access</li>
                <li>Harassing or impersonating others</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">5. Limitation of Liability</h2>
              <p>We provide the service "as is" without warranties. We are not liable for any damages arising from your use of the service.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">6. Changes to Terms</h2>
              <p>We may modify these terms at any time. Continued use of the service constitutes acceptance of modified terms.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">7. Contact</h2>
              <p>For questions about these terms, contact us at:</p>
              <p className="mt-2">Email: legal@golftraqr.com</p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}