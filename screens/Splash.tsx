
import React from 'react';

const SplashScreen: React.FC = () => {
  return (
    <div className="flex-1 bg-black flex flex-col items-center justify-center animate-in fade-in duration-1000">
      <div className="relative">
        <div className="w-24 h-24 border-4 border-white border-t-transparent rounded-full animate-spin absolute -top-4 -left-4 opacity-20"></div>
        <h1 className="text-white text-5xl font-serif tracking-tighter z-10">VV</h1>
      </div>
      <p className="text-gray-400 mt-6 tracking-[0.3em] text-xs uppercase font-medium">VogueVision AR</p>
    </div>
  );
};

export default SplashScreen;
