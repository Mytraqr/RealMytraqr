import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoundSetup from '../components/RoundSetup';
import HoleEntry from '../components/HoleEntry';
import { Round } from '../types/round';

interface Course {
  id: string;
  name: string;
  teePosition: string;
  holes: {
    number: number;
    yardage: number;
    par: number;
  }[];
}

export default function EnterRound() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'setup' | 'entry'>('setup');
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [currentRound, setCurrentRound] = useState<Round>({
    id: Date.now().toString(),
    date: new Date().toISOString().split('T')[0],
    courseId: '',
    course: '',
    conditions: '',
    holes: []
  });

  useEffect(() => {
    const savedCourses = localStorage.getItem('courses');
    if (savedCourses) {
      setCourses(JSON.parse(savedCourses));
    }
  }, []);

  const handleStartRound = (courseId: string, date: string, conditions: string) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    setSelectedCourse(course);
    setCurrentRound({
      ...currentRound,
      courseId,
      course: course.name,
      date,
      conditions,
      holes: course.holes.map(hole => ({
        number: hole.number,
        par: hole.par,
        yardage: hole.yardage,
        shots: []
      }))
    });
    setStep('entry');
  };

  const handleUpdateHole = (updatedHole: Round['holes'][0]) => {
    setCurrentRound(prev => ({
      ...prev,
      holes: prev.holes.map(hole => 
        hole.number === updatedHole.number ? updatedHole : hole
      )
    }));
  };

  const handleFinishRound = () => {
    // Save round data
    const savedRounds = JSON.parse(localStorage.getItem('rounds') || '[]');
    const updatedRounds = [...savedRounds, currentRound];
    localStorage.setItem('rounds', JSON.stringify(updatedRounds));

    // Redirect to rounds page
    navigate('/rounds');
  };

  return (
    <div className="space-y-6">
      {step === 'setup' ? (
        <RoundSetup courses={courses} onStartRound={handleStartRound} />
      ) : (
        <HoleEntry
          round={currentRound}
          onUpdateHole={handleUpdateHole}
          onFinishRound={handleFinishRound}
        />
      )}
    </div>
  );
}