import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Calendar, Clock, Target } from 'lucide-react';

interface StudyPreferences {
  schoolType: 'university' | 'school';
  schoolYear: string;
  startDate: string;
  endDate: string;
  dailyGoal: number;
  weekendGoal: number;
  studyPreference: 'morning' | 'afternoon' | 'evening';
  focusLevel: 'Low' | 'Medium' | 'High';
}

export default function StudyOnboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState<StudyPreferences>({
    schoolType: 'university',
    schoolYear: '',
    startDate: '',
    endDate: '',
    dailyGoal: 120,
    weekendGoal: 0,
    studyPreference: 'morning',
    focusLevel: 'Medium'
  });

  const handleSubmit = () => {
    // Calculate recommended study times based on preferences
    const recommendedTimes = {
      morning: ['08:00', '10:00'],
      afternoon: ['14:00', '16:00'],
      evening: ['19:00', '21:00']
    };

    const studyPlan = {
      ...preferences,
      recommendedTimes: recommendedTimes[preferences.studyPreference],
      notifications: true,
      lastNotificationCheck: new Date().toISOString()
    };

    // Save preferences to localStorage
    localStorage.setItem('studyPreferences', JSON.stringify(studyPlan));
    localStorage.setItem('studyOnboardingComplete', 'true');
    
    // Navigate to dashboard
    navigate('/study/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <BookOpen className="mx-auto h-12 w-12 text-blue-600" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            Let's Set Up Your Study Schedule
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Help us personalize your experience
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Create your school year
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setPreferences({ ...preferences, schoolType: 'university' })}
                  className={`p-6 rounded-lg border-2 ${
                    preferences.schoolType === 'university'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <img 
                      src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Graduation%20cap/3D/graduation_cap_3d.png"
                      alt="University"
                      className="w-16 h-16 mb-2"
                    />
                    <span className="font-medium">I go to university</span>
                  </div>
                </button>

                <button
                  onClick={() => setPreferences({ ...preferences, schoolType: 'school' })}
                  className={`p-6 rounded-lg border-2 ${
                    preferences.schoolType === 'school'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <img 
                      src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/School/3D/school_3d.png"
                      alt="School"
                      className="w-16 h-16 mb-2"
                    />
                    <span className="font-medium">I go to school</span>
                  </div>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    School year *
                  </label>
                  <input
                    type="text"
                    value={preferences.schoolYear}
                    onChange={(e) => setPreferences({ ...preferences, schoolYear: e.target.value })}
                    placeholder="E.g., Freshman Year 2024"
                    className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Start *
                    </label>
                    <input
                      type="date"
                      value={preferences.startDate}
                      onChange={(e) => setPreferences({ ...preferences, startDate: e.target.value })}
                      className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      End *
                    </label>
                    <input
                      type="date"
                      value={preferences.endDate}
                      onChange={(e) => setPreferences({ ...preferences, endDate: e.target.value })}
                      className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                      required
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Set your study preferences
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Daily study goal *
                  </label>
                  <div className="mt-1 relative rounded-lg shadow-sm">
                    <input
                      type="number"
                      value={preferences.dailyGoal}
                      onChange={(e) => setPreferences({ ...preferences, dailyGoal: Number(e.target.value) })}
                      className="block w-full pr-12 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                      placeholder="120"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">minutes</span>
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">Can later be changed individually for each day</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Daily study goal on weekends *
                  </label>
                  <div className="mt-1 relative rounded-lg shadow-sm">
                    <input
                      type="number"
                      value={preferences.weekendGoal}
                      onChange={(e) => setPreferences({ ...preferences, weekendGoal: Number(e.target.value) })}
                      className="block w-full pr-12 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                      placeholder="0"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">minutes</span>
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">Can later be changed individually for each day</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    When do you prefer to study? *
                  </label>
                  <select
                    value={preferences.studyPreference}
                    onChange={(e) => setPreferences({ ...preferences, studyPreference: e.target.value as 'morning' | 'afternoon' | 'evening' })}
                    className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                  >
                    <option value="morning">Morning (8:00 - 12:00)</option>
                    <option value="afternoon">Afternoon (12:00 - 17:00)</option>
                    <option value="evening">Evening (17:00 - 22:00)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Your typical focus level *
                  </label>
                  <select
                    value={preferences.focusLevel}
                    onChange={(e) => setPreferences({ ...preferences, focusLevel: e.target.value as 'Low' | 'Medium' | 'High' })}
                    className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                  >
                    <option value="Low">Low - I get distracted easily</option>
                    <option value="Medium">Medium - I can focus with some effort</option>
                    <option value="High">High - I can maintain focus well</option>
                  </select>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Complete Setup
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}