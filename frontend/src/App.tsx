import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { Toast } from './components/Toast';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AiShoppingAssistant } from './components/ai/AiShoppingAssistant';
import { PrivacyPolicy } from './components/legal/PrivacyPolicy';
import { TermsConditions } from './components/legal/TermsConditions';
import { MOCK_PRODUCTS } from './data/mockProducts';
import { Product } from './types/product';
import { Github, Layers, Cpu, Database, Server, Sparkles, Shield, FileText, Globe } from 'lucide-react';

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

  const handleUpdateInventory = (productId: string, newCount: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, inventoryCount: Math.max(0, newCount) } : p))
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white transition-colors duration-200">
      <div>
        {/* Navigation Bar */}
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
        />

        {/* View Routing */}
        {currentView === 'storefront' ? (
          <main>
            {/* Workbench Header */}
            <HeroBanner />

            {/* Digital Asset Catalog & Faceted Workbench */}
            <ProductGrid
              products={products}
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
              onQuickView={(prod) => setActiveModalProduct(prod)}
              onSelectCategory={setSelectedCategory}
            />
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

      {/* Floating Action Button for AI Shopping Assistant on Storefront */}
      {currentView === 'storefront' && (
        <button
          onClick={() => setIsAiAssistantOpen(true)}
          className="fixed bottom-6 right-6 z-30 px-3.5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-lg flex items-center gap-2 text-xs font-semibold transition-colors"
          title="Open OmniCart Agentic Shopping Assistant"
        >
          <Sparkles className="w-4 h-4 text-white" />
          <span>Ask AI Assistant</span>
        </button>
      )}

      {/* Agentic AI Assistant Drawer */}
      <AiShoppingAssistant
        isOpen={isAiAssistantOpen}
        onClose={() => setIsAiAssistantOpen(false)}
        products={products}
        onSelectProduct={(prod) => setActiveModalProduct(prod)}
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

      {/* Technical Footer */}
      <footer className="mt-16 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold">
                  <Layers className="w-4 h-4" />
                </div>
                <span className="text-base font-bold text-slate-900 dark:text-white">OmniCart</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm mb-4">
                Enterprise cloud-native software and digital asset distribution engine. Built with Java 21, Spring Boot, React, PostgreSQL JSONB, Redis, and Apache Kafka on AWS EKS.
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                  <Cpu className="w-3.5 h-3.5" /> Java 21
                </span>
                <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                  <Database className="w-3.5 h-3.5" /> PostgreSQL JSONB
                </span>
                <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                  <Server className="w-3.5 h-3.5" /> Kafka KRaft
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                Console & Tools
              </h4>
              <ul className="text-xs space-y-2 text-slate-500 dark:text-slate-400">
                <li>
                  <button
                    onClick={() => {
                      setCurrentView('admin');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    Operator Admin Console
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setIsAiAssistantOpen(true)}
                    className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    Agentic Shopping Assistant
                  </button>
                </li>
                <li>
                  <a
                    href="https://github.com/sahilballav/omnicart"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1"
                  >
                    <Github className="w-3.5 h-3.5" /> GitHub Monorepo
                  </a>
                </li>
                <li className="flex items-center gap-1 text-slate-400 font-mono">
                  <Globe className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Domain: omnicart.io</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                Compliance & Legal
              </h4>
              <ul className="text-xs space-y-2 text-slate-500 dark:text-slate-400">
                <li>
                  <button
                    onClick={() => {
                      setCurrentView('privacy');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1.5 transition-colors"
                  >
                    <Shield className="w-3.5 h-3.5 text-slate-400" />
                    <span>Privacy Policy</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setCurrentView('terms');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1.5 transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                    <span>Terms & Conditions</span>
                  </button>
                </li>
                <li className="font-mono text-[11px] text-slate-400">
                  GDPR & CCPA Compliant
                </li>
                <li className="font-mono text-[11px] text-slate-400">
                  Ed25519 Signed Licenses
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© 2026 OmniCart. All rights reserved. Zero third-party trackers.</p>
            <div className="flex items-center gap-4">
              <span className="font-mono text-[11px]">Domain: omnicart.io</span>
              <span className="font-mono text-[11px]">Production Target: AWS EKS</span>
            </div>
          </div>
        </div>
      </footer>
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
