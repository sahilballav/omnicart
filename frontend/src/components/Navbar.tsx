import React from 'react';
import { ShoppingBag, Search, ShieldCheck, Sparkles, Layers } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  categories: string[];
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  categories
}) => {
  const { totalQuantity, toggleCart } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all">
      {/* Top micro-announcement banner */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 text-slate-200 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full font-medium border border-indigo-400/30">
              <Sparkles className="w-3 h-3 text-indigo-400" /> OmniCart Digital Hub
            </span>
            <span className="hidden sm:inline text-slate-300">
              Cloud-Native Digital Assets • Instant License Key Generation & Automated Git Provisioning
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-medium text-slate-400">
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Redis Cache Sync: Active
            </span>
            <span className="hidden md:inline text-indigo-300">Instant S3 / GitHub CDN</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-900 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <Layers className="w-5 h-5 text-indigo-200" />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-slate-950 to-indigo-700 bg-clip-text text-transparent">
                  Omni<span className="text-indigo-600">Cart</span>
                </span>
                <span className="block text-[10px] tracking-wider text-slate-400 font-semibold uppercase -mt-1">
                  Digital Hub
                </span>
              </div>
            </a>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-2 hidden sm:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search templates, SDKs, AI models, specs (e.g. Terraform, Kubernetes, Java 21, Figma)..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100 hover:bg-slate-50 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all placeholder:text-slate-400"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Admin Badge Preview (for Day 2) */}
            <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-500 px-2.5 py-1.5 rounded-lg bg-slate-100 border border-slate-200 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
              <span>Admin Preview</span>
            </div>

            {/* Cart Trigger */}
            <button
              onClick={() => toggleCart(true)}
              className="relative flex items-center gap-2 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm hover:shadow-indigo-500/25 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Digital Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="text-sm font-semibold hidden sm:inline">Licenses</span>
              {totalQuantity > 0 && (
                <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 text-xs font-bold leading-none text-indigo-700 bg-white rounded-full shadow-sm animate-scale-in">
                  {totalQuantity}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search input */}
        <div className="sm:hidden pb-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search digital assets..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Category Navigation Bar */}
        <div className="flex items-center gap-2 overflow-x-auto py-2.5 border-t border-slate-100 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
