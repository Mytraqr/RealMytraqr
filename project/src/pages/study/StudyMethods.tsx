import React, { useState } from 'react';
import StudyMethodCard from '../../components/study/methods/StudyMethodCard';
import MethodFilters from '../../components/study/methods/MethodFilters';
import { studyMethods } from '../../data/studyMethods';
import { Duration, FocusLevel } from '../../types/study';

export default function StudyMethods() {
  const [selectedCategory, setSelectedCategory] = useState<Duration | 'all'>('all');
  const [selectedFocus, setSelectedFocus] = useState<FocusLevel | 'all'>('all');

  const filteredMethods = studyMethods.filter(method => {
    const durationMatch = selectedCategory === 'all' || method.duration === selectedCategory;
    const focusMatch = selectedFocus === 'all' || method.focusLevel === selectedFocus;
    return durationMatch && focusMatch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Study Methods</h1>
        <p className="text-gray-600 dark:text-gray-400">Discover effective techniques to improve your learning</p>
      </div>

      <MethodFilters
        selectedCategory={selectedCategory}
        selectedFocus={selectedFocus}
        onCategoryChange={setSelectedCategory}
        onFocusChange={setSelectedFocus}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredMethods.map((method) => (
          <StudyMethodCard key={method.name} method={method} />
        ))}
      </div>
    </div>
  );
}