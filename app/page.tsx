import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import HeroSlider from '@/components/HeroSlider';
import { getProducts } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default function Home() {
  const products = getProducts();
  const trending = products.slice(0, 4);
  const newArrivals = products.filter((p) => p.badge === 'New').slice(0, 4);

  return (
    <div className="w-full">
      <HeroSlider />

      {/* Marquee */}
      <div className="border-y border-[#1a1a1a] bg-[#0a0a0a] overflow-hidden py-4 flex relative z-20">
        <div className="animate-marquee whitespace-nowrap flex gap-12 text-[#444] font-black text-sm md:text-base tracking-[0.2em] uppercase">
          <span>FREE SHIPPING OVER $100</span>
          <span>•</span>
          <span>PREMIUM QUALITY</span>
          <span>•</span>
          <span>CURATED SELECTION</span>
          <span>•</span>
          <span>SECURE CHECKOUT</span>
          <span>•</span>
          <span>FREE SHIPPING OVER $100</span>
          <span>•</span>
          <span>PREMIUM QUALITY</span>
          <span>•</span>
          <span>CURATED SELECTION</span>
          <span>•</span>
          <span>SECURE CHECKOUT</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 space-y-32">
        
        {/* Categories */}
        <section>
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-black tracking-tight mb-2">Shop by Category</h2>
              <p className="text-[#888]">Find exactly what you're looking for.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: 'Tech', image: 'https://images.unsplash.com/photo-1550009158-9effb6e97e6e?w=500&q=80' },
              { name: 'Apparel', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&q=80' },
              { name: 'Audio', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
              { name: 'Home', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&q=80' },
              { name: 'Sport', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&q=80' },
            ].map((cat) => (
              <Link
                key={cat.name}
                href={`/products?category=${cat.name}`}
                className="group relative aspect-square overflow-hidden rounded-2xl bg-[#111]"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 mix-blend-luminosity group-hover:mix-blend-normal"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-white font-bold text-lg tracking-wide">{cat.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Trending */}
        <section>
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-black tracking-tight mb-2">Trending Now</h2>
              <p className="text-[#888]">The most wanted items this week.</p>
            </div>
            <Link href="/products?sort=rating" className="hidden sm:flex items-center gap-2 text-sm font-bold text-[#E8FF00] hover:text-white transition-colors">
              View All <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trending.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Feature Banner */}
        <section className="relative rounded-3xl overflow-hidden bg-[#111] border border-[#222]">
          <div className="grid md:grid-cols-2">
            <div className="p-12 md:p-16 flex flex-col justify-center">
              <span className="text-[#E8FF00] font-bold tracking-widest uppercase text-sm mb-4">Inside Look</span>
              <h2 className="text-4xl font-black mb-6 leading-tight">THE APPAREL<br/>COLLECTION</h2>
              <p className="text-[#888] mb-8 max-w-md">
                Heavyweight fabrics, oversized silhouettes, and technical details. 
                Built to outlast trends and withstand daily wear.
              </p>
              <Link
                href="/products?category=Apparel"
                className="self-start bg-white text-black font-bold px-6 py-3 rounded-xl hover:bg-[#E8FF00] transition-colors"
              >
                Shop Apparel
              </Link>
            </div>
            <div className="relative min-h-[300px] md:min-h-full">
              <Image
                src="https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=1000&q=80"
                alt="Apparel Collection"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* New Arrivals */}
        <section>
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-black tracking-tight mb-2">New Arrivals</h2>
              <p className="text-[#888]">Just landed. Get them before they're gone.</p>
            </div>
            <Link href="/products?badge=New" className="hidden sm:flex items-center gap-2 text-sm font-bold text-[#E8FF00] hover:text-white transition-colors">
              View All <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
