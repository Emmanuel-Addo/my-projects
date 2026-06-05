'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export default function ProductFilters({ 
  currentCategory, 
  currentSort 
}: { 
  currentCategory?: string, 
  currentSort?: string 
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === 'All' && name === 'category') {
        params.delete('category');
      } else if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  const categories = ['All', 'Tech', 'Apparel', 'Audio', 'Home', 'Sport'];
  const sorts = [
    { label: 'Featured', value: '' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Highest Rated', value: 'rating' },
  ];

  return (
    <div className="bg-[#111] border border-[#222] rounded-2xl p-6">
      <div className="mb-8">
        <h3 className="text-white font-bold mb-4 tracking-wide uppercase text-sm">Category</h3>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => router.push(`/products?${createQueryString('category', cat)}`)}
                className={`text-sm w-full text-left transition-colors flex items-center justify-between group ${
                  (currentCategory === cat) || (!currentCategory && cat === 'All')
                    ? 'text-[#E8FF00] font-bold'
                    : 'text-[#888] hover:text-white'
                }`}
              >
                {cat}
                {((currentCategory === cat) || (!currentCategory && cat === 'All')) && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E8FF00]"></span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-white font-bold mb-4 tracking-wide uppercase text-sm">Sort By</h3>
        <div className="space-y-2">
          {sorts.map((sort) => (
            <button
              key={sort.value}
              onClick={() => router.push(`/products?${createQueryString('sort', sort.value)}`)}
              className={`block w-full text-left text-sm p-2 rounded-lg transition-colors ${
                (currentSort === sort.value) || (!currentSort && sort.value === '')
                  ? 'bg-[#1a1a1a] text-white border border-[#333]'
                  : 'text-[#888] hover:bg-[#1a1a1a] hover:text-white border border-transparent'
              }`}
            >
              {sort.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
