import React, { useState, useMemo } from 'react';
import { Product } from '../types/product';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, ArrowUpDown, CheckCircle2 } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  selectedCategory: string;
  searchQuery: string;
  onQuickView: (product: Product) => void;
}

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest';

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  selectedCategory,
  searchQuery,
  onQuickView
}) => {
  const [sortOption, setSortOption] = useState<SortOption>('featured');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  // Extract unique tags for filtering
  const allTags = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set);
  }, [products]);

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

        // Tag filter
        if (selectedTag && !product.tags.includes(selectedTag)) {
          return false;
        }

        // Search query filter (search across name, brand, description, tags, and JSONB attributes)
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesBasic =
            product.name.toLowerCase().includes(q) ||
            product.brand.toLowerCase().includes(q) ||
            product.description.toLowerCase().includes(q) ||
            product.tags.some((t) => t.toLowerCase().includes(q));

          // Also search within dynamic JSONB attributes
          const matchesAttributes = Object.entries(product.attributes).some(([key, val]) => {
            const valStr = Array.isArray(val) ? val.join(' ') : String(val);
            return key.toLowerCase().includes(q) || valStr.toLowerCase().includes(q);
          });

          return matchesBasic || matchesAttributes;
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
  }, [products, selectedCategory, searchQuery, inStockOnly, selectedTag, sortOption]);

  return (
    <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Controls Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-3.5 mb-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors">
        {/* Left: Stats & Tag Chips */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200 pr-3 border-r border-slate-200 dark:border-slate-800">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
            <span>{filteredProducts.length} Items</span>
          </div>

          {/* Quick attribute tags */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setSelectedTag(null)}
              className={`text-xs px-2.5 py-1 rounded font-medium transition-colors ${
                selectedTag === null
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              All
            </button>
            {allTags.slice(0, 6).map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={`text-xs px-2.5 py-1 rounded font-medium transition-colors ${
                  selectedTag === tag
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Right: In-stock toggle & Sort Dropdown */}
        <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
          <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="rounded border-slate-300 dark:border-slate-700 text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5"
            />
            <span>Active Licenses Only</span>
          </label>

          <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded px-2 py-1 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest Releases</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid Results */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 p-8 transition-colors">
          <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center mx-auto mb-3">
            <SlidersHorizontal className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800 dark:text-white mb-1">No items found</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-4">
            No assets match your current filters. Try resetting the filters or clearing the search query.
          </p>
          <button
            onClick={() => {
              setSelectedTag(null);
              setInStockOnly(false);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white text-xs font-semibold rounded transition-colors"
          >
            <CheckCircle2 className="w-3.5 h-3.5" /> Reset Filters
          </button>
        </div>
      )}
    </section>
  );
};
