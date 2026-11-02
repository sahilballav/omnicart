export interface ProductAttributes {
  [key: string]: string | number | boolean | string[] | number[] | Record<string, unknown>;
}

export type DigitalCategory =
  | 'Cloud & DevOps'
  | 'AI & Agent Kits'
  | 'Developer Tools'
  | 'UI Systems & Figma'
  | 'Microservices & APIs'
  | 'Courses & Masterclasses';

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category: DigitalCategory;
  price: number;
  compareAtPrice?: number;
  inventoryCount: number; // For digital products: available license keys / seats
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
  selectedLicense?: string;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  totalQuantity: number;
  subtotal: number;
  estimatedTax: number;
  digitalDeliveryFee: number;
  total: number;
}
