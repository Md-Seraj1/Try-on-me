
import React, { useMemo } from 'react';
import { Category, Product, Demographic } from '../types';
import { MOCK_PRODUCTS } from '../constants';

interface ProductListProps {
  category: Category;
  demographic: Demographic;
  onBack: () => void;
  onProductClick: (product: Product) => void;
}

const ProductListScreen: React.FC<ProductListProps> = ({ category, demographic, onBack, onProductClick }) => {
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(p => p.category === category && p.demographic === demographic);
  }, [category, demographic]);

  return (
    <div className="flex-1 bg-white overflow-y-auto pb-24">
      <header className="px-6 pt-12 pb-6 flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-2xl z-20">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-full hover:bg-gray-100 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h2 className="text-2xl font-serif text-black">{category}</h2>
            <p className="text-[9px] text-gray-400 font-black uppercase tracking-[0.2em]">Browsing {demographic} Collections</p>
          </div>
        </div>
        <button className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-full">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
           </svg>
        </button>
      </header>

      <div className="px-6 py-4 grid grid-cols-1 gap-12">
        {filteredProducts.map((product) => (
          <div 
            key={product.id} 
            className="flex flex-col group cursor-pointer"
            onClick={() => onProductClick(product)}
          >
            <div className="relative aspect-[16/10] rounded-[3rem] overflow-hidden bg-gray-50 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
              />
              
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                 <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest text-black shadow-xl w-fit">
                    {product.material}
                 </span>
                 <div className="flex gap-2">
                    {product.features.map((f, idx) => (
                      <span key={idx} className="bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full text-[8px] font-bold uppercase tracking-widest text-white shadow-xl">
                        {f}
                      </span>
                    ))}
                 </div>
              </div>
              
              <div className="absolute bottom-8 inset-x-8 flex justify-between items-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                 <div className="bg-white/95 backdrop-blur-xl px-8 py-4 rounded-[2rem] shadow-2xl flex-1 flex justify-between items-center">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-amber-600">Premium Fit</p>
                      <p className="text-xs text-black font-semibold">AR Virtual Experience Available</p>
                    </div>
                    <button className="bg-black text-white px-8 py-3 rounded-full text-[9px] font-black uppercase tracking-widest">
                       Try-On
                    </button>
                 </div>
              </div>
            </div>
            
            <div className="mt-6 px-4 space-y-3">
              <div className="flex justify-between items-end">
                <div className="flex-1">
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.3em] mb-1">{product.brand}</p>
                  <h4 className="text-xl font-serif text-black leading-tight pr-4">{product.name}</h4>
                </div>
                <p className="text-2xl font-black text-black tracking-tighter">${product.price}</p>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 pr-8">{product.description}</p>
            </div>
          </div>
        ))}
        {filteredProducts.length === 0 && (
          <div className="py-32 flex flex-col items-center justify-center text-center space-y-4">
            <div className="text-4xl">🏷️</div>
            <div>
              <p className="text-black font-bold uppercase text-[10px] tracking-widest">No Items Found</p>
              <p className="text-gray-400 text-xs mt-1">Check back soon for new arrivals.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListScreen;
