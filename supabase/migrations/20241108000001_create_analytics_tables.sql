-- Create analytics tables for tracking user activity and listing performance

-- Table for tracking page views
CREATE TABLE IF NOT EXISTS analytics_page_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_path TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  session_id TEXT,
  referrer TEXT,
  user_agent TEXT,
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for tracking listing views
CREATE TABLE IF NOT EXISTS analytics_listing_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id INTEGER REFERENCES listings(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  session_id TEXT,
  view_duration INTEGER, -- in seconds
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for tracking search queries
CREATE TABLE IF NOT EXISTS analytics_search_queries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  query TEXT,
  category TEXT,
  location TEXT,
  filters JSONB,
  results_count INTEGER,
  user_id UUID REFERENCES auth.users(id),
  session_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for tracking user events
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_type TEXT NOT NULL,
  event_data JSONB,
  user_id UUID REFERENCES auth.users(id),
  session_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_page_views_user_id ON analytics_page_views(user_id);
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON analytics_page_views(created_at);
CREATE INDEX IF NOT EXISTS idx_listing_views_listing_id ON analytics_listing_views(listing_id);
CREATE INDEX IF NOT EXISTS idx_listing_views_user_id ON analytics_listing_views(user_id);
CREATE INDEX IF NOT EXISTS idx_search_queries_created_at ON analytics_search_queries(created_at);
CREATE INDEX IF NOT EXISTS idx_events_event_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_events_user_id ON analytics_events(user_id);

-- Enable row level security
ALTER TABLE analytics_page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_listing_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_search_queries ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Create policies for analytics tables
-- Only admins can view analytics data
CREATE POLICY "Admins can view all analytics data" 
ON analytics_page_views FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE users.id = auth.uid() AND users.role = 'admin'
  )
);

CREATE POLICY "Admins can view all listing views" 
ON analytics_listing_views FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE users.id = auth.uid() AND users.role = 'admin'
  )
);

CREATE POLICY "Admins can view all search queries" 
ON analytics_search_queries FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE users.id = auth.uid() AND users.role = 'admin'
  )
);

CREATE POLICY "Admins can view all events" 
ON analytics_events FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE users.id = auth.uid() AND users.role = 'admin'
  )
);

-- Add these tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE analytics_page_views;
ALTER PUBLICATION supabase_realtime ADD TABLE analytics_listing_views;
ALTER PUBLICATION supabase_realtime ADD TABLE analytics_search_queries;
ALTER PUBLICATION supabase_realtime ADD TABLE analytics_events;
