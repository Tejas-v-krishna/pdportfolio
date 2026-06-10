import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="px-6 sm:px-12 md:px-16 lg:px-20 w-full pb-10">
      <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-[0_4px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col md:flex-row justify-between gap-12">
        
        {/* On Repeat */}
        <div>
          <h3 className="font-display font-bold text-xl text-[var(--color-text-dark)] mb-4">On repeat</h3>
          <div className="w-[300px] h-[80px] bg-red-800 rounded-xl overflow-hidden flex items-center justify-center text-white opacity-80">
            {/* Spotify Widget Placeholder */}
            <span className="text-sm font-medium">Spotify Placeholder</span>
          </div>
        </div>

        {/* Links Grid */}
        <div className="flex gap-16 lg:gap-32">
          
          <div className="flex flex-col gap-3">
            <h3 className="font-display font-bold text-xl text-[var(--color-text-dark)] mb-1">Navigation</h3>
            <Link to="/" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Recent work</Link>
            <Link to="/play" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Fun Stuff</Link>
            <Link to="/about" className="text-sm opacity-70 hover:opacity-100 transition-opacity">About me</Link>
            <a href="mailto:tejas@example.com" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Contact</a>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-display font-bold text-xl text-[var(--color-text-dark)] mb-1">Links</h3>
            <a href="https://linkedin.com/in/tejas-v-krishna" className="text-sm opacity-70 hover:opacity-100 transition-opacity">LinkedIn</a>
            <a href="#" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Github</a>
            <a href="#" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Resume</a>
            <a href="#" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Medium</a>
          </div>

        </div>

      </div>
    </footer>
  );
};
