import OpenAI from "openai";

// Initialize OpenAI client
const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  : null;

export interface RecommendationPreferences {
  taste?: string;
  atmosphere?: string;
  budget?: string;
  location?: string;
}

export interface NearbySearchParams {
  lat: number;
  lng: number;
  radius?: number;
  limit?: number;
}

/**
 * Generate AI-powered coffee shop recommendations based on user preferences
 */
export async function generateRecommendations(
  preferences: RecommendationPreferences,
  shops: any[]
): Promise<any[]> {
  // If OpenAI is not configured, fall back to simple matching
  if (!openai) {
    return fallbackRecommendations(preferences, shops);
  }

  try {
    const prompt = buildRecommendationPrompt(preferences, shops);

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are a coffee expert helping users find the perfect coffee shop based on their preferences. Analyze the available shops and recommend the best matches.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const response = completion.choices[0].message.content;
    return parseRecommendations(response, shops);
  } catch (error) {
    console.error("AI recommendation error:", error);
    return fallbackRecommendations(preferences, shops);
  }
}

/**
 * Find nearby coffee shops using AI-enhanced location analysis
 */
export async function findNearbyShops(
  params: NearbySearchParams,
  shops: any[]
): Promise<any[]> {
  // Filter shops by distance
  const nearbyShops = shops
    .map((shop) => {
      const distance = calculateDistance(
        params.lat,
        params.lng,
        shop.lat,
        shop.lng
      );
      return { ...shop, distance };
    })
    .filter((shop) => shop.distance <= (params.radius || 5))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, params.limit || 10);

  // If OpenAI is available, enhance with AI insights
  if (openai && nearbyShops.length > 0) {
    try {
      const enhancedShops = await enhanceShopDescriptions(nearbyShops);
      return enhancedShops;
    } catch (error) {
      console.error("AI enhancement error:", error);
    }
  }

  return nearbyShops;
}

/**
 * Enhance shop descriptions with AI-generated insights
 */
async function enhanceShopDescriptions(shops: any[]): Promise<any[]> {
  if (!openai) return shops;

  try {
    const enhancedShops = await Promise.all(
      shops.map(async (shop) => {
        const prompt = `
          Based on this coffee shop's features, generate a short, appealing description:
          Name: ${shop.name}
          Features: ${shop.features?.join(", ") || "N/A"}
          Rating: ${shop.rating || "N/A"}
          Current description: ${shop.description || "N/A"}
          
          Generate a 1-2 sentence description that highlights what makes this shop special.
        `;

        const completion = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content:
                "You are a copywriter specializing in coffee shop descriptions. Create engaging, concise descriptions.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.8,
          max_tokens: 100,
        });

        const enhancedDescription = completion.choices[0].message.content;
        return {
          ...shop,
          aiDescription: enhancedDescription || shop.description,
        };
      })
    );

    return enhancedShops;
  } catch (error) {
    console.error("Enhancement error:", error);
    return shops;
  }
}

/**
 * Build prompt for AI recommendation engine
 */
function buildRecommendationPrompt(
  preferences: RecommendationPreferences,
  shops: any[]
): string {
  const shopsInfo = shops
    .map(
      (shop) => `
    - ${shop.name}: ${shop.description}
      Features: ${shop.features?.join(", ") || "N/A"}
      Rating: ${shop.rating || "N/A"}
      Price: ${shop.priceRange || "N/A"}
      Atmosphere: ${shop.atmosphere?.join(", ") || "N/A"}
      Taste Profile: ${shop.tasteProfile?.join(", ") || "N/A"}
    `
    )
    .join("\n");

  return `
    User Preferences:
    - Taste: ${preferences.taste || "Not specified"}
    - Atmosphere: ${preferences.atmosphere || "Not specified"}
    - Budget: ${preferences.budget || "Not specified"}
    - Location: ${preferences.location || "Not specified"}

    Available Coffee Shops:
    ${shopsInfo}

    Please recommend the top 3 coffee shops that best match these preferences.
    For each recommendation, explain why it's a good match.
    Return the response as a JSON array with shop IDs and match reasons.
  `;
}

/**
 * Parse AI response into structured recommendations
 */
function parseRecommendations(response: string | null, shops: any[]): any[] {
  if (!response) return shops.slice(0, 3);

  try {
    const parsed = JSON.parse(response);
    if (Array.isArray(parsed)) {
      return parsed
        .map((rec) => {
          const shop = shops.find((s) => s.id === rec.id);
          if (shop) {
            return {
              ...shop,
              matchReason: rec.reason,
              aiRecommended: true,
            };
          }
          return null;
        })
        .filter(Boolean);
    }
  } catch {
    // If parsing fails, return top-rated shops
  }

  return shops.sort((a, b) => b.rating - a.rating).slice(0, 3);
}

/**
 * Calculate distance between two points using Haversine formula
 */
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

/**
 * Fallback recommendation algorithm when AI is not available
 */
function fallbackRecommendations(
  preferences: RecommendationPreferences,
  shops: any[]
): any[] {
  const scoredShops = shops.map((shop) => {
    let score = 0;
    const matchDetails: string[] = [];

    if (preferences.taste && shop.tasteProfile?.includes(preferences.taste)) {
      score += 30;
      matchDetails.push(`Matches your ${preferences.taste} taste preference`);
    }

    if (
      preferences.atmosphere &&
      shop.atmosphere?.includes(preferences.atmosphere)
    ) {
      score += 25;
      matchDetails.push(`Perfect for ${preferences.atmosphere} atmosphere`);
    }

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

    score += (shop.rating || 0) * 4;

    return {
      ...shop,
      score,
      matchDetails,
      matchPercentage: Math.min(Math.round((score / 100) * 100), 100),
    };
  });

  return scoredShops
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}