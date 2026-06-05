'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, subtotal, itemCount } = useCart();

  const shipping = subtotal >= 100 ? 0 : 9.99;
  const total = subtotal + shipping;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#0f0f0f] border-l border-[#1f1f1f] z-50 flex flex-col transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#1f1f1f]">
          <div>
            <h2 className="text-white font-bold text-lg">Your Cart</h2>
            <p className="text-[#666] text-xs mt-0.5">{itemCount} item{itemCount !== 1 ? 's' : ''}</p>
          </div>
          <button
            onClick={closeCart}
            className="text-[#666] hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#1a1a1a]"
            aria-label="Close cart"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#1a1a1a] flex items-center justify-center">
                <svg width="28" height="28" fill="none" stroke="#444" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
              <div>
                <p className="text-white font-semibold">Your cart is empty</p>
                <p className="text-[#555] text-sm mt-1">Add something amazing</p>
              </div>
              <Link
                href="/products"
                onClick={closeCart}
                className="mt-2 bg-[#E8FF00] text-black font-bold px-5 py-2.5 rounded-lg text-sm hover:bg-white transition-colors"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="flex gap-4 p-3 rounded-xl bg-[#141414] border border-[#1f1f1f]">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-[#1a1a1a]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${product.id}`}
                      onClick={closeCart}
                      className="text-white text-sm font-medium hover:text-[#E8FF00] transition-colors line-clamp-1"
                    >
                      {product.name}
                    </Link>
                    <p className="text-[#E8FF00] text-sm font-bold mt-0.5">${product.price}</p>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQty(product.id, quantity - 1)}
                        className="w-6 h-6 rounded-md bg-[#222] hover:bg-[#2a2a2a] text-white text-sm flex items-center justify-center transition-colors"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="text-white text-sm w-5 text-center font-medium">{quantity}</span>
                      <button
                        onClick={() => updateQty(product.id, quantity + 1)}
                        className="w-6 h-6 rounded-md bg-[#222] hover:bg-[#2a2a2a] text-white text-sm flex items-center justify-center transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(product.id)}
                        className="ml-auto text-[#555] hover:text-red-400 transition-colors"
                        aria-label="Remove item"
                      >
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-[#1f1f1f] space-y-4">
            {/* Free shipping notice */}
            {subtotal < 100 && (
              <div className="bg-[#1a1a1a] rounded-lg px-3 py-2 text-xs text-[#888]">
                Spend <span className="text-white font-semibold">${(100 - subtotal).toFixed(2)}</span> more for free shipping
              </div>
            )}
            {subtotal >= 100 && (
              <div className="bg-[#E8FF00]/10 border border-[#E8FF00]/20 rounded-lg px-3 py-2 text-xs text-[#E8FF00] font-medium">
                ✓ Free shipping unlocked!
              </div>
            )}

            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-[#888]">
                <span>Subtotal</span>
                <span className="text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#888]">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'text-[#E8FF00] font-medium' : 'text-white'}>
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-white font-bold text-base pt-2 border-t border-[#1f1f1f]">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              onClick={closeCart}
              id="checkout-btn"
              className="block w-full bg-[#E8FF00] text-black font-bold text-center py-3 rounded-xl hover:bg-white transition-colors duration-200 text-sm"
            >
              Checkout →
            </Link>
            <Link
              href="/cart"
              onClick={closeCart}
              className="block w-full text-center text-[#666] text-xs hover:text-white transition-colors"
            >
              View full cart
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
