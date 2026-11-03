import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { Toast } from './components/Toast';
import { ArchitectureShowcase } from './components/ArchitectureShowcase';
import { MOCK_PRODUCTS } from './data/mockProducts';
import { Product } from './types/product';
import { Github, Layers, Cpu, Database, Server } from 'lucide-react';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);

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
        />

        {/* Hero Section */}
        <HeroBanner />

        {/* Architecture Section */}
        <ArchitectureShowcase />

        {/* Digital Asset Catalog Grid */}
        <ProductGrid
          products={MOCK_PRODUCTS}
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
          onQuickView={(prod) => setActiveModalProduct(prod)}
        />
      </div>

      {/* Slide-out Cart Drawer */}
      <CartDrawer />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
      />

      {/* Toast Notification */}
      <Toast />

      {/* Clean Technical Footer */}
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
                Enterprise cloud-native multi-platform architecture. Java 21, Spring Boot, React, Flutter, PostgreSQL JSONB, Redis, and Apache Kafka on AWS EKS.
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
                Core Stack
              </h4>
              <ul className="text-xs space-y-2 text-slate-500 dark:text-slate-400">
                <li>React 18 & TypeScript</li>
                <li>Spring Boot 3.3 Microservices</li>
                <li>Redis 7 Session Tier</li>
                <li>Apache Kafka Event Streams</li>
                <li>Kubernetes (AWS EKS)</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                Repository
              </h4>
              <ul className="text-xs space-y-2 text-slate-500 dark:text-slate-400">
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
                <li>MIT Open Source License</li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© 2026 OmniCart. Built for high-velocity software delivery.</p>
            <div className="flex items-center gap-4">
              <span>Ready for Day 2 Admin Dashboard</span>
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
      <CartProvider>
        <AppContent />
      </CartProvider>
    </ThemeProvider>
  );
}
