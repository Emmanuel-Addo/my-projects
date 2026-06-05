'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Product } from '@/lib/types';
import { useCart } from '@/context/CartContext';

interface Props {
  product: Product;
  wishlist?: string[];
  onWishlistToggle?: (id: string) => void;
}

export default function ProductCard({ product, wishlist = [], onWishlistToggle }: Props) {
  const { addItem } = useCart();
  const [adding, setAdding] = useState(false);
  const isWishlisted = wishlist.includes(product.id);

  const badgeColors: Record<string, string> = {
    New: 'bg-white text-black',
    Hot: 'bg-[#E8FF00] text-black',
    Sale: 'bg-red-500 text-white',
    Limited: 'bg-[#1a1a1a] text-[#E8FF00] border border-[#E8FF00]/30',
  };

  async function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    if (!product.inStock || adding) return;
    setAdding(true);
    addItem(product);
    setTimeout(() => setAdding(false), 1200);
  }

  return (
    <Link
      href={`/products/${product.id}`}
      id={`product-card-${product.id}`}
      className="group relative flex flex-col bg-[#111] border border-[#1e1e1e] rounded-2xl overflow-hidden hover:border-[#333] transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-[#0d0d0d]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${
              badgeColors[product.badge]
            }`}
          >
            {product.badge}
          </span>
        )}

        {/* Out of stock overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white text-xs font-bold uppercase tracking-widest border border-white/30 px-3 py-1 rounded-full">
              Out of Stock
            </span>
          </div>
        )}

        {/* Wishlist button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            onWishlistToggle?.(product.id);
          }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
            isWishlisted
              ? 'bg-[#E8FF00] text-black'
              : 'bg-black/50 text-white opacity-0 group-hover:opacity-100 hover:bg-black/80'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <svg width="14" height="14" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div className="flex-1">
          <p className="text-[#666] text-xs uppercase tracking-widest font-medium">{product.category}</p>
          <h3 className="text-white font-semibold text-sm mt-1 leading-snug line-clamp-2 group-hover:text-[#E8FF00] transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill={star <= Math.round(product.rating) ? '#E8FF00' : '#333'}
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <span className="text-[#555] text-[10px]">{product.reviews.toLocaleString()}</span>
          </div>
        </div>

        {/* Price + Add */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-white font-bold text-base">${product.price}</span>
            {product.originalPrice && (
              <span className="text-[#555] text-xs line-through ml-2">${product.originalPrice}</span>
            )}
          </div>
          <button
            onClick={handleAdd}
            disabled={!product.inStock || adding}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all duration-200 ${
              adding
                ? 'bg-[#1a1a1a] text-[#E8FF00] border border-[#E8FF00]/30'
                : product.inStock
                ? 'bg-[#E8FF00] text-black hover:bg-white'
                : 'bg-[#1a1a1a] text-[#444] cursor-not-allowed'
            }`}
            aria-label={`Add ${product.name} to cart`}
          >
            {adding ? '✓ Added' : '+ Cart'}
          </button>
        </div>
      </div>
    </Link>
  );
}
