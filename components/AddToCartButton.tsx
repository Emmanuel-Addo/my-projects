'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/lib/types';

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  const handleAdd = () => {
    if (!product.inStock || adding) return;
    setAdding(true);
    addItem(product, quantity);
    setTimeout(() => setAdding(false), 1000);
  };

  if (!product.inStock) {
    return (
      <button disabled className="w-full bg-[#1a1a1a] text-[#555] font-bold py-4 rounded-xl cursor-not-allowed border border-[#333]">
        Out of Stock
      </button>
    );
  }

  return (
    <div className="flex gap-4">
      <div className="flex items-center bg-[#1a1a1a] rounded-xl border border-[#333] p-1">
        <button 
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="w-10 h-10 flex items-center justify-center text-white hover:bg-[#2a2a2a] rounded-lg transition-colors"
          disabled={adding}
        >
          −
        </button>
        <span className="w-8 text-center text-white font-medium">{quantity}</span>
        <button 
          onClick={() => setQuantity(quantity + 1)}
          className="w-10 h-10 flex items-center justify-center text-white hover:bg-[#2a2a2a] rounded-lg transition-colors"
          disabled={adding}
        >
          +
        </button>
      </div>
      <button
        onClick={handleAdd}
        disabled={adding}
        className={`flex-1 font-bold py-4 rounded-xl transition-all duration-300 ${
          adding 
            ? 'bg-[#1a1a1a] text-[#E8FF00] border border-[#E8FF00]/30' 
            : 'bg-[#E8FF00] text-black hover:bg-white border border-transparent'
        }`}
      >
        {adding ? '✓ Added to Cart' : 'Add to Cart'}
      </button>
    </div>
  );
}
