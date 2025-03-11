-- Drop the existing messages table if it exists
DROP TABLE IF EXISTS messages;

-- Create messages table with correct columns
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  sender_name TEXT,
  sender_avatar TEXT,
  recipient_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipient_name TEXT,
  recipient_avatar TEXT,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  read BOOLEAN DEFAULT FALSE,
  listing_id INTEGER REFERENCES listings(id) ON DELETE SET NULL,
  listing_title TEXT
);

-- Add indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_recipient_id ON messages(recipient_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);

-- Enable realtime for messages
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
