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
        <div className="flex flex-wrap gap-1 mt-1 justify-end">
          {val.map((item, idx) => (
            <span
              key={idx}
              className="inline-block text-[10px] font-mono bg-[#141414] text-neutral-300 px-1.5 py-0.5 rounded-none border border-[#2b2b2b]"
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
          className={`inline-flex items-center text-[10px] font-mono px-2 py-0.5 rounded-none font-bold uppercase ${
            val
              ? 'bg-[#d4ff00]/20 text-[#d4ff00] border border-[#d4ff00]/40'
              : 'bg-[#181818] text-neutral-500 border border-[#262626]'
          }`}
        >
          {val ? 'YES' : 'NO'}
        </span>
      );
    }
    return <span className="text-neutral-200 font-mono text-xs">{String(val)}</span>;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
    >
      <div className="relative bg-black text-white rounded-none max-w-3xl w-full shadow-2xl border border-[#262626] overflow-hidden max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-none hover:bg-[#1a1a1a] text-neutral-400 hover:text-white flex items-center justify-center transition-colors border border-[#333]"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column: Image preview */}
            <div>
              <div className="aspect-[16/10] rounded-none overflow-hidden bg-[#0d0d0d] border border-[#262626] mb-3">
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
                      className={`w-14 h-10 rounded-none overflow-hidden border transition-all ${
                        selectedImageIndex === idx
                          ? 'border-[#d4ff00] ring-1 ring-[#d4ff00]'
                          : 'border-[#262626] opacity-60 hover:opacity-100'
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
                <div className="flex items-center gap-2 mb-1.5 text-xs font-mono">
                  <span className="font-bold text-[#d4ff00] uppercase tracking-wider text-[11px]">
                    {product.brand}
                  </span>
                  <span className="text-neutral-600">/</span>
                  <span className="text-neutral-400 uppercase text-[11px]">{product.category}</span>
                </div>

                <h2 id="modal-title" className="text-xl font-black uppercase text-white leading-snug mb-2 tracking-tight">
                  {product.name}
                </h2>

                <div className="flex items-center gap-2 mb-4 text-xs font-mono text-neutral-400">
                  <span className="flex items-center gap-1 bg-[#111111] border border-[#262626] px-2 py-0.5 rounded-none text-neutral-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#d4ff00]" />
                    <span>VERIFIED ARCHITECTURE</span>
                  </span>
                  <span className="bg-[#111111] border border-[#262626] px-2 py-0.5 rounded-none text-[#d4ff00]">
                    {String(product.attributes.version || 'v1.0.0')}
                  </span>
                </div>

                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-black text-white">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.compareAtPrice && (
                    <span className="text-xs text-neutral-500 line-through">
                      ${product.compareAtPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed mb-5 font-sans">
                  {product.description}
                </p>

                {/* PostgreSQL JSONB Attribute Inspector */}
                <div className="mb-6 bg-[#0a0a0a] rounded-none border border-[#222222] p-3.5">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-200 uppercase tracking-wider mb-2.5">
                    <Database className="w-3.5 h-3.5 text-[#d4ff00]" />
                    <span>Technical Specifications (JSONB)</span>
                  </div>

                  <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                    {Object.entries(product.attributes).map(([key, val]) => (
                      <div
                        key={key}
                        className="bg-black p-2 rounded-none border border-[#1f1f1f] flex items-start justify-between gap-2"
                      >
                        <span className="text-[11px] font-mono text-neutral-400 shrink-0 uppercase">
                          {formatKey(key)}:
                        </span>
                        <div className="text-right text-neutral-200 text-xs font-mono">{renderAttributeValue(val)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Purchase Actions */}
              <div className="pt-4 border-t border-[#222222]">
                <div className="flex items-center justify-between gap-4 mb-3">
                  <div className="text-xs font-mono text-neutral-400">
                    <span>LICENSE SEATS: </span>
                    {existingQtyInCart > 0 && (
                      <span className="text-[#d4ff00]">({existingQtyInCart} IN BAG)</span>
                    )}
                  </div>

                  {/* Quantity Modifier */}
                  <div className="flex items-center border border-[#333] rounded-none bg-black">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                      className="px-2.5 py-1 hover:bg-[#1a1a1a] transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5 text-neutral-300" />
                    </button>
                    <span className="w-8 text-center font-mono text-xs text-white font-bold">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-2.5 py-1 hover:bg-[#1a1a1a] transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5 text-neutral-300" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`w-full py-3 px-4 rounded font-mono font-bold uppercase text-xs tracking-wider flex items-center justify-center gap-2 transition-colors ${
                    justAdded
                      ? 'bg-white text-black'
                      : 'bg-[#d4ff00] hover:bg-[#bfff00] text-black'
                  }`}
                >
                  {justAdded ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag: ${(product.price * quantity).toFixed(2)}</span>
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
