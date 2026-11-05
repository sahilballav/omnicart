import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, ArrowUpDown, Search, ArrowUpRight, RotateCcw } from 'lucide-react';
import { Product } from '../types/product';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  selectedCategory: string;
  searchQuery: string;
  onQuickView: (product: Product) => void;
  onSelectCategory?: (category: string) => void;
}

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest';

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  selectedCategory,
  searchQuery,
  onQuickView,
  onSelectCategory
}) => {
  const [sortOption, setSortOption] = useState<SortOption>('featured');
  const [selectedLicense, setSelectedLicense] = useState<string>('All');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [localSearch, setLocalSearch] = useState('');

  // Extract categories
  const categories = useMemo(() => {
    return ['All', 'Cloud & DevOps', 'AI & Agent Kits', 'Microservices & APIs', 'Developer Tools', 'UI Systems & Figma', 'Courses & Masterclasses'];
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category filter
        if (selectedCategory !== 'All' && product.category !== selectedCategory) {
          return false;
        }

        // In-stock filter
        if (inStockOnly && product.inventoryCount <= 0) {
          return false;
        }

        // License filter
        if (selectedLicense !== 'All') {
          const lic = String(product.attributes.license_type || '');
          if (!lic.toLowerCase().includes(selectedLicense.toLowerCase())) {
            return false;
          }
        }

        // Search query filter (parent searchQuery + local search)
        const q = (searchQuery || localSearch).trim().toLowerCase();
        if (q) {
          const matchesBasic =
            product.name.toLowerCase().includes(q) ||
            product.brand.toLowerCase().includes(q) ||
            product.description.toLowerCase().includes(q) ||
            product.tags.some((t) => t.toLowerCase().includes(q));

          return matchesBasic;
        }

        return true;
      })
      .sort((a, b) => {
        switch (sortOption) {
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'newest':
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          case 'featured':
          default:
            return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
        }
      });
  }, [products, selectedCategory, searchQuery, localSearch, inStockOnly, selectedLicense, sortOption]);

  const handleResetFilters = () => {
    setSelectedLicense('All');
    setInStockOnly(false);
    setLocalSearch('');
    if (onSelectCategory) onSelectCategory('All');
  };

  return (
    <section id="catalog-selection" className="w-full bg-white/60 dark:bg-black/60 backdrop-blur-md text-black dark:text-white py-12 sm:py-16 border-b border-neutral-200 dark:border-[#222222] transition-colors relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* SNKS-Style Section Chapter Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-200 dark:border-[#222222] pb-6">
          <div>
            <div className="text-xs font-mono font-bold tracking-widest text-[#7d9900] dark:text-[#d4ff00] uppercase mb-1">
              THE SALE SELECTION / 001
            </div>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter leading-none text-black dark:text-white">
              BIG DEALS. NO MISSES.
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-2 font-mono uppercase tracking-wide">
              Verified cloud blueprints. Event-driven architectures. Prices that won't stick around.
            </p>
          </div>

          <button
            onClick={() => {
              if (onSelectCategory) onSelectCategory('All');
              setSelectedLicense('All');
            }}
            className="self-start md:self-end flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-[#d4ff00] transition-colors"
          >
            <span>EXPLORE ALL {products.length} MODULES</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* SNKS-Style Horizontal Filter Strip */}
        <div className="space-y-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => onSelectCategory && onSelectCategory(cat)}
                  className={`px-3.5 py-1.5 font-mono text-xs font-black uppercase tracking-wider whitespace-nowrap transition-colors rounded-none ${
                    isSelected
                      ? 'bg-[#d4ff00] text-black border border-black dark:border-[#d4ff00]'
                      : 'bg-neutral-100 hover:bg-neutral-200 dark:bg-[#111111] dark:hover:bg-[#1a1a1a] text-neutral-800 dark:text-neutral-300 border border-neutral-200 dark:border-[#262626]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Sub-Filters & Search Bar */}
          <div className="p-3 bg-neutral-50 dark:bg-[#0d0d0d] border border-neutral-200 dark:border-[#222222] rounded-none flex flex-col lg:flex-row lg:items-center justify-between gap-3 text-xs font-mono transition-colors">
            {/* Left Filter Dropdowns */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#7d9900] dark:text-[#d4ff00]" />
                <span className="uppercase font-bold text-[11px]">FILTERS:</span>
              </div>

              {/* License Model Dropdown */}
              <select
                value={selectedLicense}
                onChange={(e) => setSelectedLicense(e.target.value)}
                className="bg-white dark:bg-black border border-neutral-300 dark:border-[#262626] text-neutral-900 dark:text-neutral-200 px-2.5 py-1.5 rounded-none focus:outline-none focus:border-black dark:focus:border-[#d4ff00]"
              >
                <option value="All">All License Models</option>
                <option value="Commercial">Commercial License</option>
                <option value="Team">Team License</option>
                <option value="Royalty-Free">Royalty-Free</option>
              </select>

              {/* In-stock toggle */}
              <label className="flex items-center gap-2 cursor-pointer select-none text-neutral-700 dark:text-neutral-300">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded-none border-neutral-300 dark:border-[#333] text-[#7d9900] dark:text-[#d4ff00] focus:ring-0 w-3.5 h-3.5 bg-white dark:bg-black"
                />
                <span className="text-[11px]">In-Stock Only</span>
              </label>

              {(selectedCategory !== 'All' || selectedLicense !== 'All' || inStockOnly || localSearch) && (
                <button
                  onClick={handleResetFilters}
                  className="text-[11px] text-[#7d9900] dark:text-[#d4ff00] hover:underline flex items-center gap-1 font-bold"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Right Search & Sort */}
            <div className="flex items-center gap-3">
              {/* Search input */}
              <div className="relative flex-1 sm:w-56">
                <input
                  type="text"
                  placeholder="Find your blueprint..."
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-white dark:bg-black border border-neutral-300 dark:border-[#262626] text-black dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 rounded-none text-xs focus:outline-none focus:border-black dark:focus:border-[#d4ff00]"
                />
                <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              </div>

              {/* Count Indicator */}
              <span className="text-neutral-500 text-[11px] shrink-0">
                {filteredProducts.length} MODULES
              </span>

              {/* Sort Selector */}
              <div className="flex items-center gap-1 text-neutral-700 dark:text-neutral-300 shrink-0">
                <ArrowUpDown className="w-3 h-3 text-neutral-400" />
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as SortOption)}
                  className="bg-white dark:bg-black border border-neutral-300 dark:border-[#262626] text-neutral-900 dark:text-neutral-200 px-2 py-1.5 rounded-none focus:outline-none focus:border-black dark:focus:border-[#d4ff00]"
                >
                  <option value="featured">Featured First</option>
                  <option value="newest">Newest Releases</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        ) : (
          /* SNKS Empty State */
          <div className="py-20 text-center space-y-4 bg-neutral-50 dark:bg-[#0a0a0a] border border-neutral-200 dark:border-[#222222] p-8 transition-colors">
            <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-black dark:text-white">
              NO PAIRS. NOT NO HOPE.
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-md mx-auto font-mono uppercase">
              The next selection is on its way. Clear your filter parameters or join the early drop list.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-4 px-8 py-3 bg-[#d4ff00] hover:bg-[#bfff00] text-black font-mono font-black text-xs uppercase tracking-wider inline-flex items-center gap-2 transition-transform active:scale-95"
            >
              <span>RESET FILTERS</span>
              <ArrowUpRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
