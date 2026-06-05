'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { itemCount, toggleCart } = useCart();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Shop' },
    { href: '/wishlist', label: 'Wishlist' },
    { href: '/account', label: 'Account' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0a0a0a] border-b border-[#1f1f1f]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 bg-[#E8FF00] rounded-sm flex items-center justify-center">
            <span className="text-black font-black text-sm leading-none">F</span>
          </div>
          <span className="text-white font-black text-lg tracking-tight">
            FUTURE<span className="text-[#E8FF00]">SHOP</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors duration-200 ${
                pathname === l.href
                  ? 'text-[#E8FF00]'
                  : 'text-[#888] hover:text-white'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/products"
            className="hidden sm:flex items-center gap-2 text-[#888] hover:text-white transition-colors"
            aria-label="Search"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
          </Link>

          <Link href="/wishlist" className="hidden sm:flex text-[#888] hover:text-white transition-colors" aria-label="Wishlist">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </Link>

          <button
            id="cart-toggle-btn"
            onClick={toggleCart}
            className="relative flex items-center gap-2 bg-[#1a1a1a] hover:bg-[#252525] border border-[#2a2a2a] text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            aria-label="Open cart"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#E8FF00] text-black text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                {itemCount > 9 ? '9+' : itemCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-[#888] hover:text-white transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            {menuOpen ? (
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0a0a0a] border-t border-[#1f1f1f] px-4 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-medium transition-colors ${
                pathname === l.href ? 'text-[#E8FF00]' : 'text-[#888] hover:text-white'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
