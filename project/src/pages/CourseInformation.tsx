import React, { useState, useEffect } from 'react';
import { Plus, Save } from 'lucide-react';
import EmptyState from '../components/EmptyState';

interface Course {
  id: string;
  name: string;
  teePosition: string;
  holes: HoleInfo[];
}

interface HoleInfo {
  number: number;
  yardage: number;
  par: number;
}

export default function CourseInformation() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [showNewCourseForm, setShowNewCourseForm] = useState(false);
  const [newCourse, setNewCourse] = useState<Course>({
    id: '',
    name: '',
    teePosition: '',
    holes: Array.from({ length: 18 }, (_, i) => ({
      number: i + 1,
      yardage: 0,
      par: 4
    }))
  });

  useEffect(() => {
    const savedCourses = localStorage.getItem('courses');
    if (savedCourses) {
      setCourses(JSON.parse(savedCourses));
    }
  }, []);

  if (courses.length === 0 && !showNewCourseForm) {
    return (
      <EmptyState
        type="golf-courses"
        onAction={() => setShowNewCourseForm(true)}
        message="Set Up Your Golf Courses"
        tip="Start with your home course. Add the yardage and par for each hole to enable detailed round tracking."
      />
    );
  }

  const handleSave = () => {
    if (!newCourse.name || !newCourse.teePosition) {
      alert('Please fill in all required fields');
      return;
    }

    const courseWithId = {
      ...newCourse,
      id: Date.now().toString()
    };

    const updatedCourses = [...courses, courseWithId];
    setCourses(updatedCourses);
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
    setShowNewCourseForm(false);
    setNewCourse({
      id: '',
      name: '',
      teePosition: '',
      holes: Array.from({ length: 18 }, (_, i) => ({
        number: i + 1,
        yardage: 0,
        par: 4
      }))
    });
  };

  const updateHole = (index: number, field: 'yardage' | 'par', value: number) => {
    setNewCourse(prev => ({
      ...prev,
      holes: prev.holes.map((hole, i) => {
        if (i === index) {
          return { ...hole, [field]: value };
        }
        return hole;
      })
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Course Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Add and manage your golf courses</p>
        </div>
        {!showNewCourseForm && (
          <button
            onClick={() => setShowNewCourseForm(true)}
            className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Course
          </button>
        )}
      </div>

      {showNewCourseForm ? (
        <div className="bg-gray-900 rounded-lg shadow-sm p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="courseName" className="block text-sm font-medium text-white">
                Course Name *
              </label>
              <input
                type="text"
                id="courseName"
                value={newCourse.name}
                onChange={(e) => setNewCourse(prev => ({ ...prev, name: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-orange-500 focus:ring-orange-500"
                required
              />
            </div>

            <div>
              <label htmlFor="teePosition" className="block text-sm font-medium text-white">
                Tee Position *
              </label>
              <select
                id="teePosition"
                value={newCourse.teePosition}
                onChange={(e) => setNewCourse(prev => ({ ...prev, teePosition: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-orange-500 focus:ring-orange-500"
                required
              >
                <option value="">Select Tee</option>
                <option value="black">Black</option>
                <option value="blue">Blue</option>
                <option value="white">White</option>
                <option value="red">Red</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-medium text-white">Hole Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {newCourse.holes.map((hole, index) => (
                <div key={hole.number} className="bg-white p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-3">Hole {hole.number}</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Yardage *
                      </label>
                      <input
                        type="number"
                        value={hole.yardage || ''}
                        onChange={(e) => updateHole(index, 'yardage', Number(e.target.value))}
                        className="mt-1 block w-full rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Par *
                      </label>
                      <select
                        value={hole.par}
                        onChange={(e) => updateHole(index, 'par', Number(e.target.value))}
                        className="mt-1 block w-full rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                        required
                      >
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setShowNewCourseForm(false)}
              className="px-4 py-2 border border-gray-600 rounded-lg shadow-sm text-white hover:bg-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              <Save className="w-5 h-5 mr-2" />
              Save Course
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{course.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {course.teePosition.charAt(0).toUpperCase() + course.teePosition.slice(1)} tees
              </p>
              <div className="space-y-2">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Par: {course.holes.reduce((sum, hole) => sum + hole.par, 0)}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Yardage: {course.holes.reduce((sum, hole) => sum + hole.yardage, 0)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}