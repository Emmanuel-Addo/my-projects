export default function AdminSettingsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black text-white">Store Settings</h1>
        <button className="bg-[#E8FF00] text-black font-bold px-6 py-2 rounded-lg hover:bg-white transition-colors">
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#111] border border-[#222] rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 border-b border-[#222] pb-2">General</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#888] mb-1">Store Name</label>
                <input type="text" defaultValue="FutureShop" className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#E8FF00]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#888] mb-1">Contact Email</label>
                <input type="email" defaultValue="support@futureshop.com" className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#E8FF00]" />
              </div>
            </div>
          </div>

          <div className="bg-[#111] border border-[#222] rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 border-b border-[#222] pb-2">Payment Processing</h2>
            <div className="flex items-center justify-between p-4 bg-[#1a1a1a] border border-[#333] rounded-lg mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-500 rounded flex items-center justify-center text-white font-bold">S</div>
                <div>
                  <p className="text-white font-medium">Stripe (Test Mode)</p>
                  <p className="text-[#888] text-xs">Connected</p>
                </div>
              </div>
              <button className="text-xs font-bold bg-[#333] hover:bg-[#444] text-white px-3 py-1.5 rounded transition-colors">Configure</button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-[#111] border border-[#222] rounded-2xl p-6">
             <h2 className="text-lg font-bold text-red-500 mb-4 border-b border-[#222] pb-2">Danger Zone</h2>
             <p className="text-[#888] text-sm mb-4">Actions here are destructive and cannot be easily reversed.</p>
             <button className="w-full bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 font-bold py-2 rounded-lg transition-colors text-sm">
                Clear All Orders
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
