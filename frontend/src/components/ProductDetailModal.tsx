import React, { useState } from 'react';
import { X, Star, Shield, Truck, RotateCcw, Plus, Minus, ShoppingBag, Database, Check } from 'lucide-react';
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
        <div className="flex flex-wrap gap-1">
          {val.map((item, idx) => (
            <span
              key={idx}
              className="inline-block text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium border border-slate-200"
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
            val ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
          }`}
        >
          {val ? 'Supported / Yes' : 'No'}
        </span>
      );
    }
    return <span className="text-slate-800 font-medium text-xs">{String(val)}</span>;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-100 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left: Gallery */}
            <div>
              <div className="aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 mb-3 relative">
                <img
                  src={product.images[selectedImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
                {product.isFeatured && (
                  <span className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    Featured
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImageIndex === idx
                          ? 'border-indigo-600 shadow-md scale-105'
                          : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 mt-6 p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center text-[11px] text-slate-600">
                <div className="flex flex-col items-center gap-1">
                  <Truck className="w-4 h-4 text-indigo-600" />
                  <span className="font-semibold">Fast Shipping</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold">2-Yr Warranty</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <RotateCcw className="w-4 h-4 text-amber-600" />
                  <span className="font-semibold">30-Day Returns</span>
                </div>
              </div>
            </div>

            {/* Right: Info & Dynamic Schema Attributes */}
            <div className="flex flex-col justify-between">
              <div>
                {/* Brand & Category */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md">
                    {product.brand}
                  </span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs font-medium text-slate-500">{product.category}</span>
                </div>

                <h2 className="text-2xl font-black text-slate-900 leading-snug mb-2">
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
                            : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-800">{product.rating}</span>
                  <span className="text-xs text-slate-400">({product.reviewCount} customer reviews)</span>
                </div>

                {/* Price block */}
                <div className="flex items-baseline gap-3 mb-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-3xl font-extrabold text-slate-900">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.compareAtPrice && (
                    <>
                      <span className="text-sm text-slate-400 line-through">
                        ${product.compareAtPrice.toFixed(2)}
                      </span>
                      <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                        Save ${(product.compareAtPrice - product.price).toFixed(2)}
                      </span>
                    </>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                  {product.description}
                </p>

                {/* Dynamic PostgreSQL JSONB Attributes Table */}
                <div className="mb-6 bg-slate-50/80 rounded-2xl border border-slate-200/80 p-4">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
                    <Database className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Dynamic Specifications (PostgreSQL JSONB)</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-48 overflow-y-auto pr-1">
                    {Object.entries(product.attributes).map(([key, val]) => (
                      <div
                        key={key}
                        className="bg-white p-2.5 rounded-xl border border-slate-200/70 flex flex-col justify-between"
                      >
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                          {formatKey(key)}
                        </span>
                        <div>{renderAttributeValue(val)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Purchase Actions */}
              <div className="pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between gap-4 mb-3">
                  {/* Stock notice */}
                  <div className="text-xs">
                    <span className="font-semibold text-slate-700">Availability: </span>
                    <span
                      className={`font-bold ${
                        product.inventoryCount > 10 ? 'text-emerald-600' : 'text-amber-600'
                      }`}
                    >
                      {product.inventoryCount > 0
                        ? `${product.inventoryCount} units ready to ship`
                        : 'Out of Stock'}
                    </span>
                    {existingQtyInCart > 0 && (
                      <div className="text-[11px] text-indigo-600 font-medium">
                        ({existingQtyInCart} currently in your cart)
                      </div>
                    )}
                  </div>

                  {/* Quantity selector */}
                  <div className="flex items-center border border-slate-300 rounded-xl bg-slate-50">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                      className="p-2 hover:bg-slate-200 rounded-l-xl disabled:opacity-40 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5 text-slate-700" />
                    </button>
                    <span className="w-10 text-center font-bold text-xs text-slate-800">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(product.inventoryCount, q + 1))}
                      disabled={quantity >= product.inventoryCount}
                      className="p-2 hover:bg-slate-200 rounded-r-xl disabled:opacity-40 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5 text-slate-700" />
                    </button>
                  </div>
                </div>

                {/* Add to Cart button */}
                <button
                  onClick={handleAddToCart}
                  disabled={product.inventoryCount === 0}
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
                      <span>Add to Cart • ${(product.price * quantity).toFixed(2)}</span>
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
