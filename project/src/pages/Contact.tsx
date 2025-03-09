import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Mail, Copy, Check } from 'lucide-react';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const email = 'mytraqr@gmail.com';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="flex-grow py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Contact Us</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">Get in touch with our team</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm text-center">
            <Mail className="w-12 h-12 text-orange-600 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Email</h3>
            <div className="flex items-center justify-center space-x-3">
              <p className="text-lg text-gray-600 dark:text-gray-400">{email}</p>
              <button
                onClick={handleCopy}
                className="p-2 text-gray-500 hover:text-orange-600 transition-colors"
                title="Copy email address"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-green-500" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}