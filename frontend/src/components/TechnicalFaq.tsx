import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: 'When does the Black Friday sale end?',
    a: 'The Black Friday and Cyber Monday sale runs through December 4, 2026 at midnight UTC. Once closed, discounted cohort license bundles revert to standard enterprise pricing.'
  },
  {
    q: 'Is code delivery really instant and automated?',
    a: 'Yes. The moment checkout completes, our event broker publishes to Apache Kafka, issuing your Ed25519 token and sending an automated GitHub organization repository invite directly to your account.'
  },
  {
    q: 'How do I find my license keys and git clone tokens?',
    a: 'Click the "VAULT" or "ACCOUNT" button in the top navigation bar to open your private Customer Vault. You can view all assigned Ed25519 tokens, copy direct git clone URIs, and export cryptographic .pem certificates.'
  },
  {
    q: 'How does early access and limited drops work?',
    a: 'Early access members receive private GitHub repository invites 48 hours before public rollout, alongside priority Discord SLA support and GraalVM native binary access.'
  },
  {
    q: 'Can I leave checkout and come back later?',
    a: 'Yes. Cart allocations are persisted in Redis cache and synced with your local session. In-cart licenses are held for 60 minutes before releasing back to the live catalog.'
  }
];

export const TechnicalFaq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="w-full bg-white/85 dark:bg-black/85 backdrop-blur-xs text-black dark:text-white py-16 sm:py-24 border-b border-neutral-200 dark:border-[#222222] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: SNKS Editorial Section Header */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-mono font-bold tracking-widest text-[#7d9900] dark:text-[#d4ff00] uppercase">
              GOOD TO KNOW / 004
            </div>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter leading-none text-black dark:text-white">
              NO GUESSWORK.
            </h2>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter leading-none text-black bg-[#d4ff00] px-2.5 inline-block dark:bg-transparent dark:text-[#d4ff00] dark:p-0">
              JUST GOOD CODE.
            </h2>
            <p className="text-xs font-mono uppercase text-neutral-600 dark:text-neutral-400 max-w-sm pt-2 leading-relaxed">
              Clear answers on digital licensing, automated GitHub repository provisioning, and cryptographic key issuance.
            </p>
          </div>

          {/* Right Column: Clean Brutalist Accordion */}
          <div className="lg:col-span-7 divide-y divide-neutral-200 dark:divide-[#222222] border-t border-b border-neutral-200 dark:border-[#222222]">
            {FAQS.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={idx} className="py-5 sm:py-6 transition-colors">
                  <button
                    onClick={() => toggleIndex(idx)}
                    className="w-full flex items-center justify-between text-left group"
                  >
                    <span className="text-sm sm:text-base font-bold text-black dark:text-white group-hover:text-[#7d9900] dark:group-hover:text-[#d4ff00] transition-colors pr-4">
                      {faq.q}
                    </span>
                    <span className="text-neutral-500 group-hover:text-black dark:text-neutral-400 dark:group-hover:text-[#d4ff00] transition-colors shrink-0">
                      {isOpen ? <Minus className="w-5 h-5 stroke-[2.5]" /> : <Plus className="w-5 h-5 stroke-[2.5]" />}
                    </span>
                  </button>

                  {isOpen && (
                    <p className="mt-3 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-mono leading-relaxed max-w-xl">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

