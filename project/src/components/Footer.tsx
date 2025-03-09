import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-semibold mb-4">Traqr</h3>
            <p className="text-sm">Track your golf stats, analyze your performance, and improve your game.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/mytraqr/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://www.youtube.com/@MyTraqrdotcom" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
            <div className="mt-4">
              <p className="text-sm">Contact: mytraqr@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-sm text-center">
          © {new Date().getFullYear()} Traqr. All rights reserved.
        </div>
      </div>
    </footer>
  );
}