import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { validateEmail } from '../utils/auth';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      // In a real app, you would make an API call here
      setSubmitted(true);
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
          {submitted ? (
            <div className="text-center">
              <CheckCircle className="mx-auto h-12 w-12 text-green-600" />
              <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
                Check your email
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                We've sent password reset instructions to {email}
              </p>
              <Link
                to="/login"
                className="mt-6 inline-flex items-center text-sm font-medium text-orange-600 hover:text-orange-500"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to login
              </Link>
            </div>
          ) : (
            <>
              <div>
                <Mail className="mx-auto h-12 w-12 text-orange-600" />
                <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 dark:text-white">
                  Reset your password
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                  Enter your email address and we'll send you instructions to reset your password.
                </p>
              </div>

              {error && (
                <div className="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}

              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  >
                    Send reset instructions
                  </button>
                </div>
              </form>

              <div className="text-center">
                <Link
                  to="/login"
                  className="inline-flex items-center text-sm font-medium text-orange-600 hover:text-orange-500"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to login
                </Link>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}