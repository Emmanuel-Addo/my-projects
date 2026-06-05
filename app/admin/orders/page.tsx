import { getOrders } from '@/lib/db';

export default function AdminOrdersPage() {
  const orders = getOrders();
  
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black text-white">Orders</h1>
      </div>

      <div className="bg-[#111] border border-[#222] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#222] bg-[#0a0a0a] text-[#888] text-sm">
                <th className="p-4 font-medium">Order ID</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Customer</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Total</th>
                <th className="p-4 font-medium text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.id} className="border-b border-[#222] hover:bg-[#1a1a1a] transition-colors">
                    <td className="p-4 text-white font-medium">{order.id}</td>
                    <td className="p-4 text-[#888]">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 text-white">{order.customer.name}</td>
                    <td className="p-4">
                      <span className="bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-1 rounded text-xs font-bold uppercase">
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 text-right text-white font-bold">${order.total.toFixed(2)}</td>
                    <td className="p-4 text-center">
                      <button className="text-[#E8FF00] hover:text-white transition-colors text-xs font-bold">View</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#666]">
                    No orders have been placed yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
