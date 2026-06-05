'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-[#1a1a1a] py-16 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 group mb-6">
              <div className="w-7 h-7 bg-[#E8FF00] rounded-sm flex items-center justify-center">
                <span className="text-black font-black text-sm leading-none">F</span>
              </div>
              <span className="text-white font-black text-lg tracking-tight">
                FUTURE<span className="text-[#E8FF00]">SHOP</span>
              </span>
            </Link>
            <p className="text-[#666] text-sm leading-relaxed max-w-xs">
              Curated goods for the digital age. Premium tech, apparel, and lifestyle products with a focus on design and performance.
            </p>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="text-white font-bold mb-4">Shop</h4>
            <ul className="space-y-3 text-sm text-[#888]">
              <li><Link href="/products?category=Tech" className="hover:text-white transition-colors">Tech</Link></li>
              <li><Link href="/products?category=Apparel" className="hover:text-white transition-colors">Apparel</Link></li>
              <li><Link href="/products?category=Audio" className="hover:text-white transition-colors">Audio</Link></li>
              <li><Link href="/products?category=Home" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/products?category=Sport" className="hover:text-white transition-colors">Sport</Link></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="text-white font-bold mb-4">Support</h4>
            <ul className="space-y-3 text-sm text-[#888]">
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/track" className="hover:text-white transition-colors">Track Order</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold mb-4">Stay Connected</h4>
            <p className="text-[#666] text-sm mb-4">Subscribe for early access to new drops and exclusive offers.</p>
            <form className="flex" onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const input = form.elements.namedItem('email') as HTMLInputElement;
              if (input.value) {
                fetch('/api/newsletter', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ email: input.value })
                }).then(() => {
                  input.value = '';
                  alert('Subscribed successfully!');
                });
              }
            }}>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                required
                className="bg-[#111] border border-[#222] text-white px-4 py-2 text-sm rounded-l-lg focus:outline-none focus:border-[#444] w-full"
              />
              <button
                type="submit"
                className="bg-[#E8FF00] text-black font-bold px-4 py-2 text-sm rounded-r-lg hover:bg-white transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[#1a1a1a] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#555] text-xs">
            © {new Date().getFullYear()} FutureShop. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[#555] text-xs">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
