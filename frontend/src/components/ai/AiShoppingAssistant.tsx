import React, { useState, useEffect, useRef } from 'react';
import { Product } from '../../types/product';
import { useCart } from '../../context/CartContext';
import {
  Sparkles,
  X,
  Send,
  Terminal,
  Database,
  ShoppingCart,
  Eye,
  RotateCcw
} from 'lucide-react';

interface AiShoppingAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  parsedQuery?: {
    intent: string;
    targetCategory?: string;
    maxPrice?: number;
    jsonbCriteria?: Record<string, string>;
    sqlPreview?: string;
  };
  matchedProducts?: Product[];
}

const PRESET_PROMPTS = [
  'Terraform blueprints under $200',
  'Production Kubernetes clusters for AWS',
  'Java 21 Spring Boot microservices',
  'AI agent frameworks with LangChain',
  'Developer productivity tools'
];

export const AiShoppingAssistant: React.FC<AiShoppingAssistantProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct
}) => {
  const { addToCart } = useCart();
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-01',
      sender: 'assistant',
      text: 'Hello. I am the OmniCart Agentic Shopping Assistant. Ask for cloud architectures, developer tools, or AI blueprints using natural language. I will extract your filter attributes and query the PostgreSQL JSONB catalog.',
      timestamp: 'Now'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isProcessing]);

  // Keyboard shortcut: Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleQuery = (queryText: string) => {
    const trimmed = queryText.trim();
    if (!trimmed || isProcessing) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsProcessing(true);

    // Intent Parser Simulation
    setTimeout(() => {
      const lower = trimmed.toLowerCase();

      // Extract price filter if specified
      let maxPrice: number | undefined;
      const priceMatch = lower.match(/(?:under|below|less than|\$)\s*(\d+)/i);
      if (priceMatch) {
        maxPrice = parseFloat(priceMatch[1]);
      }

      // Detect JSONB attributes and categories
      const jsonbCriteria: Record<string, string> = {};
      let targetCategory: string | undefined;

      if (lower.includes('terraform')) {
        jsonbCriteria['iac_framework'] = 'Terraform';
      }
      if (lower.includes('kubernetes') || lower.includes('k8s') || lower.includes('eks')) {
        jsonbCriteria['orchestrator'] = 'Kubernetes';
      }
      if (lower.includes('aws')) {
        jsonbCriteria['cloud_provider'] = 'AWS';
      }
      if (lower.includes('spring') || lower.includes('java')) {
        jsonbCriteria['java_version'] = '21';
      }
      if (lower.includes('langchain') || lower.includes('ai') || lower.includes('agent')) {
        jsonbCriteria['ai_engine'] = 'LangChain';
      }

      if (lower.includes('cloud') || lower.includes('devops') || lower.includes('terraform')) {
        targetCategory = 'Cloud & DevOps';
      } else if (lower.includes('ai') || lower.includes('agent')) {
        targetCategory = 'AI & Agent Kits';
      } else if (lower.includes('microservice') || lower.includes('api') || lower.includes('spring')) {
        targetCategory = 'Microservices & APIs';
      } else if (lower.includes('figma') || lower.includes('ui') || lower.includes('design')) {
        targetCategory = 'UI Systems & Figma';
      } else if (lower.includes('tool') || lower.includes('cli') || lower.includes('docker')) {
        targetCategory = 'Developer Tools';
      }

      // Filter products
      const matches = products.filter((p) => {
        if (maxPrice !== undefined && p.price > maxPrice) {
          return false;
        }

        const matchesCategory = targetCategory ? p.category === targetCategory : true;
        const matchesName =
          p.name.toLowerCase().includes(lower) ||
          p.description.toLowerCase().includes(lower) ||
          p.tags.some((t) => lower.includes(t.toLowerCase()));

        // JSONB attribute matching
        let matchesJsonb = true;
        if (jsonbCriteria['iac_framework'] && p.attributes.iac_framework !== 'Terraform') {
          matchesJsonb = false;
        }
        if (jsonbCriteria['cloud_provider'] && p.attributes.cloud_provider !== 'AWS') {
          matchesJsonb = false;
        }
        if (jsonbCriteria['java_version'] && p.attributes.java_version !== '21') {
          matchesJsonb = false;
        }

        return (matchesCategory || matchesName || matchesJsonb);
      });

      // Construct simulated SQL query
      const sqlWhereClauses: string[] = [];
      if (targetCategory) {
        sqlWhereClauses.push(`category = '${targetCategory}'`);
      }
      Object.entries(jsonbCriteria).forEach(([key, val]) => {
        sqlWhereClauses.push(`attributes->>'${key}' = '${val}'`);
      });
      if (maxPrice !== undefined) {
        sqlWhereClauses.push(`price <= ${maxPrice.toFixed(2)}`);
      }

      const whereString = sqlWhereClauses.length > 0 ? `\nWHERE ${sqlWhereClauses.join(' AND ')}` : '';
      const sqlPreview = `SELECT id, name, price, attributes\nFROM products${whereString}\nORDER BY rating DESC LIMIT 5;`;

      const assistantMsg: Message = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: `Found ${matches.length} catalog asset${matches.length === 1 ? '' : 's'} matching your criteria.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        parsedQuery: {
          intent: 'Catalog Query & Specification Match',
          targetCategory,
          maxPrice,
          jsonbCriteria: Object.keys(jsonbCriteria).length > 0 ? jsonbCriteria : undefined,
          sqlPreview
        },
        matchedProducts: matches.slice(0, 3)
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsProcessing(false);
    }, 400);
  };

  const handleReset = () => {
    setMessages([
      {
        id: 'welcome-01',
        sender: 'assistant',
        text: 'Session reset. What digital architecture or asset are you looking to deploy?',
        timestamp: 'Now'
      }
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col z-10 border-l border-slate-200 dark:border-slate-800 transition-colors">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Agentic Shopping Assistant
                </h3>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-semibold border border-indigo-200 dark:border-indigo-800">
                  NLP / JSONB
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Natural language asset discovery & SQL generation
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleReset}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Reset Conversation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[90%] rounded-xl p-3.5 text-xs ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-none'
                    : 'bg-slate-100 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 rounded-bl-none border border-slate-200/60 dark:border-slate-700/60'
                }`}
              >
                <div className="leading-relaxed">{msg.text}</div>

                {/* Parsed Attributes & SQL Preview */}
                {msg.parsedQuery && (
                  <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 space-y-2">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                      <Terminal className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Extracted Parameters:</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {msg.parsedQuery.targetCategory && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                          category: {msg.parsedQuery.targetCategory}
                        </span>
                      )}
                      {msg.parsedQuery.maxPrice !== undefined && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                          max_price: ${msg.parsedQuery.maxPrice}
                        </span>
                      )}
                      {msg.parsedQuery.jsonbCriteria &&
                        Object.entries(msg.parsedQuery.jsonbCriteria).map(([k, v]) => (
                          <span
                            key={k}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-indigo-600 dark:text-indigo-400"
                          >
                            jsonb.{k}: {v}
                          </span>
                        ))}
                    </div>

                    {msg.parsedQuery.sqlPreview && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mb-1">
                          <span className="flex items-center gap-1">
                            <Database className="w-3 h-3 text-slate-400" /> PostgreSQL JSONB Query
                          </span>
                        </div>
                        <pre className="p-2.5 rounded bg-slate-900 text-slate-200 text-[10px] font-mono overflow-x-auto leading-normal">
                          {msg.parsedQuery.sqlPreview}
                        </pre>
                      </div>
                    )}
                  </div>
                )}

                {/* Matching Products Cards */}
                {msg.matchedProducts && msg.matchedProducts.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 space-y-2">
                    <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block">
                      Recommended Assets:
                    </span>
                    <div className="space-y-2">
                      {msg.matchedProducts.map((prod) => (
                        <div
                          key={prod.id}
                          className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 flex items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <img
                              src={prod.images[0]}
                              alt=""
                              className="w-10 h-10 rounded object-cover bg-slate-100 dark:bg-slate-800 shrink-0"
                            />
                            <div className="min-w-0">
                              <h5 className="font-semibold text-slate-900 dark:text-white truncate text-xs">
                                {prod.name}
                              </h5>
                              <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono">
                                <span>${prod.price.toFixed(2)}</span>
                                <span>|</span>
                                <span>{prod.inventoryCount} seats</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              onClick={() => {
                                onSelectProduct(prod);
                                onClose();
                              }}
                              className="p-1.5 rounded text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                              title="View Asset Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => addToCart(prod)}
                              className="px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-[11px] font-medium flex items-center gap-1 transition-colors"
                            >
                              <ShoppingCart className="w-3 h-3" />
                              Add
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <span className="text-[10px] text-slate-400 mt-1 px-1 font-mono">
                {msg.timestamp}
              </span>
            </div>
          ))}

          {isProcessing && (
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 p-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              Parsing criteria and executing PostgreSQL JSONB query...
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-800 overflow-x-auto no-scrollbar flex items-center gap-1.5">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider shrink-0 mr-1">
            Try:
          </span>
          {PRESET_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleQuery(prompt)}
              className="text-[11px] px-2.5 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-700 whitespace-nowrap transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleQuery(input);
            }}
            className="flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. Find Terraform templates under $200..."
              className="flex-1 px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              disabled={!input.trim() || isProcessing}
              className="p-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-lg transition-colors"
              title="Send Query"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
