import React, { useState } from 'react';
import { X, Star, Shield, DownloadCloud, RefreshCw, Plus, Minus, ShoppingBag, Database, Check, Key } from 'lucide-react';
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

  if (!product) return null;

  const cartItem = items.find((i) => i.product.id === product.id);
  const existingQtyInCart = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
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
              className="inline-block text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-2 py-0.5 rounded font-mono font-medium border border-slate-200 dark:border-slate-700"
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
          className={`inline-flex items-center text-xs px-2 py-0.5 rounded font-semibold ${
            val
              ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
          }`}
        >
          {val ? 'Included / Active' : 'Not Included'}
        </span>
      );
    }
    return <span className="text-slate-800 dark:text-slate-200 font-medium text-xs font-mono">{String(val)}</span>;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative bg-white dark:bg-slate-900 rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden max-h-[92vh] flex flex-col transition-colors">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left: Product Media Preview */}
            <div>
              <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-slate-800 mb-3 relative shadow-inner">
                <img
                  src={product.images[selectedImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
                {product.isFeatured && (
                  <span className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1.5">
                    <DownloadCloud className="w-3.5 h-3.5" /> Featured Asset
                  </span>
                )}
                <div className="absolute bottom-3 right-3 bg-slate-900/80 text-white text-[11px] px-2.5 py-1 rounded-md backdrop-blur-md border border-slate-700 flex items-center gap-1">
                  <Key className="w-3 h-3 text-emerald-400" /> Digital License
                </div>
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2 mb-6">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`w-18 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImageIndex === idx
                          ? 'border-indigo-600 shadow-md scale-105'
                          : 'border-slate-200 dark:border-slate-800 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Digital Trust Badges */}
              <div className="grid grid-cols-3 gap-2 p-3.5 bg-slate-50 dark:bg-slate-950/80 rounded-2xl border border-slate-100 dark:border-slate-800 text-center text-[11px] text-slate-700 dark:text-slate-300">
                <div className="flex flex-col items-center gap-1">
                  <DownloadCloud className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span className="font-semibold">Instant Access</span>
                  <span className="text-[9px] text-slate-400 dark:text-slate-500 leading-none">Cloud CDN / Git</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <RefreshCw className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="font-semibold">Lifetime Updates</span>
                  <span className="text-[9px] text-slate-400 dark:text-slate-500 leading-none">Free patches</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Shield className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span className="font-semibold">Full Commercial</span>
                  <span className="text-[9px] text-slate-400 dark:text-slate-500 leading-none">Royalty-free</span>
                </div>
              </div>
            </div>

            {/* Right: Info & Dynamic Schema Attributes */}
            <div className="flex flex-col justify-between">
              <div>
                {/* Brand & Category */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-0.5 rounded-md">
                    {product.brand}
                  </span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{product.category}</span>
                </div>

                <h2 className="text-2xl font-black text-slate-900 dark:text-white leading-snug mb-2">
                  {product.name}
                </h2>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300 dark:text-slate-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{product.rating}</span>
                  <span className="text-xs text-slate-400 dark:text-slate-500">({product.reviewCount} verified developers)</span>
                </div>

                {/* Price block */}
                <div className="flex items-baseline gap-3 mb-4 p-3 bg-slate-50 dark:bg-slate-950/80 rounded-xl border border-slate-100 dark:border-slate-800">
                  <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.compareAtPrice && (
                    <>
                      <span className="text-sm text-slate-400 dark:text-slate-500 line-through">
                        ${product.compareAtPrice.toFixed(2)}
                      </span>
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                        Save ${(product.compareAtPrice - product.price).toFixed(2)}
                      </span>
                    </>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                  {product.description}
                </p>

                {/* Dynamic PostgreSQL JSONB Attributes Table */}
                <div className="mb-6 bg-slate-50/90 dark:bg-slate-950/80 rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-3">
                    <Database className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    <span>Digital Asset Specs (PostgreSQL JSONB)</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-48 overflow-y-auto pr-1">
                    {Object.entries(product.attributes).map(([key, val]) => (
                      <div
                        key={key}
                        className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between"
                      >
                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-0.5">
                          {formatKey(key)}
                        </span>
                        <div>{renderAttributeValue(val)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Purchase Actions */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between gap-4 mb-3">
                  {/* License Seats Notice */}
                  <div className="text-xs">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Digital Delivery: </span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      Instant Access Key & Signed Download
                    </span>
                    {existingQtyInCart > 0 && (
                      <div className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">
                        ({existingQtyInCart} license seats currently in cart)
                      </div>
                    )}
                  </div>

                  {/* License Seats Modifier */}
                  <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                      className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-l-xl disabled:opacity-40 transition-colors"
                      title="Decrease seats"
                    >
                      <Minus className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />
                    </button>
                    <span className="w-10 text-center font-bold text-xs text-slate-800 dark:text-slate-200">
                      {quantity} {quantity === 1 ? 'seat' : 'seats'}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-r-xl transition-colors"
                      title="Add seats"
                    >
                      <Plus className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />
                    </button>
                  </div>
                </div>

                {/* Add to Cart button */}
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                    justAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-indigo-500/25'
                  }`}
                >
                  {justAdded ? (
                    <>
                      <Check className="w-5 h-5 animate-scale-in" />
                      <span>Added to Synchronized Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5" />
                      <span>Add License to Cart • ${(product.price * quantity).toFixed(2)}</span>
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
