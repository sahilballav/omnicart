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
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 font-mono"
    >
      <div className="relative bg-white dark:bg-black rounded-none max-w-2xl w-full border border-neutral-300 dark:border-[#222222] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col transition-colors">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-neutral-200 dark:border-[#222222] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-none bg-[#d4ff00] text-black flex items-center justify-center font-bold">
              <Key className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black uppercase text-black dark:text-white tracking-tight">
                  DEVELOPER LICENSE VAULT
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-none bg-[#d4ff00]/20 text-[#7d9900] dark:text-[#d4ff00] font-bold border border-[#d4ff00]/50 uppercase">
                  VERIFIED
                </span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5 uppercase">
                {user.name} ({user.email})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-none border border-neutral-300 dark:border-[#333] hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-600 dark:text-neutral-400 flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 pt-3 border-b border-neutral-200 dark:border-[#222222] flex items-center gap-4 text-xs font-bold uppercase">
          <button
            onClick={() => setActiveTab('licenses')}
            className={`pb-2.5 transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'licenses'
                ? 'border-black text-black dark:border-[#d4ff00] dark:text-[#d4ff00]'
                : 'border-transparent text-neutral-500 hover:text-black dark:hover:text-white'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>ACTIVE LICENSES ({user.licenses?.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`pb-2.5 transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'security'
                ? 'border-black text-black dark:border-[#d4ff00] dark:text-[#d4ff00]'
                : 'border-transparent text-neutral-500 hover:text-black dark:hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>SESSION & PKI TOKENS</span>
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
                    className="p-4 bg-neutral-50 dark:bg-[#0a0a0a] border border-neutral-200 dark:border-[#222222] rounded-none space-y-3 transition-colors"
                  >
                    {/* Item Top */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-black uppercase text-black dark:text-white">
                            {lic.productName}
                          </h4>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-none bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-300 font-bold">
                            {lic.version}
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-500 uppercase mt-0.5">
                          {lic.licenseType} &bull; ISSUED {new Date(lic.issuedAt).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDownloadCertificate(lic.productName, lic.licenseKey)}
                          className="px-2.5 py-1 text-[11px] font-bold uppercase bg-white dark:bg-black border border-neutral-300 dark:border-[#333] text-neutral-800 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-none flex items-center gap-1 transition-colors"
                          title="Download cryptographic PEM certificate"
                        >
                          <Download className="w-3 h-3 text-neutral-400" />
                          <span>CERTIFICATE (.PEM)</span>
                        </button>
                      </div>
                    </div>

                    {/* License Key Box */}
                    <div className="p-2.5 bg-white dark:bg-black border border-neutral-300 dark:border-[#222222] rounded-none flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 truncate">
                        <span className="text-[10px] text-neutral-400 uppercase">TOKEN:</span>
                        <code className="text-xs font-mono font-bold text-black dark:text-[#d4ff00] truncate">
                          {lic.licenseKey}
                        </code>
                      </div>
                      <button
                        onClick={() => handleCopyKey(lic.id, lic.licenseKey)}
                        className="px-2 py-1 text-[10px] font-mono font-bold uppercase bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-black dark:text-white rounded-none flex items-center gap-1 shrink-0 transition-colors border border-neutral-200 dark:border-[#333]"
                      >
                        {copiedKeyId === lic.id ? (
                          <Check className="w-3 h-3 text-[#7d9900] dark:text-[#d4ff00]" />
                        ) : (
                          <Copy className="w-3 h-3 text-neutral-400" />
                        )}
                        <span>{copiedKeyId === lic.id ? 'COPIED' : 'COPY'}</span>
                      </button>
                    </div>

                    {/* Git Clone & GitHub Access */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs pt-1 border-t border-neutral-200 dark:border-[#1c1c1c]">
                      <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 text-[11px]">
                        <Github className="w-3.5 h-3.5 shrink-0" />
                        <span className="uppercase">REPOSITORY INVITE:</span>
                        <span className="text-[#7d9900] dark:text-[#d4ff00] font-bold uppercase">
                          ACTIVE (GRANTED)
                        </span>
                      </div>

                      <button
                        onClick={() => handleCopyClone(lic.id, lic.productSlug)}
                        className="text-left font-mono text-[11px] text-neutral-500 hover:text-black dark:hover:text-[#d4ff00] flex items-center gap-1 transition-colors uppercase font-bold"
                      >
                        <Terminal className="w-3 h-3 text-neutral-400" />
                        <span>{copiedCloneId === lic.id ? 'COPIED CLONE URI!' : 'GIT CLONE URI'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-neutral-50 dark:bg-[#0a0a0a] rounded-none border border-neutral-200 dark:border-[#222222] p-6 space-y-2">
                <Key className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                <h4 className="text-xs font-black uppercase text-black dark:text-white">
                  NO ACTIVE LICENSES IN THIS SESSION
                </h4>
                <p className="text-[11px] text-neutral-600 dark:text-neutral-400 mt-1 max-w-sm mx-auto uppercase">
                  When you check out digital assets from the storefront, your Ed25519 cryptographic tokens and GitHub invites will appear here.
                </p>
              </div>
            )
          ) : (
            /* Security Tab */
            <div className="space-y-4">
              <div className="p-4 bg-neutral-50 dark:bg-[#0a0a0a] border border-neutral-200 dark:border-[#222222] rounded-none space-y-2.5">
                <h4 className="text-xs font-black uppercase tracking-wider text-black dark:text-white">
                  SESSION TOKEN AUTHENTICATION
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2 bg-white dark:bg-black rounded-none border border-neutral-300 dark:border-[#222222]">
                    <span className="text-[10px] text-neutral-500 uppercase block">IDENTITY PROVIDER:</span>
                    <span className="font-bold text-black dark:text-white uppercase">
                      {user.provider}
                    </span>
                  </div>
                  <div className="p-2 bg-white dark:bg-black rounded-none border border-neutral-300 dark:border-[#222222]">
                    <span className="text-[10px] text-neutral-500 uppercase block">JWT SIGNATURE:</span>
                    <span className="font-bold text-[#7d9900] dark:text-[#d4ff00] uppercase">ED25519 RFC 8037</span>
                  </div>
                </div>
                <p className="text-[11px] text-neutral-600 dark:text-neutral-400 uppercase leading-relaxed">
                  Customer session is authenticated for asset access and GitHub invites. Tokens are validated against the distributed Redis blacklist cluster.
                </p>
              </div>

              <div className="p-4 bg-neutral-50 dark:bg-[#0a0a0a] border border-neutral-200 dark:border-[#222222] rounded-none">
                <h4 className="text-xs font-black uppercase tracking-wider mb-2 text-black dark:text-white">
                  SESSION TERMINATION
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-4 uppercase text-[11px]">
                  Logging out clears the active local JWT token and reverts your session to guest browsing.
                </p>
                <button
                  onClick={() => {
                    logout();
                    onClose();
                  }}
                  className="px-4 py-2 bg-black hover:bg-neutral-800 text-white rounded-none text-xs font-black uppercase flex items-center gap-2 transition-colors border border-black"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>SIGN OUT OF ACCOUNT</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-200 dark:border-[#222222] flex items-center justify-between text-xs text-neutral-500 bg-neutral-50 dark:bg-black">
          <span className="font-mono text-[11px] uppercase">OMNICART CUSTOMER VAULT v1.0</span>
          <button
            onClick={() => {
              logout();
              onClose();
            }}
            className="hover:text-black dark:hover:text-[#d4ff00] transition-colors flex items-center gap-1 uppercase font-bold text-[11px]"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>SIGN OUT</span>
          </button>
        </div>
      </div>
    </div>
  );
};
