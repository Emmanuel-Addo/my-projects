'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=2000&q=80',
  'https://images.unsplash.com/photo-1550009158-9effb6e97e6e?w=2000&q=80',
  'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=2000&q=80'
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000); // 6 seconds timer
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[85vh] min-h-[600px] w-full bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
      {/* Sliding Image Container */}
      <div 
        className="absolute inset-0 flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {HERO_IMAGES.map((src, index) => (
          <div key={src} className="relative min-w-full h-full flex-shrink-0">
            <Image
              src={src}
              alt={`Hero Image ${index + 1}`}
              fill
              priority={index === 0}
              className="object-cover opacity-40 mix-blend-luminosity"
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1a1a1a] border border-[#333] mb-8">
          <span className="w-2 h-2 rounded-full bg-[#E8FF00] animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-widest text-[#E8FF00]">New Collection</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-[1.1]">
          THE FUTURE OF <br />
          <span className="text-transparent bg-clip-text bg-white" style={{ WebkitTextStroke: '1px #333' }}>
            COMMERCE.
          </span>
        </h1>
        <p className="text-lg md:text-xl text-[#888] mb-10 max-w-2xl font-medium">
          Curated technology, apparel, and lifestyle goods designed for tomorrow.
          No compromises. No clutter. Just the absolute best.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link
            href="/products"
            className="bg-[#E8FF00] text-black font-bold px-8 py-4 rounded-xl hover:bg-white transition-all duration-300 text-center hover:scale-105"
          >
            Shop All Products
          </Link>
          <Link
            href="/products?category=Tech"
            className="bg-[#111] border border-[#333] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#222] transition-all duration-300 text-center hover:border-[#555]"
          >
            Explore Tech
          </Link>
        </div>
      </div>
    </section>
  );
}
