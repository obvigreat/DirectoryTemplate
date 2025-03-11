-- Create settings table for storing application settings
CREATE TABLE IF NOT EXISTS settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add initial settings
INSERT INTO settings (key, value, description) VALUES
('site_settings', jsonb_build_object(
  'siteName', 'Directory',
  'siteDescription', 'Find local businesses in your area',
  'contactEmail', 'admin@example.com',
  'supportPhone', '+1 (555) 123-4567',
  'logoUrl', '/logo.png',
  'faviconUrl', '/favicon.ico',
  'primaryColor', '#3b82f6',
  'secondaryColor', '#1e40af'
), 'General site settings'),
('feature_flags', jsonb_build_object(
  'enableReviews', true,
  'enableBookings', true,
  'enableMessages', true,
  'enableSubscriptions', true,
  'enableUserRegistration', true,
  'maintenanceMode', false
), 'Feature flags for enabling/disabling functionality'),
('api_keys', jsonb_build_object(
  'googleMapsApiKey', '',
  'stripePublishableKey', '',
  'stripeSecretKey', '',
  'openaiApiKey', ''
), 'API keys for third-party services')
ON CONFLICT (key) DO NOTHING;

-- Enable RLS
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Create policy to allow only admins to read settings
DROP POLICY IF EXISTS "Admin users can read settings";
CREATE POLICY "Admin users can read settings"
  ON settings FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid() AND users.role = 'admin'
  ));

-- Create policy to allow only admins to update settings
DROP POLICY IF EXISTS "Admin users can update settings";
CREATE POLICY "Admin users can update settings"
  ON settings FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid() AND users.role = 'admin'
  ));

-- Add to realtime publication
alter publication supabase_realtime add table settings;
