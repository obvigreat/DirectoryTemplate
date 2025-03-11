-- Fix the find_listings_within_radius function
DROP FUNCTION IF EXISTS find_listings_within_radius;

-- Create the function with the correct parameter names
CREATE OR REPLACE FUNCTION find_listings_within_radius(center_lat float, center_lon float, radius_miles float)
RETURNS SETOF listings AS $$
BEGIN
    RETURN QUERY
    SELECT *
    FROM listings
    WHERE calculate_distance(latitude, longitude, center_lat, center_lon) <= radius_miles;
END;
$$ LANGUAGE plpgsql;
