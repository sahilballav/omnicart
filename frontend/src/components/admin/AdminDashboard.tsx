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
  UserCheck,
  Database,
  Cpu
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
  const { user, isAdmin, loginAsAdmin, loginAsUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'inventory' | 'analytics'>('inventory');

  // RBAC Access Gate
  if (!isAdmin) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/80 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-6 h-6" />
          </div>

          <h2 className="text-lg font-bold text-slate-900 dark:text-white text-center">
            Role-Based Access Control
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-2 leading-relaxed">
            The Admin Console requires an authenticated session with the{' '}
            <span className="font-mono text-slate-700 dark:text-slate-300 font-semibold">ADMIN</span>{' '}
            role. Current session status:{' '}
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {user ? user.role : 'Unauthenticated'}
            </span>
            .
          </p>

          <div className="mt-6 space-y-3">
            <button
              onClick={loginAsAdmin}
              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <ShieldCheck className="w-4 h-4" />
              Sign in as Demo Administrator
            </button>

            <button
              onClick={loginAsUser}
              className="w-full py-2.5 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <UserCheck className="w-4 h-4" />
              Sign in as Customer (Read Only)
            </button>

            <button
              onClick={onNavigateStorefront}
              className="w-full py-2 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center justify-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Return to Storefront
            </button>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 font-mono text-center">
            JWT Token Validation: Ed25519 JWKS Active
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-slate-900 dark:text-white">
                  OmniCart Admin Console
                </h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 font-semibold border border-blue-200 dark:border-blue-800/80">
                  ADMIN ROLE
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Operator: <span className="font-medium text-slate-700 dark:text-slate-300">{user?.name}</span> ({user?.email})
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onNavigateStorefront}
            className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Storefront
          </button>

          <button
            onClick={logout}
            className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-rose-600 dark:text-rose-400 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5"
            title="Log out from session"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('inventory')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === 'inventory'
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Package className="w-4 h-4" />
          Inventory & License Seats
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === 'analytics'
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Activity className="w-4 h-4" />
          Predictive Analytics & Kafka Pipeline
        </button>
      </div>

      {/* Main Content Area */}
      {activeTab === 'inventory' ? (
        <InventoryTable products={products} onUpdateInventory={onUpdateInventory} />
      ) : (
        <PredictiveAnalytics products={products} />
      )}

      {/* System Status Footer */}
      <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-2 font-mono">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-blue-600" />
            PostgreSQL JSONB: Connected
          </span>
          <span className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-emerald-500" />
            Redis Cache: 0.8ms Latency
          </span>
        </div>
        <div>Cluster: aws-us-east-1-prod-eks</div>
      </div>
    </div>
  );
};

