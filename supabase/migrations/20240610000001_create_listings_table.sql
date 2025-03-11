-- Create listings table
CREATE TABLE IF NOT EXISTS listings (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  website TEXT NOT NULL,
  rating DECIMAL(3,1) DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amenities TEXT[] DEFAULT NULL,
  hours JSONB DEFAULT NULL,
  images TEXT[] DEFAULT NULL,
  price_range TEXT DEFAULT NULL,
  featured BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'active'
);

-- Enable RLS
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Listings are viewable by everyone" ON listings;
CREATE POLICY "Listings are viewable by everyone" 
  ON listings FOR SELECT USING (status = 'active');

DROP POLICY IF EXISTS "Users can insert their own listings" ON listings;
CREATE POLICY "Users can insert their own listings" 
  ON listings FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own listings" ON listings;
CREATE POLICY "Users can update their own listings" 
  ON listings FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own listings" ON listings;
CREATE POLICY "Users can delete their own listings" 
  ON listings FOR DELETE USING (auth.uid() = user_id);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  listing_id BIGINT NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NULL
);

-- Enable RLS
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Reviews are viewable by everyone" ON reviews;
CREATE POLICY "Reviews are viewable by everyone" 
  ON reviews FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert their own reviews" ON reviews;
CREATE POLICY "Users can insert their own reviews" 
  ON reviews FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own reviews" ON reviews;
CREATE POLICY "Users can update their own reviews" 
  ON reviews FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own reviews" ON reviews;
CREATE POLICY "Users can delete their own reviews" 
  ON reviews FOR DELETE USING (auth.uid() = user_id);

-- Create saved_listings table
CREATE TABLE IF NOT EXISTS saved_listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  listing_id BIGINT NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  saved_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, listing_id)
);

-- Enable RLS
ALTER TABLE saved_listings ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Users can view their own saved listings" ON saved_listings;
CREATE POLICY "Users can view their own saved listings" 
  ON saved_listings FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own saved listings" ON saved_listings;
CREATE POLICY "Users can insert their own saved listings" 
  ON saved_listings FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own saved listings" ON saved_listings;
CREATE POLICY "Users can delete their own saved listings" 
  ON saved_listings FOR DELETE USING (auth.uid() = user_id);

-- Add function to update listing ratings
CREATE OR REPLACE FUNCTION update_listing_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE listings
  SET 
    rating = (SELECT COALESCE(AVG(rating), 0) FROM reviews WHERE listing_id = NEW.listing_id),
    reviews_count = (SELECT COUNT(*) FROM reviews WHERE listing_id = NEW.listing_id),
    updated_at = NOW()
  WHERE id = NEW.listing_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updating listing ratings
DROP TRIGGER IF EXISTS update_listing_rating_trigger ON reviews;
CREATE TRIGGER update_listing_rating_trigger
AFTER INSERT OR UPDATE OR DELETE ON reviews
FOR EACH ROW
EXECUTE FUNCTION update_listing_rating();

-- Enable realtime for all tables
ALTER PUBLICATION supabase_realtime ADD TABLE listings;
ALTER PUBLICATION supabase_realtime ADD TABLE reviews;
ALTER PUBLICATION supabase_realtime ADD TABLE saved_listings;
