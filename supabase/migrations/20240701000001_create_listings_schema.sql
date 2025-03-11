-- Create listings table
CREATE TABLE IF NOT EXISTS listings (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  website TEXT NOT NULL,
  rating DECIMAL(3,1) DEFAULT 0.0,
  reviews_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  amenities TEXT[] DEFAULT '{}',
  hours JSONB DEFAULT NULL,
  images TEXT[] DEFAULT '{}',
  price_range TEXT DEFAULT NULL,
  featured BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'active'
);

-- Enable RLS on listings
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;

-- Create policies for listings
DROP POLICY IF EXISTS "Listings are viewable by everyone" ON listings;
CREATE POLICY "Listings are viewable by everyone"
  ON listings FOR SELECT
  USING (status = 'active' OR auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own listings" ON listings;
CREATE POLICY "Users can insert their own listings"
  ON listings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own listings" ON listings;
CREATE POLICY "Users can update their own listings"
  ON listings FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own listings" ON listings;
CREATE POLICY "Users can delete their own listings"
  ON listings FOR DELETE
  USING (auth.uid() = user_id);

-- Enable realtime for listings
ALTER PUBLICATION supabase_realtime ADD TABLE listings;
