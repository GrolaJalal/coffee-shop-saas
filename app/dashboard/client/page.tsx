"use client";

import { useState } from "react";
import ShopCard from "@/components/ShopCard";

interface Shop {
  id: string;
  name: string;
  address: string;
  rating: number;
  image: string;
  description: string;
}

export default function ClientDashboard() {
  const [preferences, setPreferences] = useState({
    taste: "",
    atmosphere: "",
    budget: "",
  });
  const [recommendations, setRecommendations] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("");

  const sampleShops: Shop[] = [
    {
      id: "1",
      name: "The Coffee Bean",
      address: "123 Main Street",
      rating: 4.5,
      image: "/images/coffee1.jpg",
      description: "Cozy atmosphere with premium coffee beans.",
    },
    {
      id: "2",
      name: "Espresso Lab",
      address: "456 Oak Avenue",
      rating: 4.8,
      image: "/images/coffee2.jpg",
      description: "Artisanal espresso and fresh pastries.",
    },
    {
      id: "3",
      name: "Morning Brew",
      address: "789 Elm Street",
      rating: 4.2,
      image: "/images/coffee3.jpg",
      description: "Perfect spot for your morning coffee.",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setRecommendations(sampleShops);
    setLoading(false);
  };

  const handleNearbySearch = async () => {
    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setRecommendations(sampleShops);
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Coffee Recommendations
        </h1>
        <p className="text-gray-600">
          Let our AI find the perfect coffee shop for you
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Your Preferences
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Coffee Taste
                </label>
                <select
                  value={preferences.taste}
                  onChange={(e) =>
                    setPreferences({ ...preferences, taste: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="">Select your preference</option>
                  <option value="strong">Strong & Bold</option>
                  <option value="smooth">Smooth & Mild</option>
                  <option value="fruity">Fruity & Acidic</option>
                  <option value="chocolatey">Chocolatey & Sweet</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Atmosphere
                </label>
                <select
                  value={preferences.atmosphere}
                  onChange={(e) =>
                    setPreferences({ ...preferences, atmosphere: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="">Select your preference</option>
                  <option value="quiet">Quiet & Cozy</option>
                  <option value="social">Social & Lively</option>
                  <option value="work">Work-Friendly</option>
                  <option value="outdoor">Outdoor Seating</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Budget
                </label>
                <select
                  value={preferences.budget}
                  onChange={(e) =>
                    setPreferences({ ...preferences, budget: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="">Select your budget</option>
                  <option value="budget">$ (Budget-friendly)</option>
                  <option value="medium">$$ (Moderate)</option>
                  <option value="premium">$$$ (Premium)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter your location"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition disabled:bg-amber-400 disabled:cursor-not-allowed"
              >
                {loading ? "Finding Recommendations..." : "Get Recommendations"}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t">
              <button
                onClick={handleNearbySearch}
                disabled={loading}
                className="w-full border-2 border-amber-600 text-amber-600 py-3 rounded-lg font-semibold hover:bg-amber-50 transition disabled:opacity-50"
              >
                📍 Find Coffee Shops Near Me
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          {loading && (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
                <p className="text-gray-600">
                  Our AI is finding the perfect coffee spots for you...
                </p>
              </div>
            </div>
          )}

          {!loading && recommendations.length === 0 && (
            <div className="bg-white p-12 rounded-lg shadow-md text-center">
              <div className="text-6xl mb-4">☕</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                No Recommendations Yet
              </h2>
              <p className="text-gray-600">
                Fill in your preferences and click "Get Recommendations" to
                discover personalized coffee shops.
              </p>
            </div>
          )}

          {!loading && recommendations.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Recommended Coffee Shops
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {recommendations.map((shop) => (
                  <ShopCard key={shop.id} shop={shop} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}