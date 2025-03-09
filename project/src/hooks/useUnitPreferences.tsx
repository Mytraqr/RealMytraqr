import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UnitPreferences {
  distanceUnit: 'yards' | 'meters';
  puttingUnit: 'feet' | 'inches';
}

interface UnitPreferencesContextType {
  preferences: UnitPreferences;
  setPreferences: (prefs: UnitPreferences) => void;
}

const UnitPreferencesContext = createContext<UnitPreferencesContextType | undefined>(undefined);

export function UnitPreferencesProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<UnitPreferences>(() => {
    const saved = localStorage.getItem('unitPreferences');
    return saved ? JSON.parse(saved) : {
      distanceUnit: 'yards',
      puttingUnit: 'feet'
    };
  });

  useEffect(() => {
    localStorage.setItem('unitPreferences', JSON.stringify(preferences));
  }, [preferences]);

  return (
    <UnitPreferencesContext.Provider value={{ preferences, setPreferences }}>
      {children}
    </UnitPreferencesContext.Provider>
  );
}

export function useUnitPreferences() {
  const context = useContext(UnitPreferencesContext);
  if (!context) {
    throw new Error('useUnitPreferences must be used within a UnitPreferencesProvider');
  }
  return context;
}

// Conversion utilities
export function convertDistance(value: number, from: 'yards' | 'meters', to: 'yards' | 'meters'): number {
  if (from === to) return value;
  return from === 'yards' ? value * 0.9144 : value * 1.0936;
}

export function convertPuttingDistance(value: number, from: 'feet' | 'inches', to: 'feet' | 'inches'): number {
  if (from === to) return value;
  return from === 'feet' ? value * 12 : value / 12;
}