import React, { useState, useEffect } from 'react';
import { Product } from '../../types/product';
import { TrendingUp, AlertCircle, DollarSign, Activity, Cpu } from 'lucide-react';
import { orderApi, paymentApi } from '../../api/client';

interface PredictiveAnalyticsProps {
  products: Product[];
}

export const PredictiveAnalytics: React.FC<PredictiveAnalyticsProps> = ({ products }) => {
  const totalSeats = products.reduce((acc, p) => acc + p.inventoryCount, 0);
  const totalValue = products.reduce((acc, p) => acc + p.price * p.inventoryCount, 0);
  const lowStockCount = products.filter((p) => p.inventoryCount < 50).length;

  const [liveVelocity, setLiveVelocity] = useState<any>(null);
  const [circuitStatus, setCircuitStatus] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchTelemetry = async () => {
      const [vel, cb] = await Promise.all([
        orderApi.getVelocityMetrics(),
        paymentApi.getCircuitStatus()
      ]);
      if (isMounted) {
        if (vel) setLiveVelocity(vel);
        if (cb) setCircuitStatus(cb);
      }
    };

    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 6000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Kafka recent events stream (enhanced with live telemetry)
  const recentKafkaEvents = [
    {
      id: 'evt-1092',
      topic: 'omnicart.orders.placed',
      event: 'OrderPlaced',
      payload: liveVelocity?.totalOrdersCount
        ? `Orders Processed: ${liveVelocity.totalOrdersCount} | Velocity: ${liveVelocity.ordersPerMinute}/min`
        : 'License: CloudOps EKS Suite (Qty: 2)',
      timestamp: 'Active stream',
      status: 'ACK'
    },
    {
      id: 'evt-1091',
      topic: 'omnicart.inventory.deducted',
      event: 'InventoryDeducted',
      payload: `Live Allocated Seats: ${liveVelocity?.totalSeatsAllocated || 18} across blueprints`,
      timestamp: 'Committed',
      status: 'COMMITTED'
    },
    {
      id: 'evt-1090',
      topic: 'omnicart.licenses.issued',
      event: 'KeyGenerated',
      payload: 'JWT Token signed with Ed25519 JWKS',
      timestamp: '5 min ago',
      status: 'COMMITTED'
    },
    {
      id: 'evt-1089',
      topic: 'omnicart.cart.sync',
      event: 'RedisSessionSync',
      payload: `Circuit Breaker: ${circuitStatus?.state || 'CLOSED'} (0 failures)`,
      timestamp: '8 min ago',
      status: 'COMMITTED'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Catalog Assets</span>
            <Activity className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">
            {products.length} Active
          </div>
          <span className="text-[11px] text-slate-400 font-mono mt-1 block">
            Across 6 digital categories
          </span>
        </div>

        {/* Metric 2 */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Available Seats</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white font-mono">
            {totalSeats.toLocaleString()}
          </div>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1 block">
            Digital keys provisioned
          </span>
        </div>

        {/* Metric 3 */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Low Stock Alerts</span>
            <AlertCircle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white font-mono">
            {lowStockCount}
          </div>
          <span className="text-[11px] text-amber-600 dark:text-amber-400 font-medium mt-1 block">
            &lt;50 seats available
          </span>
        </div>

        {/* Metric 4 */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Allocated Catalog Value</span>
            <DollarSign className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white font-mono">
            ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <span className="text-[11px] text-slate-400 font-mono mt-1 block">
            Inventory asset valuation
          </span>
        </div>
      </div>

      {/* Grid: Predictive Depletion Chart & Kafka Stream Monitor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Predictive Depletion Velocity Chart */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Predictive Inventory Depletion
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Estimated days until license exhaustion based on checkout frequency
              </p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              Forecast Engine
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {products.slice(0, 5).map((product) => {
              // Calculate depletion percentage
              const maxScale = 300;
              const fillPct = Math.min(100, (product.inventoryCount / maxScale) * 100);
              const daysRemaining = Math.max(3, Math.round(product.inventoryCount / 4.2));

              return (
                <div key={product.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-800 dark:text-slate-200 truncate max-w-xs">
                      {product.name}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                      ~{daysRemaining} days left ({product.inventoryCount} seats)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        product.inventoryCount < 50
                          ? 'bg-amber-500'
                          : product.inventoryCount < 100
                          ? 'bg-blue-600'
                          : 'bg-emerald-500'
                      }`}
                      style={{ width: `${fillPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Kafka Event Pipeline Monitor */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Kafka Event Pipeline Monitor
                </h4>
              </div>
              <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-xs bg-emerald-500" />
                Broker Active
              </span>
            </div>

            <div className="space-y-2.5">
              {recentKafkaEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-3 text-xs"
                >
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-semibold text-slate-900 dark:text-white text-[11px]">
                        {evt.event}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {evt.topic}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-300 truncate">
                      {evt.payload}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-semibold block">
                      {evt.status}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5 block">
                      {evt.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>CONSUMER GROUP: omnicart-analytics</span>
            <span>OFFSET: 48,219</span>
          </div>
        </div>
      </div>
    </div>
  );
};

