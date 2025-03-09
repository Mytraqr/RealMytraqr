import React from 'react';
import { LogIn, UserPlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">Traqr</span>
        </Link>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <button 
            onClick={() => navigate('/login')}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <LogIn className="w-4 h-4 mr-2" />
            Login
          </button>
          <button 
            onClick={() => navigate('/signup')}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-orange-600 dark:bg-orange-500 rounded-lg hover:bg-orange-700 dark:hover:bg-orange-600 transition-colors"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Sign Up
          </button>
        </div>
      </nav>
    </header>
  );
}