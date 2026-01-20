
import React, { useState, useMemo } from 'react';
import { Category, Product, Demographic } from '../types';
import { MOCK_PRODUCTS } from '../constants';

interface HomeProps {
  onNavigateToProfile: () => void;
  onCategoryClick: (category: Category, demographic: Demographic) => void;
  onProductClick: (product: Product) => void;
}

const CATEGORIES: { name: Category; icon: string }[] = [
  { name: 'Eyewear', icon: '🕶️' },
  { name: 'Jewelry', icon: '💍' },
  { name: 'Apparel', icon: '👔' },
  { name: 'Watches', icon: '⌚' },
  { name: 'Handbags', icon: '👜' },
  { name: 'Footwear', icon: '👟' }
];

const DEMOGRAPHICS: Demographic[] = ['Women', 'Men', 'Child'];

const HomeScreen: React.FC<HomeProps> = ({ onNavigateToProfile, onCategoryClick, onProductClick }) => {
  const [activeDemo, setActiveDemo] = useState<Demographic>('Women');

  const featuredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(p => p.demographic === activeDemo).sort(() => 0.5 - Math.random()).slice(0, 10);
  }, [activeDemo]);

  return (
    <div className="flex-1 bg-white overflow-y-auto pb-24">
      {/* Header */}
      <header className="px-6 pt-12 pb-4 flex justify-between items-center sticky top-0 bg-white/90 backdrop-blur-xl z-20">
        <div>
          <h1 className="text-3xl font-serif text-black tracking-tight">VogueVision</h1>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
            <p className="text-[9px] text-gray-500 font-bold tracking-[0.2em] uppercase">Premium AR Experience</p>
          </div>
        </div>
        <button 
          onClick={onNavigateToProfile}
          className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-50 shadow-sm"
        >
          <img src="https://picsum.photos/seed/fashion/100/100" alt="avatar" />
        </button>
      </header>

      {/* Demographic Filter Tabs */}
      <div className="px-6 mb-8 mt-2 overflow-x-auto no-scrollbar">
        <div className="flex gap-4 p-1 bg-gray-50 rounded-2xl w-full min-w-max">
          {DEMOGRAPHICS.map((demo) => (
            <button
              key={demo}
              onClick={() => setActiveDemo(demo)}
              className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-[0.1em] transition-all ${
                activeDemo === demo 
                  ? 'bg-black text-white shadow-lg shadow-black/10' 
                  : 'text-gray-400 hover:text-black'
              }`}
            >
              {demo}
            </button>
          ))}
        </div>
      </div>

      {/* Hero Banner */}
      <section className="px-6 mb-10">
        <div className="relative h-56 rounded-[2.5rem] overflow-hidden shadow-2xl group">
          <img 
            src={activeDemo === 'Men' 
              ? "https://images.unsplash.com/photo-1488161628813-244a2ceba24b?auto=format&fit=crop&q=80&w=800"
              : activeDemo === 'Women'
              ? "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&q=80&w=800"
              : "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&q=80&w=800"
            } 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
            alt="Hero"
            referrerPolicy="no-referrer"
            crossOrigin="anonymous"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
            <span className="text-amber-400 text-[9px] font-black tracking-[0.3em] uppercase mb-2">Editor's Pick</span>
            <h2 className="text-white text-3xl font-serif mb-4 leading-tight">Elite {activeDemo} Selection</h2>
            <button className="bg-white text-black px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest w-fit shadow-xl hover:bg-gray-100 transition-colors">
              Shop Now
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-6 mb-12">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 text-gray-300">Style Categories</h3>
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button 
              key={cat.name}
              onClick={() => onCategoryClick(cat.name, activeDemo)}
              className="flex flex-col items-center gap-3 shrink-0 group"
            >
              <div className="w-20 h-20 rounded-3xl bg-gray-50 flex items-center justify-center text-3xl shadow-sm border border-transparent group-hover:border-black group-active:scale-90 transition-all duration-300">
                {cat.icon}
              </div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-black">{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Try-On Grid */}
      <section className="px-6 mb-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 mb-1">Recommended</h3>
            <h2 className="text-2xl font-serif text-black">New for {activeDemo}</h2>
          </div>
          <button className="text-[10px] font-black text-black border-b-2 border-amber-500 pb-1 uppercase tracking-widest">
            Explore All
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-x-4 gap-y-10">
          {featuredProducts.map((product) => (
            <div 
              key={product.id} 
              className="flex flex-col group cursor-pointer"
              onClick={() => onProductClick(product)}
            >
              <div className="relative aspect-[4/5] bg-gray-50 rounded-[2.5rem] overflow-hidden border border-gray-100 mb-4 shadow-sm group-hover:shadow-xl transition-all duration-500">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                
                {/* AR Badge */}
                <div className="absolute bottom-4 left-4 z-10 flex flex-col gap-2">
                   <div className="bg-black/80 backdrop-blur-xl text-white text-[8px] px-3 py-2 rounded-full flex items-center gap-2 font-black uppercase tracking-widest">
                     <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse"></span>
                     AR Lens
                   </div>
                </div>

                {/* Material Tag */}
                <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
                   <span className="bg-white/90 backdrop-blur-md text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full text-black shadow-lg">
                      {product.material}
                   </span>
                </div>

                {/* Like Button */}
                <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-xl p-2.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
              
              <div className="px-2 space-y-1">
                <p className="text-[9px] text-amber-600 font-black uppercase tracking-[0.2em]">{product.brand}</p>
                <h4 className="text-sm font-semibold text-black truncate leading-tight">{product.name}</h4>
                <p className="text-[10px] text-gray-400 font-medium italic mb-1">{product.material}</p>
                <p className="text-sm font-black text-black mt-1">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomeScreen;
