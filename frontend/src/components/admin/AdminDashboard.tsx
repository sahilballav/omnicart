import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Product } from '../../types/product';
import { InventoryTable } from './InventoryTable';
import { PredictiveAnalytics } from './PredictiveAnalytics';
import {
  ShieldAlert,
  ShieldCheck,
  Package,
  Activity,
  ArrowLeft,
  LogOut,
  Database,
  Cpu,
  Terminal
} from 'lucide-react';

interface AdminDashboardProps {
  products: Product[];
  onUpdateInventory: (productId: string, newCount: number) => void;
  onNavigateStorefront: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  onUpdateInventory,
  onNavigateStorefront
}) => {
  const { user, isAdmin, loginAsAdmin, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'inventory' | 'analytics'>('inventory');

  const handleExitToStorefront = () => {
    window.location.hash = '';
    onNavigateStorefront();
  };

  // RBAC Access Gate
  if (!isAdmin) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 font-mono">
        <div className="max-w-md w-full bg-white dark:bg-black border border-neutral-300 dark:border-[#222222] rounded-none p-6 sm:p-8 shadow-2xl transition-colors">
          <div className="w-12 h-12 rounded-none bg-neutral-100 dark:bg-[#111111] border border-neutral-300 dark:border-[#2a2a2a] text-[#556900] dark:text-[#d4ff00] flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-6 h-6 stroke-[2.5]" />
          </div>

          <div className="text-[10px] text-[#556900] dark:text-[#d4ff00] uppercase font-bold tracking-widest text-center mb-1">
            SECURITY GATEWAY // ZERO TRUST
          </div>

          <h2 className="text-xl font-black uppercase text-black dark:text-white text-center tracking-tight">
            ROLE-BASED ACCESS CONTROL
          </h2>

          <p className="text-xs text-neutral-600 dark:text-neutral-400 text-center mt-2.5 leading-relaxed">
            The Operator Console requires an active session with the{' '}
            <span className="font-bold text-black dark:text-white">ADMIN</span> role.
            Current session status:{' '}
            <span className="font-bold text-[#556900] dark:text-[#d4ff00]">
              {user ? user.role : 'GUEST / UNAUTHENTICATED'}
            </span>.
          </p>

          <div className="mt-6 space-y-3">
            <button
              onClick={loginAsAdmin}
              className="w-full py-3 px-4 bg-[#d4ff00] hover:bg-[#bfff00] text-black text-xs font-black uppercase tracking-wider rounded-none transition-colors flex items-center justify-center gap-2 shadow-xs active:scale-98"
            >
              <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
              <span>SIGN IN AS OPERATOR (SSO)</span>
            </button>

            <button
              onClick={handleExitToStorefront}
              className="w-full py-3 px-4 bg-neutral-100 hover:bg-neutral-200 dark:bg-[#141414] dark:hover:bg-[#1a1a1a] text-neutral-800 dark:text-neutral-200 text-xs font-bold uppercase tracking-wider rounded-none transition-colors flex items-center justify-center gap-2 border border-neutral-300 dark:border-[#2a2a2a]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>RETURN TO STOREFRONT</span>
            </button>
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-[#1c1c1c] text-[10px] text-neutral-500 uppercase text-center flex items-center justify-center gap-2">
            <Terminal className="w-3 h-3 text-[#556900] dark:text-[#d4ff00]" />
            <span>JWT TOKEN VALIDATION: ED25519 JWKS ACTIVE</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 font-mono">
      {/* Top Header */}
      <div className="bg-white dark:bg-black border border-neutral-300 dark:border-[#222222] rounded-none p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-none bg-[#d4ff00] text-black flex items-center justify-center font-black">
              <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-black uppercase tracking-tight text-black dark:text-white">
                  OmniCart Admin Console
                </h1>
                <span className="text-[10px] px-2 py-0.5 rounded-none bg-[#d4ff00] text-black font-black uppercase tracking-wider">
                  OPERATOR // LIVE
                </span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
                Operator: <span className="font-bold text-black dark:text-white">{user?.name}</span> ({user?.email})
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExitToStorefront}
            className="px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-[#141414] dark:hover:bg-[#1f1f1f] border border-neutral-300 dark:border-[#2a2a2a] text-black dark:text-white text-xs font-bold uppercase rounded-none transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>STOREFRONT</span>
          </button>

          <button
            onClick={logout}
            className="px-3.5 py-2 border border-neutral-300 dark:border-[#2a2a2a] hover:bg-neutral-100 dark:hover:bg-[#141414] text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white text-xs font-bold uppercase rounded-none transition-colors flex items-center gap-1.5"
            title="Log out from session"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>SIGN OUT</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-[#222222] pb-2">
        <button
          onClick={() => setActiveTab('inventory')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-wider rounded-none transition-colors ${
            activeTab === 'inventory'
              ? 'bg-[#d4ff00] text-black border border-black'
              : 'bg-neutral-100 dark:bg-[#111111] text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white border border-neutral-200 dark:border-[#222]'
          }`}
        >
          <Package className="w-4 h-4 stroke-[2]" />
          <span>INVENTORY & LICENSE SEATS</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-wider rounded-none transition-colors ${
            activeTab === 'analytics'
              ? 'bg-[#d4ff00] text-black border border-black'
              : 'bg-neutral-100 dark:bg-[#111111] text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white border border-neutral-200 dark:border-[#222]'
          }`}
        >
          <Activity className="w-4 h-4 stroke-[2]" />
          <span>PREDICTIVE ANALYTICS & KAFKA</span>
        </button>
      </div>

      {/* Main Content Area */}
      {activeTab === 'inventory' ? (
        <InventoryTable products={products} onUpdateInventory={onUpdateInventory} />
      ) : (
        <PredictiveAnalytics products={products} />
      )}

      {/* System Status Footer */}
      <div className="p-4 rounded-none bg-white dark:bg-black border border-neutral-300 dark:border-[#222222] flex flex-col sm:flex-row sm:items-center justify-between text-xs text-neutral-600 dark:text-neutral-400 gap-2 font-mono transition-colors">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-[#556900] dark:text-[#d4ff00]" />
            <span>POSTGRESQL JSONB: CONNECTED</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-[#556900] dark:text-[#d4ff00]" />
            <span>REDIS CACHE: 0.8MS LATENCY</span>
          </span>
        </div>
        <div>CLUSTER: AWS-US-EAST-1-PROD-EKS</div>
      </div>
    </div>
  );
};
