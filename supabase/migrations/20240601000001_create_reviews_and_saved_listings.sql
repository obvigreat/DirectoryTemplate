-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  listing_id INTEGER NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create saved_listings table
CREATE TABLE IF NOT EXISTS saved_listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  listing_id INTEGER NOT NULL,
  saved_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, listing_id)
);

-- Enable RLS on reviews table
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Enable RLS on saved_listings table
ALTER TABLE saved_listings ENABLE ROW LEVEL SECURITY;

-- Create policies for reviews
DROP POLICY IF EXISTS "Users can view all reviews" ON reviews;
CREATE POLICY "Users can view all reviews"
  ON reviews FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Users can insert their own reviews" ON reviews;
CREATE POLICY "Users can insert their own reviews"
  ON reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own reviews" ON reviews;
CREATE POLICY "Users can update their own reviews"
  ON reviews FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own reviews" ON reviews;
CREATE POLICY "Users can delete their own reviews"
  ON reviews FOR DELETE
  USING (auth.uid() = user_id);

-- Create policies for saved_listings
DROP POLICY IF EXISTS "Users can view their own saved listings" ON saved_listings;
CREATE POLICY "Users can view their own saved listings"
  ON saved_listings FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own saved listings" ON saved_listings;
CREATE POLICY "Users can insert their own saved listings"
  ON saved_listings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own saved listings" ON saved_listings;
CREATE POLICY "Users can delete their own saved listings"
  ON saved_listings FOR DELETE
  USING (auth.uid() = user_id);

-- Enable realtime for both tables
alter publication supabase_realtime add table reviews;
alter publication supabase_realtime add table saved_listings;
