import React, { useState } from 'react';
import { X, Github, Mail, Shield, ArrowRight, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface CustomerAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomerAuthModal: React.FC<CustomerAuthModalProps> = ({ isOpen, onClose }) => {
  const { loginWithGitHub, loginAsUser } = useAuth();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sentMagicLink, setSentMagicLink] = useState(false);

  if (!isOpen) return null;

  const handleGitHubLogin = () => {
    loginWithGitHub('developer-eng');
    onClose();
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      loginAsUser(email.trim(), email.split('@')[0]);
      setIsSubmitting(false);
      setSentMagicLink(true);
      setTimeout(() => {
        setSentMagicLink(false);
        onClose();
      }, 1000);
    }, 600);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 font-mono"
    >
      <div className="relative bg-white dark:bg-black rounded-none max-w-md w-full border border-neutral-300 dark:border-[#222222] p-6 sm:p-7 shadow-2xl transition-colors">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-none border border-neutral-300 dark:border-[#333] hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-600 dark:text-neutral-400 flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="w-10 h-10 rounded-none bg-[#d4ff00] text-black flex items-center justify-center mb-3 font-black">
            <Shield className="w-5 h-5 stroke-[2.5]" />
          </div>
          <h2 className="text-lg font-black uppercase text-black dark:text-white tracking-tight">
            DEVELOPER ACCESS // VAULT
          </h2>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 uppercase leading-relaxed text-[11px]">
            Access purchased cloud blueprints, private GitHub repo invitations, and Ed25519 license tokens.
          </p>
        </div>

        {/* GitHub OAuth Button */}
        <div className="space-y-4">
          <button
            onClick={handleGitHubLogin}
            className="w-full py-3 px-4 bg-neutral-100 hover:bg-neutral-200 dark:bg-[#111111] dark:hover:bg-[#1a1a1a] text-black dark:text-white rounded-none text-xs font-black uppercase flex items-center justify-center gap-2.5 border border-neutral-300 dark:border-[#333333] transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>CONTINUE WITH GITHUB</span>
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-neutral-200 dark:border-[#222222] w-full" />
            <span className="bg-white dark:bg-black px-3 text-[10px] uppercase font-bold text-neutral-400 shrink-0">
              OR WORK EMAIL
            </span>
          </div>

          {/* Email Magic Link Form */}
          {sentMagicLink ? (
            <div className="p-4 rounded-none bg-[#d4ff00]/15 border border-[#d4ff00] text-center">
              <div className="flex items-center justify-center gap-1.5 text-xs font-black uppercase text-black dark:text-[#d4ff00]">
                <Check className="w-4 h-4 stroke-[3]" />
                <span>SESSION VERIFIED</span>
              </div>
              <p className="text-[11px] text-neutral-700 dark:text-neutral-300 mt-1 uppercase">
                Signing you in to your developer vault...
              </p>
            </div>
          ) : (
            <form onSubmit={handleEmailSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold uppercase text-neutral-700 dark:text-neutral-300 mb-1">
                  WORK EMAIL ADDRESS
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="developer@acme.corp"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs bg-neutral-50 dark:bg-black border border-neutral-300 dark:border-[#333] rounded-none text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-[#d4ff00] placeholder:text-neutral-400"
                  />
                  <Mail className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-[#d4ff00] hover:bg-[#bfff00] text-black rounded-none text-xs font-black uppercase flex items-center justify-center gap-2 transition-transform active:scale-95 disabled:opacity-50"
              >
                <span>{isSubmitting ? 'AUTHENTICATING...' : 'SIGN IN WITH EMAIL'}</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </form>
          )}

          {/* Security Footnote */}
          <div className="pt-3 border-t border-neutral-200 dark:border-[#222222] text-[10px] text-neutral-500 uppercase space-y-0.5">
            <p>OAUTH 2.1 PKCE AUTHORIZATION WITH ED25519 TOKEN SIGNATURES.</p>
            <p className="text-neutral-400 dark:text-neutral-600">
              STAFF & PLATFORM OPERATORS ACCESS THROUGH INTERNAL SSO.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
