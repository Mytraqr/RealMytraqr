import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface UserData {
  height: number;
  heightUnit: 'cm' | 'inches';
  weight: number;
  weightUnit: 'kg' | 'lbs';
  age: number;
  gender: 'male' | 'female' | 'prefer-not-to-say';
  goal: 'bulking' | 'cutting' | 'weight-loss' | 'maintenance' | 'performance';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
}

export default function DietQuestionnaire() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState<UserData>({
    height: 0,
    heightUnit: 'cm',
    weight: 0,
    weightUnit: 'kg',
    age: 0,
    gender: 'prefer-not-to-say',
    goal: 'maintenance',
    activityLevel: 'moderate'
  });

  const handleSubmit = () => {
    // Calculate BMR using Harris-Benedict Equation
    let bmr = 0;
    const weightInKg = userData.weightUnit === 'kg' ? userData.weight : userData.weight * 0.453592;
    const heightInCm = userData.heightUnit === 'cm' ? userData.height : userData.height * 2.54;

    if (userData.gender === 'male') {
      bmr = 88.362 + (13.397 * weightInKg) + (4.799 * heightInCm) - (5.677 * userData.age);
    } else {
      bmr = 447.593 + (9.247 * weightInKg) + (3.098 * heightInCm) - (4.330 * userData.age);
    }

    // Calculate TDEE based on activity level
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      'very-active': 1.9
    };

    const tdee = Math.round(bmr * activityMultipliers[userData.activityLevel]);

    // Calculate target calories based on goal
    let targetCalories = tdee;
    switch (userData.goal) {
      case 'bulking':
        targetCalories += 500;
        break;
      case 'cutting':
      case 'weight-loss':
        targetCalories -= 500;
        break;
      case 'performance':
        targetCalories += 300;
        break;
    }

    // Save user data and calculations
    localStorage.setItem('dietUserData', JSON.stringify({
      ...userData,
      bmr,
      tdee,
      targetCalories,
      onboardingCompleted: true
    }));

    // Navigate to dashboard
    navigate('/diet/dashboard');
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Height</label>
              <div className="mt-1 flex space-x-4">
                <input
                  type="number"
                  value={userData.height || ''}
                  onChange={(e) => setUserData({ ...userData, height: Number(e.target.value) })}
                  className="flex-1 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                  required
                />
                <select
                  value={userData.heightUnit}
                  onChange={(e) => setUserData({ ...userData, heightUnit: e.target.value as 'cm' | 'inches' })}
                  className="rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                >
                  <option value="cm">cm</option>
                  <option value="inches">inches</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Weight</label>
              <div className="mt-1 flex space-x-4">
                <input
                  type="number"
                  value={userData.weight || ''}
                  onChange={(e) => setUserData({ ...userData, weight: Number(e.target.value) })}
                  className="flex-1 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                  required
                />
                <select
                  value={userData.weightUnit}
                  onChange={(e) => setUserData({ ...userData, weightUnit: e.target.value as 'kg' | 'lbs' })}
                  className="rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                >
                  <option value="kg">kg</option>
                  <option value="lbs">lbs</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Age</label>
              <input
                type="number"
                value={userData.age || ''}
                onChange={(e) => setUserData({ ...userData, age: Number(e.target.value) })}
                className="mt-1 w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Biological Gender</label>
              <select
                value={userData.gender}
                onChange={(e) => setUserData({ ...userData, gender: e.target.value as UserData['gender'] })}
                className="mt-1 w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700"
              >
                <option value="prefer-not-to-say">Prefer not to say</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Goal</label>
              <select
                value={userData.goal}
                onChange={(e) => setUserData({ ...userData, goal: e.target.value as UserData['goal'] })}
                className="mt-1 w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700"
              >
                <option value="maintenance">Maintain weight</option>
                <option value="weight-loss">Lose weight</option>
                <option value="cutting">Cut (reduce fat, maintain muscle)</option>
                <option value="bulking">Bulk (gain muscle and weight)</option>
                <option value="performance">Improve energy and performance</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Activity Level</label>
              <select
                value={userData.activityLevel}
                onChange={(e) => setUserData({ ...userData, activityLevel: e.target.value as UserData['activityLevel'] })}
                className="mt-1 w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700"
              >
                <option value="sedentary">Sedentary (little or no exercise)</option>
                <option value="light">Light (exercise 1-3 times/week)</option>
                <option value="moderate">Moderate (exercise 3-5 times/week)</option>
                <option value="active">Active (exercise 6-7 times/week)</option>
                <option value="very-active">Very Active (intense exercise daily)</option>
              </select>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Let's Get Started</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Tell us about yourself to get personalized nutrition recommendations
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="mb-8">
            <div className="flex justify-between items-center">
              {[1, 2, 3].map((stepNumber) => (
                <div
                  key={stepNumber}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    stepNumber === step
                      ? 'bg-orange-600 text-white'
                      : stepNumber < step
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {stepNumber}
                </div>
              ))}
            </div>
          </div>

          {renderStep()}

          <div className="mt-8 flex justify-between">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                Back
              </button>
            )}
            <button
              onClick={() => step < 3 ? setStep(step + 1) : handleSubmit()}
              className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 ml-auto"
            >
              {step === 3 ? 'Complete' : 'Next'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}