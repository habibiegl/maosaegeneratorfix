import React from 'react';
import { APP_TITLE, APP_DESCRIPTION } from '../constants';

export const Header: React.FC = () => {
  return (
    <header className="py-6 md:py-8 text-center bg-slate-900 bg-opacity-70 shadow-lg border-b border-slate-700/50">
      <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400"
          style={{ textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
        {APP_TITLE}
      </h1>
      <p className="mt-3 text-base md:text-lg text-slate-300 max-w-2xl mx-auto px-4">
        {APP_DESCRIPTION}
      </p>
    </header>
  );
};