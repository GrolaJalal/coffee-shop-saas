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
    tasteProfile: ["strong", "chocolatey"],
    atmosphere: ["quiet", "cozy"],
    priceRange: "$$",
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
    tasteProfile: ["strong", "fruity"],
    atmosphere: ["work", "quiet"],
    priceRange: "$$$",
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
    tasteProfile: ["smooth", "chocolatey"],
    atmosphere: ["social", "work"],
    priceRange: "$",
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
    tasteProfile: ["smooth", "chocolatey", "fruity"],
    atmosphere: ["social", "cozy"],
    priceRange: "$$",
  },
];

// AI recommendation algorithm (simplified version)
function generateRecommendations(
  preferences: {
    taste?: string;
    atmosphere?: string;
    budget?: string;
  },
  limit: number = 5
) {
  // Calculate match score for each shop
  const scoredShops = shops.map((shop) => {
    let score = 0;
    const matchDetails: string[] = [];

    // Taste matching
    if (preferences.taste && shop.tasteProfile.includes(preferences.taste)) {
      score += 30;
      matchDetails.push(`Matches your ${preferences.taste} taste preference`);
    }

    // Atmosphere matching
    if (
      preferences.atmosphere &&
      shop.atmosphere.includes(preferences.atmosphere)
    ) {
      score += 25;
      matchDetails.push(`Perfect for ${preferences.atmosphere} atmosphere`);
    }

    // Budget matching
    if (preferences.budget) {
      const budgetMap: { [key: string]: string[] } = {
        budget: ["$"],
        medium: ["$", "$$"],
        premium: ["$$", "$$$"],
      };
      if (budgetMap[preferences.budget]?.includes(shop.priceRange)) {
        score += 20;
        matchDetails.push(`Fits your budget (${shop.priceRange})`);
      }
    }

    // Rating bonus
    score += shop.rating * 4; // Max 20 points from rating

    return {
      ...shop,
      score,
      matchDetails,
      matchPercentage: Math.min(Math.round((score / 100) * 100), 100),
    };
  });

  // Sort by score and return top recommendations
  return scoredShops
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const taste = searchParams.get("taste") || undefined;
  const atmosphere = searchParams.get("atmosphere") || undefined;
  const budget = searchParams.get("budget") || undefined;
  const limit = parseInt(searchParams.get("limit") || "5");

  const recommendations = generateRecommendations(
    { taste, atmosphere, budget },
    limit
  );

  return NextResponse.json({
    success: true,
    data: recommendations,
    count: recommendations.length,
    preferences: { taste, atmosphere, budget },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { taste, atmosphere, budget, limit = 5 } = body;

    const recommendations = generateRecommendations(
      { taste, atmosphere, budget },
      limit
    );

    return NextResponse.json({
      success: true,
      data: recommendations,
      count: recommendations.length,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}