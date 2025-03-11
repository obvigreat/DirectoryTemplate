-- Create a proper relationship between saved_listings and listings tables
ALTER TABLE IF EXISTS saved_listings
ADD CONSTRAINT fk_saved_listings_listing
FOREIGN KEY (listing_id)
REFERENCES listings(id)
ON DELETE CASCADE;
