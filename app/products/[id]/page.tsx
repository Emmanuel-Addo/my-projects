import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProducts, reviews } from '@/lib/db';
import AddToCartButton from '@/components/AddToCartButton';
import ProductGallery from '@/components/ProductGallery';

export const dynamic = 'force-dynamic';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const products = getProducts();
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  const productReviews = reviews.filter((r) => r.productId === id);
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Breadcrumb */}
      <nav className="flex text-sm text-[#666] mb-8">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link href={`/products?category=${product.category}`} className="hover:text-white transition-colors">
          {product.category}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-white">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-24">
        {/* Gallery */}
        <ProductGallery images={product.images} name={product.name} badge={product.badge} inStock={product.inStock} />

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-6 border-b border-[#1a1a1a] pb-6">
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4 leading-tight">{product.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill={star <= Math.round(product.rating) ? '#E8FF00' : '#333'}
                    className="mr-0.5"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <span className="text-[#888] text-sm font-medium">{product.reviews.toLocaleString()} Reviews</span>
            </div>
            
            <div className="flex items-end gap-3">
              <span className="text-3xl font-bold text-white">${product.price}</span>
              {product.originalPrice && (
                <span className="text-lg text-[#555] line-through mb-1">${product.originalPrice}</span>
              )}
            </div>
          </div>

          <p className="text-[#888] text-lg mb-8 leading-relaxed">
            {product.description}
          </p>

          {/* Action */}
          <div className="mb-10 p-6 bg-[#111] rounded-2xl border border-[#222]">
            <AddToCartButton product={product} />
            <p className="text-center text-xs text-[#666] mt-4 flex items-center justify-center gap-2">
               <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                 <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                 <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
               </svg>
               Secure Checkout. Free returns within 30 days.
            </p>
          </div>

          {/* Specs */}
          {product.specs && (
            <div>
              <h3 className="text-white font-bold mb-4 uppercase tracking-widest text-sm">Specifications</h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="border-b border-[#222] pb-2">
                    <dt className="text-[#666] text-xs uppercase tracking-wider mb-1">{key}</dt>
                    <dd className="text-white text-sm font-medium">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <section className="mb-24 pt-12 border-t border-[#1a1a1a]">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-black tracking-tight mb-2">Customer Reviews</h2>
            <div className="flex items-center gap-2">
               <span className="text-2xl font-bold text-white">{product.rating}</span>
               <span className="text-[#888]">out of 5</span>
            </div>
          </div>
          <button className="hidden sm:block border border-[#333] hover:border-white text-white font-medium px-6 py-2.5 rounded-lg transition-colors text-sm">
             Write a Review
          </button>
        </div>

        {productReviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {productReviews.map((review) => (
              <div key={review.id} className="p-6 bg-[#111] rounded-2xl border border-[#222]">
                <div className="flex items-center justify-between mb-4">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center font-bold text-[#E8FF00]">
                        {review.author.charAt(0)}
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">{review.author}</p>
                        <p className="text-[#555] text-xs">{review.date}</p>
                      </div>
                   </div>
                   <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} width="12" height="12" viewBox="0 0 24 24" fill={star <= review.rating ? '#E8FF00' : '#333'} className="ml-0.5">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                   </div>
                </div>
                <p className="text-[#ccc] text-sm leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-[#111] rounded-2xl border border-[#222]">
             <p className="text-[#666]">No reviews yet. Be the first to review this product!</p>
          </div>
        )}
      </section>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
         <section className="pt-12 border-t border-[#1a1a1a]">
           <h2 className="text-3xl font-black tracking-tight mb-10">You might also like</h2>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
             {relatedProducts.map((p) => (
                <div key={p.id} className="w-full">
                  <Link
                    href={`/products/${p.id}`}
                    className="group relative flex flex-col bg-[#111] border border-[#1e1e1e] rounded-2xl overflow-hidden hover:border-[#333] transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative aspect-square overflow-hidden bg-[#0d0d0d]">
                      <Image src={p.image} alt={p.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, 25vw" />
                    </div>
                    <div className="p-4 flex flex-col gap-1">
                      <p className="text-[#666] text-[10px] uppercase tracking-widest font-medium">{p.category}</p>
                      <h3 className="text-white font-medium text-sm line-clamp-1">{p.name}</h3>
                      <p className="text-white font-bold">${p.price}</p>
                    </div>
                  </Link>
                </div>
             ))}
           </div>
         </section>
      )}

    </div>
  );
}
