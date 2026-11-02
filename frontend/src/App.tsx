import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { LoadingScreen } from './components/LoadingScreen';
import { Toast } from './components/Toast';
import { MOCK_PRODUCTS } from './data/mockProducts';
import { Product } from './types/product';
import { Github, Layers, Cpu, Database, Zap, Key } from 'lucide-react';

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
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);

  return (
    <>
      {/* Animated Futuristic Boot Loading Screen */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      <div className={`min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-indigo-500 selection:text-white transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100 animate-fade-in'}`}>
        <div>
          {/* Navigation Bar */}
          <Navbar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            categories={CATEGORIES}
            onReplayLoader={() => setIsLoading(true)}
          />

          {/* Hero Section */}
          <div className="pt-6">
            <HeroBanner />
          </div>

          {/* Digital Asset Catalog Grid */}
          <ProductGrid
            products={MOCK_PRODUCTS}
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
            onQuickView={(prod) => setActiveModalProduct(prod)}
          />
        </div>

        {/* Slide-out Digital Cart & Licensing Drawer */}
        <CartDrawer />

        {/* Product Detail Modal */}
        <ProductDetailModal
          product={activeModalProduct}
          onClose={() => setActiveModalProduct(null)}
        />

        {/* Floating Add to Cart Toast Notification */}
        <Toast />

        {/* Footer */}
        <footer className="mt-16 bg-slate-950 text-slate-400 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div className="md:col-span-2">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-800 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-500/20">
                    <Layers className="w-4 h-4 text-indigo-200" />
                  </div>
                  <span className="text-lg font-bold text-white">OmniCart Digital Hub</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed max-w-sm mb-4">
                  Enterprise cloud-native marketplace for digital assets, Terraform modules, AI agents, and Spring Boot microservice blueprints powered by PostgreSQL JSONB, Redis session sync, and Kafka event streaming.
                </p>
                <div className="flex items-center gap-3 text-xs font-semibold text-slate-300">
                  <span className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg">
                    <Cpu className="w-3.5 h-3.5 text-indigo-400" /> Java 21
                  </span>
                  <span className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg">
                    <Database className="w-3.5 h-3.5 text-emerald-400" /> Postgres JSONB
                  </span>
                  <span className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg">
                    <Zap className="w-3.5 h-3.5 text-amber-400" /> Kafka Pipeline
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                  Roadmap Architecture
                </h4>
                <ul className="text-xs space-y-2 text-slate-400">
                  <li className="text-indigo-400 font-semibold">• Day 1: Digital Storefront (Done)</li>
                  <li>• Day 2: Admin Dashboard & Agentic AI</li>
                  <li>• Day 3: Docker & PostgreSQL JSONB</li>
                  <li>• Day 4: Spring Boot REST & Redis Cache</li>
                  <li>• Day 5: Agentic AI & Resilience4j</li>
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                  Digital Delivery Network
                </h4>
                <ul className="text-xs space-y-2">
                  <li className="flex items-center gap-2 text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" /> Instant S3 CDN: Operational
                  </li>
                  <li className="flex items-center gap-2 text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" /> GitHub API Webhooks: Ready
                  </li>
                  <li className="flex items-center gap-2 text-slate-400">
                    <Key className="w-3.5 h-3.5 text-slate-500" /> JWT Key Issuance Active
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
              <p>© 2026 OmniCart Digital Hub. Designed for Cloud-Native Multi-Platform Ecosystems.</p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsLoading(true)}
                  className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                >
                  ↻ Replay Boot Loader
                </button>
                <span className="text-slate-400 flex items-center gap-1">
                  <Github className="w-3.5 h-3.5" /> Enterprise Digital Repositories
                </span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
