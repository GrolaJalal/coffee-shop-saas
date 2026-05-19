-- Coffee SaaS Complete Database Schema for Supabase

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Clerk users)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clerk_id TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('client', 'owner', 'admin')),
  avatar_url TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Coffee shops table
CREATE TABLE coffee_shops (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT,
  country TEXT NOT NULL DEFAULT 'MA',
  postal_code TEXT,
  lat DECIMAL(10, 8) NOT NULL,
  lng DECIMAL(11, 8) NOT NULL,
  phone TEXT,
  email TEXT,
  website TEXT,
  image_url TEXT,
  gallery TEXT[],
  opening_hours JSONB,
  price_range TEXT NOT NULL CHECK (price_range IN ('$', '$$', '$$$', '$$$$')),
  capacity INTEGER,
  features TEXT[],
  rating DECIMAL(3, 2) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  total_reviews INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Categories table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  shop_id UUID NOT NULL REFERENCES coffee_shops(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES categories(id),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
  image_url TEXT,
  is_available BOOLEAN DEFAULT true,
  is_vegetarian BOOLEAN DEFAULT false,
  is_vegan BOOLEAN DEFAULT false,
  is_gluten_free BOOLEAN DEFAULT false,
  allergens TEXT[],
  preparation_time INTEGER,
  calories INTEGER,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  shop_id UUID NOT NULL REFERENCES coffee_shops(id),
  user_id UUID NOT NULL REFERENCES users(id),
  order_number TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled')),
  type TEXT NOT NULL CHECK (type IN ('pickup', 'delivery', 'dine-in')),
  table_number TEXT,
  items JSONB NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  tax DECIMAL(10, 2) NOT NULL DEFAULT 0,
  delivery_fee DECIMAL(10, 2) DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL,
  payment_status TEXT NOT NULL CHECK (payment_status IN ('pending', 'paid', 'refunded', 'failed')),
  payment_method TEXT CHECK (payment_method IN ('card', 'cash', 'apple_pay', 'google_pay')),
  notes TEXT,
  estimated_ready_time TIMESTAMP WITH TIME ZONE,
  actual_ready_time TIMESTAMP WITH TIME ZONE,
  delivered_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reservations table
CREATE TABLE reservations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  shop_id UUID NOT NULL REFERENCES coffee_shops(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id),
  date DATE NOT NULL,
  time TIME NOT NULL,
  party_size INTEGER NOT NULL CHECK (party_size > 0),
  status TEXT NOT NULL CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed', 'no-show')),
  special_requests TEXT,
  table_assignment TEXT,
  confirmed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  shop_id UUID NOT NULL REFERENCES coffee_shops(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id),
  order_id UUID REFERENCES orders(id),
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  food_rating INTEGER CHECK (food_rating >= 1 AND food_rating <= 5),
  service_rating INTEGER CHECK (service_rating >= 1 AND service_rating <= 5),
  ambiance_rating INTEGER CHECK (ambiance_rating >= 1 AND ambiance_rating <= 5),
  comment TEXT NOT NULL,
  is_verified_purchase BOOLEAN DEFAULT false,
  is_visible BOOLEAN DEFAULT true,
  owner_response TEXT,
  responded_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(shop_id, user_id, order_id)
);

-- Indexes
CREATE INDEX idx_coffee_shops_owner_id ON coffee_shops(owner_id);
CREATE INDEX idx_coffee_shops_city ON coffee_shops(city);
CREATE INDEX idx_coffee_shops_location ON coffee_shops(lat, lng);
CREATE INDEX idx_coffee_shops_slug ON coffee_shops(slug);
CREATE INDEX idx_coffee_shops_active ON coffee_shops(is_active);

CREATE INDEX idx_products_shop_id ON products(shop_id);
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_available ON products(is_available);

CREATE INDEX idx_orders_shop_id ON orders(shop_id);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);

CREATE INDEX idx_reservations_shop_id ON reservations(shop_id);
CREATE INDEX idx_reservations_user_id ON reservations(user_id);
CREATE INDEX idx_reservations_date ON reservations(date);
CREATE INDEX idx_reservations_status ON reservations(status);

CREATE INDEX idx_reviews_shop_id ON reviews(shop_id);
CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_reviews_visible ON reviews(is_visible);

-- updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- updated_at triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_coffee_shops_updated_at BEFORE UPDATE ON coffee_shops FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reservations_updated_at BEFORE UPDATE ON reservations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update shop rating
CREATE OR REPLACE FUNCTION update_shop_rating()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    UPDATE coffee_shops
    SET rating = (
      SELECT COALESCE(AVG(rating), 0)
      FROM reviews
      WHERE shop_id = NEW.shop_id AND is_visible = true
    ),
    total_reviews = (
      SELECT COUNT(*)
      FROM reviews
      WHERE shop_id = NEW.shop_id AND is_visible = true
    )
    WHERE id = NEW.shop_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE coffee_shops
    SET rating = (
      SELECT COALESCE(AVG(rating), 0)
      FROM reviews
      WHERE shop_id = OLD.shop_id AND is_visible = true
    ),
    total_reviews = (
      SELECT COUNT(*)
      FROM reviews
      WHERE shop_id = OLD.shop_id AND is_visible = true
    )
    WHERE id = OLD.shop_id;
  END IF;
  RETURN NULL;
END;
$$ language 'plpgsql';

-- Trigger to update shop rating
CREATE TRIGGER update_shop_rating_after_review
AFTER INSERT OR UPDATE OR DELETE ON reviews
FOR EACH ROW EXECUTE FUNCTION update_shop_rating();

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE coffee_shops ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view all users" ON users FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid()::text = clerk_id);

-- Coffee shops policies
CREATE POLICY "Anyone can view active coffee shops" ON coffee_shops FOR SELECT USING (is_active = true);
CREATE POLICY "Owners can manage own shops" ON coffee_shops FOR ALL USING (
  owner_id = (SELECT id FROM users WHERE clerk_id = auth.uid()::text)
);
CREATE POLICY "Admins can manage all shops" ON coffee_shops FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE clerk_id = auth.uid()::text AND role = 'admin')
);

-- Categories policies
CREATE POLICY "Anyone can view categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Admins can manage categories" ON categories FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE clerk_id = auth.uid()::text AND role = 'admin')
);

-- Products policies
CREATE POLICY "Anyone can view available products" ON products FOR SELECT USING (is_available = true);
CREATE POLICY "Shop owners can manage own products" ON products FOR ALL USING (
  shop_id IN (
    SELECT id FROM coffee_shops
    WHERE owner_id = (SELECT id FROM users WHERE clerk_id = auth.uid()::text)
  )
);

-- Orders policies
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (
  user_id = (SELECT id FROM users WHERE clerk_id = auth.uid()::text)
);
CREATE POLICY "Shop owners can view orders for their shops" ON orders FOR SELECT USING (
  shop_id IN (
    SELECT id FROM coffee_shops
    WHERE owner_id = (SELECT id FROM users WHERE clerk_id = auth.uid()::text)
  )
);
CREATE POLICY "Users can create own orders" ON orders FOR INSERT WITH CHECK (
  user_id = (SELECT id FROM users WHERE clerk_id = auth.uid()::text)
);

-- Reservations policies
CREATE POLICY "Users can view own reservations" ON reservations FOR SELECT USING (
  user_id = (SELECT id FROM users WHERE clerk_id = auth.uid()::text)
);
CREATE POLICY "Shop owners can view reservations for their shops" ON reservations FOR SELECT USING (
  shop_id IN (
    SELECT id FROM coffee_shops
    WHERE owner_id = (SELECT id FROM users WHERE clerk_id = auth.uid()::text)
  )
);
CREATE POLICY "Users can create own reservations" ON reservations FOR INSERT WITH CHECK (
  user_id = (SELECT id FROM users WHERE clerk_id = auth.uid()::text)
);

-- Reviews policies
CREATE POLICY "Anyone can view visible reviews" ON reviews FOR SELECT USING (is_visible = true);
CREATE POLICY "Users can create own reviews" ON reviews FOR INSERT WITH CHECK (
  user_id = (SELECT id FROM users WHERE clerk_id = auth.uid()::text)
);
CREATE POLICY "Users can update own reviews" ON reviews FOR UPDATE USING (
  user_id = (SELECT id FROM users WHERE clerk_id = auth.uid()::text)
);
CREATE POLICY "Shop owners can respond to reviews" ON reviews FOR UPDATE USING (
  shop_id IN (
    SELECT id FROM coffee_shops
    WHERE owner_id = (SELECT id FROM users WHERE clerk_id = auth.uid()::text)
  )
);

-- Default categories
INSERT INTO categories (name, slug, description, icon, sort_order) VALUES
('Coffee', 'coffee', 'Hot and cold coffee drinks', '☕', 1),
('Tea', 'tea', 'Hot and cold tea varieties', '🍵', 2),
('Pastries', 'pastries', 'Fresh baked goods and pastries', '🥐', 3),
('Snacks', 'snacks', 'Light snacks and sandwiches', '🥪', 4),
('Desserts', 'desserts', 'Sweet treats and desserts', '🍰', 5),
('Breakfast', 'breakfast', 'Breakfast items', '🍳', 6);