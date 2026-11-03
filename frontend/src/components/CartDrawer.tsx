import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingCart, Key, CheckCircle2, ShieldCheck, DownloadCloud } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isOpen,
    toggleCart,
    totalQuantity,
    subtotal,
    estimatedTax,
    total,
    updateQuantity,
    removeFromCart,
    clearCart
  } = useCart();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  if (!isOpen) return null;

  const handleSimulateCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutComplete(true);
      setTimeout(() => {
        clearCart();
        setCheckoutComplete(false);
        toggleCart(false);
      }, 3000);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
        onClick={() => toggleCart(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 shadow-2xl flex flex-col justify-between border-l border-slate-200 dark:border-slate-800 transition-colors">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/80">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                  <ShoppingCart className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">Digital Cart & Licenses</h2>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    {totalQuantity} {totalQuantity === 1 ? 'license seat' : 'license seats'} • Redis Cache Active
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {items.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-xs text-rose-500 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300 font-semibold px-2 py-1 rounded hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
                  >
                    Clear
                  </button>
                )}
                <button
                  onClick={() => toggleCart(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors"
                  aria-label="Close cart"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Instant Delivery Banner */}
            {items.length > 0 && (
              <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl border border-emerald-200/80 dark:border-emerald-800/60 flex items-center gap-2 text-xs text-emerald-800 dark:text-emerald-300">
                <DownloadCloud className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>
                  <strong className="font-bold">Instant Cloud Delivery:</strong> Download keys and repo access granted immediately upon Kafka checkout.
                </span>
              </div>
            )}
          </div>

          {/* Checkout Completed State */}
          {checkoutComplete ? (
            <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">License Provisioned!</h3>
              <div className="bg-slate-900 dark:bg-slate-950 text-slate-200 p-3 rounded-xl font-mono text-xs w-full mb-4 text-left border border-slate-800">
                <div className="text-emerald-400 font-bold mb-1">✓ OrderPlaced Event Dispatched</div>
                <div className="text-[11px] text-slate-400">Kafka Topic: <span className="text-amber-300">omnicart.orders.placed</span></div>
                <div className="text-[11px] text-slate-400">Payload: <span className="text-cyan-300">DigitalLicensesGenerated</span></div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mb-4">
                Access tokens and private GitHub repo invitations have been dispatched to your account.
              </p>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Clearing cart and syncing Redis session...</span>
            </div>
          ) : items.length === 0 ? (
            /* Empty State */
            <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center mb-4">
                <Key className="w-8 h-8 text-slate-400 dark:text-slate-500" />
              </div>
              <h3 className="text-base font-bold text-slate-800 dark:text-white mb-1">Your cart has no licenses</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mb-6">
                Explore our cloud blueprints, AI agent kits, Spring Boot boilerplates, and design systems.
              </p>
              <button
                onClick={() => toggleCart(false)}
                className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-600/20"
              >
                Browse Digital Catalog
              </button>
            </div>
          ) : (
            /* Cart Items Scrollable List */
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              {items.map(({ product, quantity, selectedLicense }) => (
                <div
                  key={product.id}
                  className="flex gap-3 p-3 bg-white dark:bg-slate-950 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:border-slate-300 dark:hover:border-slate-700 transition-all"
                >
                  {/* Thumbnail */}
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl object-cover bg-slate-900 shrink-0 border border-slate-100 dark:border-slate-800"
                  />

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                          {product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-1.5 py-0.2 rounded">
                          {product.brand}
                        </span>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 truncate max-w-[150px]">
                          {selectedLicense}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="text-xs font-black text-slate-900 dark:text-white">
                        ${(product.price * quantity).toFixed(2)}
                      </div>

                      {/* Seats / Quantity Modifier */}
                      <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-l-md transition-colors"
                          aria-label="Decrease seats"
                        >
                          <Minus className="w-3 h-3 text-slate-600 dark:text-slate-300" />
                        </button>
                        <span className="w-8 text-center font-bold text-xs text-slate-800 dark:text-slate-200">
                          {quantity} {quantity === 1 ? 'st' : 'sts'}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-r-md transition-colors"
                          aria-label="Increase seats"
                        >
                          <Plus className="w-3 h-3 text-slate-600 dark:text-slate-300" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Footer / Summary */}
          {items.length > 0 && !checkoutComplete && (
            <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/80 space-y-3">
              {/* Architecture Info Pill */}
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200/80 dark:border-slate-800">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Synchronized via Redis cache • Instant digital provisioning</span>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Digital Delivery & Repo Setup</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">FREE ($0.00)</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (8.25%)</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">${estimatedTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-black text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-800">
                  <span>Total</span>
                  <span className="text-base text-indigo-600 dark:text-indigo-400">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleSimulateCheckout}
                disabled={isCheckingOut}
                className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25 transition-all"
              >
                {isCheckingOut ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Publishing OrderPlaced to Kafka...</span>
                  </>
                ) : (
                  <>
                    <span>Generate Licenses & Access</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
