import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Flag, 
  BarChart2, 
  Settings,
  MapPin,
  HelpCircle,
  MessageSquare
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Flag, label: 'Rounds', path: '/rounds' },
  { icon: MapPin, label: 'Courses', path: '/courses' },
  { icon: BarChart2, label: 'Stats', path: '/stats' },
  { icon: MessageSquare, label: 'Chat Analysis', path: '/chat' },
  { icon: HelpCircle, label: 'Information', path: '/information' },
  { icon: Settings, label: 'Settings', path: '/settings' }
];

interface SidebarProps {
  isCollapsed: boolean;
}

export default function Sidebar({ isCollapsed }: SidebarProps) {
  const location = useLocation();

  return (
    <div className="h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className={`p-4 ${isCollapsed ? 'justify-center' : ''} flex items-center`}>
        <Link to="/" className="flex items-center space-x-2">
          <Flag className="w-8 h-8 text-orange-600 dark:text-orange-500" />
          {!isCollapsed && (
            <span className="text-xl font-bold text-gray-900 dark:text-white">Traqr</span>
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