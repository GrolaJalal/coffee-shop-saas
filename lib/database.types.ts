// Complete TypeScript types for Coffee SaaS database schema

export interface User {
  id: string;
  clerk_id: string;
  email: string;
  full_name: string;
  role: 'client' | 'owner' | 'admin';
  avatar_url?: string;
  phone?: string;
  created_at: string;
  updated_at: string;
}

export interface CoffeeShop {
  id: string;
  owner_id: string;
  name: string;
  slug: string;
  description: string;
  address: string;
  city: string;
  state?: string;
  country: string;
  postal_code?: string;
  lat: number;
  lng: number;
  phone?: string;
  email?: string;
  website?: string;
  image_url?: string;
  gallery?: string[];
  opening_hours: {
    monday?: { open: string; close: string; closed: boolean };
    tuesday?: { open: string; close: string; closed: boolean };
    wednesday?: { open: string; close: string; closed: boolean };
    thursday?: { open: string; close: string; closed: boolean };
    friday?: { open: string; close: string; closed: boolean };
    saturday?: { open: string; close: string; closed: boolean };
    sunday?: { open: string; close: string; closed: boolean };
  };
  price_range: '$' | '$$' | '$$$' | '$$$$';
  capacity?: number;
  features: string[]; // wifi, outdoor, parking, etc.
  rating: number;
  total_reviews: number;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  sort_order: number;
  is_active: boolean;
}

export interface Product {
  id: string;
  shop_id: string;
  category_id: string;
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  is_available: boolean;
  is_vegetarian?: boolean;
  is_vegan?: boolean;
  is_gluten_free?: boolean;
  allergens?: string[];
  preparation_time?: number; // minutes
  calories?: number;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  shop_id: string;
  user_id: string;
  order_number: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  type: 'pickup' | 'delivery' | 'dine-in';
  table_number?: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  delivery_fee?: number;
  total: number;
  payment_status: 'pending' | 'paid' | 'refunded' | 'failed';
  payment_method?: 'card' | 'cash' | 'apple_pay' | 'google_pay';
  notes?: string;
  estimated_ready_time?: string;
  actual_ready_time?: string;
  delivered_at?: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  customizations?: string[];
  notes?: string;
}

export interface Reservation {
  id: string;
  shop_id: string;
  user_id: string;
  date: string;
  time: string;
  party_size: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no-show';
  special_requests?: string;
  table_assignment?: string;
  confirmed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  shop_id: string;
  user_id: string;
  order_id?: string;
  rating: number;
  food_rating?: number;
  service_rating?: number;
  ambiance_rating?: number;
  comment: string;
  is_verified_purchase: boolean;
  is_visible: boolean;
  owner_response?: string;
  responded_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Cart {
  id: string;
  user_id: string;
  shop_id: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  product_id: string;
  quantity: number;
  customizations?: string[];
  notes?: string;
}

export interface ShopAnalytics {
  shop_id: string;
  date: string;
  total_orders: number;
  total_revenue: number;
  total_reservations: number;
  new_reviews: number;
  avg_rating: number;
  popular_products: { product_id: string; count: number }[];
  peak_hours: { hour: number; orders: number }[];
}