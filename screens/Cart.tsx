
import React from 'react';
import { CartItem } from '../types';

interface CartProps {
  cartItems: CartItem[];
  onBack: () => void;
  onRemoveItem: (productId: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onCheckout: () => void;
}

const CartScreen: React.FC<CartProps> = ({ 
  cartItems, 
  onBack, 
  onRemoveItem, 
  onUpdateQuantity,
  onCheckout 
}) => {
  const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

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
            <h2 className="text-2xl font-serif text-black">Shopping Cart</h2>
            <p className="text-[9px] text-gray-400 font-black uppercase tracking-[0.2em]">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
            </p>
          </div>
        </div>
      </header>

      {cartItems.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-20">
          <div className="text-6xl mb-6">🛒</div>
          <h3 className="text-xl font-serif text-black mb-2">Your cart is empty</h3>
          <p className="text-gray-400 text-sm text-center mb-8">Start adding items to see them here</p>
          <button 
            onClick={onBack}
            className="bg-black text-white px-8 py-4 rounded-full text-sm font-black uppercase tracking-widest hover:bg-neutral-800 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="px-6 py-4 space-y-6">
            {cartItems.map((item) => (
              <div 
                key={item.product.id} 
                className="flex gap-4 bg-gray-50 rounded-[2rem] p-4 border border-gray-100"
              >
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-white shrink-0">
                  <img 
                    src={item.product.imageUrl} 
                    alt={item.product.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                  />
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-[9px] text-amber-600 font-black uppercase tracking-[0.2em] mb-1">
                      {item.product.brand}
                    </p>
                    <h4 className="text-sm font-semibold text-black leading-tight mb-1">
                      {item.product.name}
                    </h4>
                    <p className="text-lg font-black text-black">${item.product.price}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-3 bg-white rounded-full px-3 py-1.5 border border-gray-200">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                        className="w-6 h-6 flex items-center justify-center text-black hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="text-sm font-bold text-black min-w-[2rem] text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center text-black hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                    
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Summary */}
          <div className="px-6 pt-6 pb-8 border-t border-gray-100 bg-white sticky bottom-0">
            <div className="flex justify-between items-center mb-6">
              <span className="text-sm text-gray-500 font-semibold">Total</span>
              <span className="text-2xl font-black text-black">${total.toFixed(2)}</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full bg-black text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-neutral-800 transition-colors shadow-xl"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartScreen;
