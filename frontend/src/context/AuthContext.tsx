import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'USER' | 'ADMIN';

export interface CustomerLicense {
  id: string;
  productId: string;
  productName: string;
  productSlug: string;
  licenseKey: string;
  licenseType: string;
  issuedAt: string;
  githubRepo: string;
  version: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  provider: 'github' | 'email' | 'sso';
  licenses: CustomerLicense[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loginAsAdmin: () => void;
  loginAsUser: (customEmail?: string, customName?: string) => void;
  loginWithGitHub: (githubHandle?: string) => void;
  addPurchasedLicenses: (newLicenses: CustomerLicense[]) => void;
  logout: () => void;
}

const AUTH_STORAGE_KEY = 'omnicart_auth_session';

const INITIAL_DEMO_LICENSES: CustomerLicense[] = [
  {
    id: 'lic-001',
    productId: 'prod-001',
    productName: 'CloudOps EKS Production Blueprint & Terraform Suite',
    productSlug: 'cloudops-eks-production-blueprint-terraform',
    licenseKey: 'ED25519-EKS-774A-91BF-2026-OMNI',
    licenseType: 'Commercial Team License',
    issuedAt: '2026-02-15T10:00:00Z',
    githubRepo: 'https://github.com/omnicart/cloudops-eks-blueprint',
    version: 'v3.4.2'
  },
  {
    id: 'lic-002',
    productId: 'prod-002',
    productName: 'AgenticLLM: Autonomous Multi-Agent Orchestration Framework',
    productSlug: 'agentic-llm-autonomous-multi-agent-orchestrator',
    licenseKey: 'ED25519-LLM-55B1-CC02-2026-OMNI',
    licenseType: 'Royalty-Free Commercial License',
    issuedAt: '2026-02-28T14:30:00Z',
    githubRepo: 'https://github.com/omnicart/agentic-llm-core',
    version: 'v2.1.0-enterprise'
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user]);

  const loginAsAdmin = () => {
    setUser({
      id: 'usr-admin-01',
      email: 'admin@omnicart.io',
      name: 'System Administrator',
      role: 'ADMIN',
      provider: 'sso',
      licenses: []
    });
  };

  const loginAsUser = (customEmail?: string, customName?: string) => {
    setUser({
      id: 'usr-dev-02',
      email: customEmail || 'developer@example.com',
      name: customName || 'Cloud Systems Engineer',
      role: 'USER',
      provider: 'email',
      licenses: INITIAL_DEMO_LICENSES
    });
  };

  const loginWithGitHub = (githubHandle?: string) => {
    const handle = githubHandle || 'octocat-dev';
    setUser({
      id: `usr-gh-${handle}`,
      email: `${handle}@users.noreply.github.com`,
      name: handle,
      role: 'USER',
      provider: 'github',
      licenses: INITIAL_DEMO_LICENSES
    });
  };

  const addPurchasedLicenses = (newLicenses: CustomerLicense[]) => {
    setUser((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        licenses: [...newLicenses, ...(prev.licenses || [])]
      };
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'ADMIN',
        loginAsAdmin,
        loginAsUser,
        loginWithGitHub,
        addPurchasedLicenses,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
