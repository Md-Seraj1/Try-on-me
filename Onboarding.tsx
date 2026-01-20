
import React, { useState } from 'react';

interface OnboardingProps {
  onComplete: () => void;
}

const SLIDES = [
  {
    title: "Virtual Try-On",
    description: "Try your favorite luxury products instantly using your camera.",
    image: "https://images.unsplash.com/photo-1598532213005-52257b52d0c5?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "AI Image Editing",
    description: "Personalize your looks using our powerful Gemini-powered AI editor.",
    image: "https://images.unsplash.com/photo-1616489953149-835955374415?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "Global Brands",
    description: "Explore collections from the world's most prestigious luxury brands.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=600"
  }
];

const OnboardingScreen: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < SLIDES.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="flex-1 flex flex-col relative bg-white overflow-hidden">
      <div className="h-2/3 relative">
        <img 
          src={SLIDES[currentSlide].image} 
          alt="onboarding" 
          className="w-full h-full object-cover transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
      </div>
      
      <div className="p-8 flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex gap-2 mb-8">
            {SLIDES.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-1 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-8 bg-black' : 'w-4 bg-gray-200'}`}
              />
            ))}
          </div>
          <h2 className="text-4xl font-serif text-black leading-tight">{SLIDES[currentSlide].title}</h2>
          <p className="text-gray-500 text-lg">{SLIDES[currentSlide].description}</p>
        </div>
        
        <button 
          onClick={nextSlide}
          className="w-full bg-black text-white py-5 rounded-2xl font-bold text-lg hover:bg-neutral-800 transition-colors"
        >
          {currentSlide === SLIDES.length - 1 ? 'Start Exploring' : 'Continue'}
        </button>
      </div>
    </div>
  );
};

export default OnboardingScreen;
