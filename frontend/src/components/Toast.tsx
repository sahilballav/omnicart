import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2, ArrowRight, X, Sparkles } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast, dismissToast, toggleCart } = useCart();

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      dismissToast();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, dismissToast]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-slide-up shadow-2xl">
      <div className="bg-slate-950/95 text-white border border-indigo-500/50 rounded-2xl p-4 backdrop-blur-md shadow-[0_10px_30px_rgba(79,70,229,0.3)] flex items-center justify-between gap-3">
        {/* Thumbnail & Checkmark */}
        <div className="relative shrink-0">
          <img
            src={toast.product.images[0]}
            alt=""
            className="w-12 h-12 rounded-xl object-cover border border-indigo-400/40"
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center border-2 border-slate-950 shadow-sm animate-scale-in">
            <CheckCircle2 className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Text Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 text-[11px] text-indigo-400 font-semibold mb-0.5">
            <Sparkles className="w-3 h-3 text-indigo-400" />
            <span>Added to Cart (+{toast.quantity})</span>
          </div>
          <h4 className="text-xs font-bold text-white truncate">
            {toast.product.name}
          </h4>
          <p className="text-[11px] text-slate-400 font-medium">
            ${(toast.product.price * toast.quantity).toFixed(2)} • Redis Session Sync
          </p>
        </div>

        {/* Action Button & Close */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => {
              toggleCart(true);
              dismissToast();
            }}
            className="px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold rounded-lg flex items-center gap-1 shadow-sm transition-all"
          >
            <span>Cart</span>
            <ArrowRight className="w-3 h-3" />
          </button>
          <button
            onClick={dismissToast}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

