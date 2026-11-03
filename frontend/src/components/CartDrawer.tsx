import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingCart, Key, CheckCircle2 } from 'lucide-react';
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
      }, 2500);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 dark:bg-black/70 backdrop-blur-xs transition-opacity"
        onClick={() => toggleCart(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 shadow-xl flex flex-col justify-between border-l border-slate-200 dark:border-slate-800 transition-colors">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-slate-700 dark:text-slate-300" />
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">Shopping Cart</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {items.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 font-medium px-2 py-1 rounded transition-colors"
                >
                  Clear all
                </button>
              )}
              <button
                onClick={() => toggleCart(false)}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center transition-colors"
                aria-label="Close cart"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Checkout Completed State */}
          {checkoutComplete ? (
            <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Order Completed</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mb-4">
                Order event published to Kafka broker. Access keys and repository invites have been issued.
              </p>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Updating cart...</span>
            </div>
          ) : items.length === 0 ? (
            /* Empty State */
            <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mb-4">
                <Key className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-semibold text-slate-800 dark:text-white mb-1">Your cart is empty</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mb-5">
                Browse our cloud blueprints, microservices, and developer tools.
              </p>
              <button
                onClick={() => toggleCart(false)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                Explore Products
              </button>
            </div>
          ) : (
            /* Cart Items Scrollable List */
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
              {items.map(({ product, quantity, selectedLicense }) => (
                <div
                  key={product.id}
                  className="flex gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-800"
                >
                  {/* Thumbnail */}
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-16 h-16 rounded object-cover bg-slate-200 dark:bg-slate-700 shrink-0"
                  />

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-semibold text-slate-900 dark:text-white line-clamp-1">
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
                        <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                          {selectedLicense}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        ${(product.price * quantity).toFixed(2)}
                      </div>

                      {/* Quantity Modifier */}
                      <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="px-2 py-0.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-l transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3 text-slate-600 dark:text-slate-300" />
                        </button>
                        <span className="w-6 text-center font-mono text-xs text-slate-800 dark:text-slate-200">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="px-2 py-0.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-r transition-colors"
                          aria-label="Increase quantity"
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
            <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Digital Delivery</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (8.25%)</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">${estimatedTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-900 dark:text-white pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleSimulateCheckout}
                disabled={isCheckingOut}
                className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 disabled:opacity-50 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                {isCheckingOut ? (
                  <span>Processing Checkout...</span>
                ) : (
                  <>
                    <span>Checkout</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
