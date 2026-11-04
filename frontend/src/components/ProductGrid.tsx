import React, { useState, useMemo } from 'react';
import { Product } from '../types/product';
import { ProductCard } from './ProductCard';
import { useCart } from '../context/CartContext';
import {
  SlidersHorizontal,
  ArrowUpDown,
  CheckCircle2,
  LayoutGrid,
  List,
  Eye,
  Plus,
  Check
} from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  selectedCategory: string;
  searchQuery: string;
  onQuickView: (product: Product) => void;
  onSelectCategory?: (category: string) => void;
}

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest';
type ViewMode = 'grid' | 'table';

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  selectedCategory,
  searchQuery,
  onQuickView,
  onSelectCategory
}) => {
  const { addToCart, items } = useCart();
  const [sortOption, setSortOption] = useState<SortOption>('featured');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedLicense, setSelectedLicense] = useState<string>('All');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  // Extract unique categories with exact item counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: products.length };
    products.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [products]);

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

        // License filter
        if (selectedLicense !== 'All') {
          const lic = String(product.attributes.license_type || '');
          if (!lic.toLowerCase().includes(selectedLicense.toLowerCase())) {
            return false;
          }
        }

        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesBasic =
            product.name.toLowerCase().includes(q) ||
            product.brand.toLowerCase().includes(q) ||
            product.description.toLowerCase().includes(q) ||
            product.tags.some((t) => t.toLowerCase().includes(q));

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
  }, [products, selectedCategory, searchQuery, inStockOnly, selectedTag, selectedLicense, sortOption]);

  const categories = ['All', 'Cloud & DevOps', 'AI & Agent Kits', 'Microservices & APIs', 'Developer Tools', 'UI Systems & Figma', 'Courses & Masterclasses'];

  return (
    <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Filter Facets Sidebar */}
        <aside className="lg:col-span-1 space-y-5">
          {/* Categories Facet */}
          <div className="bg-white dark:bg-black border border-slate-200 dark:border-neutral-800 rounded-xl p-4 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Catalog Category
            </h3>
            <div className="space-y-1">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                const count = categoryCounts[cat] || 0;
                return (
                  <button
                    key={cat}
                    onClick={() => onSelectCategory && onSelectCategory(cat)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
                      isSelected
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-black'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-neutral-900'
                    }`}
                  >
                    <span className="truncate">{cat}</span>
                    <span className={`font-mono text-[10px] px-1.5 py-0.2 rounded ${
                      isSelected ? 'bg-slate-800 text-slate-200 dark:bg-neutral-200 dark:text-black' : 'bg-slate-100 dark:bg-neutral-900 text-slate-500'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* License Tier Facet */}
          <div className="bg-white dark:bg-black border border-slate-200 dark:border-neutral-800 rounded-xl p-4 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              License Model
            </h3>
            <div className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
              {['All', 'Commercial', 'Team', 'Royalty-Free'].map((lic) => (
                <label key={lic} className="flex items-center gap-2 py-1 cursor-pointer select-none">
                  <input
                    type="radio"
                    name="licenseFilter"
                    checked={selectedLicense === lic}
                    onChange={() => setSelectedLicense(lic)}
                    className="text-blue-600 focus:ring-blue-600 rounded"
                  />
                  <span>{lic === 'All' ? 'All License Models' : `${lic} License`}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Stock Filter */}
          <div className="bg-white dark:bg-black border border-slate-200 dark:border-neutral-800 rounded-xl p-4 shadow-xs">
            <label className="flex items-center gap-2.5 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded border-slate-300 dark:border-neutral-700 text-blue-600 focus:ring-blue-600 w-4 h-4"
              />
              <span>In-Stock Licenses Only</span>
            </label>
          </div>

          {/* Technology Tags */}
          <div className="bg-white dark:bg-black border border-slate-200 dark:border-neutral-800 rounded-xl p-4 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Tech Tags
              </h3>
              {selectedTag && (
                <button
                  onClick={() => setSelectedTag(null)}
                  className="text-[10px] text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  className={`text-[11px] font-mono px-2 py-0.5 rounded transition-colors ${
                    selectedTag === tag
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-black'
                      : 'bg-slate-100 dark:bg-neutral-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-neutral-800'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Main Catalog Area */}
        <div className="lg:col-span-3 space-y-4">
          {/* Controls Header */}
          <div className="bg-white dark:bg-black border border-slate-200 dark:border-neutral-800 rounded-xl p-3.5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                {filteredProducts.length} Verified Modules
              </span>
              {(selectedTag || selectedLicense !== 'All' || inStockOnly || selectedCategory !== 'All') && (
                <button
                  onClick={() => {
                    setSelectedTag(null);
                    setSelectedLicense('All');
                    setInStockOnly(false);
                    onSelectCategory && onSelectCategory('All');
                  }}
                  className="text-[11px] text-rose-600 dark:text-rose-400 hover:underline ml-2"
                >
                  Reset all filters
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* Sort selector */}
              <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as SortOption)}
                  className="bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-800 dark:text-slate-200 rounded px-2 py-1 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-blue-600"
                >
                  <option value="featured">Featured First</option>
                  <option value="newest">Newest Releases</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>

              {/* View Toggle: Grid vs Table */}
              <div className="inline-flex items-center p-0.5 bg-slate-100 dark:bg-neutral-900 rounded-lg border border-slate-200 dark:border-neutral-800">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-white dark:bg-black text-slate-900 dark:text-white shadow-2xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-1.5 rounded-md transition-colors ${
                    viewMode === 'table'
                      ? 'bg-white dark:bg-black text-slate-900 dark:text-white shadow-2xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  title="Dense Table View"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Catalog Listing */}
          {filteredProducts.length > 0 ? (
            viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={onQuickView}
                  />
                ))}
              </div>
            ) : (
              /* Dense Engineering Table View */
              <div className="bg-white dark:bg-black rounded-xl border border-slate-200 dark:border-neutral-800 overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-neutral-900/60 text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-200 dark:border-neutral-800">
                    <tr>
                      <th className="py-3 px-4">Module</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Version</th>
                      <th className="py-3 px-4">Available Seats</th>
                      <th className="py-3 px-4">Price</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-neutral-800/80">
                    {filteredProducts.map((product) => {
                      const cartItem = items.find((i) => i.product.id === product.id);
                      const cartQty = cartItem ? cartItem.quantity : 0;
                      return (
                        <tr
                          key={product.id}
                          className="hover:bg-slate-50/80 dark:hover:bg-neutral-900/40 transition-colors"
                        >
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={product.images[0]}
                                alt=""
                                className="w-9 h-9 rounded object-cover bg-slate-950 border border-slate-800 shrink-0"
                              />
                              <div>
                                <div
                                  onClick={() => onQuickView(product)}
                                  className="font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer line-clamp-1"
                                >
                                  {product.name}
                                </div>
                                <div className="text-[10px] font-mono text-slate-400">
                                  {product.brand}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="py-3 px-4 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                            {product.category}
                          </td>

                          <td className="py-3 px-4 font-mono text-[11px] text-slate-700 dark:text-slate-300 whitespace-nowrap">
                            {String(product.attributes.version || 'v1.0.0')}
                          </td>

                          <td className="py-3 px-4 font-mono whitespace-nowrap">
                            <span className="text-slate-800 dark:text-slate-200 font-semibold">
                              {product.inventoryCount} seats
                            </span>
                          </td>

                          <td className="py-3 px-4 font-bold text-slate-900 dark:text-white whitespace-nowrap">
                            ${product.price.toFixed(2)}
                          </td>

                          <td className="py-3 px-4 text-right whitespace-nowrap">
                            <div className="inline-flex items-center gap-1.5">
                              <button
                                onClick={() => onQuickView(product)}
                                className="p-1.5 rounded text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                title="Inspect Specifications"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => addToCart(product, 1)}
                                className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors flex items-center gap-1 ${
                                  cartQty > 0
                                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                                    : 'bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white'
                                }`}
                              >
                                {cartQty > 0 ? (
                                  <>
                                    <Check className="w-3 h-3" />
                                    <span>({cartQty})</span>
                                  </>
                                ) : (
                                  <>
                                    <Plus className="w-3 h-3" />
                                    <span>Add</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )
          ) : (
            <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 p-8 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center mx-auto mb-3">
                <SlidersHorizontal className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800 dark:text-white mb-1">
                No matching blueprints found
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-4">
                No modules match your current filter parameters. Try clearing the filters.
              </p>
              <button
                onClick={() => {
                  setSelectedTag(null);
                  setSelectedLicense('All');
                  setInStockOnly(false);
                  onSelectCategory && onSelectCategory('All');
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs font-semibold rounded transition-colors"
              >
                <CheckCircle2 className="w-3.5 h-3.5" /> Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
