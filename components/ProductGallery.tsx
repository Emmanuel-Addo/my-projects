'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Props {
  images: string[];
  name: string;
  badge?: string;
  inStock: boolean;
}

export default function ProductGallery({ images, name, badge, inStock }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  const safeImages = images && images.length > 0 ? images : ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'];

  const badgeColors: Record<string, string> = {
    New: 'bg-white text-black',
    Hot: 'bg-[#E8FF00] text-black',
    Sale: 'bg-red-500 text-white',
    Limited: 'bg-[#1a1a1a] text-[#E8FF00] border border-[#E8FF00]/30',
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-[#0d0d0d] border border-[#222]">
        <Image
          src={safeImages[activeIndex] || safeImages[0]}
          alt={name}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        
        {badge && (
          <span className={`absolute top-6 left-6 text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest ${badgeColors[badge]}`}>
            {badge}
          </span>
        )}

        {!inStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
            <span className="text-white text-sm font-bold uppercase tracking-widest border-2 border-white/30 px-6 py-2 rounded-full">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {safeImages.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {safeImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative aspect-square rounded-xl overflow-hidden bg-[#0d0d0d] border-2 transition-all ${
                activeIndex === idx ? 'border-[#E8FF00] opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <Image src={img} alt={`${name} thumbnail ${idx + 1}`} fill className="object-cover" sizes="25vw" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
