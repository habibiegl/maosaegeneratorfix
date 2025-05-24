import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-8 text-center text-slate-400 bg-slate-900 bg-opacity-70 mt-12 md:mt-16 border-t border-slate-700/50">
      <p className="text-sm">&copy; {currentYear} Maosae Image Generator. Dibangun dengan Penuh Semangat.</p>
      <p className="text-xs mt-2">Ditenagai oleh Gemini API dari Google.</p>
    </footer>
  );
};