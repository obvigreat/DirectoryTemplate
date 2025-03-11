-- Create tags table
CREATE TABLE IF NOT EXISTS tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(50) NOT NULL,
  slug VARCHAR(50) NOT NULL UNIQUE,
  description TEXT,
  color VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create listing_tags junction table for many-to-many relationship
CREATE TABLE IF NOT EXISTS listing_tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id INTEGER NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(listing_id, tag_id)
);

-- Enable row level security
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE listing_tags ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Allow public read access to tags" ON tags;
CREATE POLICY "Allow public read access to tags"
  ON tags FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Allow admin full access to tags" ON tags;
CREATE POLICY "Allow admin full access to tags"
  ON tags FOR ALL
  USING (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));

DROP POLICY IF EXISTS "Allow public read access to listing_tags" ON listing_tags;
CREATE POLICY "Allow public read access to listing_tags"
  ON listing_tags FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Allow admin full access to listing_tags" ON listing_tags;
CREATE POLICY "Allow admin full access to listing_tags"
  ON listing_tags FOR ALL
  USING (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));

-- Add realtime
alter publication supabase_realtime add table tags;
alter publication supabase_realtime add table listing_tags;
