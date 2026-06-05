import { getProducts, getOrders } from '@/lib/db';

export async function GET() {
  const orders = getOrders();
  const products = getProducts();
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  
  // Assuming a simple calculation for "active users" for the sake of the dashboard
  const activeUsers = Math.floor(Math.random() * 50) + 10;

  return Response.json({
    totalRevenue,
    totalOrders,
    totalProducts,
    activeUsers
  });
}
