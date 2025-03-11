-- Create a function to find listings within a radius
CREATE OR REPLACE FUNCTION find_listings_within_radius(
  center_lat DOUBLE PRECISION,
  center_lon DOUBLE PRECISION,
  radius_miles DOUBLE PRECISION
) RETURNS SETOF listings AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM listings
  WHERE (
    -- Haversine formula to calculate distance
    3958.8 * acos(
      cos(radians(center_lat)) * 
      cos(radians(latitude)) * 
      cos(radians(longitude) - radians(center_lon)) + 
      sin(radians(center_lat)) * 
      sin(radians(latitude))
    )
  ) <= radius_miles;
END;
$$ LANGUAGE plpgsql;

-- Enable RLS on listings table
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;

-- Create policy for public access to listings
DROP POLICY IF EXISTS "Public listings are viewable by everyone" ON listings;
CREATE POLICY "Public listings are viewable by everyone"
ON listings FOR SELECT
USING (status = 'active');

-- Create policy for users to manage their own listings
DROP POLICY IF EXISTS "Users can manage their own listings" ON listings;
CREATE POLICY "Users can manage their own listings"
ON listings FOR ALL
USING (auth.uid() = user_id);

-- Create policy for admins to manage all listings
DROP POLICY IF EXISTS "Admins can manage all listings" ON listings;
CREATE POLICY "Admins can manage all listings"
ON listings FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  )
);

-- Add listings to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE listings;
