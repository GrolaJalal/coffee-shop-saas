"use client";

import { useState } from "react";
import Link from "next/link";

interface CoffeeShop {
  id: string;
  name: string;
  address: string;
  city: string;
  rating: number;
  is_active: boolean;
}

export default function OwnerShopsPage() {
  const [shops] = useState<CoffeeShop[]>([
    {
      id: "1",
      name: "My Coffee Shop",
      address: "123 Main Street",
      city: "Casablanca",
      rating: 4.5,
      is_active: true,
    },
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Coffee Shops</h1>
          <p className="text-gray-600 mt-1">Manage your coffee shop locations</p>
        </div>
        <Link
          href="/dashboard/owner/shops/new"
          className="bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition flex items-center gap-2"
        >
          <span>+</span>
          Add New Coffee Shop
        </Link>
      </div>

      {shops.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="text-6xl mb-4">☕</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Coffee Shops Yet</h2>
          <p className="text-gray-600 mb-6">
            Start by adding your first coffee shop to the platform
          </p>
          <Link
            href="/dashboard/owner/shops/new"
            className="bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition inline-block"
          >
            Create Your First Coffee Shop
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {shops.map((shop) => (
            <div
              key={shop.id}
              className="bg-white rounded-lg shadow-md p-6 flex justify-between items-center"
            >
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {shop.name}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      shop.is_active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {shop.is_active ? "Active" : "Inactive"}
                  </span>
                </div>
                <p className="text-gray-600 mt-1">
                  {shop.address}, {shop.city}
                </p>
                <div className="flex items-center mt-2">
                  <span className="text-amber-500">★</span>
                  <span className="ml-1 text-gray-700 font-medium">
                    {shop.rating} / 5.0
                  </span>
                </div>
              </div>
              <div className="flex gap-3">
                <Link
                  href={`/dashboard/owner/shops/${shop.id}/edit`}
                  className="border-2 border-amber-600 text-amber-600 px-4 py-2 rounded-lg font-medium hover:bg-amber-50 transition"
                >
                  Edit
                </Link>
                <Link
                  href={`/shops/${shop.id}`}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition"
                >
                  View Public Page
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}