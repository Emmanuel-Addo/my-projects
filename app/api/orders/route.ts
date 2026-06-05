import { getOrders, saveOrder } from '@/lib/db';
import { Order } from '@/lib/types';

export async function GET() {
  return Response.json(getOrders());
}

export async function POST(request: Request) {
  const body = await request.json();
  const { items, subtotal, shipping, total, customer } = body;

  if (!items || !customer) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const newOrder: Order = {
    id: `ORD-${Date.now()}`,
    items,
    subtotal,
    shipping,
    total,
    status: 'pending',
    createdAt: new Date().toISOString(),
    customer,
  };

  saveOrder(newOrder);

  return Response.json(newOrder, { status: 201 });
}
