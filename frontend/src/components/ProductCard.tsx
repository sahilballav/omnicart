import React, { useState } from 'react';
import { Plus, Eye, Check, DownloadCloud, Key, Terminal } from 'lucide-react';
import { Product } from '../types/product';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart, items } = useCart();
  const [copiedClone, setCopiedClone] = useState(false);

  const cartItem = items.find((i) => i.product.id === product.id);
  const cartQty = cartItem ? cartItem.quantity : 0;

  const handleCopyClone = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`git clone https://github.com/omnicart/${product.slug}.git`);
    setCopiedClone(true);
    setTimeout(() => setCopiedClone(false), 2000);
  };

  // Extract key digital attributes for quick preview badges
  const previewBadges: string[] = [];
  if (product.attributes.version) previewBadges.push(String(product.attributes.version));
  if (product.attributes.iac_framework) previewBadges.push('Terraform');
  if (product.attributes.java_version) previewBadges.push('Java 21 LTS');
  if (product.attributes.framework) previewBadges.push('React + Tailwind');
  if (product.attributes.supported_languages && Array.isArray(product.attributes.supported_languages)) {
    previewBadges.push(String(product.attributes.supported_languages[0]));
  }
  if (product.attributes.course_duration_hours) {
    previewBadges.push(`${product.attributes.course_duration_hours}h Video`);
  }
  if (product.attributes.license_type) {
    const lic = String(product.attributes.license_type);
    previewBadges.push(lic.includes('Commercial') ? 'Commercial License' : 'Team License');
  }

  const discountPercent = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors flex flex-col justify-between overflow-hidden">
      {/* Product Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
          {product.isFeatured && (
            <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-900 text-white dark:bg-white dark:text-slate-900 flex items-center gap-1">
              <DownloadCloud className="w-3 h-3" /> Featured
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-rose-600 text-white">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 z-10">
          <button
            onClick={handleCopyClone}
            className="px-2 py-1 rounded bg-slate-900/80 hover:bg-slate-900 text-white text-xs font-mono backdrop-blur-sm transition-colors flex items-center gap-1"
            title="Copy Git clone URI"
          >
            {copiedClone ? <Check className="w-3 h-3 text-emerald-400" /> : <Terminal className="w-3 h-3 text-slate-300" />}
            <span className="text-[10px]">{copiedClone ? 'Copied' : 'Clone'}</span>
          </button>

          <button
            onClick={() => onQuickView(product)}
            className="px-2.5 py-1 rounded bg-slate-900/80 hover:bg-slate-900 text-white text-xs font-medium backdrop-blur-sm transition-colors flex items-center gap-1"
            aria-label="Inspect specifications"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Specs</span>
          </button>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Category */}
          <div className="flex items-center justify-between mb-1.5 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold uppercase tracking-wider text-[11px]">{product.brand}</span>
            <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">
              {String(product.attributes.version || 'Release')}
            </span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onQuickView(product)}
            className="font-bold text-slate-900 dark:text-white text-base leading-snug hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer line-clamp-1 mb-1.5"
          >
            {product.name}
          </h3>

          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-3 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Dynamic Badges */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {previewBadges.slice(0, 2).map((badge, idx) => (
              <span
                key={idx}
                className="inline-flex items-center text-[11px] font-mono font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Price & Action */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                ${product.price.toFixed(2)}
              </span>
              {product.compareAtPrice && (
                <span className="text-xs text-slate-400 line-through">
                  ${product.compareAtPrice.toFixed(2)}
                </span>
              )}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1 mt-0.5">
              <Key className="w-3 h-3 text-emerald-500" />
              <span>Instant Delivery</span>
            </div>
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            disabled={product.inventoryCount === 0}
            className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              cartQty > 0
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                : 'bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white'
            }`}
          >
            {cartQty > 0 ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>In Cart ({cartQty})</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
