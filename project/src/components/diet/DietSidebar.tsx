import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UtensilsCrossed,
  BarChart2,
  Settings,
  Target,
  MessageSquare
} from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
}

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/diet/dashboard' },
  { icon: UtensilsCrossed, label: 'Log Day', path: '/diet/log-day' },
  { icon: BarChart2, label: 'Stats', path: '/diet/stats' },
  { icon: Target, label: 'Goals', path: '/diet/goals' },
  { icon: MessageSquare, label: 'Chat Analysis', path: '/diet/chat' },
  { icon: Settings, label: 'Settings', path: '/diet/settings' }
];

export default function DietSidebar({ isCollapsed }: SidebarProps) {
  const location = useLocation();

  return (
    <div className="h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className={`p-4 ${isCollapsed ? 'justify-center' : ''} flex items-center`}>
        <Link to="/" className="flex items-center space-x-2">
          <UtensilsCrossed className="w-8 h-8 text-orange-600 dark:text-orange-500" />
          {!isCollapsed && (
            <span className="text-xl font-bold text-gray-900 dark:text-white">Diet Traqr</span>
          )}
        </Link>
      </div>
      
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                isActive
                  ? 'bg-orange-50 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white'
              }`}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className={`w-5 h-5 ${!isCollapsed && 'mr-3'}`} />
              {!isCollapsed && item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}