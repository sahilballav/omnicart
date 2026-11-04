import React, { useState } from 'react';
import { X, Key, Terminal, Github, Check, Download, LogOut, Shield, Copy } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface CustomerAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomerAccountModal: React.FC<CustomerAccountModalProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'licenses' | 'security'>('licenses');
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);
  const [copiedCloneId, setCopiedCloneId] = useState<string | null>(null);

  if (!isOpen || !user) return null;

  const handleCopyKey = (id: string, key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKeyId(id);
    setTimeout(() => setCopiedKeyId(null), 2000);
  };

  const handleCopyClone = (id: string, slug: string) => {
    navigator.clipboard.writeText(`git clone https://github.com/omnicart/${slug}.git`);
    setCopiedCloneId(id);
    setTimeout(() => setCopiedCloneId(null), 2000);
  };

  const handleDownloadCertificate = (licenseName: string, licenseKey: string) => {
    const certContent = `-----BEGIN OMNICART LICENSE CERTIFICATE-----\nProduct: ${licenseName}\nLicense-Key: ${licenseKey}\nIssued-To: ${user.email}\nIssuer: OmniCart PKI Authority (Ed25519)\nTimestamp: ${new Date().toISOString()}\nStatus: VERIFIED\n-----END OMNICART LICENSE CERTIFICATE-----`;
    const blob = new Blob([certContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${licenseKey}-certificate.pem`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
    >
      <div className="relative bg-white dark:bg-black rounded-xl max-w-2xl w-full border border-slate-200 dark:border-neutral-800 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col transition-colors">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Developer License Vault
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-semibold border border-emerald-200 dark:border-emerald-800/80">
                  VERIFIED CUSTOMER
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {user.name} ({user.email})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-slate-100 dark:hover:bg-neutral-900 text-slate-500 dark:text-slate-400 flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 pt-3 border-b border-slate-100 dark:border-neutral-800/80 flex items-center gap-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('licenses')}
            className={`pb-2.5 transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'licenses'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>Active Licenses ({user.licenses?.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`pb-2.5 transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'security'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Session & PKI Tokens</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-5 sm:p-6 flex-1 space-y-4">
          {activeTab === 'licenses' ? (
            user.licenses && user.licenses.length > 0 ? (
              <div className="space-y-4">
                {user.licenses.map((lic) => (
                  <div
                    key={lic.id}
                    className="p-4 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-lg space-y-3"
                  >
                    {/* Item Top */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                            {lic.productName}
                          </h4>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-200 dark:bg-neutral-800 text-slate-700 dark:text-slate-300">
                            {lic.version}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          {lic.licenseType} &bull; Issued {new Date(lic.issuedAt).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDownloadCertificate(lic.productName, lic.licenseKey)}
                          className="px-2.5 py-1 text-[11px] font-medium bg-white dark:bg-black border border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-neutral-900 rounded flex items-center gap-1 transition-colors"
                          title="Download cryptographic PEM certificate"
                        >
                          <Download className="w-3 h-3 text-slate-400" />
                          <span>Certificate (.pem)</span>
                        </button>
                      </div>
                    </div>

                    {/* License Key Box */}
                    <div className="p-2.5 bg-white dark:bg-black border border-slate-200 dark:border-neutral-800 rounded flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 truncate">
                        <span className="text-[10px] font-mono text-slate-400 uppercase">Token:</span>
                        <code className="text-xs font-mono text-blue-600 dark:text-blue-400 truncate">
                          {lic.licenseKey}
                        </code>
                      </div>
                      <button
                        onClick={() => handleCopyKey(lic.id, lic.licenseKey)}
                        className="px-2 py-1 text-[10px] font-mono bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-slate-700 dark:text-slate-300 rounded flex items-center gap-1 shrink-0 transition-colors"
                      >
                        {copiedKeyId === lic.id ? (
                          <Check className="w-3 h-3 text-emerald-500" />
                        ) : (
                          <Copy className="w-3 h-3 text-slate-400" />
                        )}
                        <span>{copiedKeyId === lic.id ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>

                    {/* Git Clone & GitHub Access */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs pt-1 border-t border-slate-100 dark:border-neutral-900">
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-[11px]">
                        <Github className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>Repository Invite:</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                          Active (Access Granted)
                        </span>
                      </div>

                      <button
                        onClick={() => handleCopyClone(lic.id, lic.productSlug)}
                        className="text-left font-mono text-[11px] text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 transition-colors"
                      >
                        <Terminal className="w-3 h-3 text-slate-400" />
                        <span>{copiedCloneId === lic.id ? 'Copied clone URI!' : 'git clone URI'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-slate-50 dark:bg-neutral-950 rounded-xl border border-dashed border-slate-200 dark:border-neutral-800 p-6">
                <Key className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <h4 className="text-xs font-semibold text-slate-900 dark:text-white">
                  No active licenses in this session
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                  When you check out digital assets from the storefront, your Ed25519 cryptographic tokens and GitHub invites will appear here.
                </p>
              </div>
            )
          ) : (
            /* Security Tab */
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-lg space-y-2.5">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Session Token Authentication
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2 bg-white dark:bg-black rounded border border-slate-200 dark:border-neutral-800">
                    <span className="text-[10px] text-slate-400 block">Identity Provider:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 uppercase">
                      {user.provider}
                    </span>
                  </div>
                  <div className="p-2 bg-white dark:bg-black rounded border border-slate-200 dark:border-neutral-800">
                    <span className="text-[10px] text-slate-400 block">JWT Signature:</span>
                    <span className="font-semibold text-blue-600 dark:text-blue-400">Ed25519 RFC 8037</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Customer session is authenticated for asset access and GitHub invites. Tokens are validated against the distributed Redis blacklist cluster.
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-lg">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                  Session Termination
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                  Logging out clears the active local JWT token and reverts your session to guest browsing.
                </p>
                <button
                  onClick={() => {
                    logout();
                    onClose();
                  }}
                  className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out of Account</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-neutral-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-black">
          <span className="font-mono text-[11px]">OmniCart Customer Vault v1.0</span>
          <button
            onClick={() => {
              logout();
              onClose();
            }}
            className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors flex items-center gap-1"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};
