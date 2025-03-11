-- Create messages table if it doesn't exist already
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver_id ON messages(receiver_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);

-- Add RLS policies
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Policy for inserting messages (only authenticated users can send messages)
DROP POLICY IF EXISTS "Users can insert their own messages" ON messages;
CREATE POLICY "Users can insert their own messages"
  ON messages FOR INSERT
  WITH CHECK (auth.uid() = sender_id);

-- Policy for selecting messages (users can only see messages they sent or received)
DROP POLICY IF EXISTS "Users can view their own messages" ON messages;
CREATE POLICY "Users can view their own messages"
  ON messages FOR SELECT
  USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

-- Policy for updating messages (users can only update messages they received)
DROP POLICY IF EXISTS "Users can update messages they received" ON messages;
CREATE POLICY "Users can update messages they received"
  ON messages FOR UPDATE
  USING (auth.uid() = receiver_id);

-- Policy for deleting messages (users can only delete messages they sent or received)
DROP POLICY IF EXISTS "Users can delete their own messages" ON messages;
CREATE POLICY "Users can delete their own messages"
  ON messages FOR DELETE
  USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

-- Enable realtime for messages table
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
