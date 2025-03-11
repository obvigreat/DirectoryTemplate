-- Add latitude and longitude columns to listings table
ALTER TABLE listings ADD COLUMN IF NOT EXISTS latitude FLOAT;
ALTER TABLE listings ADD COLUMN IF NOT EXISTS longitude FLOAT;

-- Create a spatial index for faster location-based queries
CREATE INDEX IF NOT EXISTS listings_location_idx ON listings USING gist (point(longitude, latitude));

-- Add a function to calculate distance between two points
CREATE OR REPLACE FUNCTION calculate_distance(lat1 float, lon1 float, lat2 float, lon2 float)
RETURNS float AS $$
DECLARE
    x float = 69.1 * (lat2 - lat1);
    y float = 69.1 * (lon2 - lon1) * cos(lat1 / 57.3);
BEGIN
    RETURN sqrt(x * x + y * y);
END;
$$ LANGUAGE plpgsql;

-- Enable the earthdistance extension for more accurate distance calculations
CREATE EXTENSION IF NOT EXISTS earthdistance CASCADE;

-- Add a function to find listings within a radius
CREATE OR REPLACE FUNCTION find_listings_within_radius(center_lat float, center_lon float, radius_miles float)
RETURNS SETOF listings AS $$
BEGIN
    RETURN QUERY
    SELECT *
    FROM listings
    WHERE earth_distance(
        ll_to_earth(latitude, longitude),
        ll_to_earth(center_lat, center_lon)
    ) <= radius_miles * 1609.34; -- Convert miles to meters
END;
$$ LANGUAGE plpgsql;

-- Remove the realtime publication line since listings is already in the publication
-- ALTER publication supabase_realtime ADD TABLE listings;
