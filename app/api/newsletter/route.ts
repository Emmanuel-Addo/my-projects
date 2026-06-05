const subscribers: string[] = [];

export async function POST(request: Request) {
  const { email } = await request.json();
  if (!email || !email.includes('@')) {
    return Response.json({ error: 'Invalid email' }, { status: 400 });
  }
  if (!subscribers.includes(email)) {
    subscribers.push(email);
  }
  return Response.json({ success: true, message: 'Subscribed!' });
}
