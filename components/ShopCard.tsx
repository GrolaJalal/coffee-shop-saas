import Link from "next/link";

interface Shop {
  id: string;
  name: string;
  address: string;
  rating: number;
  image: string;
  description: string;
  distance?: string | number;
  matchPercentage?: number;
  matchDetails?: string[];
}

interface ShopCardProps {
  shop: Shop;
}

export default function ShopCard({ shop }: ShopCardProps) {
  return (
    <Link href={`/shops/${shop.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div
          className="h-48 bg-cover bg-center"
          style={{
            backgroundImage: `url(${shop.image})`,
            backgroundColor: "#f3e5d8",
          }}
        />
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{shop.name}</h3>
            <div className="flex items-center bg-amber-50 px-2 py-1 rounded">
              <span className="text-amber-500 mr-1">★</span>
              <span className="text-sm font-semibold text-amber-700">
                {shop.rating}
              </span>
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {shop.description}
          </p>
          <div className="flex items-center text-gray-500 text-sm mb-3">
            <span className="mr-1">📍</span>
            <span className="truncate">{shop.address}</span>
          </div>
          {shop.distance && (
            <div className="flex items-center text-amber-600 text-sm mb-2">
              <span className="mr-1">📏</span>
              <span>{shop.distance} miles away</span>
            </div>
          )}
          {shop.matchPercentage !== undefined && (
            <div className="mb-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-600">Match Score</span>
                <span className="text-sm font-semibold text-amber-600">
                  {shop.matchPercentage}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-amber-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${shop.matchPercentage}%` }}
                />
              </div>
              {shop.matchDetails && shop.matchDetails.length > 0 && (
                <div className="mt-2">
                  {shop.matchDetails.map((detail, index) => (
                    <span
                      key={index}
                      className="inline-block bg-green-50 text-green-700 text-xs px-2 py-1 rounded mr-1 mb-1"
                    >
                      ✓ {detail}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}