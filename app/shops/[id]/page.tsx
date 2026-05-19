import Link from "next/link";

// Sample data - in production, this would come from an API or database
const shops = [
  {
    id: "1",
    name: "The Coffee Bean",
    address: "123 Main Street",
    rating: 4.5,
    image: "/images/coffee1.jpg",
    description: "Cozy atmosphere with premium coffee beans.",
    hours: "Mon-Fri: 6am-8pm, Sat-Sun: 7am-9pm",
    phone: "(555) 123-4567",
    features: ["WiFi", "Outdoor Seating", "Vegan Options"],
  },
  {
    id: "2",
    name: "Espresso Lab",
    address: "456 Oak Avenue",
    rating: 4.8,
    image: "/images/coffee2.jpg",
    description: "Artisanal espresso and fresh pastries.",
    hours: "Daily: 7am-7pm",
    phone: "(555) 234-5678",
    features: ["Fresh Pastries", "Single Origin", "Pour Over"],
  },
  {
    id: "3",
    name: "Morning Brew",
    address: "789 Elm Street",
    rating: 4.2,
    image: "/images/coffee3.jpg",
    description: "Perfect spot for your morning coffee.",
    hours: "Mon-Sat: 5am-6pm, Sun: 6am-5pm",
    phone: "(555) 345-6789",
    features: ["Early Opening", "Quick Service", "Drive-Through"],
  },
  {
    id: "4",
    name: "Latte Love",
    address: "321 Pine Road",
    rating: 4.6,
    image: "/images/coffee4.jpg",
    description: "Specialty lattes and friendly service.",
    hours: "Daily: 8am-10pm",
    phone: "(555) 456-7890",
    features: ["Specialty Drinks", "Cozy Ambiance", "Late Hours"],
  },
];

interface ShopPageProps {
  params: Promise<{ id: string }>;
}

export default async function ShopPage({ params }: ShopPageProps) {
  const resolvedParams = await params;
  const shop = shops.find((s) => s.id === resolvedParams.id);

  if (!shop) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Shop Not Found</h1>
        <p className="text-gray-600 mb-8">
          The coffee shop you're looking for doesn't exist.
        </p>
        <Link
          href="/shops"
          className="text-amber-600 hover:text-amber-700 font-semibold"
        >
          ← Back to Coffee Shops
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <Link
        href="/shops"
        className="text-amber-600 hover:text-amber-700 font-semibold mb-8 inline-block"
      >
        ← Back to Coffee Shops
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <div
              className="h-64 md:h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${shop.image})`,
                backgroundColor: "#f3e5d8",
              }}
            />
          </div>
          <div className="md:w-1/2 p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {shop.name}
            </h1>
            <div className="flex items-center mb-4">
              <span className="text-amber-500 text-xl">★</span>
              <span className="ml-2 text-gray-700 font-semibold">
                {shop.rating} / 5.0
              </span>
            </div>
            <p className="text-gray-600 mb-6">{shop.description}</p>

            <div className="space-y-3 mb-6">
              <div className="flex items-start">
                <span className="text-gray-500 mr-3">📍</span>
                <span className="text-gray-700">{shop.address}</span>
              </div>
              <div className="flex items-start">
                <span className="text-gray-500 mr-3">🕐</span>
                <span className="text-gray-700">{shop.hours}</span>
              </div>
              <div className="flex items-start">
                <span className="text-gray-500 mr-3">📞</span>
                <span className="text-gray-700">{shop.phone}</span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Features:</h3>
              <div className="flex flex-wrap gap-2">
                {shop.features.map((feature, index) => (
                  <span
                    key={index}
                    className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <button className="w-full bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition">
              Get Directions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}