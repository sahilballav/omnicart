import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, ShoppingBag, Database, Check, ShieldCheck } from 'lucide-react';
import { Product } from '../types/product';
import { useCart } from '../context/CartContext';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addToCart, items } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  // Close modal on Escape key press (R-32)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const cartItem = items.find((i) => i.product.id === product.id);
  const existingQtyInCart = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  const formatKey = (key: string): string => {
    return key
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const renderAttributeValue = (val: unknown): React.ReactNode => {
    if (Array.isArray(val)) {
      return (
        <div className="flex flex-wrap gap-1 mt-1">
          {val.map((item, idx) => (
            <span
              key={idx}
              className="inline-block text-[11px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700"
            >
              {String(item)}
            </span>
          ))}
        </div>
      );
    }
    if (typeof val === 'boolean') {
      return (
        <span
          className={`inline-flex items-center text-xs px-2 py-0.5 rounded font-medium ${
            val
              ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
          }`}
        >
          {val ? 'Supported' : 'Not supported'}
        </span>
      );
    }
    return <span className="text-slate-800 dark:text-slate-200 font-mono text-xs">{String(val)}</span>;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
    >
      <div className="relative bg-white dark:bg-black rounded-xl max-w-3xl w-full shadow-2xl border border-slate-200 dark:border-neutral-800 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-lg hover:bg-slate-100 dark:hover:bg-neutral-900 text-slate-500 dark:text-slate-400 flex items-center justify-center transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column: Image preview */}
            <div>
              <div className="aspect-[16/10] rounded-lg overflow-hidden bg-slate-100 dark:bg-black border border-slate-200 dark:border-neutral-800 mb-3">
                <img
                  src={product.images[selectedImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`w-14 h-10 rounded overflow-hidden border transition-all ${
                        selectedImageIndex === idx
                          ? 'border-blue-600 ring-1 ring-blue-600'
                          : 'border-slate-200 dark:border-neutral-800 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Information & Specs */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1.5 text-xs">
                  <span className="font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[11px]">
                    {product.brand}
                  </span>
                  <span className="text-slate-300 dark:text-slate-700">/</span>
                  <span className="text-slate-500 dark:text-slate-400">{product.category}</span>
                </div>

                <h2 id="modal-title" className="text-xl font-bold text-slate-900 dark:text-white leading-snug mb-2">
                  {product.name}
                </h2>

                <div className="flex items-center gap-2 mb-4 text-xs font-mono text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded text-slate-700 dark:text-slate-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Verified Architecture</span>
                  </span>
                  <span className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded">
                    {String(product.attributes.version || 'v1.0.0')}
                  </span>
                </div>

                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.compareAtPrice && (
                    <span className="text-xs text-slate-400 line-through">
                      ${product.compareAtPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                  {product.description}
                </p>

                {/* PostgreSQL JSONB Attribute Inspector */}
                <div className="mb-6 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-800 p-3.5">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2.5">
                    <Database className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                    <span>Technical Specifications (JSONB)</span>
                  </div>

                  <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                    {Object.entries(product.attributes).map(([key, val]) => (
                      <div
                        key={key}
                        className="bg-white dark:bg-slate-900 p-2 rounded border border-slate-200/80 dark:border-slate-800 flex items-start justify-between gap-2"
                      >
                        <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 shrink-0">
                          {formatKey(key)}:
                        </span>
                        <div className="text-right">{renderAttributeValue(val)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Purchase Actions */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between gap-4 mb-3">
                  <div className="text-xs text-slate-600 dark:text-slate-400">
                    <span>License Seats: </span>
                    {existingQtyInCart > 0 && (
                      <span className="text-slate-500">({existingQtyInCart} in cart)</span>
                    )}
                  </div>

                  {/* Quantity Modifier */}
                  <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded bg-slate-50 dark:bg-slate-800">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                      className="px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-l transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
                    </button>
                    <span className="w-8 text-center font-mono text-xs text-slate-800 dark:text-slate-200">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-r transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`w-full py-2.5 px-4 rounded-lg font-semibold text-xs flex items-center justify-center gap-2 transition-colors ${
                    justAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white'
                  }`}
                >
                  {justAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Cart</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart: ${(product.price * quantity).toFixed(2)}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
