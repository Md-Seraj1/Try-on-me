
import React, { useState, useEffect } from 'react';
import { AppScreen, Product, Category, Demographic } from './types';
import SplashScreen from './screens/Splash';
import OnboardingScreen from './screens/Onboarding';
import HomeScreen from './screens/Home';
import ProductListScreen from './screens/ProductList';
import TryOnScreen from './screens/TryOn';
import ProfileScreen from './screens/Profile';


const App: React.FC = () => {
  const [screen, setScreen] = useState<AppScreen>('SPLASH');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category>('Eyewear');
  const [selectedDemographic, setSelectedDemographic] = useState<Demographic>('Women');

  useEffect(() => {
    if (screen === 'SPLASH') {
      const timer = setTimeout(() => {
        setScreen('ONBOARDING');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [screen]);

  const navigateToProductList = (category: Category, demographic: Demographic) => {
    setSelectedCategory(category);
    setSelectedDemographic(demographic);
    setScreen('PRODUCT_LIST');
  };

  const startTryOn = (product: Product) => {
    setSelectedProduct(product);
    setScreen('TRY_ON');
  };

  const renderScreen = () => {
    switch (screen) {
      case 'SPLASH':
        return <SplashScreen />;
      case 'ONBOARDING':
        return <OnboardingScreen onComplete={() => setScreen('HOME')} />;
      case 'HOME':
        return <HomeScreen 
          onNavigateToProfile={() => setScreen('PROFILE')}
          onCategoryClick={navigateToProductList}
          onProductClick={startTryOn}
        />;
      case 'PRODUCT_LIST':
        return <ProductListScreen 
          category={selectedCategory}
          demographic={selectedDemographic}
          onBack={() => setScreen('HOME')}
          onProductClick={startTryOn}
        />;
      case 'TRY_ON':
        return <TryOnScreen 
          product={selectedProduct} 
          onBack={() => setScreen('PRODUCT_LIST')} 
        />;
      case 'PROFILE':
        return <ProfileScreen 
          onBack={() => setScreen('HOME')} 
        />;
      default:
        return <HomeScreen 
          onNavigateToProfile={() => setScreen('PROFILE')}
          onCategoryClick={navigateToProductList}
          onProductClick={startTryOn}
        />;
    }
  };

  return (
    <div className="max-w-md mx-auto h-screen bg-white relative overflow-hidden shadow-2xl flex flex-col antialiased">
      {renderScreen()}
      
      {/* Universal Bottom Navigation */}
      {['HOME', 'PRODUCT_LIST', 'PROFILE'].includes(screen) && (
        <nav className="fixed bottom-0 max-w-md w-full bg-white/95 backdrop-blur-xl border-t border-gray-100 px-10 py-5 flex justify-between items-center z-50">
          <button 
            onClick={() => setScreen('HOME')}
            className={`flex flex-col items-center gap-2 transition-colors ${screen === 'HOME' ? 'text-black' : 'text-gray-300'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-[9px] font-black uppercase tracking-[0.2em]">Home</span>
          </button>
          
          <button 
            onClick={() => setScreen('PRODUCT_LIST')}
            className={`flex flex-col items-center gap-2 transition-colors ${screen === 'PRODUCT_LIST' ? 'text-black' : 'text-gray-300'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
            <span className="text-[9px] font-black uppercase tracking-[0.2em]">Styles</span>
          </button>

          <button 
            onClick={() => setScreen('PROFILE')}
            className={`flex flex-col items-center gap-2 transition-colors ${screen === 'PROFILE' ? 'text-black' : 'text-gray-300'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-[9px] font-black uppercase tracking-[0.2em]">Me</span>
          </button>
        </nav>
      )}
    </div>
  );
};

export default App;
