import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { blogPosts } from '../data/blogPosts';

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find(post => post.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Post Not Found</h1>
          <Link to="/blog" className="text-orange-600 hover:text-orange-700">
            Return to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="py-16">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
              <span>{post.category}</span>
              <span className="mx-2">•</span>
              <span>{post.date}</span>
              <span className="mx-2">•</span>
              <span>{post.readTime}</span>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {post.title}
            </h1>

            <div className="text-gray-600 dark:text-gray-300">
              {post.content}
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}