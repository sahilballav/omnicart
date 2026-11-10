import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { TopAnnouncementBar } from './components/TopAnnouncementBar';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { BrandMarquee } from './components/BrandMarquee';
import { ProductGrid } from './components/ProductGrid';
import { EditorialFeature } from './components/EditorialFeature';
import { InsideTrackBanner } from './components/InsideTrackBanner';
import { TechnicalFaq } from './components/TechnicalFaq';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { Toast } from './components/Toast';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AiShoppingAssistant } from './components/ai/AiShoppingAssistant';
import { CustomerAuthModal } from './components/auth/CustomerAuthModal';
import { CustomerAccountModal } from './components/auth/CustomerAccountModal';
import { LoadingScreen } from './components/LoadingScreen';
import { BackgroundMotionVideo } from './components/BackgroundMotionVideo';
import { PrivacyPolicy } from './components/legal/PrivacyPolicy';
import { TermsConditions } from './components/legal/TermsConditions';
import { MOCK_PRODUCTS } from './data/mockProducts';
import { Product } from './types/product';
import { productApi } from './api/client';
import { Zap } from 'lucide-react';

const CATEGORIES = [
  'All',
  'Cloud & DevOps',
  'AI & Agent Kits',
  'Developer Tools',
  'UI Systems & Figma',
  'Microservices & APIs',
  'Courses & Masterclasses'
];

