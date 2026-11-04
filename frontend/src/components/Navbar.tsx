import React, { useState, useRef, useEffect } from 'react';
import { ShoppingBag, Search, Layers, Sparkles, Store, Shield, User, ChevronDown, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  categories: string[];
  currentView: 'storefront' | 'admin' | 'privacy' | 'terms';
  onNavigate: (view: 'storefront' | 'admin' | 'privacy' | 'terms') => void;
  onOpenAiAssistant: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  categories,
  currentView,
  onNavigate,
  onOpenAiAssistant
}) => {
  const { totalQuantity, toggleCart } = useCart();
  const { user, isAdmin, loginAsAdmin, loginAsUser, logout } = useAuth();
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close role menu when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setRoleMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-black/95 backdrop-blur-md border-b border-slate-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4 sm:gap-6">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('storefront')}
              className="flex items-center gap-2.5 text-left focus:outline-none"
            >
              <div className="w-9 h-9 rounded-lg bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-black shadow-xs">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white block leading-tight">
                  OmniCart
                </span>
                <span className="text-[10px] font-mono text-slate-400 block leading-none">
                  Digital Engine
                </span>
              </div>
            </button>
          </div>

          {/* Search Input (Storefront view only) */}
          <div className="flex-1 max-w-md hidden md:block">
            {currentView === 'storefront' ? (
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search blueprints, modules, SDKs (Terraform, AWS, Spring)..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-colors"
                />
                <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            ) : (
              <div className="text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-xs bg-emerald-500" />
                <span>Admin Operations Dashboard</span>
              </div>
            )}
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Agentic AI Assistant Trigger */}
            <button
              onClick={onOpenAiAssistant}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/80 rounded-lg text-xs font-semibold transition-colors shadow-2xs"
              title="Open Agentic AI Shopping Assistant"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span className="hidden sm:inline">AI Assistant</span>
            </button>

            {/* Admin Console Controls - Only visible when inside Admin View */}
            {currentView === 'admin' && (
              <>
                <button
                  onClick={() => onNavigate('storefront')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-medium transition-colors"
                  title="Return to Storefront"
                >
                  <Store className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Exit Admin</span>
                </button>

                {/* Role / User Switcher Popover (Admin Console only) */}
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    title="Current Session Identity"
                  >
                    {isAdmin ? (
                      <Shield className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    ) : (
                      <User className="w-3.5 h-3.5 text-slate-500" />
                    )}
                    <span className="hidden md:inline font-mono text-[11px]">
                      {user ? user.role : 'Guest'}
                    </span>
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  </button>

                  {roleMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg p-2 z-50 text-xs">
                      <div className="px-2.5 py-1.5 border-b border-slate-100 dark:border-slate-800 mb-1">
                        <span className="text-[10px] uppercase font-mono text-slate-400 block font-semibold">
                          Current Identity
                        </span>
                        <span className="font-semibold text-slate-900 dark:text-white truncate block">
                          {user ? user.name : 'Unauthenticated Guest'}
                        </span>
                        <span className="text-[11px] text-slate-500 font-mono block">
                          {user ? user.role : 'GUEST'}
                        </span>
                      </div>

                      <div className="space-y-0.5">
                        <button
                          onClick={() => {
                            loginAsAdmin();
                            setRoleMenuOpen(false);
                          }}
                          className="w-full text-left px-2.5 py-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between transition-colors text-slate-700 dark:text-slate-300"
                        >
                          <div className="flex items-center gap-2">
                            <Shield className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                            <div>
                              <div className="font-medium text-xs">Admin Role</div>
                              <div className="text-[10px] text-slate-400">admin@omnicart.io</div>
                            </div>
                          </div>
                          {isAdmin && <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
                        </button>

                        <button
                          onClick={() => {
                            loginAsUser();
                            setRoleMenuOpen(false);
                          }}
                          className="w-full text-left px-2.5 py-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between transition-colors text-slate-700 dark:text-slate-300"
                        >
                          <div className="flex items-center gap-2">
                            <User className="w-3.5 h-3.5 text-slate-500" />
                            <div>
                              <div className="font-medium text-xs">Customer Role</div>
                              <div className="text-[10px] text-slate-400">developer@example.com</div>
                            </div>
                          </div>
                          {user?.role === 'USER' && <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
                        </button>

                        {user && (
                          <button
                            onClick={() => {
                              logout();
                              setRoleMenuOpen(false);
                            }}
                            className="w-full text-left px-2.5 py-1.5 rounded-md hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-medium transition-colors border-t border-slate-100 dark:border-slate-800 mt-1"
                          >
                            Reset to Guest Session
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Dark Mode Toggle */}
            <ThemeToggle />

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => toggleCart(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white rounded-lg text-xs font-medium transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {totalQuantity > 0 && (
                <span className="inline-flex items-center justify-center min-w-4 h-4 px-1 text-[10px] font-bold bg-blue-600 dark:bg-white text-white dark:text-slate-900 rounded">
                  {totalQuantity}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar (Storefront view only) */}
        {currentView === 'storefront' && (
          <div className="md:hidden pb-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search blueprints & modules..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder:text-slate-400"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        )}

        {/* Category Navigation Bar (Storefront view only) */}
        {currentView === 'storefront' && (
          <nav className="flex items-center gap-1 overflow-x-auto py-2 border-t border-slate-100 dark:border-neutral-800 no-scrollbar">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                    isSelected
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-black'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-neutral-900'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
};
