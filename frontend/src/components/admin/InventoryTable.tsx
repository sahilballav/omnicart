import React, { useState } from 'react';
import { Product } from '../../types/product';
import { Search, Plus, Minus, AlertTriangle, CheckCircle, Package } from 'lucide-react';

interface InventoryTableProps {
  products: Product[];
  onUpdateInventory: (productId: string, newCount: number) => void;
}

export const InventoryTable: React.FC<InventoryTableProps> = ({ products, onUpdateInventory }) => {
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))];

  const filtered = products.filter((p) => {
    const matchesCategory = filterCategory === 'All' || p.category === filterCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden transition-colors">
      {/* Table Toolbar */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Package className="w-5 h-5 text-slate-700 dark:text-slate-300" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Asset Inventory & License Allocations
          </h3>
          <span className="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono">
            {filtered.length} items
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Filter by name, brand, ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          </div>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-600"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table Body */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="py-3 px-4">Asset</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">JSONB Specs</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Available Seats</th>
              <th className="py-3 px-4 text-right">Stock Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {filtered.map((product) => {
              const isLowStock = product.inventoryCount < 50;
              const isOut = product.inventoryCount <= 0;

              return (
                <tr
                  key={product.id}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors"
                >
                  {/* Asset Details */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.images[0]}
                        alt=""
                        className="w-10 h-10 rounded object-cover bg-slate-100 dark:bg-slate-800 shrink-0"
                      />
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-white line-clamp-1">
                          {product.name}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          ID: {product.id}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                    {product.category}
                  </td>

                  {/* JSONB Specs Preview */}
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {product.attributes.version && (
                        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {String(product.attributes.version)}
                        </span>
                      )}
                      {product.attributes.iac_framework && (
                        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          Terraform
                        </span>
                      )}
                      {product.attributes.java_version && (
                        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          Java 21
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Price */}
                  <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white whitespace-nowrap">
                    ${product.price.toFixed(2)}
                  </td>

                  {/* Stock Status Badge */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    {isOut ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 px-2 py-0.5 rounded">
                        <AlertTriangle className="w-3 h-3" /> Depleted
                      </span>
                    ) : isLowStock ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded">
                        <AlertTriangle className="w-3 h-3" /> Low ({product.inventoryCount})
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded">
                        <CheckCircle className="w-3 h-3" /> Healthy
                      </span>
                    )}
                  </td>

                  {/* Seats Count */}
                  <td className="py-3 px-4 font-mono font-semibold text-slate-800 dark:text-slate-200">
                    {product.inventoryCount} seats
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-1 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800">
                      <button
                        onClick={() =>
                          onUpdateInventory(product.id, Math.max(0, product.inventoryCount - 10))
                        }
                        title="Deduct 10 seats"
                        className="px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => onUpdateInventory(product.id, product.inventoryCount + 10)}
                        title="Add 10 seats"
                        className="px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