export const AppContent: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [currentView, setCurrentView] = useState<'storefront' | 'admin' | 'privacy' | 'terms'>('storefront');
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);
  const [isBootLoading, setIsBootLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

  // Synchronize live product catalog with Spring Boot backend (PostgreSQL JSONB)
  useEffect(() => {
    let isMounted = true;
    productApi.getAllProducts().then((liveProducts) => {
      if (isMounted && liveProducts && liveProducts.length > 0) {
        setProducts(liveProducts);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Operator console activation: URL query (?admin=true), hash (#admin), or hotkey (Ctrl+Shift+A / Ctrl+Alt+A / Cmd+Shift+A)
  useEffect(() => {
    const checkAdminRoute = () => {
      const search = window.location.search;
      const hash = window.location.hash;
      if (search.includes('admin=true') || hash === '#admin') {
        setCurrentView('admin');
      } else if (hash === '' || hash === '#storefront') {
        setCurrentView('storefront');
      }
    };
    checkAdminRoute();

    const handleKeyDown = (e: KeyboardEvent) => {
      const isKeyA = e.key === 'a' || e.key === 'A' || e.code === 'KeyA' || e.keyCode === 65;
      const isCtrlOrMeta = e.ctrlKey || e.metaKey;
      const isShiftOrAlt = e.shiftKey || e.altKey;

      // Matches Ctrl+Shift+A, Ctrl+Alt+A, Cmd+Shift+A, and Alt+Shift+A
      if (isKeyA && (isCtrlOrMeta && isShiftOrAlt)) {
        e.preventDefault();
        e.stopPropagation();
        setCurrentView((prev) => {
          const next = prev === 'admin' ? 'storefront' : 'admin';
          if (next === 'admin') {
            window.location.hash = 'admin';
          } else {
            window.location.hash = '';
          }
          return next;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown, { capture: true });
    window.addEventListener('hashchange', checkAdminRoute);
    window.addEventListener('popstate', checkAdminRoute);
    return () => {
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
      window.removeEventListener('hashchange', checkAdminRoute);
      window.removeEventListener('popstate', checkAdminRoute);
    };
  }, []);

  const handleUpdateInventory = (productId: string, newCount: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, inventoryCount: Math.max(0, newCount) } : p))
    );
  };

  const handleScrollToDrops = () => {
    const el = document.getElementById('limited-drops');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToEarlyAccess = () => {
    const el = document.getElementById('early-access-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToCatalog = () => {
    const el = document.getElementById('catalog-selection');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen text-black dark:text-white flex flex-col justify-between selection:bg-[#d4ff00] selection:text-black transition-colors duration-200 relative bg-transparent">
      {/* Dynamic Scroll-Driven Video & Motion Background (Dedicated Dark & Light Assets) */}
      <BackgroundMotionVideo />

      {/* System Boot Loading Screen */}
      {isBootLoading && <LoadingScreen onComplete={() => setIsBootLoading(false)} />}

      {/* Foreground Content Shell - Strictly Stacked Above Ambient Background */}
      <div className="relative z-10 flex flex-col min-h-screen justify-between">
        <div>
          {/* Top High-Voltage Announcement Ticker */}
          <TopAnnouncementBar onEarlyAccessClick={handleScrollToEarlyAccess} />

          {/* Brutalist Navigation Bar */}
          <Navbar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            categories={CATEGORIES}
            currentView={currentView}
            onNavigate={(view) => {
              setCurrentView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
            onOpenAccountModal={() => setIsAccountModalOpen(true)}
            onScrollToDrops={handleScrollToDrops}
            onScrollToEarlyAccess={handleScrollToEarlyAccess}
          />

          {/* View Routing */}
          {currentView === 'storefront' ? (
            <main>
              {/* SNKS-Style High-Impact Hero Banner */}
              <HeroBanner />

              {/* Tech Stack / Partner Strip */}
              <BrandMarquee />

              {/* Catalog Grid with Horizontal Brutalist Filters (Section 001) */}
              <ProductGrid
                products={products}
                selectedCategory={selectedCategory}
                searchQuery={searchQuery}
                onQuickView={(prod) => setActiveModalProduct(prod)}
                onSelectCategory={setSelectedCategory}
              />

              {/* Editorial Feature: Limited Drops / 002 */}
              <EditorialFeature onExploreClick={handleScrollToCatalog} />

              {/* High-Voltage Volt Drop Access / 003 */}
              <InsideTrackBanner />

              {/* Technical FAQ Accordion: Good To Know / 004 */}
              <TechnicalFaq />
            </main>
          ) : currentView === 'admin' ? (
            <main>
              <AdminDashboard
                products={products}
                onUpdateInventory={handleUpdateInventory}
                onNavigateStorefront={() => setCurrentView('storefront')}
              />
            </main>
          ) : currentView === 'privacy' ? (
            <main>
              <PrivacyPolicy onBack={() => setCurrentView('storefront')} />
            </main>
          ) : (
            <main>
              <TermsConditions onBack={() => setCurrentView('storefront')} />
            </main>
          )}
        </div>

        {/* SNKS Brutalist Footer */}
        <Footer
          onNavigatePrivacy={() => {
            setCurrentView('privacy');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onNavigateTerms={() => {
            setCurrentView('terms');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onScrollToCatalog={handleScrollToCatalog}
          onScrollToDrops={handleScrollToDrops}
          onScrollToEarlyAccess={handleScrollToEarlyAccess}
        />
      </div>

      {/* Floating Action Button for AI Shopping Assistant on Storefront */}
      {currentView === 'storefront' && (
        <button
          onClick={() => setIsAiAssistantOpen(true)}
          className="fixed bottom-6 right-6 z-30 px-4 py-2.5 bg-[#d4ff00] hover:bg-[#bfff00] text-black font-mono font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-2xl transition-transform active:scale-95 border border-black"
          title="Open OmniCart Agentic AI Advisor"
        >
          <Zap className="w-4 h-4 fill-black stroke-black" />
          <span>AI ADVISOR</span>
        </button>
      )}

      {/* Agentic AI Assistant Drawer */}
      <AiShoppingAssistant
        isOpen={isAiAssistantOpen}
        onClose={() => setIsAiAssistantOpen(false)}
        products={products}
        onSelectProduct={(prod) => setActiveModalProduct(prod)}
      />

      {/* Customer Authentication Modal */}
      <CustomerAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      {/* Customer License Vault & Account Modal */}
      <CustomerAccountModal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
      />

      {/* Slide-out Cart Drawer */}
      <CartDrawer />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
      />

      {/* Toast Notification */}
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
