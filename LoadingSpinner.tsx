import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="relative h-16 w-16 md:h-20 md:w-20">
        <div className="absolute inset-0 border-4 border-purple-500 rounded-full animate-spin border-t-transparent"></div>
        {/* Fixed: Removed <style jsx> and applied animation-delay via inline style. The class 'animation-delay-[-0.2s]' was removed as it's no longer defined. */}
        <div
          className="absolute inset-2 border-4 border-pink-500 rounded-full animate-spin border-t-transparent"
          style={{ animationDelay: '-0.2s' }}
        ></div>
      </div>
    </div>
  );
};
