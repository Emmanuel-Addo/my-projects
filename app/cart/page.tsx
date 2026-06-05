'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { items, removeItem, updateQty, subtotal, itemCount } = useCart();
  const shipping = subtotal >= 100 ? 0 : 9.99;
  const total = subtotal + shipping;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-4xl font-black tracking-tight mb-8">Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-24 bg-[#111] rounded-3xl border border-[#222]">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-[#1a1a1a] flex items-center justify-center mb-6">
            <svg width="32" height="32" fill="none" stroke="#444" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Your cart is empty</h2>
          <p className="text-[#888] mb-8">Looks like you haven't added anything yet.</p>
          <Link
            href="/products"
            className="inline-flex bg-[#E8FF00] text-black font-bold px-8 py-3.5 rounded-xl hover:bg-white transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Table Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-[#222] text-[#888] text-sm uppercase tracking-wider font-medium">
               <div className="col-span-6">Product</div>
               <div className="col-span-3 text-center">Quantity</div>
               <div className="col-span-3 text-right">Total</div>
            </div>

            <ul className="space-y-6 md:space-y-0 md:divide-y md:divide-[#1a1a1a]">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="py-6 flex flex-col md:grid md:grid-cols-12 gap-4 items-center">
                  <div className="col-span-6 flex items-center gap-4 w-full">
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-[#1a1a1a] flex-shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-[#666] text-[10px] uppercase tracking-widest mb-1">{product.category}</p>
                      <Link
                        href={`/products/${product.id}`}
                        className="text-white font-medium hover:text-[#E8FF00] transition-colors line-clamp-2"
                      >
                        {product.name}
                      </Link>
                      <button
                        onClick={() => removeItem(product.id)}
                        className="text-[#555] text-sm mt-2 hover:text-red-400 transition-colors flex items-center gap-1"
                      >
                         <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                        </svg>
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="col-span-3 flex justify-center w-full md:w-auto">
                    <div className="flex items-center bg-[#111] border border-[#222] rounded-lg p-1">
                      <button
                        onClick={() => updateQty(product.id, quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-white hover:bg-[#222] rounded-md transition-colors"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-white font-medium text-sm">{quantity}</span>
                      <button
                        onClick={() => updateQty(product.id, quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-white hover:bg-[#222] rounded-md transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="col-span-3 flex justify-end w-full md:w-auto">
                     <span className="text-white font-bold text-lg">${(product.price * quantity).toFixed(2)}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#111] border border-[#222] rounded-2xl p-6 sticky top-24">
              <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 text-sm">
                <div className="flex justify-between text-[#888]">
                  <span>Subtotal ({itemCount} items)</span>
                  <span className="text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#888]">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-[#E8FF00] font-medium' : 'text-white'}>
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {subtotal < 100 && (
                  <p className="text-xs text-[#666] pt-2">
                    Add <span className="text-white font-semibold">${(100 - subtotal).toFixed(2)}</span> more to your cart to get free shipping.
                  </p>
                )}
                <div className="flex justify-between text-white font-black text-xl pt-4 border-t border-[#222]">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="block w-full bg-[#E8FF00] text-black text-center font-bold py-4 rounded-xl hover:bg-white transition-colors duration-200"
              >
                Proceed to Checkout
              </Link>
              
              <div className="mt-6 flex items-center justify-center gap-2 text-[#666] text-xs">
                 <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                 </svg>
                 Secure encrypted checkout
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
