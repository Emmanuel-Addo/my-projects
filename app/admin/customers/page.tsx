export default function AdminCustomersPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black text-white">Customers</h1>
      </div>

      <div className="bg-[#111] border border-[#222] rounded-2xl p-12 text-center">
        <div className="w-16 h-16 mx-auto bg-[#1a1a1a] rounded-full flex items-center justify-center mb-4">
          <svg width="24" height="24" fill="none" stroke="#666" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Customer Management</h2>
        <p className="text-[#888] max-w-md mx-auto">
          This section allows you to view registered users, their order history, and manage accounts. Currently in development.
        </p>
      </div>
    </div>
  );
}
