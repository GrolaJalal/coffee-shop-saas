import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Find Your Perfect Coffee Spot
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Discover the best coffee shops near you with AI-powered recommendations.
          Get personalized suggestions based on your taste preferences.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/shops"
            className="bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 transition"
          >
            Browse Coffee Shops
          </Link>
          <Link
            href="/dashboard/client"
            className="border-2 border-amber-600 text-amber-600 px-8 py-3 rounded-lg font-semibold hover:bg-amber-50 transition"
          >
            Get Recommendations
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-4xl mb-4">☕</div>
          <h3 className="text-xl font-semibold mb-2">Quality Coffee</h3>
          <p className="text-gray-600">
            Find shops that serve the finest coffee beans from around the world.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-4xl mb-4">🤖</div>
          <h3 className="text-xl font-semibold mb-2">AI Recommendations</h3>
          <p className="text-gray-600">
            Get personalized suggestions based on your taste preferences and location.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-4xl mb-4">📍</div>
          <h3 className="text-xl font-semibold mb-2">Near You</h3>
          <p className="text-gray-600">
            Discover coffee shops in your vicinity with real-time availability.
          </p>
        </div>
      </section>
    </div>
  );
}