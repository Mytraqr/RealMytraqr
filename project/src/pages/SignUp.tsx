import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UserPlus, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '../components/auth/AuthContext';
import { validateEmail, validatePassword } from '../utils/auth';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [error, setError] = useState('');

  // Get the redirect path from the URL query parameters
  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get('redirect');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate form data
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      setError(passwordValidation.message);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!formData.agreeToTerms) {
      setError('You must agree to the Terms of Service and Privacy Policy');
      return;
    }

    try {
      // Get existing users or initialize empty array
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Check if email already exists
      if (users.some((user: any) => user.email === formData.email)) {
        setError('Email already exists');
        return;
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        username: formData.username,
        email: formData.email,
        password: formData.password,
        verified: true // Skip email verification
      };

      // Add user to storage
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      // Set current user
      const currentUser = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.username,
        verified: true
      };

      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      setUser(currentUser);

      // Handle navigation based on signup context
      if (redirectPath) {
        if (redirectPath.includes('/diet/dashboard')) {
          navigate('/diet/questionnaire');
        } else {
          navigate(redirectPath);
        }
      } else {
        // If no specific redirect, go to homepage
        navigate('/');
      }
    } catch (err) {
      setError('An error occurred during sign up');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
          <div>
            <div className="mx-auto flex justify-center">
              <UserPlus className="w-12 h-12 text-orange-600 dark:text-orange-500" />
            </div>
            <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 dark:text-white">
              Create your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link 
                to={`/login${location.search}`}
                className="font-medium text-orange-600 dark:text-orange-500 hover:text-orange-500"
              >
                Sign in
              </Link>
            </p>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Username
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email address
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Confirm Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="agree-terms"
                name="agree-terms"
                type="checkbox"
                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 dark:border-gray-600 rounded"
                checked={formData.agreeToTerms}
                onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
              />
              <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                I agree to the{' '}
                <Link to="/terms" className="text-orange-600 hover:text-orange-500">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-orange-600 hover:text-orange-500">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Sign up
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}