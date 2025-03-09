import React from 'react';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  image: string;
}

export default function Testimonial({ quote, author, role, image }: TestimonialProps) {
  return (
    <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-6">
      <div className="flex items-center space-x-4 mb-4">
        <img src={image} alt={author} className="w-12 h-12 rounded-full object-cover" />
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">{author}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">{role}</p>
        </div>
      </div>
      <p className="text-gray-700 dark:text-gray-200 italic">"{quote}"</p>
    </div>
  );
}