
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Product } from '../types';
import { editImageWithGemini } from '../services/geminiService';

interface TryOnProps {
  product: Product | null;
  onBack: () => void;
  onAddToCart?: (product: Product) => void;
}

const TryOnScreen: React.FC<TryOnProps> = ({ product, onBack, onAddToCart }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [processing, setProcessing] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [showCaptureFeedback, setShowCaptureFeedback] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const [overlayPos, setOverlayPos] = useState({ x: 50, y: 35, scale: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, initialX: 50, initialY: 35 });

  const triggerHaptic = useCallback((pattern: number | number[] = 10) => {
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(pattern);
    }
  }, []);

  useEffect(() => {
    async function setupCamera() {
      try {
        const s = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'user', width: { ideal: 1080 }, height: { ideal: 1920 } }, 
          audio: false 
        });
        setStream(s);
        if (videoRef.current) videoRef.current.srcObject = s;
      } catch (err) {
        console.error("Camera access error:", err);
      }
    }
    setupCamera();
    return () => stream?.getTracks().forEach(t => t.stop());
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (capturedImage) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY, initialX: overlayPos.x, initialY: overlayPos.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || capturedImage) return;
    const dx = ((e.clientX - dragStart.current.x) / window.innerWidth) * 100;
    const dy = ((e.clientY - dragStart.current.y) / window.innerHeight) * 100;
    setOverlayPos(prev => ({
      ...prev,
      x: Math.max(0, Math.min(100, dragStart.current.initialX + dx)),
      y: Math.max(0, Math.min(100, dragStart.current.initialY + dy))
    }));
  };

  const handleCapture = async () => {
    if (videoRef.current && canvasRef.current && product) {
      triggerHaptic([30, 50, 30]);
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const base64Image = canvas.toDataURL('image/jpeg');
        setCapturedImage(base64Image);
        setShowCaptureFeedback(true);
        setTimeout(() => setShowCaptureFeedback(false), 2000);

        setProcessing(true);
        const autoPrompt = `High-end fashion fit for the ${product.name}. Ensure natural draping and high-quality textures.`;
        const result = await editImageWithGemini(base64Image, product.imageUrl, autoPrompt);
        if (result) {
          triggerHaptic(50);
          setCapturedImage(result);
          setIsEditing(true);
        } else {
          // If AI fails, we still keep the photo so they can retake
          // Alert is already handled in service or we can add specific message here
        }
        setProcessing(false);
      }
    }
  };

  return (
    <div className="flex-1 bg-black relative flex flex-col overflow-hidden select-none">
      {cameraError && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 text-white p-6 text-center">
            <div>
                <p className="text-xl font-bold mb-4">Camera Error</p>
                <p>{cameraError}</p>
                <button onClick={onBack} className="mt-6 bg-white text-black px-6 py-2 rounded-full font-bold">Go Back</button>
            </div>
        </div>
      )}
      <div className="flex-1 relative bg-neutral-900 overflow-hidden">
        {!capturedImage ? (
          <>
            <video ref={videoRef} autoPlay playsInline muted className="absolute inset-0 w-full h-full object-cover scale-x-[-1]" />
            {showOverlay && product && (
              <div 
                onPointerDown={handlePointerDown} 
                onPointerMove={handlePointerMove} 
                onPointerUp={() => setIsDragging(false)}
                className={`absolute touch-none cursor-move group transition-all duration-300 ${isDragging ? 'scale-110' : 'scale-100 opacity-90'}`}
                style={{ 
                  left: `${overlayPos.x}%`, 
                  top: `${overlayPos.y}%`, 
                  transform: `translate(-50%, -50%) scale(${overlayPos.scale})`, 
                  width: product.type === 'face' ? '30%' : '50%', 
                  zIndex: 30 
                }}
              >
                {/* Product Reference Visual */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 -m-2"></div>
                  <img 
                    src={product.imageUrl} 
                    alt="product reference" 
                    className="w-full h-auto relative z-10 drop-shadow-2xl rounded-xl"
                  />
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-xl px-4 py-1.5 rounded-full border border-white/10 z-20">
                     <span className="text-[9px] text-white font-black uppercase tracking-[0.2em] whitespace-nowrap">
                       {product.brand} • {product.category}
                     </span>
                  </div>
                </div>
              </div>
            )}
            <div className="absolute bottom-36 inset-x-0 flex justify-center pointer-events-none z-20">
              <div className="bg-black/40 backdrop-blur-xl px-6 py-3 rounded-full border border-white/10 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <p className="text-white text-[10px] uppercase font-black tracking-[0.2em]">
                  Align {product?.type === 'face' ? 'face' : 'body'} & Capture
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 w-full h-full">
            <img src={capturedImage} alt="result" className="w-full h-full object-cover animate-in fade-in duration-700" />
            
            {/* AI Scanning Beam Effect */}
            {processing && (
              <div className="absolute inset-0 z-40 pointer-events-none">
                <div className="w-full h-[2px] bg-white/80 shadow-[0_0_20px_white] animate-[scan_2s_infinite]"></div>
              </div>
            )}
          </div>
        )}

        {showCaptureFeedback && (
          <div className="absolute inset-0 bg-white z-50 animate-out fade-out duration-1000 pointer-events-none"></div>
        )}

        {/* Header Controls */}
        <div className="absolute top-12 inset-x-6 flex justify-between items-center z-30">
          <button 
            onClick={() => capturedImage ? (setCapturedImage(null), setIsEditing(false)) : onBack()} 
            className="w-12 h-12 bg-black/40 backdrop-blur-2xl rounded-full flex items-center justify-center text-white border border-white/10 hover:bg-black/60 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {capturedImage && !processing && (
            <div className="flex gap-2">
               <span className="bg-green-500/20 backdrop-blur-xl text-green-400 text-[9px] px-4 py-2 rounded-full border border-green-500/30 font-black uppercase tracking-widest">
                 AI Enhanced
               </span>
            </div>
          )}
        </div>

        <canvas ref={canvasRef} className="hidden" />

        {processing && (
          <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-2xl flex flex-col items-center justify-center">
             <div className="relative mb-8">
               <div className="w-24 h-24 border-4 border-white/5 rounded-full"></div>
               <div className="w-24 h-24 border-t-4 border-white rounded-full animate-spin absolute inset-0"></div>
             </div>
             <h2 className="text-white font-serif text-3xl tracking-tight mb-2">Refining Fit</h2>
             <p className="text-white/40 text-[10px] uppercase font-black tracking-[0.4em]">Applying {product?.material}</p>
          </div>
        )}
      </div>

      {/* Footer Controls */}
      <div className="bg-black/95 backdrop-blur-3xl border-t border-white/10 p-8 z-30">
        {!isEditing ? (
          <div className="flex flex-col gap-8">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-white/40 text-[9px] font-black uppercase tracking-[0.3em] mb-1">{product?.brand}</span>
                <span className="text-white text-xl font-medium">{product?.name}</span>
              </div>
              <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-full px-4 py-2">
                <span className="text-white/40 text-[10px] font-bold">Size</span>
                <input 
                  type="range" 
                  min="0.4" 
                  max="1.8" 
                  step="0.01" 
                  value={overlayPos.scale} 
                  onChange={(e) => setOverlayPos(prev => ({ ...prev, scale: parseFloat(e.target.value) }))} 
                  className="w-20 accent-white" 
                />
              </div>
            </div>

            {product && onAddToCart && (
              <button
                onClick={() => onAddToCart(product)}
                className="w-full bg-amber-500 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-amber-600 transition-colors shadow-xl"
              >
                Add to Cart
              </button>
            )}

            <div className="flex justify-center items-center gap-14">
              <button 
                onClick={() => setShowOverlay(!showOverlay)} 
                className={`w-14 h-14 rounded-full border border-white/10 flex items-center justify-center transition-all ${showOverlay ? 'bg-white text-black' : 'bg-white/5 text-white'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>

              <button 
                onClick={handleCapture} 
                disabled={processing} 
                className="w-24 h-24 bg-white rounded-full flex items-center justify-center group active:scale-95 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)]"
              >
                <div className="w-20 h-20 border-[3px] border-black rounded-full flex items-center justify-center">
                  <div className="w-14 h-14 bg-black rounded-full scale-0 group-hover:scale-100 transition-transform"></div>
                </div>
              </button>

              <button className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center bg-white/5 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in slide-in-from-bottom duration-500">
            <div className="flex flex-col gap-2">
              <label className="text-white/40 text-[9px] font-black uppercase tracking-[0.3em]">AI Fine-Tuning</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={aiPrompt} 
                  onChange={(e) => setAiPrompt(e.target.value)} 
                  placeholder="Change material, adjust fit, etc..." 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white text-sm focus:outline-none focus:ring-1 focus:ring-white/20 transition-all" 
                />
                <button 
                  onClick={async () => {
                    if (!capturedImage || !aiPrompt || !product) return;
                    setProcessing(true);
                    const result = await editImageWithGemini(capturedImage, product.imageUrl, aiPrompt);
                    if (result) setCapturedImage(result);
                    setProcessing(false);
                  }}
                  disabled={!aiPrompt || processing}
                  className="absolute right-2 top-2 bottom-2 bg-white text-black px-6 rounded-xl font-black text-[10px] uppercase tracking-widest disabled:opacity-50"
                >
                  Adjust
                </button>
              </div>
            </div>
            <div className="flex gap-4">
              <button onClick={() => { setCapturedImage(null); setIsEditing(false); }} className="flex-1 py-4 border border-white/10 rounded-2xl text-white text-[11px] font-black uppercase tracking-widest hover:bg-white/5">
                Retake
              </button>
              {product && onAddToCart && (
                <button 
                  onClick={() => onAddToCart(product)}
                  className="flex-1 py-4 bg-amber-500 rounded-2xl text-white text-[11px] font-black uppercase tracking-widest shadow-xl hover:bg-amber-600 transition-colors"
                >
                  Add to Cart
                </button>
              )}
              <button className="flex-1 py-4 bg-white rounded-2xl text-black text-[11px] font-black uppercase tracking-widest shadow-xl shadow-white/5 hover:bg-gray-100">
                Share Look
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(0); }
          50% { transform: translateY(100vh); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default TryOnScreen;
