import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Mail, CheckCircle, XCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function VerifyEmail() {
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = new URLSearchParams(location.search).get('token');
    if (token) {
      // Simulate verification process
      setTimeout(() => {
        setVerifying(false);
        setVerified(true);
        // In a real app, you would verify with your backend here
      }, 2000);
    } else {
      setVerifying(false);
      setError('Invalid verification link');
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
          <div className="text-center">
            {verifying ? (
              <>
                <Mail className="mx-auto h-12 w-12 text-orange-600 animate-pulse" />
                <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
                  Verifying your email
                </h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Please wait while we verify your email address...
                </p>
              </>
            ) : verified ? (
              <>
                <CheckCircle className="mx-auto h-12 w-12 text-green-600" />
                <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
                  Email Verified!
                </h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Your email has been successfully verified.
                </p>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  Go to Dashboard
                </button>
              </>
            ) : (
              <>
                <XCircle className="mx-auto h-12 w-12 text-red-600" />
                <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
                  Verification Failed
                </h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {error}
                </p>
                <button
                  onClick={() => navigate('/login')}
                  className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  Back to Login
                </button>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}