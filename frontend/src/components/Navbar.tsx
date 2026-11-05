import React, { useState, useEffect } from 'react';
import { ShoppingBag, ArrowUpRight, Zap, Key, User, Store } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ThemeToggle } from './ThemeToggle';

type NavTabId = 'sale' | 'all-modules' | 'drops' | 'early-access' | 'ai-advisor';

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
  onSelectCategory,
  onOpenAiAssistant,
  onOpenAuthModal,
  onOpenAccountModal,
  onScrollToDrops,
  onScrollToEarlyAccess
}) => {
  const { totalQuantity, toggleCart } = useCart();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<NavTabId>('sale');

  // Automatic scroll-spy: moves highlighted bar as user scrolls through sections
  useEffect(() => {
    if (currentView !== 'storefront') return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPos = window.scrollY + 220;
          const earlyEl = document.getElementById('early-access-section');
          const dropsEl = document.getElementById('limited-drops');
          const catalogEl = document.getElementById('catalog-selection');

          if (earlyEl && scrollPos >= earlyEl.offsetTop) {
            setActiveTab('early-access');
          } else if (dropsEl && scrollPos >= dropsEl.offsetTop) {
            setActiveTab('drops');
          } else if (catalogEl && scrollPos >= catalogEl.offsetTop) {
            setActiveTab('all-modules');
          } else {
            setActiveTab('sale');
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  // Handle Tab Click: moves highlight immediately and scrolls to section
  const handleTabClick = (tabId: NavTabId) => {
    setActiveTab(tabId);

    if (tabId === 'sale') {
      const el = document.getElementById('hero-sale') || document.getElementById('catalog-selection');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (tabId === 'all-modules') {
      onSelectCategory('All');
      const el = document.getElementById('catalog-selection');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (tabId === 'drops') {
      onScrollToDrops?.();
    } else if (tabId === 'early-access') {
      onScrollToEarlyAccess?.();
    } else if (tabId === 'ai-advisor') {
      onOpenAiAssistant();
    }
  };

  const navTabs = [
    { id: 'sale' as const, label: 'THE SALE', hasZap: true },
    { id: 'all-modules' as const, label: 'ALL MODULES' },
    { id: 'drops' as const, label: 'LIMITED DROPS' },
    { id: 'early-access' as const, label: 'EARLY ACCESS', hasArrow: true },
    { id: 'ai-advisor' as const, label: 'AI ADVISOR' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-black/90 text-black dark:text-white backdrop-blur-md border-b border-neutral-200 dark:border-[#222222] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                window.location.hash = '';
                onNavigate('storefront');
              }}
              className="flex items-baseline gap-1 focus:outline-none group"
            >
              <span className="text-2xl sm:text-3xl font-black italic tracking-tighter uppercase text-black dark:text-white group-hover:text-[#556900] dark:group-hover:text-[#d4ff00] transition-colors">
                OMNICART
              </span>
              <span className="text-[10px] font-bold text-[#556900] dark:text-[#d4ff00]">®</span>
            </button>
          </div>

          {/* Center Dynamic Capsule Navigation with Moving Highlighted Pill */}
          {currentView === 'storefront' && (
            <nav className="hidden lg:flex items-center gap-1 p-1 bg-neutral-100/90 dark:bg-[#111111]/90 border border-neutral-200 dark:border-[#262626] rounded-full text-xs font-mono font-bold uppercase transition-colors">
              {navTabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#d4ff00] text-black font-black border border-black/20 shadow-xs scale-[1.02]'
                        : 'text-neutral-700 hover:text-black hover:bg-neutral-200/80 dark:text-neutral-300 dark:hover:text-white dark:hover:bg-neutral-800/80 font-bold border border-transparent'
                    }`}
                  >
                    {tab.hasZap && (
                      <Zap className={`w-3 h-3 ${isActive ? 'fill-black text-black' : 'text-[#7d9900] dark:text-[#d4ff00]'}`} />
                    )}
                    <span>{tab.label}</span>
                    {tab.hasArrow && (
                      <ArrowUpRight className={`w-3 h-3 stroke-[2.5] ${isActive ? 'text-black' : 'text-neutral-500'}`} />
                    )}
                  </button>
                );
              })}
            </nav>
          )}

          {/* Action Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Operator Admin Console Exit Button (Visible ONLY when currently inside Admin mode) */}
            {currentView === 'admin' && (
              <button
                onClick={() => {
                  window.location.hash = '';
                  onNavigate('storefront');
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#d4ff00] text-black rounded-none font-mono text-xs font-black uppercase hover:bg-[#bfff00] transition-colors border border-black shadow-xs"
                title="Exit Admin Console"
              >
                <Store className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>EXIT ADMIN</span>
              </button>
            )}

            {/* Customer Vault / Sign In */}
            {user && user.role === 'USER' ? (
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
