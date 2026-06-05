import { getProducts, saveProducts } from '@/lib/db';
import { Product } from '@/lib/types';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(getProducts());
}

export async function POST(req: NextRequest) {
  try {
    const product: Product = await req.json();
    const products = getProducts();
    products.push(product);
    saveProducts(products);
    return NextResponse.json({ success: true, product });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add product' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const product: Product = await req.json();
    let products = getProducts();
    products = products.map(p => p.id === product.id ? product : p);
    saveProducts(products);
    return NextResponse.json({ success: true, product });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    
    let products = getProducts();
    products = products.filter(p => p.id !== id);
    saveProducts(products);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
