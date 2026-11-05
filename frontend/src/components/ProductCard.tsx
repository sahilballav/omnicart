import React, { useState } from 'react';
import { Plus, Eye, Check, Terminal } from 'lucide-react';
import { Product } from '../types/product';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart, items } = useCart();
  const [copiedClone, setCopiedClone] = useState(false);
  const [imageError, setImageError] = useState(false);

  const cartItem = items.find((i) => i.product.id === product.id);
  const cartQty = cartItem ? cartItem.quantity : 0;

  const handleCopyClone = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`git clone https://github.com/omnicart/${product.slug}.git`);
    setCopiedClone(true);
    setTimeout(() => setCopiedClone(false), 2000);
  };

  const discountPercent = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white rounded-none border border-neutral-200 dark:border-[#222222] hover:border-black dark:hover:border-[#444444] transition-colors flex flex-col justify-between overflow-hidden group">
      {/* Top Visual Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#0d0d0d] border-b border-neutral-200 dark:border-[#1c1c1c]">
        {!imageError && product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-[#0a0a0a] text-neutral-500 font-mono text-center">
            <div className="w-8 h-8 mb-2 border border-[#333] flex items-center justify-center text-[#d4ff00]">
              <Terminal className="w-4 h-4" />
            </div>
            <div className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">
              {product.brand} // {String(product.attributes.version || 'v1.0')}
            </div>
            <div className="text-[9px] text-neutral-600 mt-1 uppercase">SCHEMATIC VERIFIED</div>
          </div>
        )}

        {/* High-Voltage Badges (SNKS style) */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
          {product.isFeatured && (
            <span className="px-2 py-0.5 text-[10px] font-mono font-black uppercase bg-[#d4ff00] text-black">
              FEATURED DROP
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-2 py-0.5 text-[10px] font-mono font-black uppercase bg-black text-white dark:bg-white dark:text-black">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Quick Actions (Specs & Clone) */}
        <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 z-10 opacity-90 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleCopyClone}
            className="px-2 py-1 bg-black/90 hover:bg-[#d4ff00] hover:text-black text-neutral-300 text-[10px] font-mono uppercase border border-[#333333] transition-colors flex items-center gap-1"
            title="Copy Git clone URI"
          >
            {copiedClone ? <Check className="w-3 h-3 text-[#d4ff00] group-hover:text-black" /> : <Terminal className="w-3 h-3" />}
            <span>{copiedClone ? 'COPIED' : 'CLONE'}</span>
          </button>

          <button
            onClick={() => onQuickView(product)}
            className="px-2.5 py-1 bg-black/90 hover:bg-[#d4ff00] hover:text-black text-neutral-300 text-[10px] font-mono uppercase border border-[#333333] transition-colors flex items-center gap-1"
            aria-label="Inspect specifications"
          >
            <Eye className="w-3 h-3" />
            <span>SPECS</span>
          </button>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Brand & Version Index */}
          <div className="flex items-center justify-between mb-2 text-xs font-mono">
            <span className="text-[#7d9900] dark:text-[#d4ff00] font-bold uppercase tracking-wider text-[11px]">
              {product.brand}
            </span>
            <span className="text-neutral-500 text-[10px]">
              {String(product.attributes.version || 'v1.0')}
            </span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onQuickView(product)}
            className="font-black text-black dark:text-white text-base uppercase tracking-tight leading-snug hover:text-[#7d9900] dark:hover:text-[#d4ff00] transition-colors cursor-pointer line-clamp-1 mb-1.5"
          >
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Pricing & Add To Bag Action */}
        <div className="pt-3 border-t border-neutral-200 dark:border-[#1a1a1a] flex items-center justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-1.5 font-mono">
              <span className="text-lg font-black text-black dark:text-white">
                ${product.price.toFixed(2)}
              </span>
              {product.compareAtPrice && (
                <span className="text-xs text-neutral-400 dark:text-neutral-600 line-through">
                  ${product.compareAtPrice.toFixed(2)}
                </span>
              )}
            </div>
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block">
              INSTANT KEY GRANT
            </span>
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            disabled={product.inventoryCount === 0}
            className={`px-4 py-2 font-mono text-xs font-black uppercase tracking-wider transition-colors flex items-center gap-1.5 rounded-none ${
              cartQty > 0
                ? 'bg-neutral-200 text-black border border-black dark:bg-neutral-800 dark:text-[#d4ff00] dark:border-[#d4ff00]'
                : 'bg-[#d4ff00] hover:bg-[#bfff00] text-black active:scale-95'
            }`}
          >
            {cartQty > 0 ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>IN BAG ({cartQty})</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                <span>ADD TO BAG</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
