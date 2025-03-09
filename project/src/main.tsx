import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './hooks/useTheme';
import { AuthProvider } from './components/auth/AuthContext';
import { UnitPreferencesProvider } from './hooks/useUnitPreferences';
import { router } from './router/routes';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <UnitPreferencesProvider>
          <RouterProvider router={router} />
        </UnitPreferencesProvider>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);