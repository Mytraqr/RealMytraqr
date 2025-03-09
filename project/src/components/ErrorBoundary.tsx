import React from 'react';
import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

export default function ErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();

  let errorMessage = 'An unexpected error occurred';
  
  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText || error.data?.message || 'Page not found';
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="text-center">
        <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Oops! Something went wrong
        </h1>
        <p className="mt-2 text-base text-gray-500 dark:text-gray-400">{errorMessage}</p>
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="text-sm font-medium text-orange-600 hover:text-orange-500"
          >
            Go back
          </button>
          <button
            onClick={() => navigate('/')}
            className="text-sm font-medium text-orange-600 hover:text-orange-500"
          >
            Go home
          </button>
        </div>
      </div>
    </div>
  );
}