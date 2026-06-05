export type Category =
  | 'Tech'
  | 'Apparel'
  | 'Audio'
  | 'Home'
  | 'Sport';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: Category;
  image: string;
  images: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  badge?: 'New' | 'Hot' | 'Sale' | 'Limited';
  tags: string[];
  specs?: Record<string, string>;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
  customer: {
    name: string;
    email: string;
    address: string;
    city: string;
    zip: string;
  };
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}
