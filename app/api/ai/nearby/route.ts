import { NextRequest, NextResponse } from "next/server";

// Sample data - in production, this would come from a database
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

// Calculate distance between two points using Haversine formula
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 3959; // Earth's radius in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat = parseFloat(searchParams.get("lat") || "0");
  const lng = parseFloat(searchParams.get("lng") || "0");
  const radius = parseFloat(searchParams.get("radius") || "5"); // Default 5 miles
  const limit = parseInt(searchParams.get("limit") || "10");

  if (!lat || !lng) {
    return NextResponse.json(
      { success: false, error: "Latitude and longitude are required" },
      { status: 400 }
    );
  }

  // Filter shops within radius and calculate distance
  const nearbyShops = shops
    .map((shop) => {
      const distance = calculateDistance(lat, lng, shop.lat, shop.lng);
      return { ...shop, distance: distance.toFixed(2) };
    })
    .filter((shop) => parseFloat(shop.distance as unknown as string) <= radius)
    .sort(
      (a, b) =>
        parseFloat(a.distance as unknown as string) -
        parseFloat(b.distance as unknown as string)
    )
    .slice(0, limit);

  return NextResponse.json({
    success: true,
    data: nearbyShops,
    count: nearbyShops.length,
    searchParams: {
      lat,
      lng,
      radius,
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { lat, lng, radius = 5, limit = 10 } = body;

    if (!lat || !lng) {
      return NextResponse.json(
        { success: false, error: "Latitude and longitude are required" },
        { status: 400 }
      );
    }

    // Filter shops within radius and calculate distance
    const nearbyShops = shops
      .map((shop) => {
        const distance = calculateDistance(lat, lng, shop.lat, shop.lng);
        return { ...shop, distance: distance.toFixed(2) };
      })
      .filter((shop) => parseFloat(shop.distance as unknown as string) <= radius)
      .sort(
        (a, b) =>
          parseFloat(a.distance as unknown as string) -
          parseFloat(b.distance as unknown as string)
      )
      .slice(0, limit);

    return NextResponse.json({
      success: true,
      data: nearbyShops,
      count: nearbyShops.length,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}