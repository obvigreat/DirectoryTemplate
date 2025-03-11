-- Create table for storing popular searches for recommendations
CREATE TABLE IF NOT EXISTS popular_searches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  query TEXT NOT NULL,
  category TEXT,
  location TEXT,
  count INTEGER DEFAULT 1,
  last_searched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add unique constraint on query
ALTER TABLE popular_searches ADD CONSTRAINT unique_query UNIQUE (query);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_popular_searches_count ON popular_searches(count DESC);
CREATE INDEX IF NOT EXISTS idx_popular_searches_last_searched_at ON popular_searches(last_searched_at DESC);

-- Create function to increment search count
CREATE OR REPLACE FUNCTION increment_search_count(search_query TEXT, search_category TEXT, search_location TEXT)
RETURNS void AS $$
BEGIN
  INSERT INTO popular_searches (query, category, location, count, last_searched_at)
  VALUES (LOWER(search_query), search_category, search_location, 1, NOW())
  ON CONFLICT (query) 
  DO UPDATE SET 
    count = popular_searches.count + 1,
    last_searched_at = NOW(),
    category = COALESCE(search_category, popular_searches.category),
    location = COALESCE(search_location, popular_searches.location);
 END;
$$ LANGUAGE plpgsql;

-- Create function to increment listing views
CREATE OR REPLACE FUNCTION increment_listing_views(listing_id INTEGER)
RETURNS void AS $$
BEGIN
  UPDATE listings
  SET views_count = COALESCE(views_count, 0) + 1
  WHERE id = listing_id;
END;
$$ LANGUAGE plpgsql;

-- Create function to update user lifetime value
CREATE OR REPLACE FUNCTION update_user_lifetime_value(user_id UUID, amount NUMERIC)
RETURNS void AS $$
BEGIN
  UPDATE users
  SET lifetime_value = COALESCE(lifetime_value, 0) + amount
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql;

-- Add views_count column to listings table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                WHERE table_name = 'listings' AND column_name = 'views_count') THEN
    ALTER TABLE listings ADD COLUMN views_count INTEGER DEFAULT 0;
  END IF;
END $$;

-- Add lifetime_value column to users table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                WHERE table_name = 'users' AND column_name = 'lifetime_value') THEN
    ALTER TABLE users ADD COLUMN lifetime_value NUMERIC DEFAULT 0;
  END IF;
END $$;

-- Add these tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE popular_searches;
