import fs from 'fs';
import path from 'path';
import type { Product, Order, Review } from './types';

// Initial Seed Data
const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Arc Wireless Keyboard',
    description: 'A ultra-slim 75% mechanical keyboard with per-key RGB lighting.',
    price: 189,
    originalPrice: 229,
    category: 'Tech',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80'],
    rating: 4.8,
    reviews: 312,
    inStock: true,
    badge: 'Sale',
    tags: ['keyboard', 'mechanical'],
  },
  {
    id: 'p5',
    name: 'Obsidian ANC Headphones',
    description: 'Over-ear headphones with hybrid Active Noise Cancellation.',
    price: 349,
    category: 'Audio',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'],
    rating: 4.9,
    reviews: 876,
    inStock: true,
    badge: 'Hot',
    tags: ['headphones', 'anc'],
  },
  {
    id: 'p8',
    name: 'Stealth Zip Hoodie',
    description: 'Heavyweight 500gsm French terry cotton zip-up hoodie.',
    price: 119,
    category: 'Apparel',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80'],
    rating: 4.8,
    reviews: 412,
    inStock: true,
    badge: 'Hot',
    tags: ['hoodie', 'apparel'],
  }
];

const dataFilePath = path.join(process.cwd(), 'data.json');

// Ensure data file exists
function ensureDataFile() {
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify({ products: INITIAL_PRODUCTS, orders: [] }, null, 2));
  }
}

export function getProducts(): Product[] {
  ensureDataFile();
  const fileContent = fs.readFileSync(dataFilePath, 'utf8');
  const data = JSON.parse(fileContent);
  return data.products || [];
}

export function saveProducts(products: Product[]) {
  ensureDataFile();
  const fileContent = fs.readFileSync(dataFilePath, 'utf8');
  const data = JSON.parse(fileContent);
  data.products = products;
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

export function getOrders(): Order[] {
  ensureDataFile();
  const fileContent = fs.readFileSync(dataFilePath, 'utf8');
  const data = JSON.parse(fileContent);
  return data.orders || [];
}

export function saveOrder(order: Order) {
  ensureDataFile();
  const fileContent = fs.readFileSync(dataFilePath, 'utf8');
  const data = JSON.parse(fileContent);
  if (!data.orders) data.orders = [];
  data.orders.push(order);
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

// Mock Reviews
export const reviews: Review[] = [
  { id: 'r1', productId: 'p1', author: 'Jordan K.', rating: 5, comment: 'The best keyboard I have ever owned.', date: '2026-04-12' },
];
