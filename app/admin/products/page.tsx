'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Product, Category } from '@/lib/types';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // Form state
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState<Category>('Tech');
  const [image, setImage] = useState('');
  const [inStock, setInStock] = useState(true);
  const [description, setDescription] = useState('');

  const fetchProducts = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/products');
    if (res.ok) {
      const data = await res.json();
      setProducts(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openAddModal = () => {
    setEditingProduct(null);
    setName('');
    setPrice('');
    setCategory('Tech');
    setImage('');
    setInStock(true);
    setDescription('');
    setModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setName(p.name);
    setPrice(p.price.toString());
    setCategory(p.category);
    setImage(p.image);
    setInStock(p.inStock);
    setDescription(p.description);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    const res = await fetch(`/api/admin/products?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      fetchProducts();
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      id: editingProduct ? editingProduct.id : `p${Date.now()}`,
      name,
      price: parseFloat(price),
      category,
      image,
      images: [image],
      inStock,
      description,
      rating: editingProduct ? editingProduct.rating : 5.0,
      reviews: editingProduct ? editingProduct.reviews : 0,
      tags: editingProduct ? editingProduct.tags : [],
    };

    const res = await fetch('/api/admin/products', {
      method: editingProduct ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setModalOpen(false);
      fetchProducts();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black text-white">Products</h1>
        <button 
          onClick={openAddModal}
          className="bg-[#E8FF00] text-black font-bold px-4 py-2 rounded-lg hover:bg-white transition-colors cursor-pointer"
        >
          + Add Product
        </button>
      </div>

      <div className="bg-[#111] border border-[#222] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#222] bg-[#0a0a0a] text-[#888] text-sm">
                <th className="p-4 font-medium">Product</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium">Stock Status</th>
                <th className="p-4 font-medium text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {loading ? (
                <tr><td colSpan={5} className="p-8 text-center text-[#888]">Loading products...</td></tr>
              ) : products.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-[#888]">No products found.</td></tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="border-b border-[#222] hover:bg-[#1a1a1a] transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-md overflow-hidden bg-[#222]">
                        <Image src={product.image} alt={product.name} fill className="object-cover" sizes="40px" />
                      </div>
                      <span className="text-white font-medium max-w-[200px] truncate">{product.name}</span>
                    </td>
                    <td className="p-4 text-[#888]">{product.category}</td>
                    <td className="p-4 text-white font-bold">${product.price.toFixed(2)}</td>
                    <td className="p-4">
                      {product.inStock ? (
                        <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded text-xs font-bold uppercase">
                          In Stock
                        </span>
                      ) : (
                        <span className="bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-1 rounded text-xs font-bold uppercase">
                          Out of Stock
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-center space-x-3">
                      <button onClick={() => openEditModal(product)} className="text-[#888] hover:text-white transition-colors cursor-pointer">Edit</button>
                      <button onClick={() => handleDelete(product.id)} className="text-[#888] hover:text-red-400 transition-colors cursor-pointer">Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#111] border border-[#333] rounded-2xl w-full max-w-lg overflow-hidden">
             <div className="p-6 border-b border-[#333] flex justify-between items-center bg-[#0a0a0a]">
                <h2 className="text-xl font-bold text-white">{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
                <button onClick={() => setModalOpen(false)} className="text-[#888] hover:text-white cursor-pointer">✕</button>
             </div>
             <form onSubmit={handleSave} className="p-6 space-y-4">
                <div>
                   <label className="block text-sm font-medium text-[#888] mb-1">Name</label>
                   <input required value={name} onChange={e=>setName(e.target.value)} className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#E8FF00]" />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                     <label className="block text-sm font-medium text-[#888] mb-1">Price</label>
                     <input required type="number" step="0.01" value={price} onChange={e=>setPrice(e.target.value)} className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#E8FF00]" />
                  </div>
                  <div className="flex-1">
                     <label className="block text-sm font-medium text-[#888] mb-1">Category</label>
                     <select value={category} onChange={e=>setCategory(e.target.value as Category)} className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#E8FF00] appearance-none">
                        <option value="Tech">Tech</option>
                        <option value="Apparel">Apparel</option>
                        <option value="Audio">Audio</option>
                        <option value="Home">Home</option>
                        <option value="Sport">Sport</option>
                     </select>
                  </div>
                </div>
                <div>
                   <label className="block text-sm font-medium text-[#888] mb-1">Image URL (Unsplash)</label>
                   <input required value={image} onChange={e=>setImage(e.target.value)} placeholder="https://images.unsplash.com/..." className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#E8FF00]" />
                </div>
                <div>
                   <label className="block text-sm font-medium text-[#888] mb-1">Description</label>
                   <textarea required value={description} onChange={e=>setDescription(e.target.value)} rows={3} className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#E8FF00]" />
                </div>
                <div className="flex items-center gap-2 mt-2">
                   <input type="checkbox" id="instock" checked={inStock} onChange={e=>setInStock(e.target.checked)} className="w-4 h-4 rounded bg-[#1a1a1a] border-[#333] text-[#E8FF00] focus:ring-[#E8FF00]" />
                   <label htmlFor="instock" className="text-sm text-white cursor-pointer">Product is in stock</label>
                </div>
                
                <div className="pt-4 flex justify-end gap-3 border-t border-[#333] mt-6">
                   <button type="button" onClick={() => setModalOpen(false)} className="px-5 py-2.5 text-white font-medium hover:bg-[#222] rounded-lg transition-colors cursor-pointer">Cancel</button>
                   <button type="submit" className="px-5 py-2.5 bg-[#E8FF00] text-black font-bold rounded-lg hover:bg-white transition-colors cursor-pointer">
                      {editingProduct ? 'Save Changes' : 'Create Product'}
                   </button>
                </div>
             </form>
          </div>
        </div>
      )}
    </div>
  );
}
