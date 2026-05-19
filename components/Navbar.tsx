import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <span className="text-2xl mr-2">☕</span>
            <span className="text-xl font-bold text-gray-900">Coffee SaaS</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/shops"
              className="text-gray-700 hover:text-amber-600 font-medium transition"
            >
              Coffee Shops
            </Link>
            <Link
              href="/dashboard/client"
              className="text-gray-700 hover:text-amber-600 font-medium transition"
            >
              Get Recommendations
            </Link>
            <Link
              href="/dashboard/owner"
              className="text-gray-700 hover:text-amber-600 font-medium transition"
            >
              For Owners
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="text-gray-700 hover:text-amber-600 font-medium transition"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="bg-amber-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-amber-700 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}