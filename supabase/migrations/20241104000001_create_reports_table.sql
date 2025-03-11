-- Create reports table
CREATE TABLE IF NOT EXISTS reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type VARCHAR(50) NOT NULL, -- 'listing', 'review', 'user', 'message'
  content_id TEXT NOT NULL, -- ID of the reported content
  content_title TEXT, -- Title of the reported content
  reporter_id UUID REFERENCES users(id) ON DELETE SET NULL,
  reporter_name TEXT,
  reason VARCHAR(100) NOT NULL,
  details TEXT,
  status VARCHAR(50) NOT NULL DEFAULT 'pending', -- 'pending', 'investigating', 'resolved', 'dismissed'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  resolved_at TIMESTAMP WITH TIME ZONE,
  resolution TEXT,
  admin_id UUID REFERENCES users(id) ON DELETE SET NULL,
  admin_notes TEXT
);

-- Enable RLS
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Users can create reports" ON reports;
CREATE POLICY "Users can create reports"
  ON reports FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Users can view their own reports" ON reports;
CREATE POLICY "Users can view their own reports"
  ON reports FOR SELECT
  TO authenticated
  USING (reporter_id = auth.uid());

DROP POLICY IF EXISTS "Admins have full access to reports" ON reports;
CREATE POLICY "Admins have full access to reports"
  ON reports FOR ALL
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM users WHERE role = 'admin' OR role = 'moderator'));

-- Add to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE reports;
