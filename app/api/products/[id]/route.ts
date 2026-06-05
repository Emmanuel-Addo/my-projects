import { getProducts, reviews } from '@/lib/db';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const products = getProducts();
  const product = products.find((p) => p.id === id);
  if (!product) {
    return Response.json({ error: 'Product not found' }, { status: 404 });
  }
  const productReviews = reviews.filter((r) => r.productId === id);
  const related = products
    .filter((p) => p.category === product.category && p.id !== id)
    .slice(0, 4);
  return Response.json({ product, reviews: productReviews, related });
}
