# ☕ Coffee SaaS - AI-Powered Coffee Shop Discovery

A modern web application that helps users discover the perfect coffee shops using AI-powered recommendations.

## 🚀 Features

- **AI Recommendations**: Get personalized coffee shop recommendations based on your preferences (taste, atmosphere, budget)
- **Nearby Search**: Find coffee shops near your location
- **User Authentication**: Secure authentication with Clerk
- **Dual Dashboards**: Separate dashboards for coffee shop owners and customers
- **Responsive Design**: Beautiful UI with Tailwind CSS v4
- **TypeScript**: Full type safety

## 🛠️ Tech Stack

- **Framework**: Next.js 14.2.3 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Authentication**: Clerk
- **Database**: Supabase
- **AI**: Groq SDK with Llama 3 (Free)
- **Deployment**: Vercel-ready

## 📁 Project Structure

```
coffee-saas/
├── app/
│   ├── layout.tsx              # Root layout with Clerk provider
│   ├── page.tsx                # Homepage
│   ├── loading.tsx             # Global loading state
│   ├── not-found.tsx           # 404 page
│   │
│   ├── login/page.tsx          # Login page
│   ├── signup/page.tsx         # Sign up page
│   │
│   ├── shops/
│   │   ├── page.tsx            # List all coffee shops
│   │   └── [id]/page.tsx       # Individual shop details
│   │
│   ├── dashboard/
│   │   ├── owner/page.tsx      # Owner dashboard
│   │   └── client/page.tsx     # Client dashboard with AI recommendations
│   │
│   └── api/
│       ├── shops/route.ts      # Shops API
│       └── ai/
│           ├── nearby/route.ts # Nearby shops API
│           └── recommend/route.ts # AI recommendations API
│
├── components/
│   ├── Navbar.tsx              # Navigation bar with auth state
│   └── ShopCard.tsx            # Reusable shop card component
│
├── lib/
│   ├── supabase.ts             # Supabase client
│   ├── auth.ts                 # Authentication utilities
│   └── ai.ts                   # AI recommendation engine
│
├── middleware.ts               # Clerk authentication middleware
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.js           # PostCSS configuration
├── tsconfig.json               # TypeScript configuration
├── .env.local                  # Environment variables (local)
└── .env.example                # Environment variables template
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git (for version control)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/GrolaJalal/coffee-saas.git
   cd coffee-saas
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env.example` to `.env.local` and fill in your values:
   ```bash
   cp .env.example .env.local
   ```

   Required environment variables:
   - **Clerk Authentication** (Get from https://dashboard.clerk.com)
     - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
     - `CLERK_SECRET_KEY`
   
   - **Supabase** (Get from https://app.supabase.com)
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   
   - **Groq API** (Get FREE key from https://console.groq.com/keys)
     - `GROQ_API_KEY`

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Visit [http://localhost:3003](http://localhost:3003)

## 🔑 Environment Variables

### Clerk Setup

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Create a new application
3. Copy your publishable key and secret key
4. Add them to `.env.local`

### Supabase Setup

1. Go to [Supabase](https://app.supabase.com)
2. Create a new project
3. Get your project URL and anon key from Settings > API
4. Add them to `.env.local`

### Groq API Setup (FREE)

1. Go to [Groq Console](https://console.groq.com/keys)
2. Create a free API key
3. Add it to `.env.local`

## 📜 Available Scripts

```bash
npm run dev      # Start development server on port 3003
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🎨 Features Overview

### For Coffee Lovers (Clients)

- Browse all coffee shops
- Get AI-powered recommendations based on:
  - Taste preferences (strong, smooth, fruity, chocolatey)
  - Atmosphere (quiet, social, work-friendly, outdoor)
  - Budget ($, $$, $$$)
- Find nearby coffee shops
- View detailed shop information

### For Coffee Shop Owners

- View analytics dashboard
- Track visitor statistics
- Manage shop profile
- View customer reviews
- Monitor AI recommendation performance

## 🤖 AI Features

The application uses **Groq with Llama 3** (completely FREE) for:

1. **Smart Recommendations**: Analyzes user preferences and matches with shop profiles
2. **Natural Language Processing**: Understands user preferences in context
3. **Enhanced Descriptions**: Generates appealing shop descriptions
4. **Location-Based Search**: Finds nearby shops with intelligent ranking

## 🔒 Authentication

- Protected routes require authentication
- Public routes: Home, Shops list, Shop details, API endpoints
- Private routes: Dashboard (owner/client), Login, Signup
- Role-based access control (owner vs client)

## 📱 Responsive Design

- Mobile-first approach
- Works on all screen sizes
- Tailwind CSS v4 for modern styling
- Loading states and error handling

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- AWS Amplify
- Netlify
- Railway
- Self-hosted with Docker

## 📝 Database Schema (Supabase)

```sql
-- Users table (managed by Clerk)
-- Shops table
CREATE TABLE shops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT,
  lat FLOAT,
  lng FLOAT,
  rating FLOAT DEFAULT 0,
  image TEXT,
  description TEXT,
  hours TEXT,
  phone TEXT,
  features TEXT[],
  owner_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shop_id UUID REFERENCES shops(id),
  user_id UUID REFERENCES auth.users(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Clerk](https://clerk.com) for authentication
- [Supabase](https://supabase.com) for database
- [Groq](https://groq.com) for free AI inference
- [Next.js](https://nextjs.org) for the framework
- [Tailwind CSS](https://tailwindcss.com) for styling

## 📞 Support

For support, email support@coffeesaas.com or open an issue in the repository.

---

**Built with ❤️ for coffee lovers**