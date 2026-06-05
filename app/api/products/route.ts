import { getProducts } from '@/lib/db';
import { type NextRequest } from 'next/server';

export function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const sort = searchParams.get('sort');
  const badge = searchParams.get('badge');
  const inStock = searchParams.get('inStock');

  let result = [...getProducts()];

  if (category && category !== 'All') {
    result = result.filter((p) => p.category === category);
  }

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  if (badge) {
    result = result.filter((p) => p.badge === badge);
  }

  if (inStock === 'true') {
    result = result.filter((p) => p.inStock);
  }

  switch (sort) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      result.sort((a, b) => b.rating - a.rating);
      break;
    case 'reviews':
      result.sort((a, b) => b.reviews - a.reviews);
      break;
    default:
      break;
  }

  return Response.json(result);
}
