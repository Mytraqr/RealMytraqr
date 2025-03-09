import React from 'react';
import { useTheme } from '../hooks/useTheme';

export default function ColorThemeToggle() {
  const { colorTheme, setColorTheme } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => setColorTheme('orange')}
        className={`w-6 h-6 rounded-full ${
          colorTheme === 'orange' ? 'ring-2 ring-offset-2 ring-orange-600' : ''
        } bg-orange-500`}
        aria-label="Set orange theme"
      />
      <button
        onClick={() => setColorTheme('cyan')}
        className={`w-6 h-6 rounded-full ${
          colorTheme === 'cyan' ? 'ring-2 ring-offset-2 ring-cyan-600' : ''
        } bg-cyan-500`}
        aria-label="Set cyan theme"
      />
    </div>
  );
}