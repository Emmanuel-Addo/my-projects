import { getProducts } from '@/lib/db';
import ProductCard from '@/components/ProductCard';
import ProductFilters from '@/components/ProductFilters';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const category = params.category;
  const sort = params.sort;
  const search = params.search;

  // Let the client handle the actual filtering so we don't have to rebuild,
  // but for SEO we can pre-render the list based on query params.
  let filteredProducts = [...getProducts()];

  if (category && category !== 'All') {
    filteredProducts = filteredProducts.filter((p) => p.category === category);
  }

  if (search) {
    const q = search.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  if (sort === 'price-asc') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sort === 'rating') {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8 md:mb-12">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
          {category && category !== 'All' ? category : search ? `Search: ${search}` : 'All Products'}
        </h1>
        <p className="text-[#888] max-w-2xl">
          Explore our collection of premium gear designed for the modern lifestyle.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Filters Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0 sticky top-24 z-10">
          <Suspense fallback={<div className="h-64 bg-[#111] animate-pulse rounded-2xl border border-[#222]"></div>}>
            <ProductFilters currentCategory={category} currentSort={sort} />
          </Suspense>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="mb-6 flex justify-between items-center text-[#888] text-sm">
            <span>Showing {filteredProducts.length} results</span>
          </div>
          
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
             <div className="text-center py-20 bg-[#111] rounded-2xl border border-[#222]">
                <h3 className="text-xl font-bold text-white mb-2">No products found</h3>
                <p className="text-[#666]">Try adjusting your filters or search terms.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
