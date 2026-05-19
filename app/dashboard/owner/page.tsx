import Link from "next/link";

export default function OwnerDashboard() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Owner Dashboard</h1>
        <p className="text-gray-600">Manage your coffee shop and analytics</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm font-semibold mb-2">Total Visitors</h3>
          <p className="text-3xl font-bold text-gray-900">1,234</p>
          <p className="text-green-600 text-sm mt-1">+12% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm font-semibold mb-2">Profile Views</h3>
          <p className="text-3xl font-bold text-gray-900">567</p>
          <p className="text-green-600 text-sm mt-1">+8% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm font-semibold mb-2">Avg. Rating</h3>
          <p className="text-3xl font-bold text-gray-900">4.8</p>
          <p className="text-amber-500 text-sm mt-1">★ ★ ★ ★ ★</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm font-semibold mb-2">AI Recommendations</h3>
          <p className="text-3xl font-bold text-gray-900">89</p>
          <p className="text-green-600 text-sm mt-1">+15% from last month</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              href="/dashboard/owner/profile"
              className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
            >
              <h3 className="font-semibold text-gray-900">Edit Shop Profile</h3>
              <p className="text-gray-600 text-sm">Update your shop information</p>
            </Link>
            <Link
              href="/dashboard/owner/analytics"
              className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
            >
              <h3 className="font-semibold text-gray-900">View Analytics</h3>
              <p className="text-gray-600 text-sm">Detailed performance metrics</p>
            </Link>
            <Link
              href="/dashboard/owner/promotions"
              className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
            >
              <h3 className="font-semibold text-gray-900">Manage Promotions</h3>
              <p className="text-gray-600 text-sm">Create and manage offers</p>
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Reviews</h2>
          <div className="space-y-4">
            <div className="border-b pb-4">
              <div className="flex items-center mb-2">
                <span className="text-amber-500">★★★★★</span>
                <span className="ml-2 text-sm text-gray-600">John D.</span>
              </div>
              <p className="text-gray-700 text-sm">
                Amazing coffee and great atmosphere! Will definitely come back.
              </p>
            </div>
            <div className="border-b pb-4">
              <div className="flex items-center mb-2">
                <span className="text-amber-500">★★★★☆</span>
                <span className="ml-2 text-sm text-gray-600">Sarah M.</span>
              </div>
              <p className="text-gray-700 text-sm">
                Good coffee, but service was a bit slow during peak hours.
              </p>
            </div>
            <div>
              <div className="flex items-center mb-2">
                <span className="text-amber-500">★★★★★</span>
                <span className="ml-2 text-sm text-gray-600">Mike R.</span>
              </div>
              <p className="text-gray-700 text-sm">
                Best espresso in town! The staff is incredibly friendly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}