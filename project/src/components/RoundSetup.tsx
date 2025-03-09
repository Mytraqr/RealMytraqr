import React from 'react';
import { Calendar } from 'lucide-react';

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

interface RoundSetupProps {
  courses: Course[];
  onStartRound: (courseId: string, date: string, conditions: string) => void;
}

export default function RoundSetup({ courses, onStartRound }: RoundSetupProps) {
  const [courseId, setCourseId] = React.useState('');
  const [date, setDate] = React.useState(new Date().toISOString().split('T')[0]);
  const [conditions, setConditions] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (courseId && date && conditions) {
      onStartRound(courseId, date, conditions);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Start New Round</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg shadow-sm p-6">
        <div>
          <label htmlFor="course" className="block text-sm font-medium text-gray-700">
            Select Course *
          </label>
          <select
            id="course"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            required
          >
            <option value="">Choose a course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name} ({course.teePosition} tees)
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date *
          </label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="conditions" className="block text-sm font-medium text-gray-700">
            Course Conditions *
          </label>
          <select
            id="conditions"
            value={conditions}
            onChange={(e) => setConditions(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            required
          >
            <option value="">Select conditions</option>
            <option value="poor">Poor</option>
            <option value="fair">Fair</option>
            <option value="good">Good</option>
            <option value="excellent">Excellent</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
        >
          Start Round
        </button>
      </form>
    </div>
  );
}