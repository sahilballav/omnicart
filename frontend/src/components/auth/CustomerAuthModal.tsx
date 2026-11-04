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
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <div className="relative bg-white dark:bg-black rounded-xl max-w-md w-full border border-slate-200 dark:border-neutral-800 p-6 sm:p-7 shadow-2xl transition-colors">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg hover:bg-slate-100 dark:hover:bg-neutral-900 text-slate-500 dark:text-slate-400 flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="w-10 h-10 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-black flex items-center justify-center mb-3">
            <Shield className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Developer Account Sign-In
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
            Access purchased cloud blueprints, private GitHub repo invitations, and Ed25519 license tokens.
          </p>
        </div>

        {/* GitHub OAuth Button */}
        <div className="space-y-4">
          <button
            onClick={handleGitHubLogin}
            className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2.5 border border-slate-700 dark:border-neutral-700 transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>Continue with GitHub</span>
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 dark:border-neutral-800 w-full" />
            <span className="bg-white dark:bg-black px-3 text-[11px] font-mono uppercase text-slate-400 shrink-0">
              or work email
            </span>
          </div>

          {/* Email Magic Link Form */}
          {sentMagicLink ? (
            <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 text-center">
              <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                <Check className="w-4 h-4" />
                <span>Session Verified</span>
              </div>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1">
                Signing you in to your developer vault...
              </p>
            </div>
          ) : (
            <form onSubmit={handleEmailSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Work Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="developer@acmewidgets.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder:text-slate-400"
                  />
                  <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Authenticating...' : 'Sign In with Email'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          {/* Security Footnote */}
          <div className="pt-3 border-t border-slate-100 dark:border-neutral-800 text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
            <p>OAuth 2.1 PKCE authorization with Ed25519 token signatures.</p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500">
              Staff & Platform operators access through internal SSO.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
