import Link from 'next/link';

export default function WishlistPage() {
  // In a real app, we would fetch the user's wishlist from the database.
  // For the demo, we show an empty state.
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-4xl font-black tracking-tight mb-8">Your Wishlist</h1>
      
      <div className="text-center py-24 bg-[#111] rounded-3xl border border-[#222]">
        <div className="w-20 h-20 mx-auto rounded-2xl bg-[#1a1a1a] flex items-center justify-center mb-6 text-[#E8FF00]">
           <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24">
             <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
           </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Your wishlist is empty</h2>
        <p className="text-[#888] mb-8">Save items you love to review them later.</p>
        <Link
          href="/products"
          className="inline-flex bg-[#E8FF00] text-black font-bold px-8 py-3.5 rounded-xl hover:bg-white transition-colors"
        >
          Explore Products
        </Link>
      </div>
    </div>
  );
}
