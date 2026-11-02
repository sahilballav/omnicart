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

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating-desc';

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

          // Also search within dynamic JSONB attributes!
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
          case 'rating-desc':
            return b.rating - a.rating;
          case 'featured':
          default:
            return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
        }
      });
  }, [products, selectedCategory, searchQuery, inStockOnly, selectedTag, sortOption]);

  return (
    <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Controls Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Stats & Tag Chips */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 pr-3 border-r border-slate-200">
            <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
            <span>{filteredProducts.length} Products</span>
          </div>

          {/* Quick attribute tags */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setSelectedTag(null)}
              className={`text-xs px-2.5 py-1 rounded-full font-medium transition-colors ${
                selectedTag === null
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Tags
            </button>
            {allTags.slice(0, 6).map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={`text-xs px-2.5 py-1 rounded-full font-medium transition-colors ${
                  selectedTag === tag
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Right: In-stock toggle & Sort Dropdown */}
        <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
            />
            <span>In Stock Only</span>
          </label>

          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-desc">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid Results */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300 p-8">
          <div className="w-16 h-16 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4">
            <SlidersHorizontal className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">No products found</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
            We couldn't find any products matching your current filters or query. Try clearing your search or switching categories.
          </p>
          <button
            onClick={() => {
              setSelectedTag(null);
              setInStockOnly(false);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 transition-colors"
          >
            <CheckCircle2 className="w-4 h-4" /> Reset Filters
          </button>
        </div>
      )}
    </section>
  );
};

