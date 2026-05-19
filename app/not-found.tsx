import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-amber-600 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition"
          >
            Go Home
          </Link>
          <Link
            href="/shops"
            className="border-2 border-amber-600 text-amber-600 px-6 py-3 rounded-lg font-semibold hover:bg-amber-50 transition"
          >
            Browse Coffee Shops
          </Link>
        </div>
      </div>
    </div>
  );
}