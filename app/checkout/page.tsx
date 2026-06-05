'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, itemCount, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const shipping = subtotal >= 100 ? 0 : 9.99;
  const total = subtotal + shipping;

  if (items.length === 0) {
    router.push('/cart');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const customer = {
      name: formData.get('firstName') + ' ' + formData.get('lastName'),
      email: formData.get('email'),
      address: formData.get('address'),
      city: formData.get('city'),
      zip: formData.get('zip'),
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          subtotal,
          shipping,
          total,
          customer,
        }),
      });

      if (!res.ok) throw new Error('Order failed');
      const order = await res.json();
      
      clearCart();
      router.push(`/checkout/success?orderId=${order.id}`);
    } catch (err) {
      console.error(err);
      alert('Failed to place order. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-black tracking-tight mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Form */}
        <div>
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
            {/* Contact Info */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#888] mb-1">Email Address</label>
                  <input required type="email" id="email" name="email" className="w-full bg-[#111] border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#E8FF00] transition-colors" />
                </div>
              </div>
            </section>

            {/* Shipping Info */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4">Shipping Address</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-[#888] mb-1">First Name</label>
                  <input required type="text" id="firstName" name="firstName" className="w-full bg-[#111] border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#E8FF00] transition-colors" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-[#888] mb-1">Last Name</label>
                  <input required type="text" id="lastName" name="lastName" className="w-full bg-[#111] border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#E8FF00] transition-colors" />
                </div>
                <div className="col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-[#888] mb-1">Address</label>
                  <input required type="text" id="address" name="address" className="w-full bg-[#111] border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#E8FF00] transition-colors" />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-[#888] mb-1">City</label>
                  <input required type="text" id="city" name="city" className="w-full bg-[#111] border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#E8FF00] transition-colors" />
                </div>
                <div>
                  <label htmlFor="zip" className="block text-sm font-medium text-[#888] mb-1">ZIP / Postal Code</label>
                  <input required type="text" id="zip" name="zip" className="w-full bg-[#111] border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#E8FF00] transition-colors" />
                </div>
              </div>
            </section>

            {/* Payment (Mocked) */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4">Payment</h2>
              <div className="bg-[#111] border border-[#333] p-4 rounded-lg flex items-start gap-3">
                 <svg width="24" height="24" fill="none" stroke="#E8FF00" strokeWidth="2" viewBox="0 0 24 24" className="mt-1">
                   <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                 </svg>
                 <div>
                    <p className="text-white font-medium mb-1">Secure Checkout</p>
                    <p className="text-[#888] text-sm">This is a demo store. No actual payment is required to place an order.</p>
                 </div>
              </div>
            </section>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-[#E8FF00] text-black font-bold py-4 rounded-xl transition-all ${
                loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-white'
              }`}
            >
              {loading ? 'Processing...' : `Pay $${total.toFixed(2)}`}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-[#111] border border-[#222] rounded-2xl p-6 sticky top-24">
             <h2 className="text-lg font-bold text-white mb-6">Order Summary ({itemCount})</h2>
             <ul className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
                {items.map(({product, quantity}) => (
                   <li key={product.id} className="flex gap-4">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-[#1a1a1a] flex-shrink-0">
                         <Image src={product.image} alt={product.name} fill className="object-cover" sizes="64px" />
                         <span className="absolute top-0 right-0 bg-[#333] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-bl-lg">
                           {quantity}
                         </span>
                      </div>
                      <div className="flex-1">
                         <p className="text-white text-sm font-medium line-clamp-2">{product.name}</p>
                         <p className="text-[#888] text-sm mt-1">${product.price}</p>
                      </div>
                   </li>
                ))}
             </ul>

             <div className="space-y-3 pt-6 border-t border-[#222] text-sm">
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
                <div className="flex justify-between text-white font-bold text-lg pt-3 border-t border-[#222]">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
