import React from 'react';
import { ShoppingBag, ArrowUpRight, Zap, Key, User, Store } from 'lucide-react';
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
  onOpenAuthModal: () => void;
  onOpenAccountModal: () => void;
  onScrollToDrops?: () => void;
  onScrollToEarlyAccess?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenAiAssistant,
  onOpenAuthModal,
  onOpenAccountModal,
  onScrollToDrops,
  onScrollToEarlyAccess
}) => {
  const { totalQuantity, toggleCart } = useCart();
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-black/90 text-black dark:text-white backdrop-blur-md border-b border-neutral-200 dark:border-[#222222] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('storefront')}
              className="flex items-baseline gap-1 focus:outline-none group"
            >
              <span className="text-2xl sm:text-3xl font-black italic tracking-tighter uppercase text-black dark:text-white group-hover:text-[#556900] dark:group-hover:text-[#d4ff00] transition-colors">
                OMNICART
              </span>
              <span className="text-[10px] font-bold text-[#556900] dark:text-[#d4ff00]">®</span>
            </button>
          </div>

          {/* Center SNKS-Style Capsule Navigation (Storefront View) */}
          {currentView === 'storefront' && (
            <nav className="hidden lg:flex items-center gap-1.5 p-1 bg-neutral-100 dark:bg-[#111111] border border-neutral-200 dark:border-[#262626] rounded-full text-xs font-mono font-bold uppercase transition-colors">
              <button
                onClick={() => {
                  const el = document.getElementById('catalog-selection');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-3.5 py-1.5 rounded-full bg-[#d4ff00] text-black border border-black/20 flex items-center gap-1.5 transition-all shadow-xs"
              >
                <Zap className="w-3 h-3 fill-black text-black" />
                <span>THE SALE</span>
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('catalog-selection');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-3 py-1.5 rounded-full text-neutral-700 hover:text-black hover:bg-neutral-200 dark:text-neutral-300 dark:hover:text-white dark:hover:bg-neutral-900 transition-colors"
              >
                ALL MODULES
              </button>

              <button
                onClick={onScrollToDrops}
                className="px-3 py-1.5 rounded-full text-neutral-700 hover:text-black hover:bg-neutral-200 dark:text-neutral-300 dark:hover:text-white dark:hover:bg-neutral-900 transition-colors"
              >
                LIMITED DROPS
              </button>

              <button
                onClick={onScrollToEarlyAccess}
                className="px-3 py-1.5 rounded-full text-neutral-700 hover:text-black hover:bg-neutral-200 dark:text-neutral-300 dark:hover:text-[#d4ff00] dark:hover:bg-neutral-900 flex items-center gap-1 transition-colors"
              >
                <span>EARLY ACCESS</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>

              <button
                onClick={onOpenAiAssistant}
                className="px-3 py-1.5 rounded-full text-neutral-600 hover:text-black hover:bg-neutral-200 dark:text-neutral-400 dark:hover:text-[#d4ff00] dark:hover:bg-neutral-900 transition-colors"
                title="Agentic Assistant"
              >
                AI ADVISOR
              </button>
            </nav>
          )}

          {/* Action Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Operator Admin Console Exit Button (Visible only when inside Admin) */}
            {currentView === 'admin' ? (
              <button
                onClick={() => onNavigate('storefront')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#d4ff00] text-black rounded-none font-mono text-xs font-bold uppercase hover:bg-[#bfff00] transition-colors"
                title="Exit Admin Console"
              >
                <Store className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>EXIT ADMIN</span>
              </button>
            ) : (
              /* Customer Vault / Sign In */
              user && user.role === 'USER' ? (
                <button
                  onClick={onOpenAccountModal}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 dark:bg-[#111111] border border-neutral-300 dark:border-[#2a2a2a] hover:border-black dark:hover:border-[#d4ff00] text-neutral-900 dark:text-neutral-200 rounded-none text-xs font-mono font-bold uppercase transition-colors"
                  title="Open Customer License Vault"
                >
                  <Key className="w-3 h-3 text-[#7d9900] dark:text-[#d4ff00]" />
                  <span className="hidden sm:inline truncate max-w-[100px]">{user.name}</span>
                  <span className="sm:hidden">VAULT</span>
                </button>
              ) : (
                <button
                  onClick={onOpenAuthModal}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-transparent border border-neutral-300 dark:border-[#333333] hover:border-black dark:hover:border-white text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white rounded-none text-xs font-mono font-bold uppercase transition-colors"
                  title="Developer Account Sign-In"
                >
                  <User className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">SIGN IN</span>
                </button>
              )
            )}

            {/* Dark Mode Toggle */}
            <ThemeToggle />

            {/* SNKS-Style Shopping Bag Capsule */}
            <button
              onClick={() => toggleCart(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-transparent dark:hover:bg-neutral-900 border border-neutral-300 dark:border-[#333333] hover:border-black dark:hover:border-[#d4ff00] text-black dark:text-white transition-colors select-none"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 text-neutral-800 dark:text-neutral-200" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider hidden sm:inline">
                BAG
              </span>
              <span className="inline-flex items-center justify-center min-w-4 h-4 px-1 rounded-full text-[10px] font-black font-mono bg-[#d4ff00] text-black">
                {totalQuantity}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
