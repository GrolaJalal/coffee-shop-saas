import { NextRequest, NextResponse } from "next/server";

// Sample data - in production, this would come from a database via Supabase
const shops = [
  {
    id: "1",
    name: "The Coffee Bean",
    address: "123 Main Street",
    city: "San Francisco",
    state: "CA",
    lat: 37.7749,
    lng: -122.4194,
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
    city: "San Francisco",
    state: "CA",
    lat: 37.7759,
    lng: -122.4204,
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
    city: "San Francisco",
    state: "CA",
    lat: 37.7769,
    lng: -122.4214,
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
    city: "San Francisco",
    state: "CA",
    lat: 37.7779,
    lng: -122.4224,
    rating: 4.6,
    image: "/images/coffee4.jpg",
    description: "Specialty lattes and friendly service.",
    hours: "Daily: 8am-10pm",
    phone: "(555) 456-7890",
    features: ["Specialty Drinks", "Cozy Ambiance", "Late Hours"],
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");
  const limit = searchParams.get("limit") || "10";

  let filteredShops = shops;

  if (city) {
    filteredShops = shops.filter(
      (shop) => shop.city.toLowerCase() === city.toLowerCase()
    );
  }

  filteredShops = filteredShops.slice(0, parseInt(limit));

  return NextResponse.json({
    success: true,
    data: filteredShops,
    count: filteredShops.length,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, address, city, state, lat, lng, description, phone, features } = body;

    // Validation
    if (!name || !address || !city) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // In production, you would save to Supabase database
    const newShop = {
      id: Date.now().toString(),
      name,
      address,
      city,
      state: state || "",
      lat: lat || 0,
      lng: lng || 0,
      rating: 0,
      image: "/images/default-coffee.jpg",
      description: description || "",
      hours: "",
      phone: phone || "",
      features: features || [],
    };

    return NextResponse.json(
      { success: true, data: newShop },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}