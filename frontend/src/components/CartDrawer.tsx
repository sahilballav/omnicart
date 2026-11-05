import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Key, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

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
  const { addPurchasedLicenses, user, loginAsUser } = useAuth();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  if (!isOpen) return null;

  const handleSimulateCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutComplete(true);

      // Create issued Ed25519 licenses for all cart items
      if (items.length > 0) {
        if (!user) {
          // If guest, initialize customer session
          loginAsUser('customer@example.com', 'Acme Systems');
        }
        const newLicenses = items.map((item) => ({
          id: `lic-${Date.now()}-${item.product.id.slice(-4)}`,
          productId: item.product.id,
          productName: item.product.name,
          productSlug: item.product.slug,
          licenseKey: `ED25519-${item.product.slug.slice(0, 4).toUpperCase()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}-2026-OMNI`,
          licenseType: item.selectedLicense || 'Commercial License',
          issuedAt: new Date().toISOString(),
          githubRepo: `https://github.com/omnicart/${item.product.slug}`,
          version: String(item.product.attributes.version || 'v1.0.0')
        }));
        addPurchasedLicenses(newLicenses);
      }

      setTimeout(() => {
        clearCart();
        setCheckoutComplete(false);
        toggleCart(false);
      }, 2500);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-mono">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        onClick={() => toggleCart(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-black text-black dark:text-white shadow-2xl flex flex-col justify-between border-l border-neutral-200 dark:border-[#222222] transition-colors">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-neutral-200 dark:border-[#222222] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-black dark:text-[#d4ff00]" />
              <div>
                <h2 className="text-base font-black uppercase tracking-tight text-black dark:text-white">
                  BAG ({totalQuantity})
                </h2>
                <p className="text-[11px] text-neutral-500 uppercase tracking-widest">
                  CRYPTOGRAPHIC SEAT ALLOCATION
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {items.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-[11px] text-neutral-500 hover:text-black dark:hover:text-[#d4ff00] font-bold uppercase px-2 py-1 transition-colors"
                >
                  CLEAR
                </button>
              )}
              <button
                onClick={() => toggleCart(false)}
                className="w-8 h-8 rounded-none border border-neutral-300 dark:border-[#333] hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-600 dark:text-neutral-400 flex items-center justify-center transition-colors"
                aria-label="Close cart"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Checkout Completed State */}
          {checkoutComplete ? (
            <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-none bg-[#d4ff00] text-black flex items-center justify-center mb-4 shadow-md">
                <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="text-lg font-black uppercase text-black dark:text-white mb-2 tracking-tight">
                ORDER GRANTED
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-xs mb-4 leading-relaxed">
                Order event published to Kafka broker. Ed25519 access tokens and GitHub invitations have been dispatched to your vault.
              </p>
              <span className="text-xs text-[#7d9900] dark:text-[#d4ff00] font-bold uppercase">Updating bag...</span>
            </div>
          ) : items.length === 0 ? (
            /* Empty State */
            <div className="flex-1 p-8 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-12 h-12 rounded-none border border-neutral-300 dark:border-[#333] flex items-center justify-center text-neutral-400">
                <Key className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-black uppercase text-black dark:text-white tracking-wider">
                  BAG IS EMPTY
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-xs mt-1 leading-relaxed">
                  Browse our production blueprints, multi-agent frameworks, and cloud modules.
                </p>
              </div>
              <button
                onClick={() => toggleCart(false)}
                className="px-6 py-3 bg-[#d4ff00] hover:bg-[#bfff00] text-black font-black uppercase text-xs tracking-wider transition-colors"
              >
                EXPLORE MODULES ↗
              </button>
            </div>
          ) : (
            /* Cart Items Scrollable List */
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
              {items.map(({ product, quantity, selectedLicense }) => (
                <div
                  key={product.id}
                  className="flex gap-3 p-3 bg-neutral-50 dark:bg-[#0a0a0a] rounded-none border border-neutral-200 dark:border-[#222222] transition-colors"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-none bg-black border border-neutral-300 dark:border-[#222222] shrink-0 overflow-hidden flex items-center justify-center">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-black uppercase text-black dark:text-white line-clamp-1">
                          {product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="text-neutral-400 hover:text-black dark:hover:text-[#d4ff00] transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[10px] text-neutral-500 uppercase">
                          {selectedLicense}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="text-xs font-black text-black dark:text-white">
                        ${(product.price * quantity).toFixed(2)}
                      </div>

                      {/* Quantity Modifier */}
                      <div className="flex items-center border border-neutral-300 dark:border-[#333] rounded-none bg-white dark:bg-black">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="px-2 py-0.5 hover:bg-neutral-100 dark:hover:bg-[#1a1a1a] transition-colors text-black dark:text-white"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-black dark:text-white">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="px-2 py-0.5 hover:bg-neutral-100 dark:hover:bg-[#1a1a1a] transition-colors text-black dark:text-white"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
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
            <div className="p-4 sm:p-5 border-t border-neutral-200 dark:border-[#222222] bg-neutral-50 dark:bg-[#0a0a0a] space-y-3 transition-colors">
              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-400">
                <div className="flex justify-between">
                  <span>SUBTOTAL</span>
                  <span className="font-bold text-black dark:text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>ED25519 DIGITAL DELIVERY</span>
                  <span className="font-bold text-[#7d9900] dark:text-[#d4ff00]">FREE ($0.00)</span>
                </div>
                <div className="flex justify-between">
                  <span>ESTIMATED TAX (8.25%)</span>
                  <span className="font-bold text-black dark:text-white">${estimatedTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-black text-black dark:text-white pt-2 border-t border-neutral-200 dark:border-[#222222]">
                  <span>TOTAL</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleSimulateCheckout}
                disabled={isCheckingOut}
                className="w-full py-3.5 px-4 bg-[#d4ff00] hover:bg-[#bfff00] text-black font-black uppercase tracking-wider disabled:opacity-50 text-xs flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg rounded-none"
              >
                {isCheckingOut ? (
                  <span>AUTHORIZING CRYPTO TOKEN...</span>
                ) : (
                  <>
                    <span>CHECKOUT ORDER</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
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
