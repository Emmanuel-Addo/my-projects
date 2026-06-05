// In-memory wishlist store (keyed by a session id stored in cookie)
const wishlistStore: Record<string, string[]> = {};

function getSessionId(request: Request): string {
  const cookie = request.headers.get('cookie') || '';
  const match = cookie.match(/fs_session=([^;]+)/);
  return match ? match[1] : 'default';
}

export async function GET(request: Request) {
  const sid = getSessionId(request);
  const items = wishlistStore[sid] ?? [];
  return Response.json(items);
}

export async function POST(request: Request) {
  const sid = getSessionId(request);
  const { productId } = await request.json();
  if (!wishlistStore[sid]) wishlistStore[sid] = [];
  if (!wishlistStore[sid].includes(productId)) {
    wishlistStore[sid].push(productId);
  }
  return Response.json(wishlistStore[sid]);
}

export async function DELETE(request: Request) {
  const sid = getSessionId(request);
  const { productId } = await request.json();
  if (wishlistStore[sid]) {
    wishlistStore[sid] = wishlistStore[sid].filter((id) => id !== productId);
  }
  return Response.json(wishlistStore[sid] ?? []);
}
