import React from 'react';
import { Star, Plus, Eye, Check, DownloadCloud, Key } from 'lucide-react';
import { Product } from '../types/product';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart, items } = useCart();

  const cartItem = items.find((i) => i.product.id === product.id);
  const cartQty = cartItem ? cartItem.quantity : 0;

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
    <div className="group bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300 flex flex-col overflow-hidden">
      {/* Product Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
          loading="lazy"
        />

        {/* Gradient Overlay for aesthetic tech look */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 pointer-events-none" />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {product.isFeatured && (
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-600 text-white shadow-sm flex items-center gap-1">
              <DownloadCloud className="w-3 h-3" /> Featured
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-500 text-white shadow-sm">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Quick View Button on hover */}
        <button
          onClick={() => onQuickView(product)}
          className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-white/95 text-slate-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl hover:bg-white hover:scale-110 z-20 backdrop-blur-sm"
          title="Inspect Specs & Architecture"
          aria-label="Inspect Specs & Architecture"
        >
          <Eye className="w-5 h-5 text-slate-800" />
        </button>

        {/* Category tag */}
        <div className="absolute bottom-2.5 left-2.5 z-10">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-950/80 text-indigo-200 border border-indigo-500/30 backdrop-blur-md">
            {product.category}
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Rating */}
          <div className="flex items-center justify-between mb-1.5 text-xs">
            <span className="font-bold text-slate-400 uppercase tracking-wider text-[11px]">{product.brand}</span>
            <div className="flex items-center gap-1 text-amber-500 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-400 font-normal">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3
            onClick={() => onQuickView(product)}
            className="font-bold text-slate-900 text-base leading-snug hover:text-indigo-600 transition-colors cursor-pointer line-clamp-1 mb-1.5"
          >
            {product.name}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Dynamic JSONB Digital Badges */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {previewBadges.slice(0, 2).map((badge, idx) => (
              <span
                key={idx}
                className="inline-flex items-center text-[10px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-md"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Price & Action Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-slate-900">
                ${product.price.toFixed(2)}
              </span>
              {product.compareAtPrice && (
                <span className="text-xs text-slate-400 line-through">
                  ${product.compareAtPrice.toFixed(2)}
                </span>
              )}
            </div>
            <div className="text-[10px] text-slate-400 font-medium flex items-center gap-1 mt-0.5">
              <Key className="w-3 h-3 text-emerald-500" />
              <span className="text-emerald-600 font-semibold">Instant Key Delivery</span>
            </div>
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            disabled={product.inventoryCount === 0}
            className={`flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
              cartQty > 0
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-indigo-500/20'
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
                <span>Get Access</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
