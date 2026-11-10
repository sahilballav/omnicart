import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Product } from '../types/product';
import { MOCK_PRODUCTS } from '../data/mockProducts';

const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: attach session token if available
apiClient.interceptors.request.use(
  (config) => {
    try {
      const storedAuth = localStorage.getItem('omnicart_auth_session');
      if (storedAuth) {
        const user = JSON.parse(storedAuth);
        if (user && user.id) {
          config.headers.Authorization = `Bearer omnicart-ed25519-jwt-${user.id}`;
        }
      }
    } catch {
      // Ignore parsing errors
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle errors gracefully
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('[API-CLIENT] Unauthorized request. Potential token expiry.');
    }
    return Promise.reject(error);
  }
);

// Helper to map backend ProductDTO to frontend Product model
export function mapBackendProductToFrontend(dto: any): Product {
  const name = dto.name || 'Untitled Blueprint';
  const slug =
    dto.slug ||
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

  let images: string[] = [];
  if (Array.isArray(dto.images)) {
    images = dto.images;
  } else if (typeof dto.images === 'string') {
    images = [dto.images];
  } else {
    images = ['/assets/schematics/default-blueprint.svg'];
  }

  let tags: string[] = [];
  if (Array.isArray(dto.tags)) {
    tags = dto.tags;
  } else if (typeof dto.tags === 'string') {
    tags = dto.tags.split(/\s+/).filter(Boolean);
  }

  let attributes: Record<string, any> = {};
  if (dto.attributes && typeof dto.attributes === 'object') {
    attributes = dto.attributes;
  }

  const price = typeof dto.price === 'number' ? dto.price : parseFloat(dto.price || '99.00');

  return {
    id: dto.id,
    name,
    slug,
    brand: dto.brand || 'OmniLabs',
    category: dto.category || 'Cloud & DevOps',
    price,
    compareAtPrice: Math.round(price * 1.35),
    inventoryCount: typeof dto.inventoryCount === 'number' ? dto.inventoryCount : 100,
    rating: typeof dto.rating === 'number' ? dto.rating : parseFloat(dto.rating || '5.0'),
    reviewCount: typeof dto.reviewCount === 'number' ? dto.reviewCount : 0,
    images,
    description: dto.description || '',
    shortDescription:
      dto.description && dto.description.length > 130
        ? dto.description.slice(0, 130) + '...'
        : dto.description || '',
    isFeatured: true,
    tags,
    attributes,
    createdAt: dto.createdAt || new Date().toISOString(),
  };
}

// -----------------------------------------------------------------------------
// Product API Endpoints
// -----------------------------------------------------------------------------
export const productApi = {
  async getAllProducts(): Promise<Product[]> {
    try {
      const response = await apiClient.get('/products');
      if (response.data && response.data.data) {
        const list = response.data.data.content || response.data.data;
        if (Array.isArray(list) && list.length > 0) {
          return list.map(mapBackendProductToFrontend);
        }
      }
      return MOCK_PRODUCTS;
    } catch (err) {
      console.warn('[API] Backend unreachable, falling back to local catalog:', err);
      return MOCK_PRODUCTS;
    }
  },

  async getProductById(id: string): Promise<Product | null> {
    try {
      const response = await apiClient.get(`/products/${id}`);
      if (response.data && response.data.data) {
        return mapBackendProductToFrontend(response.data.data);
      }
      return null;
    } catch {
      return MOCK_PRODUCTS.find((p) => p.id === id) || null;
    }
  },
};

// -----------------------------------------------------------------------------
// Order & Checkout API Endpoints (Kafka Pipeline)
// -----------------------------------------------------------------------------
export interface CheckoutPayload {
  userId: string;
  userEmail: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
  }[];
  paymentMethod?: string;
  simulationMode?: 'NORMAL' | 'SIMULATE_FAIL' | 'SIMULATE_TIMEOUT';
}

export const orderApi = {
  async checkout(payload: CheckoutPayload): Promise<any> {
    try {
      const response = await apiClient.post('/orders/checkout', payload);
      return response.data;
    } catch (err) {
      console.error('[API] Checkout failed or timed out:', err);
      throw err;
    }
  },

  async getOrder(orderId: string): Promise<any> {
    const response = await apiClient.get(`/orders/${orderId}`);
    return response.data;
  },

  async getVelocityMetrics(): Promise<any> {
    try {
      const response = await apiClient.get('/orders/analytics/velocity');
      return response.data?.data || null;
    } catch {
      return null;
    }
  },
};

// -----------------------------------------------------------------------------
// Resilience4j Payment & Circuit Breaker API Endpoints
// -----------------------------------------------------------------------------
export const paymentApi = {
  async getCircuitStatus(): Promise<any> {
    try {
      const response = await apiClient.get('/payments/circuit-status');
      return response.data?.data || null;
    } catch {
      return null;
    }
  },
};

// -----------------------------------------------------------------------------
// Agentic AI Assistant API Endpoints
// -----------------------------------------------------------------------------
export const aiApi = {
  async search(query: string, preferredCategory?: string, maxBudget?: number): Promise<any> {
    try {
      const response = await apiClient.post('/ai/search', {
        query,
        preferredCategory,
        maxBudget,
      });
      return response.data?.data || null;
    } catch (err) {
      console.warn('[API] AI search endpoint unreachable, fallback active:', err);
      return null;
    }
  },

  async getSamplePrompts(): Promise<any[]> {
    try {
      const response = await apiClient.get('/ai/prompts');
      return response.data?.data || [];
    } catch {
      return [];
    }
  },
};
