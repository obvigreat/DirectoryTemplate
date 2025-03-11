-- Enable realtime for saved_listings table
alter publication supabase_realtime add table saved_listings;

-- Enable realtime for messages table
alter publication supabase_realtime add table messages;

-- Enable realtime for bookings table
alter publication supabase_realtime add table bookings;
