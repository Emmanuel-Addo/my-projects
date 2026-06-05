import Link from 'next/link';

export default function AccountPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-4xl font-black tracking-tight mb-8">My Account</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1 space-y-2">
           <button className="w-full text-left px-4 py-3 bg-[#1a1a1a] text-white font-bold rounded-lg">Profile Overview</button>
           <button className="w-full text-left px-4 py-3 text-[#888] hover:bg-[#111] hover:text-white transition-colors rounded-lg">Order History</button>
           <button className="w-full text-left px-4 py-3 text-[#888] hover:bg-[#111] hover:text-white transition-colors rounded-lg">Addresses</button>
           <button className="w-full text-left px-4 py-3 text-[#888] hover:bg-[#111] hover:text-white transition-colors rounded-lg">Payment Methods</button>
           <div className="pt-4 mt-4 border-t border-[#1a1a1a]">
              <Link href="/admin" className="block w-full text-left px-4 py-3 text-[#E8FF00] hover:bg-[#1a1a1a] transition-colors rounded-lg font-bold">Admin Dashboard</Link>
           </div>
        </div>
        
        <div className="md:col-span-3">
           <div className="bg-[#111] border border-[#222] rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-8">
                 <div className="w-16 h-16 rounded-full bg-[#E8FF00] text-black flex items-center justify-center text-2xl font-black">
                   D
                 </div>
                 <div>
                   <h2 className="text-2xl font-bold text-white">Demo User</h2>
                   <p className="text-[#888]">demo@futureshop.com</p>
                 </div>
              </div>
              
              <h3 className="text-lg font-bold text-white mb-4 border-b border-[#222] pb-2">Recent Orders</h3>
              <div className="text-[#888] py-8 text-center bg-[#0a0a0a] rounded-lg border border-[#1a1a1a]">
                 No orders found. <Link href="/products" className="text-[#E8FF00] hover:underline">Start shopping</Link>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
