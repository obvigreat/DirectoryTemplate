-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS categories_slug_idx ON categories(slug);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read categories
DROP POLICY IF EXISTS "Anyone can read categories" ON categories;
CREATE POLICY "Anyone can read categories"
  ON categories FOR SELECT
  USING (true);

-- Create policy to allow only admins to insert categories
DROP POLICY IF EXISTS "Admins can insert categories" ON categories;
CREATE POLICY "Admins can insert categories"
  ON categories FOR INSERT
  WITH CHECK (auth.uid() IN (
    SELECT id FROM auth.users
    WHERE auth.jwt() ->> 'role' = 'admin'
  ));

-- Create policy to allow only admins to update categories
DROP POLICY IF EXISTS "Admins can update categories" ON categories;
CREATE POLICY "Admins can update categories"
  ON categories FOR UPDATE
  USING (auth.uid() IN (
    SELECT id FROM auth.users
    WHERE auth.jwt() ->> 'role' = 'admin'
  ));

-- Create policy to allow only admins to delete categories
DROP POLICY IF EXISTS "Admins can delete categories" ON categories;
CREATE POLICY "Admins can delete categories"
  ON categories FOR DELETE
  USING (auth.uid() IN (
    SELECT id FROM auth.users
    WHERE auth.jwt() ->> 'role' = 'admin'
  ));

-- Add to realtime publication
alter publication supabase_realtime add table categories;

-- Insert some initial categories
INSERT INTO categories (name, slug, description, icon) VALUES
('Restaurants', 'restaurants', 'Places to eat and dine', 'https://api.iconify.design/lucide:utensils.svg'),
('Hotels', 'hotels', 'Places to stay overnight', 'https://api.iconify.design/lucide:hotel.svg'),
('Shopping', 'shopping', 'Retail stores and malls', 'https://api.iconify.design/lucide:shopping-bag.svg'),
('Entertainment', 'entertainment', 'Fun activities and venues', 'https://api.iconify.design/lucide:ticket.svg'),
('Services', 'services', 'Professional services and businesses', 'https://api.iconify.design/lucide:briefcase.svg')
ON CONFLICT (slug) DO NOTHING;