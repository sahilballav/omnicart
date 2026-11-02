import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { MOCK_PRODUCTS } from './data/mockProducts';
import { Product } from './types/product';
import { Github, Layers, ShieldCheck, Cpu, Database, Zap } from 'lucide-react';

const CATEGORIES = [
  'All',
  'Electronics',
  'Audio',
  'Wearables',
  'Smart Home',
  'Fashion',
  'Accessories'
];

export const AppContent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
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
        <div className="pt-6">
          <HeroBanner />
        </div>

        {/* Product Catalog Grid */}
        <ProductGrid
          products={MOCK_PRODUCTS}
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
          onQuickView={(prod) => setActiveModalProduct(prod)}
        />
      </div>

      {/* Slide-out Shopping Cart */}
      <CartDrawer />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
      />

      {/* Footer */}
      <footer className="mt-16 bg-slate-950 text-slate-400 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold">
                  <Layers className="w-4 h-4" />
                </div>
                <span className="text-lg font-bold text-white">OmniCart System</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm mb-4">
                Enterprise-grade, cloud-native multi-platform e-commerce ecosystem built with Spring Boot 21, React, Flutter, PostgreSQL JSONB, Redis, Apache Kafka, and Kubernetes on AWS EKS.
              </p>
              <div className="flex items-center gap-3 text-xs font-semibold text-slate-300">
                <span className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg">
                  <Cpu className="w-3.5 h-3.5 text-indigo-400" /> Java 21
                </span>
                <span className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg">
                  <Database className="w-3.5 h-3.5 text-emerald-400" /> JSONB
                </span>
                <span className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg">
                  <Zap className="w-3.5 h-3.5 text-amber-400" /> Kafka
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                Architecture Roadmap
              </h4>
              <ul className="text-xs space-y-2 text-slate-400">
                <li className="text-indigo-400 font-semibold">• Day 1: React Storefront (Done)</li>
                <li>• Day 2: Admin Dashboard & Agentic AI</li>
                <li>• Day 3: Docker & PostgreSQL JSONB</li>
                <li>• Day 4: Spring Boot REST & Redis Cache</li>
                <li>• Day 5: Agentic AI & Resilience4j</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                System Status
              </h4>
              <ul className="text-xs space-y-2">
                <li className="flex items-center gap-2 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Storefront UI: Active
                </li>
                <li className="flex items-center gap-2 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Local State Engine: Active
                </li>
                <li className="flex items-center gap-2 text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-500" /> Cart Session Ready
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© 2026 OmniCart System. Designed for Cloud-Native Multi-Platform Operations.</p>
            <div className="flex items-center gap-4">
              <span className="text-slate-400 flex items-center gap-1">
                <Github className="w-3.5 h-3.5" /> Open Source Microservices
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
