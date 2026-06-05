import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#050505]">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[#1a1a1a] bg-[#0a0a0a] hidden md:block">
        <div className="p-6 h-full flex flex-col">
          <div className="mb-8">
            <h2 className="text-white font-black text-xl tracking-tight">
              ADMIN<span className="text-[#E8FF00]">PANEL</span>
            </h2>
          </div>
          <nav className="flex-1 space-y-2">
            <Link href="/admin" className="block px-4 py-2.5 rounded-lg bg-[#E8FF00] text-black font-semibold hover:bg-white transition-colors">
              Dashboard
            </Link>
            <Link href="/admin/orders" className="block px-4 py-2.5 rounded-lg text-[#888] hover:bg-[#1a1a1a] hover:text-white transition-colors">
              Orders
            </Link>
            <Link href="/admin/products" className="block px-4 py-2.5 rounded-lg text-[#888] hover:bg-[#1a1a1a] hover:text-white transition-colors">
              Products
            </Link>
            <Link href="/admin/customers" className="block px-4 py-2.5 rounded-lg text-[#888] hover:bg-[#1a1a1a] hover:text-white transition-colors">
              Customers
            </Link>
            <Link href="/admin/settings" className="block px-4 py-2.5 rounded-lg text-[#888] hover:bg-[#1a1a1a] hover:text-white transition-colors">
              Settings
            </Link>
          </nav>
          <div className="mt-auto pt-6 border-t border-[#1a1a1a]">
            <Link href="/" className="flex items-center gap-2 text-[#888] hover:text-white transition-colors">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
              </svg>
              Return to Store
            </Link>
          </div>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
