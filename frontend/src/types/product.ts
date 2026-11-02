export interface ProductAttributes {
  [key: string]: string | number | boolean | string[] | number[] | Record<string, unknown>;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category: 'Electronics' | 'Audio' | 'Wearables' | 'Smart Home' | 'Fashion' | 'Accessories';
  price: number;
  compareAtPrice?: number;
  inventoryCount: number;
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  shortDescription: string;
  isFeatured?: boolean;
  tags: string[];
  /**
   * Dynamic schema-less JSONB attributes.
   * Mirrors PostgreSQL JSONB column in Day 3-5 backend.
   */
  attributes: ProductAttributes;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedAttributes?: Record<string, string>;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  totalQuantity: number;
  subtotal: number;
  estimatedTax: number;
  estimatedShipping: number;
  total: number;
}
