import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import StudySidebar from './StudySidebar';

export default function StudyDashboardLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-900">
      <div className={`relative flex flex-col ${isCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 ease-in-out`}>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-16 z-10 bg-white dark:bg-gray-800 rounded-full p-1 border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          )}
        </button>
        <StudySidebar isCollapsed={isCollapsed} />
      </div>
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}