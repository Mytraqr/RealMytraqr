import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Lock, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { validatePassword } from '../utils/auth';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [validToken, setValidToken] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = new URLSearchParams(location.search).get('token');
    if (!token) {
      setError('Invalid password reset link');
    } else {
      // In a real app, you would verify the token with your backend
      setValidToken(true);
    }
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const validation = validatePassword(password);
    if (!validation.isValid) {
      setError(validation.message);
      return;
    }

    try {
      // In a real app, you would make an API call here
      setSuccess(true);
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  if (!validToken) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <Header />
        <main className="flex-grow flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md text-center">
            <XCircle className="mx-auto h-12 w-12 text-red-600" />
            <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">Invalid Link</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">{error}</p>
            <Link
              to="/forgot-password"
              className="mt-6 inline-flex items-center text-orange-600 hover:text-orange-500"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Request new reset link
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
          {success ? (
            <div className="text-center">
              <CheckCircle className="mx-auto h-12 w-12 text-green-600" />
              <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
                Password Reset Complete
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Your password has been successfully reset. Redirecting to login...
              </p>
            </div>
          ) : (
            <>
              <div>
                <Lock className="mx-auto h-12 w-12 text-orange-600" />
                <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 dark:text-white">
                  Reset your password
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                  Enter your new password below
                </p>
              </div>

              {error && (
                <div className="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}

              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    New Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Confirm New Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  >
                    Reset Password
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}