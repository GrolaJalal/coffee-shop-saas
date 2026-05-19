import ShopCard from "@/components/ShopCard";

// Sample data - in production, this would come from an API
const shops = [
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
  {
    id: "4",
    name: "Latte Love",
    address: "321 Pine Road",
    rating: 4.6,
    image: "/images/coffee4.jpg",
    description: "Specialty lattes and friendly service.",
  },
];

export default function ShopsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Coffee Shops</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shops.map((shop) => (
          <ShopCard key={shop.id} shop={shop} />
        ))}
      </div>
    </div>
  );
}